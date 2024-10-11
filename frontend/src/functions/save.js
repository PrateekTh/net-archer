// Save.js
import { useReactFlow } from "reactflow";
import { useStore } from "../store";
import { setGraph } from "../modules/connection";
import { useState, useEffect } from 'react';
import { Alert } from "./alert";


export const SaveButton = () => {
    const reactFlow = useReactFlow();
    const id = useStore((state) => state.id);
    const setID = useStore((state) => state.setID);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setTimeout(()=> setAlert(null), 6000)
    }, [alert]);

    const handleSave = async () => {
        const graph = reactFlow.toObject();
        let new_id = null;
        console.log(graph);
        if(id){
            // console.log("exists");
            new_id = await setGraph(graph, id);

        }else{
            new_id = await setGraph(graph);
        }

        // console.log(new_id);
        setAlert("Saved to Database!")
        setID(new_id);
    }

    return (<>
            <div>
                <button type="submit" onClick={handleSave}> Save </button>
                {alert && Alert({type: 'text', message: alert})}
            </div>
        </>
    );
}
