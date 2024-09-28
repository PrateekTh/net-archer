//inputNode.js

import { CustomNode } from "./customNode";

export const InputNode = (id, data) => {

    const title = "Input";
    const body = (
        <select name="image-task">
            <option value="">Select a Type</option>
            <option value="Text">Text</option>
            <option value="File">File</option>
        </select>);
    
    const inputs = {};
    const outputs = {" ": "50%"};

    return CustomNode({id, data, title, inputs, outputs, body});
}