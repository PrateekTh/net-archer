// submit.js
import { backend_root } from "../vars";
import { useState, useEffect } from "react";
import { useReactFlow } from "reactflow";
import { Alert } from "./alert";

export const SubmitButton = () => {
    const reactFlow = useReactFlow();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setTimeout(()=> setAlert(null), 6000)
    }, [alert]);

    const handleSubmit = async () => {
        const result = reactFlow.toObject();
        console.log(result)
        try{
            const endpoint = backend_root + "/graph/parse";
            const response = await fetch(endpoint, {
                method:'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(result)
            })
            .then(response => response.json())
            .then(response => JSON.stringify(response))

            const obj = JSON.parse(response)
            setAlert(obj)
            // console.log(obj);
        }catch(error){
            console.log(error);
        }
    }

    return (<>
            <div>
                <button type="submit" onClick={handleSubmit}> Submit </button>
            </div>
            {alert && Alert({type: 'validate', message: alert})}
        </>
    );
}
