// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className='toolbar' style={{height:'90px'}}>
            <div className='icon-box'> <div> net{'🎯'} </div> <div> {'>'} archer </div> </div>
            <div className ="toolbar-inner" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='customNode' label='Custom' />
                <DraggableNode type='image' label='Image' />
                <DraggableNode type='newText' label='Text' />
                <DraggableNode type='mlModel' label='ML Model' />
                <DraggableNode type='server' label='Server' />
                <DraggableNode type='database' label='Database' />
            </div>
        </div>
    );
};
