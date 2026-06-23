export type NodeCategory =
  | "input"
  | "text-process"
  | "image-gen"
  | "prompt"
  | "video-prod"
  | "control"
  | "output"
  | "api"
  | "custom"
  | "plan"
  | "design"
  | "frontend"
  | "backend"
  | "infra"
  | "test"
  | "ops"
  | "security"
  | "content-ops"
  | "ecommerce"
  | "education"
  | "social"
  | "data-ai"
  | "mobile"
  | "office"
  | "group";

export interface NodeDefinition {
  id: string;
  label: string;
  category: NodeCategory;
  icon: string;
  color: string;
  defaultSpecs: string;
  score: number; // 使用频率 0-100
}

export interface NodeCategoryGroup {
  id: NodeCategory;
  label: string;
  color: string;
  nodes: NodeDefinition[];
}
