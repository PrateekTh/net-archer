import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div spellCheck={false} style={{height:"100vh", width:"100vw", display:"flex", flexDirection:"column"}}>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
