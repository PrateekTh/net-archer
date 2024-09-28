// textNode.js

import { useState, useRef, useLayoutEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textBox = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    adjustHeight();
  };

  function adjustHeight() {
    textBox.current.style.height = "inherit";
    textBox.current.style.height = `${textBox.current.scrollHeight}px`;
  }

  useLayoutEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div style={{minWidth: 200, minHeight: 100, padding:"8px", border: '1px solid black'}}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Input:
          <textarea 
            ref = {textBox}
            rows="4"
            value = {currText}
            style={{ padding: "5px", width:"95%", resize: "none", overflowY: "hidden"}}
            onChange={handleTextChange}></textarea>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
