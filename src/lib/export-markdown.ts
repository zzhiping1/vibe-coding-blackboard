import type { Node, Edge } from "@xyflow/react";
import type { CanvasNodeData } from "../types/canvas";
import { CATEGORY_LABELS } from "../config/theme";

export function exportToMarkdown(
  nodes: Node<CanvasNodeData>[],
  edges: Edge[],
  projectName: string,
  projectDescription: string
): string {
  const now = new Date().toISOString();

  // Find start nodes (no incoming edges)
  const targetIds = new Set(edges.map((e) => e.target));
  const startNodes = nodes.filter((n) => !targetIds.has(n.id));
  const orphans = startNodes.length === 0 && nodes.length > 0 ? [nodes[0]] : startNodes;

  // Topological walk
  const visited = new Set<string>();
  const steps: { node: Node<CanvasNodeData>; stepNum: number; incoming: Edge | undefined }[] = [];

  function walk(nodeId: string, counter: { n: number }) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const incoming = edges.find((e) => e.target === nodeId);
    counter.n++;
    steps.push({ node, stepNum: counter.n, incoming });
    const outgoing = edges.filter((e) => e.source === nodeId);
    for (const edge of outgoing) {
      walk(edge.target, counter);
    }
  }

  const counter = { n: 0 };
  for (const start of orphans) {
    walk(start.id, counter);
  }
  // Any remaining unvisited nodes
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      walk(node.id, counter);
    }
  }

  // Build markdown
  const lines: string[] = [];

  // YAML frontmatter
  lines.push("---");
  lines.push(`project: "${projectName}"`);
  lines.push(`description: "${projectDescription}"`);
  lines.push(`created: "${now}"`);
  lines.push(`canvas_version: 1`);
  lines.push(`stats:`);
  lines.push(`  nodes: ${nodes.length}`);
  lines.push(`  edges: ${edges.length}`);
  lines.push("---");
  lines.push("");

  // Title
  lines.push(`# ${projectName}`);
  lines.push("");

  // Overview
  if (projectDescription) {
    lines.push("## 项目概述 (Project Overview)");
    lines.push(projectDescription);
    lines.push("");
  }

  // Steps
  lines.push("## 工作流程 (Workflow)");
  lines.push("");
  for (const { node, stepNum, incoming } of steps) {
    const d = node.data as unknown as CanvasNodeData;
    const catLabel = CATEGORY_LABELS[d.category] || d.category;
    lines.push(`### 步骤 ${stepNum}: ${d.icon} ${d.label}`);
    lines.push(`- **类型:** ${catLabel} (${d.category})`);
    if (incoming) {
      const sourceNode = nodes.find((n) => n.id === incoming.source);
      const sourceLabel = sourceNode
        ? ((sourceNode.data as unknown as CanvasNodeData).icon + " " + (sourceNode.data as unknown as CanvasNodeData).label)
        : incoming.source;
      lines.push(`- **触发:** ${sourceLabel}${incoming.label ? ` → "${incoming.label}"` : ""}`);
    } else {
      lines.push(`- **触发:** 起始节点`);
    }
    if (d.specs) {
      lines.push(`- **说明:**`);
      d.specs.split("\n").forEach((l: string) => lines.push(`  ${l}`));
    }
    // Outgoing
    const outgoing = edges.filter((e) => e.source === node.id);
    if (outgoing.length > 0) {
      for (const edge of outgoing) {
        const targetNode = nodes.find((n) => n.id === edge.target);
        const targetLabel = targetNode
          ? ((targetNode.data as unknown as CanvasNodeData).icon + " " + (targetNode.data as unknown as CanvasNodeData).label)
          : edge.target;
        lines.push(`- **下一步:** ${targetLabel}${edge.label ? ` ("${edge.label}")` : ""}`);
      }
    }
    lines.push("");
  }

  // Data flow
  if (edges.length > 0) {
    lines.push("## 数据流图 (Data Flow)");
    lines.push("");
    for (const edge of edges) {
      const src = nodes.find((n) => n.id === edge.source);
      const tgt = nodes.find((n) => n.id === edge.target);
      const srcLabel = src ? (src.data as unknown as CanvasNodeData).label : edge.source;
      const tgtLabel = tgt ? (tgt.data as unknown as CanvasNodeData).label : edge.target;
      lines.push(`- ${srcLabel} ${edge.label ? `["${edge.label}"]` : ""} → ${tgtLabel}`);
    }
    lines.push("");
  }

  // Node inventory table
  lines.push("## 节点清单 (Node Inventory)");
  lines.push("");
  lines.push("| # | 名称 | 类型 | 备注 |");
  lines.push("|---|------|------|------|");
  for (const { node, stepNum } of steps) {
    const d = node.data as unknown as CanvasNodeData;
    const catLabel = CATEGORY_LABELS[d.category] || d.category;
    const specsFirst = d.specs ? d.specs.split("\n")[0].slice(0, 40) : "-";
    lines.push(`| ${stepNum} | ${d.icon} ${d.label} | ${catLabel} | ${specsFirst} |`);
  }
  lines.push("");

  // JSON block
  lines.push("## 画布数据 (Canvas Data)");
  lines.push("");
  lines.push("```json");
  lines.push(
    JSON.stringify(
      {
        nodes: nodes.map((n) => ({
          id: n.id,
          type: n.type,
          position: n.position,
          data: n.data,
        })),
        edges: edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          type: e.type,
        })),
      },
      null,
      2
    )
  );
  lines.push("```");

  return lines.join("\n");
}

export function exportToJSON(
  nodes: Node<CanvasNodeData>[],
  edges: Edge[],
  projectName: string,
  projectDescription: string
): string {
  return JSON.stringify(
    {
      project: projectName,
      description: projectDescription,
      canvas_version: 1,
      created: new Date().toISOString(),
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        type: e.type,
      })),
    },
    null,
    2
  );
}
