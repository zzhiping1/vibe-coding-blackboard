import { useState } from "react";
import { PaletteItem } from "./PaletteItem";
import type { NodeCategoryGroup } from "../../types/node-palette";

interface Props {
  category: NodeCategoryGroup;
}

export function PaletteCategory({ category, defaultOpen = false }: Props & { defaultOpen?: boolean }) {
  const [collapsed, setCollapsed] = useState(!defaultOpen);

  return (
    <div className="palette-category">
      <button
        className="palette-category-header"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="palette-category-label">{category.label}</span>
        <span className="palette-category-count">{category.nodes.length}</span>
        <span className="palette-category-arrow">{collapsed ? "▶" : "▼"}</span>
      </button>
      {!collapsed && (
        <div className="palette-category-items">
          {category.nodes.map((node) => (
            <PaletteItem key={node.id} definition={node} />
          ))}
        </div>
      )}
    </div>
  );
}
