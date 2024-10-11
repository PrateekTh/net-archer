// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Panel, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { useShallow } from 'zustand/shallow';

import { LLMNode, CustomNode, ImageNode, MLNode, ServerNode, DatabaseNode, ClientNode, TableNode, LoadBalancerNode, UtilityNode, NoteNode, GroupNode, FunctionNode} from './nodes/nodebase';
import { CustomEdge } from './edges/customEdge'

import 'reactflow/dist/style.css';

import { InitLoader, SaveButton, ClearButton, SubmitButton, ShareButton } from './functions/index'

const gridSize = 15;
const proOptions = { hideAttribution: true };
const nodeTypes = {
    llm: LLMNode,
    customNode: CustomNode,
    image: ImageNode,
    mlModel: MLNode,
    function : FunctionNode,
    server: ServerNode,
    database: DatabaseNode,
    client: ClientNode,
    table: TableNode,
    loadBalancer: LoadBalancerNode,
    utility: UtilityNode,
    note: NoteNode,
    group: GroupNode
};

const edgeTypes = {
    custom: CustomEdge,
    default: 'default',
}

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    addGroup: state.addGroup,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addGroup
    } = useStore( useShallow(selector));

    const getInitNodeData = (nodeID, type) => {
        let nodeData = { id: nodeID, nodeType: `${type}`};
        return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
        
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData('application/reactflow')) {
                const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
                const type = appData?.nodeType;
        
                // check if the dropped element is valid
                if (typeof type === 'undefined' || !type) {
                    return;
                }
        
                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };
                
                if (type == 'group') addGroup(newNode);
                else addNode(newNode);
            }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        {/* Main Container */}
        <div ref={reactFlowWrapper} style={{  flex: "1 1 auto"}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='default'
                connectionMode='loose'
                deleteKeyCode={["Delete", "Backspace"]}
            >
                <Background id='1' color="#999" gap={20} variant={BackgroundVariant.Dots} />
                <Background id='2' color="#aaa" gap={100} variant={BackgroundVariant.Cross} />

                <Controls />
                <MiniMap />
                <Panel className='function-pane' position="top-right">
                    <InitLoader/>
                    <ClearButton/>
                    {/* <SubmitButton/> */}
                    <SaveButton/>
                    <ShareButton/>
                </Panel>
            </ReactFlow>
        </div>
        </>
    )
}
