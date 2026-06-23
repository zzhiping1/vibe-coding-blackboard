import { useState, useEffect } from "react";
import { NODE_CATEGORIES, getDefinitionById } from "../../config/node-definitions";
import { PaletteCategory } from "./PaletteCategory";
import { useUIStore } from "../../stores/ui-store";
import type { NodeDefinition } from "../../types/node-palette";

const RECENT_KEY = "vcb-recent-nodes";
const MAX_RECENT = 10;

export function getRecentNodeIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

export function recordRecentUsage(nodeId: string) {
  const recent = getRecentNodeIds().filter((id) => id !== nodeId);
  recent.unshift(nodeId);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export function Palette() {
  const [search, setSearch] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(() => getRecentNodeIds());
  const paletteOpen = useUIStore((s) => s.paletteOpen);
  const togglePalette = useUIStore((s) => s.togglePalette);

  useEffect(() => {
    const interval = setInterval(() => setRecentIds(getRecentNodeIds()), 2000);
    return () => clearInterval(interval);
  }, []);

  if (!paletteOpen) {
    return (
      <button className="palette-toggle" onClick={togglePalette} title="展开节点面板">
        {"▶"}
      </button>
    );
  }

  const recentNodes: NodeDefinition[] = recentIds
    .map(getDefinitionById)
    .filter(Boolean) as NodeDefinition[];

  const filtered = NODE_CATEGORIES.map((cat) => ({
    ...cat,
    nodes: cat.nodes.filter(
      (n) =>
        n.label.toLowerCase().includes(search.toLowerCase()) ||
        n.id.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.nodes.length > 0);

  return (
    <div className="palette">
      <div className="palette-header">
        <span className="palette-title">节点面板</span>
        <button className="palette-close" onClick={togglePalette}>
          {"◀"}
        </button>
      </div>
      <div className="palette-search">
        <input
          type="text"
          placeholder="搜索节点..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="palette-search-input"
        />
      </div>
      <div className="palette-list">
        {!search && recentNodes.length > 0 && (
          <PaletteCategory
            category={{ id: "plan" as any, label: "⏱️ 最近使用", color: "#64748b", nodes: recentNodes }}
            defaultOpen={true}
          />
        )}
        {filtered.map((cat) => (
          <PaletteCategory key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
