import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

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
                <svg width="60px" height="60px" viewBox="0 0 100 100" version="1.1">                  
                    <g id="LoadBalancerIcon" stroke="rgba(111, 111, 111, 0.2)" strokeWidth="3" fill="" fillRule="nonzero">
                        <path d="m22.598 12.523c-0.21094 0.035156-0.41797 0.10156-0.60938 0.19531l-8.332 4.168c-0.70703 0.35156-1.1562 1.0742-1.1562 1.8633v10.418c0 0.78906 0.44922 1.5117 1.1562 1.8633l8.332 4.168c0.58594 0.28906 1.2734 0.28906 1.8555 0l7.1133-3.5586 9.1719 7.6406c-2.8945 2.6719-4.7109 6.4883-4.7109 10.719s1.8164 8.0508 4.7109 10.719l-9.1719 7.6406-7.1133-3.5547c-0.38281-0.19141-0.82031-0.26172-1.2461-0.19531-0.21094 0.03125-0.41797 0.097656-0.60938 0.19531l-8.332 4.168c-0.70703 0.35156-1.1562 1.0742-1.1562 1.8633v10.418c0 0.78906 0.44922 1.5117 1.1562 1.8633l8.332 4.168v-0.003906c0.58594 0.29297 1.2734 0.29297 1.8555 0l8.332-4.168v0.003907c0.71094-0.35156 1.1562-1.0742 1.1562-1.8633v-9.4414l10.383-8.6523c1.9023 0.91406 4.0352 1.4258 6.2812 1.4258s4.3789-0.51172 6.2812-1.4258l10.391 8.6523v9.4414c0 0.78906 0.44531 1.5117 1.1562 1.8633l8.332 4.168v-0.003906c0.58203 0.29297 1.2695 0.29297 1.8555 0l8.332-4.168v0.003907c0.70703-0.35156 1.1562-1.0742 1.1562-1.8633v-10.418c0-0.78906-0.44922-1.5117-1.1562-1.8633l-8.332-4.168c-0.38672-0.19141-0.82031-0.26172-1.2461-0.19531-0.21094 0.03125-0.41797 0.097656-0.60938 0.19531l-7.1133 3.5547-9.1719-7.6406c2.8945-2.668 4.7109-6.4883 4.7109-10.719s-1.8164-8.0508-4.7109-10.719l9.1719-7.6406 7.1133 3.5547v0.003907c0.58203 0.28906 1.2695 0.28906 1.8555 0l8.332-4.168c0.70703-0.35156 1.1562-1.0742 1.1562-1.8633v-10.418c0-0.78906-0.44922-1.5117-1.1562-1.8633l-8.332-4.168c-0.38672-0.19141-0.82031-0.25781-1.2461-0.19531-0.21094 0.035156-0.41797 0.10156-0.60938 0.19531l-8.332 4.168c-0.71094 0.35156-1.1562 1.0742-1.1562 1.8633v9.4414l-10.387 8.6484c-1.9023-0.91406-4.0352-1.4219-6.2812-1.4219s-4.3789 0.51172-6.2812 1.4258l-10.387-8.6523v-9.4414c0-0.78906-0.44531-1.5117-1.1562-1.8633l-8.332-4.168c-0.38281-0.19141-0.82031-0.25781-1.2461-0.19531z" id="LoadBalancerIcon" fill=" rgba(31, 197, 168, 0.8)"></path>
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

            {/* <select name="algo-task" value={option} onChange={onSelectChange} style={{width:'140px'}}>
                <option value="">Algorithm</option>
                <option value="rr">Round Robin </option>
            </select> */}
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}