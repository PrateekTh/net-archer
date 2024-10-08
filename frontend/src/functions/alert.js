//alert.js

function validateAlert(message){
    
    let dag, node, edge;

    if(message.num_nodes === 1) node = "1 node"
    else node = message.num_nodes + " nodes"

    if(message.num_edges === 1) edge = "1 edge"
    else edge = message.num_edges + " edges"

    if(message.is_DAG){
        dag = <span style={{color:"#92DCE5"}}>a valid DAG</span>;
    }else{
        dag = <span style={{color:"#FF6978"}}>not a valid DAG</span>;
    }

    return(<>
        <span> With {node} and {edge}, </span> 
        <span> This Pipeline is {dag}.</span>
    </>)
}

function textAlert(message){
    if(typeof(message) == Object)
        return JSON.stringify(message);
    return message;
}

export const Alert = ({type, message}) => {
    let body;
    switch (type) {
        case 'validate':
            body = validateAlert(message)
            break;
        default:
            body = textAlert(message)
    }
    return(
        <div className="alert">
            {body}
        </div>
    )
}