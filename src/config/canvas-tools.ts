import { ALL_NODE_DEFINITIONS, NODE_CATEGORIES } from "./node-definitions";
import type { NodeCategory } from "../types/node-palette";

const ALL_CATEGORIES: NodeCategory[] = NODE_CATEGORIES.map((c) => c.id);

export const TOOLS_DEFINITIONS = [
  {
    name: "get_canvas_state",
    description: "获取当前画布上所有节点和连线的状态。返回节点列表（含id、标签、分类）和连线列表。",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "add_node",
    description:
      "在画布上添加一个节点。优先使用 definitionId 从预制节点库中选取（推荐），也可以用 label+category 创建自定义节点。如果未指定 position，会自动排列在已有节点下方。",
    input_schema: {
      type: "object" as const,
      properties: {
        definitionId: {
          type: "string",
          description:
            "预制节点ID（如 'fe-component'、'api-setup'）。使用此参数时无需指定 label 和 category。",
        },
        label: {
          type: "string",
          description: "节点显示名称（仅在不使用 definitionId 时需要）",
        },
        category: {
          type: "string",
          enum: ALL_CATEGORIES,
          description: "节点分类（仅在不使用 definitionId 时需要）",
        },
        icon: {
          type: "string",
          description: "节点图标 emoji（可选，自定义节点时可用）",
        },
        specs: {
          type: "string",
          description: "节点描述/说明文字（可选）",
        },
        position: {
          type: "object",
          properties: { x: { type: "number" }, y: { type: "number" } },
          description: "画布坐标位置（可选，不指定则自动排列）",
        },
      },
      required: [],
    },
  },
  {
    name: "update_node",
    description: "修改画布上已有节点的属性（名称、描述等）。",
    input_schema: {
      type: "object" as const,
      properties: {
        nodeId: { type: "string", description: "要修改的节点ID" },
        label: { type: "string", description: "新的节点名称" },
        specs: { type: "string", description: "新的节点描述/说明" },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "remove_node",
    description: "从画布上删除一个节点及其所有连线。",
    input_schema: {
      type: "object" as const,
      properties: {
        nodeId: { type: "string", description: "要删除的节点ID" },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "add_edge",
    description: "在两个节点之间创建一条连线（箭头从 source 指向 target）。",
    input_schema: {
      type: "object" as const,
      properties: {
        sourceId: { type: "string", description: "起点节点ID" },
        targetId: { type: "string", description: "终点节点ID" },
        label: { type: "string", description: "连线上的标签文字（可选）" },
      },
      required: ["sourceId", "targetId"],
    },
  },
  {
    name: "remove_edge",
    description: "删除画布上的一条连线。",
    input_schema: {
      type: "object" as const,
      properties: {
        edgeId: { type: "string", description: "要删除的连线ID" },
      },
      required: ["edgeId"],
    },
  },
  {
    name: "clear_canvas",
    description: "清空画布上的所有节点和连线。谨慎使用。",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];

export function buildNodeReference(): string {
  const lines: string[] = [];
  for (const cat of NODE_CATEGORIES) {
    lines.push(`\n【${cat.label}】`);
    for (const node of cat.nodes) {
      lines.push(`  ${node.id} → ${node.icon} ${node.label}`);
    }
  }
  return lines.join("\n");
}

export function buildToolSystemPrompt(canvasState: string): string {
  const nodeRef = buildNodeReference();
  return `You are an AI assistant helping a user plan software project workflows on a visual canvas.
The user is a non-programmer who thinks in user-side concepts.
Help them organize their workflow, suggest missing steps, and improve their project plan.
Keep language simple and user-friendly. Respond in the same language as the user.

## 画布操控工具

你可以使用工具直接操控画布。用户说话时，主动使用工具来执行操作，而不是只给建议。

### 工具使用原则
- 当用户要求添加、修改、删除节点或连线时，直接使用对应工具
- 当用户描述一个流程时，拆解为多个节点并用连线串联
- 使用 add_node 时优先使用 definitionId（从预制节点库选取），找不到合适的再用 label+category
- 每次操作后用简短文字告诉用户你做了什么
- 如果不确定用户意图，先询问再操作

### 可用的预制节点（推荐使用 definitionId）${nodeRef}

### 当前画布状态
${canvasState}`;
}
