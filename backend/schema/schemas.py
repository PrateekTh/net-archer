def individual_serial(graph) -> dict:
    return {
        "id": str(graph["_id"]),
        "nodes": list(graph["nodes"]),
        "edges": list(graph["edges"]),
        "viewport": graph["viewport"]
    }

def list_serial(graphs) -> dict:
    return [individual_serial(graph) for graph in graphs]