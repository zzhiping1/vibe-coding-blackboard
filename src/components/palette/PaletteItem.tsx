import type { NodeDefinition } from "../../types/node-palette";

interface Props {
  definition: NodeDefinition;
}

export function PaletteItem({ definition }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/vcb-node", JSON.stringify(definition));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="palette-item"
      draggable
      onDragStart={handleDragStart}
      style={{ borderLeftColor: definition.color }}
    >
      <span className="palette-item-icon">{definition.icon}</span>
      <span className="palette-item-label">{definition.label}</span>
    </div>
  );
}
