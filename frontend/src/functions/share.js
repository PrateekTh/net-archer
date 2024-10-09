// submit.js
import { frontend_root, export_options } from "../vars";
import { useState, useEffect } from "react";
import { useReactFlow, getRectOfNodes, getTransformForBounds} from "reactflow";
import { Alert } from "./alert";
import { useStore } from "../store";
import { toPng } from "html-to-image"

export const ShareButton = () => {
    const reactFlow = useReactFlow();
    const [alert, setAlert] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const id = useStore((state)=>state.id);

    useEffect(() => {
        setTimeout(()=> setAlert(null), 6000)
    }, [alert]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const JSONToFile = (obj, filename) => {
        const blob = new Blob([JSON.stringify(obj, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };

    const downloadImage = (dataUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'reactflow.png');
        a.setAttribute('href', dataUrl);
        a.click();
    }

    const handleCopyLink = () => {
        const link = frontend_root+ "/?id=" + id;
        console.log(link)
        if(id){
            navigator.clipboard.writeText(link)
            .then(()=>setAlert("Link copied"))
        } else setAlert("Please save the graph first.")
    }

    const handleExportImage = () => {

        const nodesBounds = getRectOfNodes(reactFlow.getNodes());
        const viewport = getTransformForBounds(
            nodesBounds,
            export_options.imageWidth,
            export_options.imageHeight,
            0.5,
            2,
        );

        toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: export_options.backgroundColor,
            width: export_options.imageWidth,
            height: export_options.imageHeight,
            style: {
              width: export_options.imageWidth,
              height: export_options.imageHeight,
              transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            },
            pixelRatio: export_options.pixelRatio
          }).then(downloadImage);

        console.log("Image")
        setAlert("Saving")
    }

    const handleSaveJSON = () => {
        const res = JSON.stringify(reactFlow.toObject());
        JSONToFile(res, `graph${id?"-"+id:""}.txt`, 'text/plain');
        //save res
        console.log("JSON: ", res)
    }



    return (<>
            <div>
                <button type="submit" style={{background: `${showMenu? "#696969" : "rgb(14, 165, 140)"}`}} onClick={toggleMenu}> Share </button>
                {showMenu && 
                    <div className="share-menu">
                        <div className="share-option" onClick={handleCopyLink}>
                            Copy Link
                        </div>

                        <div className="share-option" onClick={handleExportImage}>
                            Export Image
                        </div>

                        <div className="share-option" onClick={handleSaveJSON}>
                            Save JSON
                        </div>

                    </div>
                }
            </div>
            {alert && Alert({type: 'text', message: alert})}
        </>
    );
}
