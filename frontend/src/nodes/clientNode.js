import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

export const ClientNode = ({id, data}) => {
    const title = "Client";
    const inputs = {};
    const outputs = {"output":"50%"};

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");

    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
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

            <select name="client-type" onChange={(e)=> data.type = e.target.value} style={{width:'140px'}}>
                <option value="">Select Type</option>
                <option value="rel">Browser</option>
                <option value="sql">Android</option>
                <option value="sql">iOS</option>
                <option value="tim">Other</option>
            </select>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}