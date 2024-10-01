//serverNode.js

import { useState, useRef, useLayoutEffect } from 'react';
import { CustomNode } from "./customNode";
import { useReactFlow } from 'reactflow';
import { getCaretOffset, adjustTextBox} from "../modules/textarea"

export const ServerNode = (id, data) => {

    const inputs = {"system": "53px"};
    const outputs = {};

    const reactFlow = useReactFlow();
    const [currText, setCurrText] = useState(data?.text || '{{\\endpoint}}');
    const [userInputs, setUserInputs] = useState({});
    const [userOutputs, setUserOutputs] = useState({});

    const textBox = useRef(null);

    const handleTextChange = (e) => {
        setCurrText(e.target.value);
        adjustTextBox(textBox.current);
        handleUserInputs(e.target.value);
    };
    
    function handleUserInputs(str){
        const regex = /\{\{.*?\}\}/gm;
        let mpInputs = {};
        let mpOutputs = {};
        const res2 = str.match(regex);

        if(res2) {
        res2.forEach(el => {
            if(el[2] == '\\'){
                let temp = el.substring(3, el.length - 2).trim();
                // User Inputs
                if(temp.length){
                    if(!(temp in userInputs)) {
                        const offset = getCaretOffset(textBox.current, textBox.current.selectionStart).top + 8;;
                        mpInputs[temp] = offset * 0.5 * (1 + 1/reactFlow.getZoom());
                    }else { mpInputs[temp] = userInputs[temp];}
                }
            } else if(el[2] == '\/'){
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

  const title = "Server";
  const body = (
      <div>
        <label>
          <textarea 
            className='text-box'
            rows="1" 
            placeholder = {"System"}
            ></textarea>
          
          <br/>
          <textarea 
            ref = {textBox}
            className='text-box'
            spellCheck={false}
            rows="1" 
            value = {currText}
            onChange={handleTextChange}
            ></textarea>
        </label>
    </div>
  );

  return CustomNode({id, data, title, inputs, outputs, body, userInputs, userOutputs});
}