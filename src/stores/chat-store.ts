import { create } from "zustand";
import type { ChatMessage } from "../types/ai-chat";

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;

  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,

  addMessage: (msg) => {
    const full: ChatMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      timestamp: Date.now(),
    };
    set({ messages: [...get().messages, full] });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));
