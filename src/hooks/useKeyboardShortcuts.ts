import { useEffect } from "react";
import { useCanvasStore } from "../stores/canvas-store";
import { useUIStore } from "../stores/ui-store";

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Ctrl+Z / Cmd+Z — Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        if (isInput) return;
        e.preventDefault();
        useCanvasStore.getState().undo();
      }

      // Ctrl+Y / Cmd+Shift+Z — Redo
      if (
        ((e.ctrlKey || e.metaKey) && e.key === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z")
      ) {
        if (isInput) return;
        e.preventDefault();
        useCanvasStore.getState().redo();
      }

      // Delete / Backspace — Remove selected
      if (e.key === "Delete" || e.key === "Backspace") {
        if (isInput) return;
        const { selectedNodeId, selectedEdgeId } = useUIStore.getState();
        const ids = [selectedNodeId, selectedEdgeId].filter(Boolean) as string[];
        if (ids.length > 0) {
          e.preventDefault();
          useCanvasStore.getState().removeSelected(ids);
          useUIStore.getState().clearSelection();
        }
      }

      // Escape — Clear selection
      if (e.key === "Escape") {
        useUIStore.getState().clearSelection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
