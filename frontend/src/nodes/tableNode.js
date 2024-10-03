// newTextNode.js

import { useState, useRef, useLayoutEffect } from 'react';
import { CustomNode } from "./customNode";
import { useReactFlow } from 'reactflow';
import { getCaretOffset, adjustTextBox} from "../modules/textarea"

export const TableNode = ({id, data}) => {
  
  const title = "Table";
  const inputs = {"database": "30px"};
  const outputs = {"output": "50%"};

  const reactFlow = useReactFlow();
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [userInputs, setUserInputs] = useState({});
  const textBox = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    adjustTextBox(textBox.current);
    handleUserInputs(e.target.value);
  };
  
  function handleUserInputs(str){
    const regex = /\{\{.*?\}\}/gm;
    let mp = {}; // new object
    const matches = str.match(regex);

    if(matches) {
      matches.forEach(el => {
        let temp = el.substring(2, el.length - 2).trim();
        if(temp.length){
          if(!(temp in userInputs)) {
            const offset = getCaretOffset(textBox.current, textBox.current.selectionStart).top + 8;;
            // reactFlow.zoomTo(1);
            mp[temp] = offset * 0.5 * (1 + 1/reactFlow.getZoom());
          }
          else { mp[temp] = userInputs[temp];}
        }
      });
    }
    setUserInputs(mp);
  }

  useLayoutEffect(() => {
    adjustTextBox(textBox.current);
    handleUserInputs(currText);
  }, []);

  const body = (
      <div>
        <label>
          <br/>
          <textarea ref = {textBox}
            className='text-box'
            style={{backgroundColor: 'rgba(256,256,256, 0.7)', borderWidth:'1px', margin:'5px', width:'120px'}}
            name='input'
            spellCheck={false}
            rows="1" 
            value = {currText}
            onChange={handleTextChange}
            ></textarea>
        </label>
    </div>
  );

  return CustomNode(id, data, title, inputs, outputs, body, userInputs);
}