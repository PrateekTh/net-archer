def individual_serial(graph) -> dict:
    return {
        "id": str(graph["_id"]),
    }


def list_serial(graphs) -> dict:
    return [individual_serial(graph) for graph in graphs]