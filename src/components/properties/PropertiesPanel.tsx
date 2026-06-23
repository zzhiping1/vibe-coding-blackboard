import { useCanvasStore } from "../../stores/canvas-store";
import { useUIStore } from "../../stores/ui-store";
import { CATEGORY_LABELS } from "../../config/theme";
import type { CanvasNodeData } from "../../types/canvas";

export function PropertiesPanel() {
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const propertiesOpen = useUIStore((s) => s.propertiesOpen);
  const clearSelection = useUIStore((s) => s.clearSelection);
  const nodes = useCanvasStore((s) => s.nodes);
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);

  if (!propertiesOpen || !selectedNodeId) return null;

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
