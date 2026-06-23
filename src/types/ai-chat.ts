export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  toolActions?: ToolAction[];
}

export interface ToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export interface ChatResponse {
  content: string;
  toolCalls?: ToolCall[];
  stopReason?: "end_turn" | "tool_use" | "max_tokens";
}

export interface ToolAction {
  toolName: string;
  summary: string;
  timestamp: number;
}
