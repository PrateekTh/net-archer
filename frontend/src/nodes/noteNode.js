import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState } from "react";

const title = "";
const inputs = {"":"30px"};
const outputs = {};

export const NoteNode = ({id, data}) => {

    const tagBox = useRef()
    const [tag, setTag] = useState(data?.tag || "");
    const [color, setColor] = useState(data?.color || "#FFFFFF");
    const [customTitle, setCustomTitle] = useState(data?.title || "Edit title")

    function onDescriptionChange(e){
        setTag(e.target.value);
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
        // console.log(data)
    }

    function onColorChange(e){
        setColor(e.target.value);
        data.color = e.target.value;
    }

    const body = (
        <>
            <div style={{ display:"flex", alignItems:"flex-end", width:"100%"}}>
                <input className='title note-title' type="text" value={customTitle} onChange={(e) => {
                    setCustomTitle(e.target.value); 
                    data.title = e.target.value;
                }}/>
                <input type="color" className="color-input" value={color} onChange={onColorChange}/>

            </div>
            <textarea 
                className='text-box'
                ref={tagBox}
                style={{backgroundColor: color + "90", borderWidth:'1px', margin:'5px', width:'240px'}}
                onChange={onDescriptionChange}
                rows={1}
                value={tag}
            ></textarea>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}