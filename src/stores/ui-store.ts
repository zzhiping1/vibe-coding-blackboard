import { create } from "zustand";

interface UIStore {
  paletteOpen: boolean;
  propertiesOpen: boolean;
  chatOpen: boolean;
  selectedNodeId: string | null;
  selectedEdgeId: string | null;

  togglePalette: () => void;
  toggleChat: () => void;
  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  clearSelection: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  paletteOpen: true,
  propertiesOpen: false,
  chatOpen: false,
  selectedNodeId: null,
  selectedEdgeId: null,

  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  selectNode: (id) =>
    set({ selectedNodeId: id, selectedEdgeId: null, propertiesOpen: id !== null }),
  selectEdge: (id) =>
    set({ selectedEdgeId: id, selectedNodeId: null, propertiesOpen: id !== null }),
  clearSelection: () =>
    set({ selectedNodeId: null, selectedEdgeId: null, propertiesOpen: false }),
}));
