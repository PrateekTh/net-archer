// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';


console.log("Creating Store")
// get response from server route into flow (User's entry point)
const url = new URL(window.location.href)
console.log(url.searchParams.get("id"))

const flow = {
    "nodes": [
        {
            "width": 323,
            "height": 133,
            "id": "server-1",
            "type": "server",
            "position": {
                "x": 553,
                "y": 209
            },
            "data": {
                "id": "server-1",
                "nodeType": "server",
                "tag": ""
            },
            "selected": true,
            "positionAbsolute": {
                "x": 553,
                "y": 209
            },
            "dragging": false
        },
        {
            "width": 200,
            "height": 141,
            "id": "client-1",
            "type": "client",
            "position": {
                "x": 184,
                "y": 153
            },
            "data": {
                "id": "client-1",
                "nodeType": "client",
                "tag": ""
            },
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
                "x": 184,
                "y": 153
            }
        }
    ],

    "edges": [
        {
            "source": "client-1",
            "sourceHandle": "client-1-output",
            "target": "server-1",
            "targetHandle": "server-1-system",
            "type": "custom",
            "markerEnd": {
                "type": "arrowclosed",
                "strokeWidth": 4
            },
            "markerStart": {
                "type": "arrowclosed",
                "strokeWidth": 4
            },
            "data": {
                "label": "...",
                "anim": true,
                "bi": false
            },
            "id": "reactflow__edge-client-1client-1-output-server-1server-1-system",
            "selected": false
        }
    ],
    "viewport": {
        "x": 0,
        "y": 0,
        "zoom": 1
    }
};

export const useStore = create((set, get) => ({
    id: flow.id || null,
    nodes: flow.nodes || [],
    edges: flow.edges || [],

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
