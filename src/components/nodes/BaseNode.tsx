import { memo, useState, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useCanvasStore } from "../../stores/canvas-store";
import type { CanvasNodeData } from "../../types/canvas";

function BaseNodeComponent({ id, data, selected }: NodeProps) {
  const d = data as unknown as CanvasNodeData;
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(d.label);
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);

  const handleDoubleClick = useCallback(() => setEditing(true), []);

  const handleBlur = useCallback(() => {
    setEditing(false);
    if (label.trim() && label !== d.label) {
      updateNodeData(id, { label: label.trim() });
    } else {
      setLabel(d.label);
    }
  }, [label, d.label, id, updateNodeData]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleBlur();
      }
      if (e.key === "Escape") {
        setLabel(d.label);
        setEditing(false);
      }
    },
    [handleBlur, d.label]
  );

  return (
    <div
      className={`vcb-node ${selected ? "vcb-node--selected" : ""}`}
      style={{ borderLeftColor: d.color }}
    >
      <Handle type="target" position={Position.Top} className="vcb-handle" id="target-top" />
      <Handle type="target" position={Position.Left} className="vcb-handle" id="target-left" />
      <div className="vcb-node-header">
        <span className="vcb-node-icon">{d.icon}</span>
        {editing ? (
          <input
            className="vcb-node-label-input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="vcb-node-label" onDoubleClick={handleDoubleClick}>
            {d.label}
          </span>
        )}
      </div>
      {d.specs && (
        <div className="vcb-node-specs">{d.specs.split("\n")[0]}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="vcb-handle" id="source-bottom" />
      <Handle type="source" position={Position.Right} className="vcb-handle" id="source-right" />
    </div>
  );
}

export const BaseNode = memo(BaseNodeComponent);
