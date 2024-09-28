// datasetNode.js

import { CustomNode } from "./customNode";
import { useEffect, useState } from "react";

export const DatasetNode = (id, data) => {

    const defaultInput = {"file":"50%"}
    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState(defaultInput)
    
    function onFileChange(e) {
        console.log(e.target.files[0])
        if(e.target.files[0] !== undefined){
            setFile(e.target.files[0])
        } else {
            console.log("Set file null")
            setFile(null)
        }
    }

    useEffect(() => {
        if(file){
            setInputs({})
            console.log("Set null")
        }else setInputs(defaultInput)
    }, [file]);

    const title = "Dataset";
    const body = (<input type="file" onChange={onFileChange} />);
    const outputs = {"records":"33%", "fields":"66%"};

    return CustomNode({id, data, title, inputs, outputs, body});
}