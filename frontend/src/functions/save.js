// Save.js
import { useReactFlow } from "reactflow";
import { useStore } from "../store";
import { setGraph } from "../modules/connection";

export const SaveButton = () => {
    const reactFlow = useReactFlow();
    const id = useStore((state) => state.id);
    const setID = useStore((state) => state.setID);

    const handleSave = async () => {
        const graph = reactFlow.toObject();
        let new_id = null;
        console.log(id);
        if(id){
            console.log("exists");
            new_id = await setGraph(graph, id);

        }else{
            new_id = await setGraph(graph);
        }

        console.log(new_id);
        setID(new_id);
    }

    return (<>
            <div>
                <button type="submit" style={{background: "rgb(91, 103, 194)"}}  onClick={handleSave}> Save </button>
            </div>
        </>
    );
}
