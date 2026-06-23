import { useCanvasStore } from "../../stores/canvas-store";
import { useUIStore } from "../../stores/ui-store";
import type { CanvasNodeData } from "../../types/canvas";
import type { Node } from "@xyflow/react";

interface Props {
  onExport?: () => void;
  onTemplate?: () => void;
}

export function CanvasToolbar({ onExport, onTemplate }: Props) {
  const projectName = useCanvasStore((s) => s.projectName);
  const setProjectName = useCanvasStore((s) => s.setProjectName);
  const nodeCount = useCanvasStore((s) => s.nodes.length);
  const edgeCount = useCanvasStore((s) => s.edges.length);
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);
  const canUndo = useCanvasStore((s) => s.canUndo());
  const canRedo = useCanvasStore((s) => s.canRedo());
  const clearCanvas = useCanvasStore((s) => s.clearCanvas);
  const toggleChat = useUIStore((s) => s.toggleChat);
  const chatOpen = useUIStore((s) => s.chatOpen);

  const addGroup = () => {
    const groupNode: Node<CanvasNodeData> = {
      id: `group_${Date.now()}`,
      type: "group",
      position: { x: 100, y: 100 },
      data: {
        label: "新分组",
        category: "custom",
        icon: "📦",
        color: "#94a3b8",
        specs: "",
        definitionId: "group",
      },
      style: { width: 300, height: 200 },
    };
    const state = useCanvasStore.getState();
    state.loadCanvas([...state.nodes, groupNode], state.edges);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <span className="toolbar-logo">📋</span>
        <input
          className="toolbar-project-name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          spellCheck={false}
        />
        <span className="toolbar-stats">
          {nodeCount} 节点 / {edgeCount} 连线
        </span>
      </div>
      <div className="toolbar-right">
        <button
          className={`toolbar-btn ${!canUndo ? "toolbar-btn--disabled" : ""}`}
          onClick={undo}
          title="撤销 (Ctrl+Z)"
        >
          ↩ 撤销
        </button>
        <button
          className={`toolbar-btn ${!canRedo ? "toolbar-btn--disabled" : ""}`}
          onClick={redo}
          title="重做 (Ctrl+Y)"
        >
          ↪ 重做
        </button>
        <div className="toolbar-divider" />
        <button className="toolbar-btn" onClick={() => {
          const data = { nodes: useCanvasStore.getState().nodes, edges: useCanvasStore.getState().edges, projectName: useCanvasStore.getState().projectName };
          localStorage.setItem("vcb-save", JSON.stringify(data));
        }} title="保存到本地">
          💾 保存
        </button>
        <button className="toolbar-btn" onClick={() => {
          const raw = localStorage.getItem("vcb-save");
          if (raw) {
            const data = JSON.parse(raw);
            useCanvasStore.getState().loadCanvas(data.nodes || [], data.edges || []);
            if (data.projectName) useCanvasStore.getState().setProjectName(data.projectName);
          }
        }} title="从本地加载">
          📂 打开
        </button>
        <button className="toolbar-btn" onClick={onExport} title="导出">
          📤 导出
        </button>
        <div className="toolbar-divider" />
        <button
          className="toolbar-btn"
          onClick={() => {
            if (confirm("确定清空画布？此操作可撤销。")) clearCanvas();
          }}
          title="清空画布"
        >
          🗑️ 清空
        </button>
        <button className="toolbar-btn" onClick={addGroup} title="添加分组">
          📦 分组
        </button>
        <button className="toolbar-btn" onClick={onTemplate} title="选择模板">
          📋 模板
        </button>
        <div className="toolbar-divider" />
        <button
          className={`toolbar-btn ${chatOpen ? "toolbar-btn--active" : ""}`}
          onClick={toggleChat}
          title="AI 助手"
        >
          🤖 AI 助手
        </button>
      </div>
    </div>
  );
}
