import { useState, useCallback, useMemo } from "react";
import {
  EdgeLabelRenderer,
  getBezierPath,
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
  selected,
}: EdgeProps) {
  const [editing, setEditing] = useState(false);
  const [labelValue, setLabelValue] = useState((label as string) || "");
  const updateEdgeLabel = useCanvasStore((s) => s.updateEdgeLabel);

  const dx = Math.abs(targetX - sourceX);
  const curvature = Math.max(dx * 0.4, 60);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature,
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

  const strokeColor = (style?.stroke as string) || "#64748b";

  return (
    <>
      {/* Transparent hit area for easier clicking */}
      <path
        d={edgePath}
        stroke="transparent"
        strokeWidth={20}
        fill="none"
        style={{ cursor: "pointer", pointerEvents: "stroke" }}
      />
      {/* Visible edge */}
      <path
        d={edgePath}
        stroke={selected ? "#3b82f6" : strokeColor}
        strokeWidth={selected ? 2.5 : 2}
        fill="none"
        markerEnd={markerEnd}
        style={{
          filter: selected ? `drop-shadow(0 0 6px ${strokeColor}88)` : undefined,
          pointerEvents: "none",
          transition: "stroke 0.15s, stroke-width 0.15s",
        }}
      />
      {label ? (
        <EdgeLabelRenderer>
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
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
