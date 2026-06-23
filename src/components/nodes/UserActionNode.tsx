import { memo } from "react";
import { type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

function UserActionNodeComponent(props: NodeProps) {
  return <BaseNode {...props} />;
}

export const UserActionNode = memo(UserActionNodeComponent);
