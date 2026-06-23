import type { NodeTypes } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { GroupNode } from "./GroupNode";

const AllCategoryNodes = [
  "input", "text-process", "image-gen", "prompt", "video-prod",
  "control", "output", "api", "custom",
  "plan", "design", "frontend", "backend", "infra", "test", "ops", "security",
  "content-ops", "ecommerce", "education", "social", "data-ai", "mobile", "office",
];

export const nodeTypes: NodeTypes = Object.fromEntries(
  AllCategoryNodes.map((type) => [type, BaseNode])
) as NodeTypes;

nodeTypes.group = GroupNode;
