import type { Node, Edge } from "@xyflow/react";
import type { NodeCategory } from "./node-palette";

export type { NodeCategory };

export interface CanvasNodeData extends Record<string, unknown> {
  label: string;
  category: NodeCategory;
  icon: string;
  color: string;
  specs: string;
  definitionId: string;
}

export type CanvasNode = Node<CanvasNodeData>;
export type CanvasEdge = Edge;

export interface CanvasState {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

export interface WorkflowGroup {
  id: string;
  label: string;
  nodeIds: string[];
}
