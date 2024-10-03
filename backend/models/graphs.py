from pydantic import BaseModel

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