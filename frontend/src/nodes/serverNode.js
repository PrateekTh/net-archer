//serverNode.js

import { useState, useRef, useLayoutEffect } from 'react';
import { CustomNode } from "./customNode";
import { useReactFlow } from 'reactflow';
import { getCaretOffset, adjustTextBox} from "../modules/textarea"

const title = "Server";
const inputs = {"system": "53px"};
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
    adjustTextBox(textBox.current);
    handleUserInputs(currText);
  }, []);

  const body = (
      <div>
        <div className="node-icon" style={{position: "absolute", top: "5px", left:"245px"}}>
                <svg width="60px" height="60px" viewBox="0 0 100 100" version="1.1">                  
                    <g id="ServerIcon" stroke="rgba(111, 111, 111, 0.2)" strokeWidth="3" fill="" fillRule="nonzero">
                        <path d = "m22.223 50c0 2.3047-1.8594 4.168-4.168 4.168-2.3047 0-4.168-1.8594-4.168-4.168 0-2.3047 1.8594-4.168 4.168-4.168 2.3047 0 4.168 1.8594 4.168 4.168zm75-19.445c0 2.1406-0.83203 4.082-2.168 5.5547 1.332 1.4727 2.168 3.418 2.168 5.5547v16.668c0 2.1406-0.83203 4.082-2.168 5.5547 1.332 1.4727 2.168 3.418 2.168 5.5547v16.668c0 4.582-3.75 8.332-8.332 8.332l-77.781 0.003906c-4.582 0-8.332-3.75-8.332-8.332v-16.668c0-2.1406 0.83203-4.082 2.168-5.5547-1.332-1.4727-2.168-3.418-2.168-5.5547v-16.668c0-2.1406 0.83203-4.082 2.168-5.5547-1.332-1.4727-2.168-3.418-2.168-5.5547v-16.668c0-4.582 3.75-8.332 8.332-8.332h77.777c4.582 0 8.332 3.75 8.332 8.332v16.668zm-15.277-12.5c-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168zm-13.891 0c-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168zm-13.887 0c-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168zm-40.277 4.168c0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168-2.3047 0-4.168 1.8594-4.168 4.168zm4.1641 59.723c2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168zm36.113 0c2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168zm13.887 0c2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168zm18.055-4.168c0-2.3047-1.8594-4.168-4.168-4.168-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168zm5.5586-36.109c0-1.5273-1.25-2.7773-2.7773-2.7773h-77.781c-1.5273 0-2.7773 1.25-2.7773 2.7773v16.668c0 1.5273 1.25 2.7773 2.7773 2.7773h77.777c1.5273 0 2.7773-1.25 2.7773-2.7773v-16.668zm-37.5 4.1641c-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168zm27.777 0c-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168zm-13.891 0c-2.3047 0-4.168 1.8594-4.168 4.168 0 2.3047 1.8594 4.168 4.168 4.168 2.3047 0 4.168-1.8594 4.168-4.168 0-2.3047-1.8594-4.168-4.168-4.168" fill=" rgba(31, 197, 168, 0.8)" />
                    </g>
                </svg>
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