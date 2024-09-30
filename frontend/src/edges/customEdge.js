import React, {useState } from 'react';
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    useReactFlow,
    addEdge,
} from 'reactflow';

export const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    selected,
    animated,
    sourcePosition,
    targetPosition,
    data }) => {

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

    const [anim, setAnim] = useState(false);
    const { getEdge, getEdges, setEdges } = useReactFlow();

    function onDelete(){
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }

    function onToggleAnimation(){
        setAnim(!anim);
    }

    function onLabelChange(e){
        data.label = e.currentTarget.innerHTML;
        // console.log(data);
    }

    function onReverse(){
        let edge = getEdge(id);
        let temp = {...edge};
        temp.source = edge.target;
        temp.sourceHandle = edge.targetHandle;
        temp.target = edge.source;
        temp.targetHandle = edge.sourceHandle;
        temp.id = `reactflow__edge-${temp.source}${temp.sourceHandle}-${temp.target}${temp.targetHandle}`;
        
        let edges = getEdges();
        edges = addEdge(temp, edges);

        edges.filter((e) => e.id !== id);
        setEdges(() => edges.filter((edge) => edge.id !== id));
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
                
                <div className='edge-tools' style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY + 25}px)`,
                }}>
                    {
                        selected &&
                        <div className="edge-btns" style={{
                                   
                                    display: 'flex'
                                    }}>
                            <div
                                style={{
                                    backgroundColor: '#F39A9D',
                                    padding: 10,
                                    margin: 2,
                                    borderRadius: 20,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    pointerEvents: 'all',
                                    cursor: 'pointer'
                                }}
                                onClick={onDelete}
                            >  </div>
                            
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
                            > Animate
                            </div> 

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
                                onClick={onReverse}
                            > Reverse
                            </div> 
                        </div>
                    }
                </div>

            </EdgeLabelRenderer>
        </>
    );
};