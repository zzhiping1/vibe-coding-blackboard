import { memo, useState, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useCanvasStore } from "../../stores/canvas-store";

function GroupNodeComponent({ id, data, selected }: NodeProps) {
  const d = data as any;
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(d.label || "分组");
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);

  const handleDoubleClick = useCallback(() => setEditing(true), []);

  const handleBlur = useCallback(() => {
    setEditing(false);
    if (label.trim() && label !== d.label) {
      updateNodeData(id, { label: label.trim() });
    } else {
      setLabel(d.label || "分组");
    }
  }, [label, d.label, id, updateNodeData]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleBlur();
      }
      if (e.key === "Escape") {
        setLabel(d.label || "分组");
        setEditing(false);
      }
    },
    [handleBlur, d.label]
  );

  return (
    <div
      className={`vcb-group-node ${selected ? "vcb-group-node--selected" : ""}`}
    >
      <div className="vcb-group-header">
        {editing ? (
          <input
            className="vcb-group-label-input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="vcb-group-label" onDoubleClick={handleDoubleClick}>
            {label}
          </span>
        )}
      </div>
      <Handle type="target" position={Position.Left} className="vcb-handle" />
      <Handle type="source" position={Position.Right} className="vcb-handle" />
    </div>
  );
}

export const GroupNode = memo(GroupNodeComponent);
