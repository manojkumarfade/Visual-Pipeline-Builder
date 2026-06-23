from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

# CORS must be added before routes are registered.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineRequest(BaseModel):
    nodes: List[Any]
    edges: List[Any]


def is_dag(nodes: list, edges: list) -> bool:
    """
    Check if the graph formed by nodes and edges is a directed acyclic graph.
    Uses DFS-based cycle detection with 3-color marking.
    """
    if not nodes:
        return True

    adjacency = {node["id"]: [] for node in nodes}
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source in adjacency:
            adjacency[source].append(target)

    color = {node["id"]: 0 for node in nodes}

    def dfs(node_id: str) -> bool:
        color[node_id] = 1

        for neighbor in adjacency.get(node_id, []):
            if neighbor not in color:
                continue
            if color[neighbor] == 1:
                return True
            if color[neighbor] == 0:
                if dfs(neighbor):
                    return True

        color[node_id] = 2
        return False

    for node in nodes:
        if color[node["id"]] == 0:
            if dfs(node["id"]):
                return False

    return True


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_result = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_result,
    }
