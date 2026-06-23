import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

function BusinessLogicNodeComponent(props: NodeProps) {
  return <BaseNode {...props} />;
}

export const BusinessLogicNode = memo(BusinessLogicNodeComponent);
