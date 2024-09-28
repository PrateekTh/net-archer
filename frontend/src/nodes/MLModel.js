// MLModel.js

import { CustomNode } from "./customNode";

export const MLNode = (id, data) => {

    const title = "ML Model";
    const body = (<select name="model-type">
        <option value={0}> Select a Model </option>
        <option value={1}> Linear Regression </option>
        <option value={2}> Logistic Regression </option>
        <option value={3}> Cluster Analysis </option>
    </select>);
    const inputs = {"dataset": "50%"};
    const outputs = {"output":"33%", "result":"66%"};

    return CustomNode({id, data, title, inputs, outputs, body});
}