#graph.py Separate module for graph related functions

def DFSCheck(node, adjList, visitedNode, visitedNodeCurr):
    visitedNode[node] = 1;
    visitedNodeCurr[node] = 1;
    
    for el in adjList[node] :
        if (visitedNode[el] == 0):
            if(DFSCheck(el, adjList, visitedNode, visitedNodeCurr) == False):
                return False      
        elif (visitedNodeCurr[el] != 0):
            return False
    
    visitedNodeCurr[node] = 0;
    return True

def checkDAG(data):

    if(len(data.nodes) == 0):
        return True
    elif(len(data.edges) < 2):
        return True
    
    nodeIndices = {}
    i = 0
    for node in data.nodes:
        nodeIndices[node.data['id']] = i
        i += 1
    # print(nodeIndices) # {'image-1': 0, 'newText-1': 1} and so on
    
    adjList = [[] for _ in range(i)]
    for edge in data.edges:
        adjList[nodeIndices[edge.source]].append(nodeIndices[edge.target])
    
    # print(adjList) # [[1], [], [1,2]] and so on
    
    visitedNode = visitedNodeCurr = [0] * (i+1)  
    i = 0
    for el in visitedNode:
        if el == 0:
            if(DFSCheck(i, adjList, visitedNode, visitedNodeCurr) == False) :
                return False;
    return True
