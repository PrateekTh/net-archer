// submit.js
import { useReactFlow } from "reactflow";
import { useStore } from "../store";
import { useShallow } from 'zustand/shallow';


const selector = (state) => ({
    id: state.id,
    setID: state.setID,
    getNodeID: state.getNodeID,
    resetNodeIDs: state.resetNodeIDs,
    resetEdges: state.resetEdges
});

export const ClearButton = () => {

    const reactFlow = useReactFlow();
    const {
        setID,
        resetNodeIDs,
        resetEdges,
    } = useStore( useShallow(selector));

    const handleClear = () => {
        resetEdges();
        reactFlow.setNodes([]);
        resetNodeIDs();
        // setID(null);
    }

    return (<>
        <div>
            <button type="submit" style={{background: "rgb(91, 103, 194)"}} onClick={handleClear}> Clear </button>
        </div>
    </>);
}
