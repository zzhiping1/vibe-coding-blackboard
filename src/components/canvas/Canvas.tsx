import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCanvasStore } from "../../stores/canvas-store";
import { recordRecentUsage } from "../palette/Palette";
import { useUIStore } from "../../stores/ui-store";
import { nodeTypes } from "../nodes";
import { edgeTypes } from "../edges";
import type { NodeDefinition } from "../../types/node-palette";

export function Canvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const onNodesChange = useCanvasStore((s) => s.onNodesChange);
  const onEdgesChange = useCanvasStore((s) => s.onEdgesChange);
  const addNodeFromPalette = useCanvasStore((s) => s.addNodeFromPalette);
  const addEdge = useCanvasStore((s) => s.addEdge);
  const selectNode = useUIStore((s) => s.selectNode);
  const selectEdge = useUIStore((s) => s.selectEdge);
  const clearSelection = useUIStore((s) => s.clearSelection);
  const rfInstance = useRef<any>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("application/vcb-node");
      if (!data) return;

      const definition: NodeDefinition = JSON.parse(data);

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds || !rfInstance.current) return;

      const position = rfInstance.current.screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      addNodeFromPalette(definition, position);
      recordRecentUsage(definition.id);
    },
    [addNodeFromPalette]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: any) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: any) => {
      selectEdge(edge.id);
    },
    [selectEdge]
  );

  const onPaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const onConnect = useCallback(
    (connection: any) => {
      addEdge(connection);
    },
    [addEdge]
  );

  const isEmpty = nodes.length === 0;

  return (
    <div className="canvas-wrapper" ref={reactFlowWrapper}>
      {isEmpty && (
        <div className="canvas-empty-state">
          <div className="canvas-empty-icon">🎨</div>
          <div className="canvas-empty-title">开始你的 Vibe Coding</div>
          <div className="canvas-empty-tips">
            <div>从左侧面板拖拽组件到画布</div>
            <div>或选择一个模板快速开始</div>
            <div>也可以让 AI 助手帮你搭建</div>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={(instance) => { rfInstance.current = instance; }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        elevateNodesOnSelect={false}
        deleteKeyCode={null}
        multiSelectionKeyCode="Shift"
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
          style: { strokeWidth: 2, stroke: "#64748b" },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 20, height: 20 },
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e0e0e0" />
        <Controls position="bottom-left" />
        <MiniMap
          position="bottom-left"
          style={{ marginLeft: 60 }}
          nodeColor={(node) => {
            const data = node.data as any;
            return data?.color || "#ccc";
          }}
        />
      </ReactFlow>
    </div>
  );
}
