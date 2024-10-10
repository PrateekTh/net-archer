import { memo, useState } from 'react';
import { NodeResizeControl } from 'reactflow';

const controlStyle = {
    background: 'transparent',
    border: 'none',
};

function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="rgba(31, 197, 168, 0.6)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', right: 5, bottom: 5 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}
  

export const GroupNode = memo(({id, data, selected}) => {
    const [color, setColor] = useState(data?.color || "#FFFFFF");

    function onColorChange(e){
        setColor(e.target.value);
        data.color = e.target.value;
    }

    const body = (
        <>
            <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
                <ResizeIcon />
            </NodeResizeControl>
                
            <input type="color" style={{position:'absolute', left: "10px", top:"10px", width:"20px", height:"20px", padding:"none"}} className="group-color-input" value={color} onChange={onColorChange}/>

            <div 
            style={{
                width:"100%",
                height:"100%",
                background:color + "20",
            }}>
            </div>

        </>);
        
    return body;
})