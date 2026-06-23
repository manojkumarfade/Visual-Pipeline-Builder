import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { EmptyCanvasGuide } from './components/EmptyCanvasGuide';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { PromptNode } from './nodes/promptNode';
import { FileNode } from './nodes/fileNode';
import { APINode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { ConditionNode } from './nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeAccentColors = {
  customInput: '#3b82f6',
  customOutput: '#22c55e',
  text: '#8b5cf6',
  llm: '#6366f1',
  prompt: '#7c3aed',
  api: '#f97316',
  condition: '#f59e0b',
  transform: '#ec4899',
  file: '#06b6d4',
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  prompt: PromptNode,
  file: FileNode,
  api: APINode,
  transform: TransformNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [theme, setTheme] = useState(
    () => document.body.getAttribute('data-theme') || localStorage.getItem('vs_theme') || 'dark'
  );
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  useEffect(() => {
    const updateTheme = (event) => {
      setTheme(event.detail || document.body.getAttribute('data-theme') || 'dark');
    };

    window.addEventListener('vs_theme_change', updateTheme);
    setTheme(document.body.getAttribute('data-theme') || localStorage.getItem('vs_theme') || 'dark');

    return () => window.removeEventListener('vs_theme_change', updateTheme);
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event?.dataTransfer?.getData('application/reactflow')) {
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    }
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="pipeline-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color={theme === 'light' ? '#cbd5e1' : '#1e293b'} gap={gridSize} />
        <Controls />
        <MiniMap
          nodeColor={(node) => nodeAccentColors[node.type] || '#6366f1'}
          maskColor={theme === 'light' ? 'rgba(248, 250, 252, 0.7)' : 'rgba(15, 23, 42, 0.7)'}
          className="pipeline-minimap"
        />
      </ReactFlow>
      <EmptyCanvasGuide />
    </div>
  );
};
