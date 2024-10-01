import React, {useState } from 'react';
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    useReactFlow,
    addEdge,
    MarkerType,
} from 'reactflow';

export const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    selected,
    markerEnd,
    markerStart,
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

    const [bi, setBi] = useState(data.bi);
    const [anim, setAnim] = useState(data.anim);
    const [label, setLabel] = useState(data.label);
    const { getEdge, getEdges, setEdges } = useReactFlow();

    function onDelete(){
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }

    function onToggleAnimation(){
        data.anim = !anim;
        setAnim(!anim);
    }

    function onLabelChange(e){
        setLabel(e.currentTarget.innerHTML);
        data.label = e.currentTarget.innerHTML;
        // console.log(data);
    }

    function onToggleBi(){
        data.bi = !bi;
        setBi(!bi);
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

        //add the new, reversed temp edge
        edges = addEdge(temp, edges);

        //set new edges, deleting the current edge
        setEdges(() => edges.filter((edge) => edge.id !== id));
    }

    return (
        <>
            <BaseEdge id={id} path={edgePath} style={{strokeOpacity: 0.5}} markerEnd={markerEnd} markerStart={data.bi? markerStart:""} />

            {[...Array(15)].map((x, i) =>{
                if(anim) return <circle key={i} r="2" fill="#6DB1BF"><animateMotion dur="4s" begin={`${i/3}s`} repeatCount="indefinite" path={edgePath} /></circle>}
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
                    dangerouslySetInnerHTML= {{__html: label}}
                    onBlur={(e)=>onLabelChange(e)}
                    spellCheck={false}
                    suppressContentEditableWarning={true}
                >
                </div>                
                
                <div className='edge-tools' style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY + 25}px)`,
                }}>
                    {
                        selected &&
                        <div className="edge-btn-box" style={{display: 'flex'}}>
                            <div className='edge-btn'
                                style={{backgroundColor: '#F39A9D',padding: 10}}
                                onClick={onDelete}
                            >  </div>
                            
                            <div className='edge-btn'
                                style={{backgroundColor: '#6DB1BF'}}
                                onClick={onToggleAnimation}
                            > Animate
                            </div> 

                            <div className='edge-btn'
                                style={{backgroundColor: '#6DB1BF'}}
                                onClick={onReverse}
                            > Rev
                            </div> 

                            <div className='edge-btn'
                                style={{backgroundColor: '#6DB1BF'}}
                                onClick={onToggleBi}
                            > {'<>'}
                            </div> 
                        </div>
                    }
                </div>

            </EdgeLabelRenderer>
        </>
    );
};