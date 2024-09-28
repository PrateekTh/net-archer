// imageNode.js

import { CustomNode } from "./customNode";

export const ImageNode = (id, data) => {

    const title = "Process Image";
    const body = (
        <select name="image-task">
            <option value={0}> Select a Task </option>
            <option value={1}> Segmentation </option>
            <option value={2}> Feature Extraction </option>
            <option value={3}> Object Detection </option>
        </select>);
    
    const inputs = {"image": "50%"};
    const outputs = {"image":"33%", "object":"66%"};

    return CustomNode({id, data, title, inputs, outputs, body});
}