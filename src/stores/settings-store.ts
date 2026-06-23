import { create } from "zustand";
import { AI_PROVIDERS } from "../config/providers";

const STORAGE_KEY = "vcb-ai-settings";

interface SettingsState {
  providerId: string;
  apiKeys: Record<string, string>;
  setProviderId: (id: string) => void;
  setApiKey: (providerId: string, key: string) => void;
  getApiKey: (providerId?: string) => string;
  getBaseURL: () => string;
}

function load(): { providerId: string; apiKeys: Record<string, string> } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        providerId: data.providerId || "anthropic",
        apiKeys: data.apiKeys || {},
      };
    }
  } catch {}
  // migration: read old anthropic-only key
  const legacyKey = localStorage.getItem("vcb-anthropic-api-key") || "";
  return {
    providerId: "anthropic",
    apiKeys: legacyKey ? { anthropic: legacyKey } : {},
  };
}

function save(state: { providerId: string; apiKeys: Record<string, string> }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...load(),

  setProviderId: (id) => {
    set({ providerId: id });
    const s = get();
    save({ providerId: id, apiKeys: s.apiKeys });
  },

  setApiKey: (providerId, key) => {
    set((state) => ({
      apiKeys: { ...state.apiKeys, [providerId]: key },
    }));
    const s = get();
    save({ providerId: s.providerId, apiKeys: { ...s.apiKeys, [providerId]: key } });
  },

  getApiKey: (providerId) => {
    const id = providerId || get().providerId;
    return get().apiKeys[id] || "";
  },

  getBaseURL: () => {
    const provider = AI_PROVIDERS.find((p) => p.id === get().providerId);
    return provider?.baseURL || "https://api.anthropic.com";
  },
}));
