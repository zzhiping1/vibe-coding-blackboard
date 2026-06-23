import type { ChatMessage as ChatMessageType } from "../../types/ai-chat";

interface Props {
  message: ChatMessageType;
}

function ToolActionIcon({ name }: { name: string }) {
  switch (name) {
    case "add_node": return <span className="ta-icon ta-add">+</span>;
    case "remove_node": return <span className="ta-icon ta-remove">-</span>;
    case "update_node": return <span className="ta-icon ta-update">✎</span>;
    case "add_edge": return <span className="ta-icon ta-edge">→</span>;
    case "remove_edge": return <span className="ta-icon ta-remove-edge">✕</span>;
    case "clear_canvas": return <span className="ta-icon ta-clear">⟳</span>;
    case "get_canvas_state": return <span className="ta-icon ta-read">👁</span>;
    default: return <span className="ta-icon">•</span>;
  }
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`chat-message ${isUser ? "chat-message--user" : "chat-message--assistant"}`}>
      <div className="chat-message-avatar">
        {isUser ? "👤" : "🤖"}
      </div>
      <div className="chat-message-body">
        {message.toolActions && message.toolActions.length > 0 && (
          <div className="chat-tool-actions">
            <div className="chat-tool-actions-header">🔧 画布操作</div>
            {message.toolActions.map((action, i) => (
              <div key={i} className="chat-tool-action">
                <ToolActionIcon name={action.toolName} />
                <span>{action.summary}</span>
              </div>
            ))}
          </div>
        )}
        {message.content && (
          <div className="chat-message-content">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
