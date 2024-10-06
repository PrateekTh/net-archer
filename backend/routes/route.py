from fastapi import APIRouter, Request
from models.graphs import Graph
from config.database import collection_name
from schema.schemas import individual_serial, list_serial
from graph import checkDAG
from bson import ObjectId

router = APIRouter()

@router.get('/')
def get_default():
    return {'Ping': 'Pong'}

# get all graphs
@router.get('/all')
def get_all():
    graphs = list_serial(collection_name.find())
    return graphs

# get a single graph with id == id
@router.get('/{graph_id}')
def get_graph(graph_id : str):
    graph = list_serial(collection_name.find({"_id": ObjectId(graph_id)}))
    return { "status":"ok", "data": graph }

#add a new graph
@router.post('/save/')
async def post_graph(request: Graph) :
    request_json = request #any preprocessing if required
    graph = Graph.model_validate(request_json).model_dump()
    result_id = collection_name.insert_one(graph).inserted_id
    return { "status":"ok", "result_id": str(result_id)}

# update a single graph with id == id
@router.post('/save/{graph_id}')
async def update_graph(request: Graph, graph_id: str | None = None):
    request_json = request #any preprocessing if required
    graph = Graph.model_validate(request_json).model_dump()
    result_id = None
    result = collection_name.update_one(
        {"_id": ObjectId(graph_id)},
        { "$set": graph},
        upsert = True
    )
    if result.did_upsert :
        result_id = result.upserted_id
    else : 
        result_id = graph_id

    return { "status":"ok", "result_id": str(result_id)}

# temporary functional(non-db) endpoint
@router.post('/graph/parse')
async def parse_graph(request:Request):
    request_json = await request.json()
    data = Graph.model_validate(request_json)
    res = checkDAG(data=data)
    return {"num_nodes":len(data.nodes), "num_edges":len(data.edges), "is_DAG":res}