import { useRef, useEffect, useCallback } from "react";
import { useUIStore } from "../../stores/ui-store";
import { useSettingsStore } from "../../stores/settings-store";
import { useAiChat } from "../../hooks/useAiChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatSuggestions } from "./ChatSuggestions";
import { ProviderPicker } from "./ProviderPicker";

export function ChatPanel() {
  const chatOpen = useUIStore((s) => s.chatOpen);
  const toggleChat = useUIStore((s) => s.toggleChat);
  const { sendMessage, isLoading, messages } = useAiChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const providerId = useSettingsStore((s) => s.providerId);
  const getApiKey = useSettingsStore((s) => s.getApiKey);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = useCallback(
    (text: string) => {
      const key = getApiKey(providerId);
      sendMessage(text, key, providerId);
    },
    [sendMessage, providerId, getApiKey]
  );

  if (!chatOpen) return null;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className="chat-title">🤖 AI 助手</span>
        <div className="chat-header-actions">
          <ProviderPicker />
          <button className="chat-header-btn" onClick={toggleChat}>
            ✕
          </button>
        </div>
      </div>

      <div className="chat-messages" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="chat-empty">
            <p>👋 你好！我是 AI 助手。</p>
            <p>我可以帮你规划工作流、补充遗漏步骤、优化流程设计。</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-message-avatar">🤖</div>
            <div className="chat-message-content chat-typing">
              <span className="chat-typing-dot" />
              <span className="chat-typing-dot" />
              <span className="chat-typing-dot" />
            </div>
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <ChatSuggestions onSelect={(text) => handleSend(text)} />
      )}

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
