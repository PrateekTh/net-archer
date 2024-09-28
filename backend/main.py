from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from graph import checkDAG

class Coordinates(BaseModel) : 
    x: float
    y: float
    zoom: float  | None = None

class Edge(BaseModel) : 
    animated: bool
    id: str
    markerEnd: dict[str, str]
    source: str
    sourceHandle: str
    target: str
    targetHandle: str
    type:str

class Node(BaseModel) :
    data: dict[str, str]
    dragging: bool | None = None
    height: float
    position: Coordinates
    positionAbsolute: Coordinates
    selected: bool | None = None
    type: str
    width: float

class Graph(BaseModel) :
    edges: list[Edge]
    nodes: list[Node]
    viewport: Coordinates

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def validate_pipeline(request:Request):
    request_json = await request.json()
    data = Graph.model_validate(request_json)
    res = checkDAG(data=data)
    return {"num_nodes":len(data.nodes), "num_edges":len(data.edges), "is_DAG":res}