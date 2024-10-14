import { CustomNode } from "./customNode";
import { adjustTextBox } from "../modules/textarea";
import { useRef, useState, useLayoutEffect } from "react";
import { DatabaseIcon } from "./icons/nodeIcons";

const title = "Database";
const inputs = {"": "50%"};
const outputs = {"":"50%"};

export const DatabaseNode = ({id, data}) => {

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

    useLayoutEffect(() => {
        adjustTextBox(tagBox.current);
    }, []);

    const body = (
        <>
            <div className="node-icon" style={{position: "absolute", top: "-20px", left:"125px"}}>
                <DatabaseIcon />
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
                <option value="sql">Relational / SQL</option>
                <option value="nql">Non Relational / NoSQL</option>
                <option value="hie">Hierarchical</option>
                <option value="ood">Object Oriented</option>
            </select>
        </>);
        
    return CustomNode(id, data, title, inputs, outputs, body);
}