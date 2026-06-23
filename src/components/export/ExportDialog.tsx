import { useState } from "react";
import { useCanvasStore } from "../../stores/canvas-store";
import { exportToMarkdown, exportToJSON } from "../../lib/export-markdown";

interface Props {
  onClose: () => void;
}

export function ExportDialog({ onClose }: Props) {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const projectName = useCanvasStore((s) => s.projectName);
  const projectDescription = useCanvasStore((s) => s.projectDescription);
  const [format, setFormat] = useState<"markdown" | "json">("markdown");
  const [copied, setCopied] = useState(false);

  const content =
    format === "markdown"
      ? exportToMarkdown(nodes, edges, projectName, projectDescription)
      : exportToJSON(nodes, edges, projectName, projectDescription);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === "markdown" ? "vcb.md" : "vcb.json";
    const mime = format === "markdown" ? "text/markdown" : "application/json";
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">📤 导出工作流</span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="export-format-toggle">
            <button
              className={`export-format-btn ${format === "markdown" ? "export-format-btn--active" : ""}`}
              onClick={() => setFormat("markdown")}
            >
              📝 Markdown (.vcb.md)
            </button>
            <button
              className={`export-format-btn ${format === "json" ? "export-format-btn--active" : ""}`}
              onClick={() => setFormat("json")}
            >
              📦 JSON (.vcb.json)
            </button>
          </div>
          <div className="export-preview">
            <pre>{content}</pre>
          </div>
        </div>
        <div className="modal-footer">
          <button className="toolbar-btn" onClick={handleCopy}>
            {copied ? "✅ 已复制" : "📋 复制"}
          </button>
          <button className="toolbar-btn" onClick={handleDownload}>
            💾 下载文件
          </button>
        </div>
      </div>
    </div>
  );
}
