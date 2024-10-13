//serverNode.js

import { useState, useRef, useLayoutEffect } from 'react';
import { CustomNode } from "./customNode";
import { useReactFlow } from 'reactflow';
import { getCaretOffset, adjustTextBox} from "../modules/textarea"
import { ServerIcon } from './icons/nodeIcons';

const title = "Server";
const inputs = {"": "53px"};
const outputs = {};

export const ServerNode = ({id, data}) => {

    const reactFlow = useReactFlow();
    const [tag, setTag] = useState(data?.tag || "");
    const [currText, setCurrText] = useState(data?.text || '{{\\endpoint}}');
    const [userInputs, setUserInputs] = useState({});
    const [userOutputs, setUserOutputs] = useState({});
    const tagBox = useRef(null)
    const textBox = useRef(null);

    function handleTextChange(e){
        setCurrText(e.target.value);
        data.text = e.target.value;
        adjustTextBox(textBox.current);
        handleUserInputs(e.target.value);
    };
    
    function onDescriptionChange(e){
        setTag(e.target.value)
        data.tag = e.target.value;
        adjustTextBox(tagBox.current);
        // console.log(data)
    }

    function handleUserInputs(str){
        const regex = /\{\{.*?\}\}/gm;
        let mpInputs = {};
        let mpOutputs = {};
        const res2 = str.match(regex);

        if(res2) {
        res2.forEach(el => {
            if(el[2] === '\\'){
                let temp = el.substring(3, el.length - 2).trim();
                // User Inputs
                if(temp.length){
                    if(!(temp in userInputs)) {
                        const offset = getCaretOffset(textBox.current, textBox.current.selectionStart).top + 8;;
                        mpInputs[temp] = offset * 0.5 * (1 + 1/reactFlow.getZoom());
                    }else { mpInputs[temp] = userInputs[temp];}
                }
            } else if(el[2] === '\/'){
            //  User Outputs
                let temp = el.substring(3, el.length - 2).trim();
                if(temp.length){
                    if(!(temp in userOutputs)) {
                        const offset = getCaretOffset(textBox.current, textBox.current.selectionStart).top + 8;;
                        mpOutputs[temp] = offset * 0.5 * (1 + 1/reactFlow.getZoom());
                    }else { mpOutputs[temp] = userOutputs[temp];}
                }
            }
        });
        }
        setUserInputs(mpInputs);
        setUserOutputs(mpOutputs);
    }

  useLayoutEffect(() => {
    adjustTextBox(tagBox.current);
    adjustTextBox(textBox.current);
    handleUserInputs(currText);
  }, []);

  const body = (
      <div>
        <div className="node-icon" style={{position: "absolute", top: "5px", left:"245px"}}>
                <ServerIcon/>
            </div>
        <label>
          <textarea 
            ref={tagBox}
            className='text-box'
            style={{backgroundColor: 'transparent', border:'none'}}
            onChange={onDescriptionChange}
            value={tag}
            rows="1"
            ></textarea>
          
          <br/>
          <textarea 
            ref = {textBox}
            style={{backgroundColor: 'rgba(255,255,255, 0.6)', pointerEvents:'all'}}
            className='text-box'
            spellCheck={false}
            rows="1" 
            value = {currText}
            onChange={handleTextChange}
            ></textarea>
        </label>
    </div>
  );

  return CustomNode(id, data, title, inputs, outputs, body, userInputs, userOutputs);
}