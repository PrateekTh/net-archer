from fastapi import APIRouter, Request
from models.graphs import Graph
from config.database import collection_name
from schema.schemas import individual_serial, list_serial
from graph import checkDAG
from bson import ObjectId

router = APIRouter()

@router.get('/')
def read_root():
    return {'Ping': 'Pong'}

@router.get('/graph/')
def get_graph():
    graphs = list_serial(collection_name.find())
    return graphs

@router.post('/graph/save')
async def post_graph(request: Request):
    request_json = await request.json()
    graph = Graph.model_validate(request_json)
    # collection_name.insert_one()
    return {"num_nodes":len(graph.nodes), "num_edges":len(graph.edges)}

@router.post('/pipelines/parse')
async def validate_pipeline(request:Request):
    request_json = await request.json()
    data = Graph.model_validate(request_json)
    res = checkDAG(data=data)
    return {"num_nodes":len(data.nodes), "num_edges":len(data.edges), "is_DAG":res}