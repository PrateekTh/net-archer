import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

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
                <svg width="70px" height="70px" viewBox="0 0 100 100" version="1.1">          
                    <g id="UtilityIcon" stroke="rgba(111, 111, 111, 0.2)" strokeWidth="3" fill="" fillRule="nonzero">
                        <path d="m12.551 22.785-4.832 8.3711c-0.85156 1.4727-0.40234 3.375 1.043 4.2969 5.0469 3.2188 7.9297 8.5234 7.9258 14.516-0.003906 6.0547-2.8242 11.32-7.9258 14.57-1.4375 0.91406-1.8984 2.8008-1.0469 4.2812l4.8242 8.3789c0.89063 1.5 2.707 2.0195 4.2344 1.2266 5.2773-2.7422 11.398-2.5742 16.555 0.41406 5.2109 3.0195 8.3867 8.1133 8.6484 14.148 0.074219 1.6797 1.4453 3.0312 3.1836 3.0312h9.668c1.75 0 3.1094-1.3125 3.1836-3.0273 0.26562-5.9688 3.418-11.125 8.5977-14.117 5.1953-3.0078 11.281-3.2148 16.605-0.44531 1.5312 0.79687 3.3828 0.25781 4.2266-1.2109l4.8359-8.3711c0.84766-1.4727 0.40234-3.375-1.043-4.2969-5.0508-3.2188-7.9297-8.5234-7.9258-14.516 0.003906-6.0547 2.8242-11.32 7.9258-14.57 1.4414-0.92188 1.8945-2.8086 1.0469-4.2812l-4.8242-8.3789c-0.88281-1.4961-2.7031-2.0195-4.2344-1.2266-5.2812 2.7422-11.395 2.5742-16.555-0.41406-5.2109-3.0156-8.3828-8.1133-8.6484-14.148-0.074219-1.7188-1.4336-3.0312-3.1836-3.0312h-9.668c-1.75 0-3.1055 1.3125-3.1836 3.0273-0.26562 5.9688-3.418 11.125-8.5977 14.117-5.1953 3.0078-11.281 3.2109-16.605 0.44531-1.5312-0.79688-3.3789-0.25781-4.2266 1.2109zm46.551 18.109c5.0273 5.0273 5.0273 13.18 0 18.207-5.0273 5.0273-13.18 5.0273-18.207 0-5.0273-5.0273-5.0273-13.18 0-18.207 5.0273-5.0273 13.18-5.0273 18.207 0zm-9.1055-13.289c12.367 0 22.395 10.027 22.395 22.395s-10.027 22.395-22.395 22.395c-12.367 0-22.395-10.027-22.395-22.395s10.027-22.395 22.395-22.395z" fill=" rgba(31, 197, 168, 0.8)"></path>
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