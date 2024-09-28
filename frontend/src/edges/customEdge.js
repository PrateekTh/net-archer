import React, {useState } from 'react';
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    useReactFlow,
} from 'reactflow';




export const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
}) => {



    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // build the component to set properties for the baseEdge, with the custom label
    // custom label settings contains: + 3-option toggle : bi-directional - left to right - right to left; + animated or not; + delete btn
    if(!data.reverse) data.reverse = false;

    const [anim, setAnim] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [reverseDirection, setReverseDirection] = useState(data.reverse);
    const { setEdges } = useReactFlow();

    function onDelete(){
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }

    function onToggleAnimation(){
        setAnim(!anim);
        // console.log(anim);
    }

    function onSwapDirection(){
        
    }

    function onLabelChange(e){
        data.label = e.currentTarget.innerHTML;
        // console.log(data);
    }

    function onClickSettings(e){
        setShowSettings(e.currentTarget.checked);
        // console.log(showSettings)
    }

    return (
        <>
            <BaseEdge id={id} path={edgePath} 
                style={{
                    strokeOpacity: 0.6,
                }}
            />

            {[...Array(15)].map((x, i) =>{
                if(anim) return( <circle key={i} r="2" fill="#6DB1BF"><animateMotion dur="4s" begin={`${i/3}s`} repeatCount="indefinite" path={edgePath} /></circle>)}
            )}

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY - 15}px)`,
                        padding: 10,
                        paddingY: 1,
                        borderRadius: 5,
                        fontSize: 12,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                    contentEditable
                    html={data.label}

                    onInput={(e)=>onLabelChange(e)}
                >
                </div>
                
                
                <div className='edge-tools'>
                    <div className='reveal-btn'>
                        <input style={{
                            position: 'absolute',
                            background: "red",
                            transform: `translate(-75%, -50%) translate(${labelX}px,${labelY + 15}px)`,
                            pointerEvents: 'all'
                        }}

                        checked={showSettings}
                        onChange={onClickSettings}
                        type='checkbox'/>
                    </div>
                    {
                        showSettings &&
                        <div className="edge-btns" style={{
                                    position: 'absolute',
                                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY + 40}px)`,
                                    display: 'flex'
                                    }}>
                            <div
                                style={{
                                    backgroundColor: '#F39A9D',
                                    padding: 5,
                                    margin: 2,
                                    borderRadius: 20,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    pointerEvents: 'all',
                                    cursor: 'pointer'
                                }}
                                onClick={onDelete}
                            > ⨯ </div>

                            <div
                                style={{
                                    backgroundColor: '#6DB1BF',
                                    padding: 5,
                                    margin: 2,
                                    borderRadius: 20,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    pointerEvents: 'all',
                                    cursor: 'pointer'

                                }}
                                onClick={onToggleAnimation}
                            > Animate</div> 
                        </div>
                    }

                </div>


            
                
            </EdgeLabelRenderer>
        </>
    );
};