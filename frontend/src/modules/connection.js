import { backend_root } from "../vars";

const getGraph = async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    console.log(id);

    let endpoint = id? backend_root + "/" + id : backend_root;
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

    // if the id was not specified, i.e. the graph fetched is the default graph from the server, set id = null
    if(graph) graph.id = id? graph.id : null;
    return graph;
}

const setGraph = async (graph, id = null) => {
    const endpoint = id? backend_root + "/save/" + id : backend_root + "/save/";
    console.log(endpoint)

    console.log(backend_root)
    let graph_id = null;
    try{
        graph_id = await fetch(endpoint, {
            method:'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(graph)
        })
        .then(res =>res.json())

    }catch(error){
        console.log(error);
        graph_id = null;
    }

    console.log(graph_id);
    return graph_id;
}

export {getGraph, setGraph}