import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));

// ---- Tool definitions (Anthropic format) ----
const TOOLS = [
  {
    name: "get_canvas_state",
    description: "获取当前画布上所有节点和连线的状态。",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "add_node",
    description: "在画布上添加一个节点。优先使用 definitionId，也可以用 label+category。",
    input_schema: {
      type: "object",
      properties: {
        definitionId: { type: "string", description: "预制节点ID" },
        label: { type: "string", description: "节点名称" },
        category: { type: "string", description: "节点分类" },
        icon: { type: "string", description: "节点图标 emoji" },
        specs: { type: "string", description: "节点描述" },
        position: { type: "object", properties: { x: { type: "number" }, y: { type: "number" } } },
      },
      required: [],
    },
  },
  {
    name: "update_node",
    description: "修改画布上已有节点的属性。",
    input_schema: {
      type: "object",
      properties: {
        nodeId: { type: "string" },
        label: { type: "string" },
        specs: { type: "string" },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "remove_node",
    description: "从画布上删除一个节点及其所有连线。",
    input_schema: {
      type: "object",
      properties: { nodeId: { type: "string" } },
      required: ["nodeId"],
    },
  },
  {
    name: "add_edge",
    description: "在两个节点之间创建一条连线。",
    input_schema: {
      type: "object",
      properties: {
        sourceId: { type: "string" },
        targetId: { type: "string" },
        label: { type: "string" },
      },
      required: ["sourceId", "targetId"],
    },
  },
  {
    name: "remove_edge",
    description: "删除画布上的一条连线。",
    input_schema: {
      type: "object",
      properties: { edgeId: { type: "string" } },
      required: ["edgeId"],
    },
  },
  {
    name: "clear_canvas",
    description: "清空画布上的所有节点和连线。",
    input_schema: { type: "object", properties: {}, required: [] },
  },
];

// ---- Tool-use system prompt ----
const TOOL_INSTRUCTIONS = `
## 画布操控工具
你可以使用工具直接操控画布。用户说话时，主动使用工具来执行操作，而不是只给建议。
- 当用户要求添加、修改、删除节点或连线时，直接使用对应工具
- 当用户描述一个流程时，拆解为多个节点并用连线串联
- 使用 add_node 时优先使用 definitionId
- 每次操作后用简短文字告诉用户你做了什么`;

function buildSystemPrompt(canvasState, toolsEnabled) {
  const base = `You are an AI assistant helping a user plan software project workflows on a visual canvas.
The user is a non-programmer who thinks in user-side concepts.
Help them organize their workflow, suggest missing steps, and improve their project plan.
Keep language simple and user-friendly. Respond in the same language as the user.`;

  const canvas = `\n\nCurrent canvas state:\n${canvasState || "{}"}`;
  const tools = toolsEnabled ? `\n${TOOL_INSTRUCTIONS}` : "";
  return base + canvas + tools;
}

// ---- Parse AI response → structured { content, toolCalls, stopReason } ----
function parseAIResponse(result) {
  const content = result.content;
  if (!Array.isArray(content)) {
    // OpenAI format
    if (result.choices?.[0]?.message?.content) {
      return { content: result.choices[0].message.content, toolCalls: [], stopReason: "end_turn" };
    }
    return { content: "[Empty response]", toolCalls: [], stopReason: "end_turn" };
  }

  let text = "";
  const toolCalls = [];

  for (const block of content) {
    if (block.type === "text" && block.text) {
      text += block.text;
    } else if (block.type === "tool_use") {
      toolCalls.push({ id: block.id, name: block.name, input: block.input || {} });
    }
  }

  return {
    content: text || (toolCalls.length > 0 ? "" : "[Empty response]"),
    toolCalls,
    stopReason: result.stop_reason || (toolCalls.length > 0 ? "tool_use" : "end_turn"),
  };
}

// ---- AI API 代理 ----
app.post("/api/chat", async (req, res) => {
  const { messages, canvasState, apiKey, baseUrl, model, authStyle, toolsEnabled } = req.body;

  if (!apiKey || !baseUrl || !model) {
    return res.status(400).json({ error: "缺少必要参数" });
  }

  const systemPrompt = buildSystemPrompt(canvasState, toolsEnabled);

  // Build messages — pass through content blocks as-is
  const apiMessages = [
    { role: "user", content: systemPrompt },
    ...messages,
  ];

  const url = `${baseUrl.replace(/\/$/, "")}/v1/messages`;

  const headers = {
    "content-type": "application/json",
    "anthropic-version": "2023-06-01",
  };

  if (authStyle === "bearer") {
    headers["authorization"] = `Bearer ${apiKey}`;
  } else if (authStyle === "api-key") {
    headers["x-api-key"] = apiKey;
  }

  const bodyBase = { model, max_tokens: 4096, messages: apiMessages };

  try {
    // First attempt — with tools if enabled
    let body = toolsEnabled ? { ...bodyBase, tools: TOOLS } : bodyBase;
    let resp = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
    let result = await resp.json();

    // Defensive fallback: if 400 with tools, retry without
    if (!resp.ok && toolsEnabled && resp.status === 400) {
      body = bodyBase;
      resp = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
      result = await resp.json();
    }

    if (!resp.ok) {
      const msg = result?.error?.message || result?.message || "Unknown error";
      return res.status(resp.status).json({ error: `HTTP ${resp.status} — ${msg}` });
    }

    const parsed = parseAIResponse(result);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 静态文件
app.use(express.static(join(__dirname, "dist")));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Vibe Coding Blackboard running at http://localhost:${PORT}`);
  console.log(`LAN access: http://<your-ip>:${PORT}`);
});
