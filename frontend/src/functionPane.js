// submit.js
import { useReactFlow } from "reactflow";
import { useEffect } from "react";
import { getGraph } from "./modules/connection";

export const FunctionPane = () => {

    const reactFlow = useReactFlow();

    useEffect(() => {
        //network requests for initial data
        let graph = getGraph().then(
            res => {
                if(res){
                    console.log(res)
                    reactFlow.setNodes(res.data.nodes);
                    reactFlow.setEdges(res.data.edges);
                }else console.log("Null response from server")
            }
        );
    }, []);

    return (
        <>
        </>
    );
}
