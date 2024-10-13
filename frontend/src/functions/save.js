// Save.js
import { useReactFlow } from "reactflow";
import { useStore } from "../store";
import { setGraph } from "../modules/connection";
import { useState, useEffect } from 'react';
import { Alert } from "./alert";

const saveSuccessMessage = "Saved to Database!"
const saveFailMessage = "Unable to reach server 🤖"

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
            // console.log(id);
            new_id = await setGraph(graph, id).then(
                res => {
                    if(res) setAlert(saveSuccessMessage);
                    else setAlert(saveFailMessage);
                    return res;
                }
            )
        }else{
            new_id = await setGraph(graph).then(
                res => {
                    if(res) setAlert(saveSuccessMessage);
                    else setAlert(saveFailMessage);
                    return res;
                }
            );
        }

        setID(new_id?.result_id);
    }

    return (<>
            <div>
                <button type="submit" onClick={handleSave}> Save </button>
                {alert && Alert({type: 'text', message: alert})}
            </div>
        </>
    );
}
