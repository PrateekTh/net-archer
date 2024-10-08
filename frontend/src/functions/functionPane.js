// submit.js
import { useReactFlow } from "reactflow";
import { useEffect } from "react";
import { getGraph } from "../modules/connection";
import { useStore } from "../store";

export const FunctionPane = () => {

    const id = useStore((state) => state.id)
    const reactFlow = useReactFlow();
    const setID = useStore((state)=> state.setID)

    useEffect(() => {
        //network requests for initial data
        let graph = getGraph().then(
            res => {
                if(res){
                    console.log(res)

                    // bug is here, the node ids aren't updated according to the zustand store
                    reactFlow.setNodes(res.data.nodes);
                    
                    reactFlow.setEdges(res.data.edges);
                    setID(res.data.id);
                }else console.log("Null response from server")
            }
        );
    }, []);

    return (
        <>
        </>
    );
}
