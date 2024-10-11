import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";
import { LoadBalancerIcon } from "./icons/nodeIcons";

const title = "Load Balancer";
const inputs = {"": "50%"};
const outputs = {"":"50%"};

export const LoadBalancerNode = ({id, data}) => {

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");
    // const [option, setOption] = useState(data?.option || "");

    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
        // console.log(data)
    }

    // function onSelectChange(e){
    //     setOption(e.target.value)
    //     data.option = e.target.value;
    //     // console.log(data)
    // }

    const body = (
        
        <>
            <div className="node-icon" style={{position: "absolute", top: "-20px", left:"135px", transform:"rotate(0deg)"}}>
                <LoadBalancerIcon />
            </div>
            
            <textarea 
                className='text-box'
                ref={tagBox}
                style={{backgroundColor: 'transparent', borderWidth:'1px', margin:'5px', width:'120px'}}
                onChange={onDescriptionChange}
                rows={1}
                value={tag}
            ></textarea>

            {/* <select name="algo-task" value={option} onChange={onSelectChange} style={{width:'140px'}}>
                <option value="">Algorithm</option>
                <option value="rr">Round Robin </option>
            </select> */}
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}