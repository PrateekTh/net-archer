import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";
import { UtilityIcon } from "./icons/nodeIcons";

export const UtilityNode = ({id, data}) => {
    const title = "Utility";
    const inputs = {"": "50%"};
    const outputs = {"":"50%"};

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");
    const [option, setOption] = useState(data?.option || "");

    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
        // console.log(data)
    }

    function onSelectChange(e){
        setOption(e.target.value)
        data.option = e.target.value;
        // console.log(data)
    }

    const body = (
        
        <>
            <div className="node-icon" style={{position: "absolute", top: "-20px", left:"140px"}}>
                <UtilityIcon />
            </div>
            
            <textarea 
                className='text-box'
                ref={tagBox}
                style={{backgroundColor: 'transparent', borderWidth:'1px', margin:'5px', width:'120px'}}
                onChange={onDescriptionChange}
                rows={1}
                value={tag}
            ></textarea>

            <select name="util-type" value={option} onChange={onSelectChange} style={{width:'140px'}}>
                <option value="">Custom Service</option>
                <option value="aut">Authentication</option>
                <option value="cdn">CDN</option>
                <option value="rtl">Rate Limiter</option>
                <option value="did">Distributed IDs</option>
                <option value="api">API Gateway</option>
                <option value="dns">DNS</option>
                <option value="cac">Cache</option>
            </select>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}