import { useCanvasStore } from "../../stores/canvas-store";
import { useUIStore } from "../../stores/ui-store";
import { useToastStore } from "../../stores/toast-store";
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
  const autoLayout = useCanvasStore((s) => s.autoLayout);
  const toggleChat = useUIStore((s) => s.toggleChat);
  const chatOpen = useUIStore((s) => s.chatOpen);
  const toast = useToastStore((s) => s.addToast);

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

  const handleSave = () => {
    const data = {
      nodes: useCanvasStore.getState().nodes,
      edges: useCanvasStore.getState().edges,
      projectName: useCanvasStore.getState().projectName,
    };
    localStorage.setItem("vcb-save", JSON.stringify(data));
    toast("已保存到本地");
  };

  const handleLoad = () => {
    const raw = localStorage.getItem("vcb-save");
    if (raw) {
      const data = JSON.parse(raw);
      useCanvasStore.getState().loadCanvas(data.nodes || [], data.edges || []);
      if (data.projectName) useCanvasStore.getState().setProjectName(data.projectName);
      toast("已加载本地草稿");
    } else {
      toast("没有找到本地保存", "info");
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <span className="toolbar-logo">🎨</span>
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
          className={`toolbar-btn toolbar-btn--icon ${!canUndo ? "toolbar-btn--disabled" : ""}`}
          onClick={undo}
          title="撤销 (Ctrl+Z)"
        >
          ↩️
        </button>
        <button
          className={`toolbar-btn toolbar-btn--icon ${!canRedo ? "toolbar-btn--disabled" : ""}`}
          onClick={redo}
          title="重做 (Ctrl+Y)"
        >
          ↪️
        </button>

        <div className="toolbar-divider" />

        <button className="toolbar-btn toolbar-btn--icon" onClick={handleSave} title="保存到本地">
          💾
        </button>
        <button className="toolbar-btn toolbar-btn--icon" onClick={handleLoad} title="从本地加载">
          📂
        </button>
        <button className="toolbar-btn toolbar-btn--icon" onClick={onExport} title="导出">
          📤
        </button>

        <div className="toolbar-divider" />

        <button className="toolbar-btn toolbar-btn--icon" onClick={autoLayout} title="一键整理（思维导图布局）">
          🔄
        </button>
        <button className="toolbar-btn toolbar-btn--icon" onClick={addGroup} title="添加分组">
          📦
        </button>
        <button className="toolbar-btn toolbar-btn--icon" onClick={onTemplate} title="选择模板">
          📋
        </button>
        <button
          className="toolbar-btn toolbar-btn--icon toolbar-btn--danger"
          onClick={() => {
            if (confirm("确定清空画布？此操作可撤销。")) {
              clearCanvas();
              toast("画布已清空");
            }
          }}
          title="清空画布"
        >
          🗑️
        </button>

        <div className="toolbar-divider" />

        <button
          className={`toolbar-btn ${chatOpen ? "toolbar-btn--active" : ""}`}
          onClick={toggleChat}
          title="AI 助手"
        >
          🤖 AI
        </button>
      </div>
    </div>
  );
}
