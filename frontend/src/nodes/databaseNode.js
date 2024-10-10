import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

export const DatabaseNode = ({id, data}) => {
    const title = "Database";
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
            <div className="node-icon" style={{position: "absolute", top: "-20px", left:"125px"}}>
                <svg width="60px" height="60px" viewBox="0 0 100 100" version="1.1">                  
                    <g transform="translate(0,-952.36216)" id="Icon-Architecture/64/Arch_Elastic-Load-Balancing_64" stroke="rgba(111, 111, 111, 0.2)" stroke-width="3" fill="" fill-rule="nonzero">
                        <path d="m 49.999955,959.83241 a 47.558849,16.054898 0 0 0 -47.5592326,16.05344 47.558849,16.054898 0 0 0 0.1014288,0.96178 c -0.030527,0.57628 -0.048839,1.361 -0.048839,2.96799 l 0,13.41607 a 47.558849,16.054898 0 0 0 -0.05259,0.3494 47.558849,16.054898 0 0 0 0.05259,0.35691 l 0,17.6801 a 47.558849,16.054898 0 0 0 -0.05259,0.3495 47.558849,16.054898 0 0 0 0.05259,0.3568 l 0,16.1662 a 47.558849,16.054898 0 0 0 -0.05259,0.3494 47.558849,16.054898 0 0 0 0.05259,0.3419 47.558849,16.054898 0 0 0 47.5066367,15.7116 47.558849,16.054898 0 0 0 47.472825,-15.2382 c 0.03641,-0.1559 0.08265,-0.305 0.08265,-0.4734 l 0,-0.3081 a 47.558849,16.054898 0 0 0 0.0039,-0.035 47.558849,16.054898 0 0 0 -0.0039,-0.039 l 0,-16.801 a 47.558849,16.054898 0 0 0 0.0039,-0.035 47.558849,16.054898 0 0 0 -0.0039,-0.036 l 0,-18.31516 a 47.558849,16.054898 0 0 0 0.0039,-0.0338 47.558849,16.054898 0 0 0 -0.0039,-0.0375 l 0,-13.72791 c 0,-1.67337 -0.02787,-2.65854 -0.06386,-3.4639 a 47.558849,16.054898 0 0 0 0.06763,-0.46586 47.558849,16.054898 0 0 0 -47.559233,-16.05345 z m 44.22682,21.91804 0,13.97585 a 49.679306,16.770721 0 0 1 -44.22682,9.1707 49.679306,16.770721 0 0 1 -44.1742221,-9.14064 l 0,-13.93828 a 47.558849,16.054898 0 0 0 44.1742221,10.12498 47.558849,16.054898 0 0 0 44.22682,-10.19261 z m 0,17.72152 0,14.64083 a 49.679306,16.770721 0 0 1 -44.22682,9.1707 49.679306,16.770721 0 0 1 -44.1742221,-9.1407 l 0,-14.65583 a 47.558849,16.054898 0 0 0 44.1742221,10.14763 47.558849,16.054898 0 0 0 44.22682,-10.16263 z m 0,18.38653 0,11.3234 c 0,0.9314 0.02178,1.3084 0.04131,1.7734 a 49.679306,16.770721 0 0 1 -44.268145,9.2007 49.679306,16.770721 0 0 1 -44.2155474,-9.1594 c 0.020606,-0.4663 0.041315,-0.8616 0.041315,-1.8147 l 0,-11.3048 a 47.558849,16.054898 0 0 0 44.1742215,10.1439 47.558849,16.054898 0 0 0 44.22682,-10.1625 z" id="Elastic-Load-Balancing_Icon_64_Squid" fill="rgba(31, 197, 168, 1)" opacity={1}></path>
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

            <select name="image-task" value={option} onChange={onSelectChange} style={{width:'140px'}}>
                <option value="">Select a Type</option>
                <option value="rel">Relational</option>
                <option value="sql">SQL</option>
                <option value="tim">Time Series</option>
            </select>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}