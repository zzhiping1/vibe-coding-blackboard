import { useCanvasStore } from "../../stores/canvas-store";
import { useUIStore } from "../../stores/ui-store";
import { CATEGORY_LABELS } from "../../config/theme";
import type { CanvasNodeData } from "../../types/canvas";

export function PropertiesPanel() {
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const selectedEdgeId = useUIStore((s) => s.selectedEdgeId);
  const propertiesOpen = useUIStore((s) => s.propertiesOpen);
  const clearSelection = useUIStore((s) => s.clearSelection);
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);
  const updateEdgeLabel = useCanvasStore((s) => s.updateEdgeLabel);
  const removeSelected = useCanvasStore((s) => s.removeSelected);

  if (!propertiesOpen) return null;

  // Edge properties
  if (selectedEdgeId) {
    const edge = edges.find((e) => e.id === selectedEdgeId);
    if (!edge) return null;

    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);
    const sourceLabel = sourceNode ? (sourceNode.data as CanvasNodeData).label : edge.source;
    const targetLabel = targetNode ? (targetNode.data as CanvasNodeData).label : edge.target;

    return (
      <div className="properties-panel">
        <div className="properties-header">
          <span className="properties-title">连线属性</span>
          <button className="properties-close" onClick={clearSelection}>
            ✕
          </button>
        </div>
        <div className="properties-body">
          <div className="properties-field">
            <label>起点</label>
            <span className="properties-value">{sourceLabel}</span>
          </div>
          <div className="properties-field">
            <label>终点</label>
            <span className="properties-value">{targetLabel}</span>
          </div>
          <div className="properties-field">
            <label>标签</label>
            <input
              className="properties-input"
              value={String(edge.label || "")}
              placeholder="连线标签（可选）"
              onChange={(e) => updateEdgeLabel(selectedEdgeId, e.target.value)}
            />
          </div>
          <div className="properties-field">
            <button
              className="properties-delete-btn"
              onClick={() => {
                removeSelected([selectedEdgeId]);
                clearSelection();
              }}
            >
              删除连线
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Node properties
  if (!selectedNodeId) return null;
  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const data = node.data as unknown as CanvasNodeData;

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <span className="properties-title">节点属性</span>
        <button className="properties-close" onClick={clearSelection}>
          ✕
        </button>
      </div>
      <div className="properties-body">
        <div className="properties-field">
          <label>图标</label>
          <span className="properties-icon">{data.icon}</span>
        </div>
        <div className="properties-field">
          <label>名称</label>
          <input
            className="properties-input"
            value={data.label}
            onChange={(e) =>
              updateNodeData(selectedNodeId, { label: e.target.value })
            }
          />
        </div>
        <div className="properties-field">
          <label>类型</label>
          <span className="properties-category">
            {CATEGORY_LABELS[data.category] || data.category}
          </span>
        </div>
        <div className="properties-field">
          <label>备注</label>
          <textarea
            className="properties-textarea"
            value={data.specs}
            placeholder="在这里写节点的详细说明..."
            rows={6}
            onChange={(e) =>
              updateNodeData(selectedNodeId, { specs: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
