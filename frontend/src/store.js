// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';


console.log("Creating Store")

// flow - an offline default starting graph when the backend server is down (decent stuff)

let flow = null

export const useStore = create((set, get) => ({
    id: flow?.id || null,
    nodes: flow?.nodes || [],
    edges: flow?.edges || [],

    setID: (new_id) => set((state) => ({ id: new_id })),

    // crazy gymnastics going on here
    resetNodeIDs: () => set({nodeIDs: undefined}),
    resetEdges: () => set({edges: []}),

    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },

    addGroup: (node) => {
        set({
            nodes: [node, ...get().nodes]
        });
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

        set({edges: addEdge({...connection, type: 'custom', 
                markerEnd: {type: MarkerType.ArrowClosed, strokeWidth: 4}, 
                markerStart: {type: MarkerType.ArrowClosed, strokeWidth: 4}, 
                data: { label: "...", anim: false, bi: false}}, 
                get().edges),
            });
    },
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
