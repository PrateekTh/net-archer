// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

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
        // Connection is the minimal setup for an edge (Source & target info)
        set({
            // Here it is, each new edge enters with these props
            // Make the type into custom, and add any required details into data
            edges: addEdge({...connection, type: 'custom', 
                markerEnd: {type: MarkerType.ArrowClosed, strokeWidth: 4}, 
                markerStart: {type: MarkerType.ArrowClosed, strokeWidth: 4}, 
                data: { label: "Edit", anim: false, bi: false}}, 
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
