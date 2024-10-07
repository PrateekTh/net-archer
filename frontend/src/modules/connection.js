import { backend_root } from "../vars";

const getGraph = async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    let endpoint = id? backend_root + id : backend_root;
    let graph = null;
    try{
        graph = await fetch( endpoint, {
            method:'GET'
        })
        .then(response => response.json());
    }catch(error){
        console.log(error);
        graph = null;
    }
    return graph;
}

export {getGraph}