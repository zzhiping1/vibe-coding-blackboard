import { useState, useEffect } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Canvas } from "./components/canvas/Canvas";
import { CanvasToolbar } from "./components/canvas/CanvasToolbar";
import { Palette } from "./components/palette/Palette";
import { PropertiesPanel } from "./components/properties/PropertiesPanel";
import { ExportDialog } from "./components/export/ExportDialog";
import { ChatPanel } from "./components/chat/ChatPanel";
import { TemplateDialog } from "./components/templates/TemplateDialog";
import { ToastContainer } from "./components/ui/Toast";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useCanvasStore } from "./stores/canvas-store";

const STORAGE_KEY = "vcb-autosave";

function loadAutoSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.nodes?.length > 0 || data.edges?.length > 0) return data;
    }
  } catch {}
  return null;
}

function saveAutoSave() {
  try {
    const s = useCanvasStore.getState();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ nodes: s.nodes, edges: s.edges, projectName: s.projectName })
    );
  } catch {}
}

export default function App() {
  useKeyboardShortcuts();
  const [showExport, setShowExport] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const loadCanvas = useCanvasStore((s) => s.loadCanvas);
  const setProjectName = useCanvasStore((s) => s.setProjectName);

  // Auto-load on mount (only if no data yet)
  useEffect(() => {
    const hasData = useCanvasStore.getState().nodes.length > 0;
    if (!hasData) {
      const saved = loadAutoSave();
      if (saved) {
        if (saved.nodes?.length > 0) loadCanvas(saved.nodes, saved.edges || []);
        if (saved.projectName) setProjectName(saved.projectName);
      }
    }
  }, []);

  // Auto-save on change
  useEffect(() => {
    saveAutoSave();
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div className="app">
        <CanvasToolbar
          onExport={() => setShowExport(true)}
          onTemplate={() => setShowTemplate(true)}
        />
        <div className="app-body">
          <Palette />
          <Canvas />
          <PropertiesPanel />
          <ChatPanel />
        </div>
        {showExport && <ExportDialog onClose={() => setShowExport(false)} />}
        {showTemplate && <TemplateDialog onClose={() => setShowTemplate(false)} />}
        <ToastContainer />
      </div>
    </ReactFlowProvider>
  );
}
