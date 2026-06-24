import { create } from "zustand";
import {
  type Node,
  type Edge,
  type XYPosition,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react";
import dagre from "dagre";
import type { CanvasNodeData } from "../types/canvas";
import type { NodeDefinition } from "../types/node-palette";

let nodeIdCounter = 0;
const generateId = () => `node_${++nodeIdCounter}_${Date.now()}`;

interface Snapshot {
  nodes: Node<CanvasNodeData>[];
  edges: Edge[];
}

interface CanvasStore {
  nodes: Node<CanvasNodeData>[];
  edges: Edge[];
  projectName: string;
  projectDescription: string;
  past: Snapshot[];
  future: Snapshot[];

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addEdge: (connection: { source: string; target: string; sourceHandle?: string | null; targetHandle?: string | null }) => void;
  addNodeFromPalette: (definition: NodeDefinition, position: XYPosition) => void;
  addNodeAutoPosition: (definition: NodeDefinition) => string;
  updateNodeData: (id: string, data: Partial<CanvasNodeData>) => void;
  updateEdgeLabel: (id: string, label: string) => void;
  removeSelected: (ids: string[]) => void;
  loadCanvas: (nodes: Node<CanvasNodeData>[], edges: Edge[]) => void;
  clearCanvas: () => void;
  setProjectName: (name: string) => void;
  setProjectDescription: (desc: string) => void;
  autoLayout: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const MAX_HISTORY = 50;

function takeSnapshot(state: { nodes: Node<CanvasNodeData>[]; edges: Edge[] }): Snapshot {
  return { nodes: state.nodes, edges: state.edges };
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  nodes: [],
  edges: [],
  projectName: "未命名项目",
  projectDescription: "",
  past: [],
  future: [],

  onNodesChange: (changes) => {
    const snapshot = takeSnapshot(get());
    const newNodes = applyNodeChanges(changes, get().nodes) as Node<CanvasNodeData>[];
    set({
      nodes: newNodes,
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  onEdgesChange: (changes) => {
    const snapshot = takeSnapshot(get());
    set({
      edges: applyEdgeChanges(changes, get().edges),
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  addEdge: (connection) => {
    const snapshot = takeSnapshot(get());
    const newEdge: Edge = {
      id: `edge_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      source: connection.source,
      target: connection.target,
      sourceHandle: "source-bottom",
      targetHandle: "target-top",
      type: "smoothstep",
      animated: false,
      style: { strokeWidth: 2, stroke: "#64748b" },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 20, height: 20 },
    };
    set({
      edges: [...get().edges, newEdge],
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  addNodeFromPalette: (definition, position) => {
    const snapshot = takeSnapshot(get());
    const newNode: Node<CanvasNodeData> = {
      id: generateId(),
      type: definition.category,
      position,
      data: {
        label: definition.label,
        category: definition.category,
        icon: definition.icon,
        color: definition.color,
        specs: definition.defaultSpecs,
        definitionId: definition.id,
      },
    };
    set({
      nodes: [...get().nodes, newNode],
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  addNodeAutoPosition: (definition) => {
    const { nodes } = get();
    let position: XYPosition;
    if (nodes.length === 0) {
      position = { x: 250, y: 100 };
    } else {
      const maxY = Math.max(...nodes.map((n) => n.position.y));
      const nodesAtBottom = nodes.filter((n) => n.position.y >= maxY - 10);
      const avgX = nodesAtBottom.reduce((s, n) => s + n.position.x, 0) / nodesAtBottom.length;
      position = { x: avgX + 250, y: maxY + 80 };
    }
    const snapshot = takeSnapshot(get());
    const id = generateId();
    const newNode: Node<CanvasNodeData> = {
      id,
      type: definition.category,
      position,
      data: {
        label: definition.label,
        category: definition.category,
        icon: definition.icon,
        color: definition.color,
        specs: definition.defaultSpecs,
        definitionId: definition.id,
      },
    };
    set({
      nodes: [...get().nodes, newNode],
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
    return id;
  },

  updateNodeData: (id, data) => {
    const snapshot = takeSnapshot(get());
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  updateEdgeLabel: (id, label) => {
    const snapshot = takeSnapshot(get());
    set({
      edges: get().edges.map((edge) =>
        edge.id === id ? { ...edge, label } : edge
      ),
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  removeSelected: (ids) => {
    const snapshot = takeSnapshot(get());
    set({
      nodes: get().nodes.filter((n) => !ids.includes(n.id)),
      edges: get().edges.filter(
        (e) => !ids.includes(e.id) && !ids.includes(e.source) && !ids.includes(e.target)
      ),
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  loadCanvas: (nodes, edges) => {
    set({ nodes, edges, past: [], future: [] });
  },

  autoLayout: () => {
    const { nodes, edges } = get();
    if (nodes.length === 0) return;
    const snapshot = takeSnapshot(get());

    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: "TB", nodesep: 160, ranksep: 200, marginx: 80, marginy: 80 });

    for (const node of nodes) {
      g.setNode(node.id, { width: 200, height: 60 });
    }
    for (const edge of edges) {
      g.setEdge(edge.source, edge.target);
    }

    dagre.layout(g);

    const layouted = nodes.map((node) => {
      const pos = g.node(node.id);
      if (!pos) return node;
      return {
        ...node,
        position: { x: pos.x - 90, y: pos.y - 30 },
      };
    });

    const nodeMap = new Map(layouted.map((n) => [n.id, n]));

    const layoutedEdges = edges.map((edge) => ({
      ...edge,
      sourceHandle: "source-bottom",
      targetHandle: "target-top",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 20, height: 20 },
    }));

    set({
      nodes: layouted,
      edges: layoutedEdges,
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  clearCanvas: () => {
    const snapshot = takeSnapshot(get());
    set({
      nodes: [],
      edges: [],
      past: [...get().past.slice(-MAX_HISTORY), snapshot],
      future: [],
    });
  },

  setProjectName: (name) => set({ projectName: name }),
  setProjectDescription: (desc) => set({ projectDescription: desc }),

  undo: () => {
    const { past, nodes, edges } = get();
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    set({
      nodes: prev.nodes,
      edges: prev.edges,
      past: past.slice(0, -1),
      future: [{ nodes, edges }, ...get().future.slice(0, MAX_HISTORY)],
    });
  },

  redo: () => {
    const { future, nodes, edges } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      nodes: next.nodes,
      edges: next.edges,
      past: [...get().past, { nodes, edges }],
      future: future.slice(1),
    });
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
}));
