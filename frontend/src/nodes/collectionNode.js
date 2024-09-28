// collectionNode.js

import { CustomNode } from "./customNode";

export const CollectionNode = (id, data) => {

    const title = "Collection";
    const body = (<input type="file" multiple webkitdirectory={"true"}  />);
    const inputs = {};
    const outputs = {"File List":"50%"};

    return CustomNode({id, data, title, inputs, outputs, body});
}