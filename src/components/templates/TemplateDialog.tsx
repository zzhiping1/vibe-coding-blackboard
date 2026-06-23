import { DEFAULT_TEMPLATES, type VCBTemplate } from "../../config/default-templates";
import { useCanvasStore } from "../../stores/canvas-store";

interface Props {
  onClose: () => void;
}

export function TemplateDialog({ onClose }: Props) {
  const loadCanvas = useCanvasStore((s) => s.loadCanvas);
  const setProjectName = useCanvasStore((s) => s.setProjectName);

  const handleSelect = (template: VCBTemplate) => {
    loadCanvas(template.nodes, template.edges);
    if (template.id !== "blank") {
      setProjectName(template.name);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">📋 选择模板</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="template-grid">
            {DEFAULT_TEMPLATES.map((t) => (
              <button
                key={t.id}
                className="template-card"
                onClick={() => handleSelect(t)}
              >
                <span className="template-icon">{t.icon}</span>
                <span className="template-name">{t.name}</span>
                <span className="template-desc">{t.description}</span>
                <span className="template-count">{t.nodes.length} 个节点</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
