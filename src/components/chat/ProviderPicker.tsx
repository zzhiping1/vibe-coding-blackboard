import { useState, useRef, useEffect } from "react";
import { AI_PROVIDERS, PROVIDER_CATEGORIES, type AIProvider } from "../../config/providers";
import { useSettingsStore } from "../../stores/settings-store";

export function ProviderPicker() {
  const [open, setOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(false);
  const [testState, setTestState] = useState<"idle" | "testing" | "ok" | "fail">("idle");
  const [testMsg, setTestMsg] = useState("");
  const providerId = useSettingsStore((s) => s.providerId);
  const setProviderId = useSettingsStore((s) => s.setProviderId);
  const setApiKey = useSettingsStore((s) => s.setApiKey);
  const apiKeys = useSettingsStore((s) => s.apiKeys);
  const ref = useRef<HTMLDivElement>(null);
  const keyInputRef = useRef<HTMLInputElement>(null);

  const current = AI_PROVIDERS.find((p) => p.id === providerId) || AI_PROVIDERS[0];
  const currentKey = apiKeys[providerId] || "";

  const handleTest = async () => {
    if (!currentKey.trim() && current.id !== "ollama") return;
    setTestState("testing");
    setTestMsg("");

    // 优先用 Tauri 后端
    const w = window as any;
    const invokeFn = w.__TAURI__?.core?.invoke;
    if (invokeFn) {
      try {
        const result: string = await invokeFn("test_provider", {
          apiKey: currentKey.trim(),
          baseUrl: current.baseURL,
          model: current.defaultModel,
          authStyle: current.headerFormat,
        });
        setTestState("ok");
        setTestMsg(result);
      } catch (err: any) {
        setTestState("fail");
        setTestMsg(err?.message || String(err));
      }
      return;
    }

    // 浏览器模式：直接 fetch 测试
    try {
      const url = `${current.baseURL.replace(/\/$/, "")}/v1/messages`;
      const headers: Record<string, string> = {
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
      };
      if (current.headerFormat === "bearer") {
        headers["authorization"] = `Bearer ${currentKey.trim()}`;
      } else if (current.headerFormat === "api-key") {
        headers["x-api-key"] = currentKey.trim();
      }

      const resp = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: current.defaultModel,
          max_tokens: 10,
          messages: [{ role: "user", content: "hi" }],
        }),
      });

      if (resp.ok) {
        setTestState("ok");
        setTestMsg("连接成功");
      } else {
        const data = await resp.json().catch(() => ({}));
        const msg = data?.error?.message || data?.message || resp.statusText;
        setTestState("fail");
        setTestMsg(`HTTP ${resp.status} — ${msg}`);
      }
    } catch (err: any) {
      setTestState("fail");
      setTestMsg(err?.message || "网络请求失败，可能是 CORS 限制");
    }
  };

  // dropdown 打开时自动聚焦 API Key 输入框
  useEffect(() => {
    if (open && current.id !== "ollama") {
      setTimeout(() => keyInputRef.current?.focus(), 50);
    }
  }, [open, current.id]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="provider-picker" ref={ref}>
      <button className="provider-trigger" onClick={() => setOpen(!open)}>
        <span className="provider-trigger-icon">{current.icon}</span>
        <span className="provider-trigger-name">{current.name}</span>
        <span className="provider-trigger-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="provider-dropdown">
          {/* API Key 编辑区 */}
          <div className="provider-key-section">
            <label className="provider-key-label">
              API Key {current.id === "ollama" ? "（无需填写）" : ""}
            </label>
            {current.id !== "ollama" && (
              <>
                <div className="provider-key-row">
                  <input
                    ref={keyInputRef}
                    type={editingKey ? "text" : "password"}
                    className="provider-key-input"
                    value={currentKey}
                    onChange={(e) => setApiKey(providerId, e.target.value)}
                    placeholder="粘贴 API Key..."
                  />
                  <button
                    className="provider-key-toggle"
                    onClick={() => setEditingKey(!editingKey)}
                  >
                    {editingKey ? "🙈" : "👁️"}
                  </button>
                </div>
                <button
                  className={`provider-test-btn ${testState === "ok" ? "provider-test-btn--ok" : ""} ${testState === "fail" ? "provider-test-btn--fail" : ""}`}
                  onClick={handleTest}
                  disabled={testState === "testing" || (!currentKey.trim())}
                >
                  {testState === "testing" ? "⏳ 测试中..." : testState === "ok" ? "✅ 连接成功" : testState === "fail" ? "❌ 连接失败" : "🔗 测试连接"}
                </button>
                {testMsg && testState === "fail" && (
                  <span className="provider-test-error">{testMsg}</span>
                )}
              </>
            )}
            {current.apiKeyUrl && (
              <a
                className="provider-key-link"
                href={current.apiKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                前往 {current.name} 获取 API Key ↗
              </a>
            )}
          </div>

          <div className="provider-divider" />

          {/* 供应商列表 */}
          {PROVIDER_CATEGORIES.map((cat) => {
            const providers = AI_PROVIDERS.filter((p) => p.category === cat.id);
            if (providers.length === 0) return null;
            return (
              <div key={cat.id} className="provider-group">
                <div className="provider-group-label">{cat.label}</div>
                {providers.map((p) => (
                  <button
                    key={p.id}
                    className={`provider-option ${p.id === providerId ? "provider-option--active" : ""}`}
                    onClick={() => {
                      setProviderId(p.id);
                      setEditingKey(false);
                      setTestState("idle");
                      setTestMsg("");
                    }}
                  >
                    <span className="provider-option-icon">{p.icon}</span>
                    <div className="provider-option-info">
                      <span className="provider-option-name">{p.name}</span>
                      <span className="provider-option-desc">{p.description}</span>
                    </div>
                    {p.id === providerId && <span className="provider-option-check">✓</span>}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
