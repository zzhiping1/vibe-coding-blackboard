import type { Node, Edge } from "@xyflow/react";
import type { CanvasNodeData } from "../types/canvas";

export interface VCBTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  nodes: Node<CanvasNodeData>[];
  edges: Edge[];
}

export const DEFAULT_TEMPLATES: VCBTemplate[] = [
  {
    id: "blank",
    name: "空白项目",
    description: "从零开始的空白画布",
    icon: "📄",
    nodes: [],
    edges: [],
  },
];
