import { useState, useCallback } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { useCanvasStore } from "../../stores/canvas-store";

export function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  style,
  markerEnd,
}: EdgeProps) {
  const [editing, setEditing] = useState(false);
  const [labelValue, setLabelValue] = useState((label as string) || "");
  const updateEdgeLabel = useCanvasStore((s) => s.updateEdgeLabel);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  const handleDoubleClick = useCallback(() => {
    setLabelValue((label as string) || "");
    setEditing(true);
  }, [label]);

  const handleBlur = useCallback(() => {
    setEditing(false);
    updateEdgeLabel(id, labelValue.trim());
  }, [id, labelValue, updateEdgeLabel]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleBlur();
      }
      if (e.key === "Escape") {
        setLabelValue((label as string) || "");
        setEditing(false);
      }
    },
    [handleBlur, label]
  );

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {label ? (<EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {editing ? (
            <input
              className="edge-label-input"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="添加标签..."
            />
          ) : (
            <div className="edge-label" onDoubleClick={handleDoubleClick}>
              {label || ""}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>) : null}
    </>
  );
}
