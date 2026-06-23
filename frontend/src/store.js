// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

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

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      const sourceNode = get().nodes.find((node) => node.id === connection.source);
      const edgeColor = nodeAccentColors[sourceNode?.type] || '#6366f1';

      set({
        edges: addEdge({
          ...connection,
          type: 'smoothstep',
          animated: true,
          className: 'pipeline-edge',
          style: { stroke: edgeColor, strokeWidth: 3 },
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px', color: edgeColor },
        }, get().edges),
      });
    },
    deleteSelected: () => {
      set((state) => {
        const deletedIds = new Set(state.nodes.filter(n => n.selected).map(n => n.id));
        return {
          nodes: state.nodes.filter(n => !n.selected),
          edges: state.edges.filter(e =>
            !e.selected &&
            !deletedIds.has(e.source) &&
            !deletedIds.has(e.target)
          ),
        };
      });
    },
    clearCanvas: () => set({ nodes: [], edges: [] }),
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
