export interface ExportOptions {
  format: "markdown" | "json";
  projectName: string;
  projectDescription: string;
  includeCanvasData: boolean;
}

export interface ExportData {
  project: string;
  description: string;
  created: string;
  modified: string;
  canvas_version: number;
  stats: {
    nodes: number;
    edges: number;
  };
}
