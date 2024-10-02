import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

export const DatabaseNode = ({id, data, position}) => {
    const title = "Database";
    const inputs = {"": "50%"};
    const outputs = {"output":"50%"};

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");


    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
        // console.log(data)
    }

    const body = (
            <><textarea 
                className='text-box'
                ref={tagBox}
                style={{backgroundColor: 'transparent', borderWidth:'1px', margin:'5px', width:'120px'}}
                onChange={onDescriptionChange}
                rows={1}
                value={tag}
            ></textarea>

            <select name="image-task" onChange={(e)=> data.task = e.target.value} style={{width:'140px'}}>
                <option value="">Select a Type</option>
                <option value="rel">Relational</option>
                <option value="sql">SQL</option>
                <option value="tim">Time Series</option>
            </select>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}