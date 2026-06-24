import { useCallback, useRef } from "react";
import { useChatStore } from "../stores/chat-store";
import { useCanvasStore } from "../stores/canvas-store";
import { getProviderById } from "../config/providers";
import { getDefinitionById } from "../config/node-definitions";
import type { ChatResponse, ToolCall, ToolAction } from "../types/ai-chat";

const MAX_TOOL_ROUNDS = 10;
const TOOL_DELAY_MS = 200;

interface ApiMessage {
  role: string;
  content: string | { type: string; [k: string]: unknown }[];
}

function buildCanvasState(): string {
  const state = useCanvasStore.getState();
  return JSON.stringify({
    projectName: state.projectName,
    nodes: state.nodes.map((n) => ({
      id: n.id,
      label: (n.data as any).label,
      category: (n.data as any).category,
      icon: (n.data as any).icon,
      specs: (n.data as any).specs,
    })),
    edges: state.edges.map((e) => ({
      source: e.source,
      target: e.target,
      label: e.label,
    })),
  });
}

async function callBackend(
  apiMessages: ApiMessage[],
  canvasState: string,
  apiKey: string,
  toolsEnabled: boolean,
  provider: ReturnType<typeof getProviderById> & {}
): Promise<ChatResponse> {
  const isTauri = !!(window as any).__TAURI__?.core?.invoke;

  if (isTauri) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("chat_completion", {
      messages: apiMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      canvasState,
      apiKey,
      baseUrl: provider.baseURL,
      model: provider.defaultModel,
      authStyle: provider.headerFormat,
      toolsEnabled,
    });
  }

  const resp = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: apiMessages,
      canvasState,
      apiKey,
      baseUrl: provider.baseURL,
      model: provider.defaultModel,
      authStyle: provider.headerFormat,
      toolsEnabled,
    }),
  });

  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`);
  return data as ChatResponse;
}

function executeToolCall(tc: ToolCall): { result: string; action: ToolAction } {
  const canvas = useCanvasStore.getState();
  const ts = Date.now();

  switch (tc.name) {
    case "get_canvas_state": {
      const state = useCanvasStore.getState();
      const summary = `节点: ${state.nodes.length}, 连线: ${state.edges.length}`;
      return {
        result: JSON.stringify({ nodeCount: state.nodes.length, edgeCount: state.edges.length }),
        action: { toolName: tc.name, summary: `读取画布状态 (${summary})`, timestamp: ts },
      };
    }
    case "add_node": {
      const { definitionId, label, category, icon, specs } = tc.input as any;
      let def = definitionId ? getDefinitionById(definitionId) : null;
      if (!def && label && category) {
        def = {
          id: `custom-${Date.now()}`,
          label,
          category,
          icon: icon || "🧩",
          color: "#71717a",
          defaultSpecs: specs || "",
          score: 50,
        };
      }
      if (!def) {
        return { result: JSON.stringify({ error: "Invalid node: need definitionId or label+category" }), action: { toolName: tc.name, summary: "添加节点失败: 参数无效", timestamp: ts } };
      }
      const nodeId = canvas.addNodeAutoPosition(def);
      return {
        result: JSON.stringify({ success: true, nodeId }),
        action: { toolName: tc.name, summary: `添加节点: ${def.icon} ${def.label}`, timestamp: ts },
      };
    }
    case "update_node": {
      const { nodeId, label, specs } = tc.input as any;
      const data: Record<string, unknown> = {};
      if (label) data.label = label;
      if (specs) data.specs = specs;
      canvas.updateNodeData(nodeId, data);
      return {
        result: JSON.stringify({ success: true }),
        action: { toolName: tc.name, summary: `修改节点: ${nodeId}`, timestamp: ts },
      };
    }
    case "remove_node": {
      const { nodeId } = tc.input as any;
      canvas.removeSelected([nodeId]);
      return {
        result: JSON.stringify({ success: true }),
        action: { toolName: tc.name, summary: `删除节点: ${nodeId}`, timestamp: ts },
      };
    }
    case "add_edge": {
      const { sourceId, targetId, label } = tc.input as any;
      canvas.addEdge({ source: sourceId, target: targetId });
      if (label) {
        const edges = useCanvasStore.getState().edges;
        const lastEdge = edges[edges.length - 1];
        if (lastEdge) canvas.updateEdgeLabel(lastEdge.id, label);
      }
      return {
        result: JSON.stringify({ success: true }),
        action: { toolName: tc.name, summary: `连接: ${sourceId} → ${targetId}${label ? ` (${label})` : ""}`, timestamp: ts },
      };
    }
    case "remove_edge": {
      const { edgeId } = tc.input as any;
      canvas.removeSelected([edgeId]);
      return {
        result: JSON.stringify({ success: true }),
        action: { toolName: tc.name, summary: `删除连线: ${edgeId}`, timestamp: ts },
      };
    }
    case "clear_canvas": {
      canvas.clearCanvas();
      return {
        result: JSON.stringify({ success: true }),
        action: { toolName: tc.name, summary: "清空画布", timestamp: ts },
      };
    }
    default:
      return {
        result: JSON.stringify({ error: `Unknown tool: ${tc.name}` }),
        action: { toolName: tc.name, summary: `未知工具: ${tc.name}`, timestamp: ts },
      };
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useAiChat() {
  const addMessage = useChatStore((s) => s.addMessage);
  const setLoading = useChatStore((s) => s.setLoading);
  const isLoading = useChatStore((s) => s.isLoading);
  const messages = useChatStore((s) => s.messages);
  const apiMessagesRef = useRef<ApiMessage[]>([]);

  const sendMessage = useCallback(
    async (text: string, apiKey: string, providerId: string) => {
      if (!text.trim() || isLoading) return;

      const provider = getProviderById(providerId);
      if (!provider) return;
      if (provider.id !== "ollama" && !apiKey.trim()) {
        addMessage({
          role: "assistant",
          content: `请先在顶部供应商选择器中填写 ${provider.name} 的 API Key。`,
        });
        return;
      }

      const toolsEnabled = provider.supportsToolUse;

      addMessage({ role: "user", content: text.trim() });
      apiMessagesRef.current.push({ role: "user", content: text.trim() });
      setLoading(true);

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const canvasState = buildCanvasState();
          const response = await callBackend(
            apiMessagesRef.current,
            canvasState,
            apiKey.trim(),
            toolsEnabled,
            provider
          );

          // Store assistant turn in apiMessages (text + tool_use blocks)
          const assistantBlocks: { type: string; [k: string]: unknown }[] = [];
          if (response.content) {
            assistantBlocks.push({ type: "text", text: response.content });
          }
          for (const tc of response.toolCalls || []) {
            assistantBlocks.push({ type: "tool_use", id: tc.id, name: tc.name, input: tc.input });
          }
          apiMessagesRef.current.push({
            role: "assistant",
            content: assistantBlocks.length === 1 && assistantBlocks[0].type === "text"
              ? response.content
              : assistantBlocks,
          });

          const toolCalls = response.toolCalls || [];
          if (toolCalls.length === 0) {
            // No tool calls — final text response
            if (response.content) {
              addMessage({ role: "assistant", content: response.content });
            }
            break;
          }

          // Execute tool calls and build tool_results
          const actions: ToolAction[] = [];
          const toolResults: { type: string; tool_use_id: string; content: string }[] = [];

          for (const tc of toolCalls) {
            const { result, action } = executeToolCall(tc);
            actions.push(action);
            toolResults.push({ type: "tool_result", tool_use_id: tc.id, content: result });
          }

          // Show intermediate text if any
          if (response.content) {
            addMessage({ role: "assistant", content: response.content, toolActions: actions });
          }

          // Send tool_results as next user message
          apiMessagesRef.current.push({ role: "user", content: toolResults as any });

          await delay(TOOL_DELAY_MS);
        }
      } catch (err) {
        addMessage({
          role: "assistant",
          content: `AI 服务暂时不可用 (${err})。\n当前供应商：${provider?.name || providerId}，请检查 API Key 是否正确。`,
        });
      } finally {
        setLoading(false);
      }
    },
    [isLoading, messages, addMessage, setLoading]
  );

  return { sendMessage, isLoading, messages };
}
