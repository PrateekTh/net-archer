// outputNode.js

import { CustomNode } from "./customNode";

export const OutputNode = (id, data) => {
    const title = "Output";
    const inputs = {"": "50%"};
    const outputs = {};

    const body = (
        <select name="image-task">
            <option value="">Select a Type</option>
            <option value="Text">Text</option>
            <option value="File">Image</option>
        </select>);
        
    return CustomNode({id, data, title, inputs, outputs, body});
}