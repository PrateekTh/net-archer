// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className='toolbar' style={{height:'90px'}}>
            <div className='icon-box'> <div> net{'🎯'} </div> <div> {'>'} archer </div> </div>
            <div className ="toolbar-inner" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customNode' label='Custom' />
                <DraggableNode type='image' label='Image' />
                <DraggableNode type='newText' label='Text' />
                <DraggableNode type='mlModel' label='ML Model' />
                <DraggableNode type='server' label='Server' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='client' label='Client' />
                <DraggableNode type='table' label='Table' />
                <DraggableNode type='loadBalancer' label='Load Balancer' />
                <DraggableNode type='utility' label='Utility' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='group' label='Group' />
            </div>
        </div>
    );
};
