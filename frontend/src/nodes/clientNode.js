import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

export const ClientNode = ({id, data}) => {
    const title = "Client";
    const inputs = {};
    const outputs = {"":"50%"};

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");

    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
    }

    

    const body = (
        <>
            
            <div className="node-icon" style={{position: "absolute", top: "-10px", left:"130px"}}>
                <svg width="60px" height="60px" viewBox="0 0 100 100" version="1.1">                  
                    <g id="Icon-Architecture/64/Arch_Elastic-Load-Balancing_64" stroke="rgba(111, 111, 111, 0.2)" stroke-width="3" fill="" fill-rule="nonzero">
                        <path d="m90.387 95.145c-6.8867 2.1133-19.828 4.8555-40.402 4.8555-20.543 0-33.516-2.7422-40.398-4.8555-3.6875-1.1133-6.1445-4.7148-5.5703-8.5156 2.457-16.398 12.398-30.113 25.914-37.055 5.3125 4.8008 12.344 7.7148 20.059 7.7148 7.6836 0 14.742-2.9141 20.055-7.7148 13.543 6.9414 23.484 20.656 25.941 37.055 0.57031 3.8008-1.9141 7.3984-5.5977 8.5156zm-40.395-95.145c-15.027 0-27.211 12.184-27.211 27.211 0 15.027 12.184 27.211 27.211 27.211 15.027 0 27.211-12.184 27.211-27.211 0-15.027-12.184-27.211-27.211-27.211z" id="Elastic-Load-Balancing_Icon_64_Squid" fill=" rgba(36, 202, 172, 1)"></path>
                    </g>
                </svg>
            </div>
            
            <textarea 
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