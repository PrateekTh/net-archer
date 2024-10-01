// functionNode.js

import { CustomNode } from "./customNode";
import { useState } from "react";
import { adjustTextBox } from "../modules/textarea";

export const FunctionNode = (id, data) => {

    // const defaultInput = {"file":"50%"}

    const [file, setFile] = useState(null);
    
    function onFileChange(e) {
        console.log(file)
        if(e.target.files[0] !== undefined){
            setFile(e.target.files[0])
        } else {
            setFile(null)
        }
    }

    const title = "Custom Function";
    const body = (<>
    <input type="file" accept=".js, .jsx, .cpp, .c, .py, .lua, .ts" onChange={onFileChange} />
    <textarea className="text-box" name="user_func" onChange={(e) => adjustTextBox(e.target)}>

    </textarea>
    </>
    );

    const inputs = {"args": "50%"}
    const outputs = {"records":"33%", "fields":"66%"};

    return CustomNode({id, data, title, inputs, outputs, body});
}