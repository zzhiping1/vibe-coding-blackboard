import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

function ContentNodeComponent(props: NodeProps) {
  return <BaseNode {...props} />;
}

export const ContentNode = memo(ContentNodeComponent);
