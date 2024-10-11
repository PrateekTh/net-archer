import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";
import { ClientIcon } from "./icons/nodeIcons";

const title = "Client";
const inputs = {};
const outputs = {"":"50%"};

export const ClientNode = ({id, data}) => {

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");
    const [option, setOption] = useState(data?.option || "");

    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
    }

    function onSelectChange(e){
        setOption(e.target.value)
        data.option = e.target.value;
        // console.log(data)
    }

    const body = (
        <>
            
            <div className="node-icon" style={{position: "absolute", top: "-10px", left:"130px"}}>
                <ClientIcon />
            </div>
            
            <textarea 
                className='text-box'
                ref={tagBox}
                style={{backgroundColor: 'transparent', borderWidth:'1px', margin:'5px', width:'120px'}}
                onChange={onDescriptionChange}
                rows={1}
                value={tag}
            ></textarea>

            <select name="client-type" value={option} onChange={onSelectChange} style={{width:'140px'}}>
                <option value="">Select Type</option>
                <option value="rel">Browser</option>
                <option value="sql">Android</option>
                <option value="sql">iOS</option>
                <option value="tim">Other</option>
            </select>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}