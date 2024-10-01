// customNode.js

import { useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

export const CustomNode = ({ id, data, 
	title = "Custom", 
	inputs = {"input_1": "30%", "input_2":"60%"}, 
	outputs = {"output": "50%"}, 
	body = <div>This is a default custom node</div>,
	userInputs = {},
	userOutputs = {}}) => {

	const updateNodeInternals = useUpdateNodeInternals();
		
	useEffect(() => {
		updateNodeInternals(id.id)
	}, [id, updateNodeInternals, userInputs, inputs, outputs]);

  return (
    <div className="node-box">			
			{Object.keys(inputs).map((key, i) => {
				return (
					<Handle 
						id={`${id.id}-${key}`} key={i}
						type='source'
						position= {Position.Left}
						style = {{top:inputs[key]}}
					>
						<div className='handle-label'
						>{key}</div>
					</Handle>)

			})}

			{Object.keys(userInputs).map((key, i) => {
				return (
					<Handle 
						id={`${id.id}-${key}`} key={i}
						type='source'
						position= {Position.Left}
						style = {{top:userInputs[key]}}
					>
						<div className='handle-label'
						>{key}</div>
					</Handle>)

			})}

		<div>
			<span className='title'>{title}</span>
		</div>

		<div className='node-body' style={{display:'flex', flexDirection:'column'}}>
			{body}
		</div>

	  	{Object.keys(outputs).map((key, i) => {
			return (
				<Handle 
					id={`${id.id}-${key}`} key={i}
					type="source"
					position= {Position.Right}
					style = {{top:outputs[key]}}
				>
					<div  className="handle-label" style={{  transform:"translate(10%, 5px)"}}>{key}</div>
				</Handle>
			)
		})}

		{Object.keys(userOutputs).map((key, i) => {
			return (
				<Handle 
					id={`${id.id}-${key}`} key={i}
					type='source'
					position= {Position.Right}
					style = {{top:userOutputs[key]}}
				>
					<div  className="handle-label" style={{  transform:"translate(10%, 5px)"}}>{key}</div>

				</Handle>
			)
		})}
    </div>
  );
}
