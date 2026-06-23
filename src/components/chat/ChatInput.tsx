import { useState, useCallback, useRef, useEffect } from "react";

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 发送完成后自动聚焦输入框
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLoading]);

  const handleSubmit = useCallback(() => {
    if (value.trim() && !isLoading) {
      onSend(value);
      setValue("");
    }
  }, [value, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="chat-input">
      <textarea
        ref={inputRef}
        className="chat-input-field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isLoading ? "AI 思考中..." : "输入你的问题..."}
        rows={2}
        disabled={isLoading}
      />
      <button
        className="chat-send-btn"
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
      >
        {isLoading ? "⏳" : "发送"}
      </button>
    </div>
  );
}
