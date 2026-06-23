const SUGGESTIONS = [
  "帮我规划用户注册流程",
  "这个流程缺少什么步骤？",
  "优化这个工作流",
  "生成技术架构建议",
  "帮我拆分这个功能模块",
];

interface Props {
  onSelect: (text: string) => void;
}

export function ChatSuggestions({ onSelect }: Props) {
  return (
    <div className="chat-suggestions">
      {SUGGESTIONS.map((s) => (
        <button key={s} className="chat-suggestion-btn" onClick={() => onSelect(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
