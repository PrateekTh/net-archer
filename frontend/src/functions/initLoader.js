// submit.js
import { useReactFlow } from "reactflow";
import { useEffect } from "react";
import { getGraph } from "../modules/connection";
import { useStore } from "../store";
import { useShallow } from 'zustand/shallow';


const selector = (state) => ({
    id: state.id,
    setID: state.setID,
    getNodeID: state.getNodeID,
    resetNodeIDs: state.resetNodeIDs,
    resetEdges: state.resetEdges
});

export const InitLoader = () => {

    const reactFlow = useReactFlow();
    const {
        id,
        setID,
        getNodeID,
        resetNodeIDs,
        resetEdges,
    } = useStore( useShallow(selector));

    useEffect(() => {
        //clean up current graph before making request
        resetNodeIDs();
        resetEdges();
        //network requests for initial data

        // the below part is to be refactored, since the current graph must be cleaned up *only* after the backend graph has been recieved.
        // currently, this hasn't been done in order to avoid a re-render, but it is quite justified in the long run (as more features arrive), based on the above argument.
        getGraph().then(
            res => {
                if(res){
                    // update new nodeID count
                    res.data.nodes.map((el) => getNodeID(el.type));

                    //set data
                    reactFlow.setNodes(res.data.nodes);
                    reactFlow.setEdges(() => res.data.edges);
                    setID(res.data.id);
                }else console.log("No response from server")
            }
        );
    }, []);

    return (<></>);
}
