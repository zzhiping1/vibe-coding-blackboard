import { CheckCircle, XCircle, Info } from "lucide-react";
import { useToastStore } from "../../stores/toast-store";

const TOAST_ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
} as const;

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => {
        const Icon = TOAST_ICONS[t.type];
        return (
          <div
            key={t.id}
            className={`toast toast--${t.type}`}
            onClick={() => removeToast(t.id)}
          >
            <Icon size={16} className="toast-icon" />
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
