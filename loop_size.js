// Submitted solution
function loop_size(node) {
    let nodes = [];
    let currentNode = node;
    let nextNode = node.next;
    nodes.push(currentNode);

    while (currentNode != nextNode) {
        currentNode = nextNode;
        nodes.push(currentNode);
        nextNode = currentNode.next;
        if (nodes.findIndex(value => value === nextNode) >= 0) {
            nodes.splice(0, nodes.findIndex(value => value === nextNode));
            break;
        }
    }

    return nodes.length;
}

// function loop_size(node) {
//     let nodes = [];
//     let currentNode = node;
//     let nextNode = node.next;
//     nodes.push(currentNode);

//     while (isThereAnotherNode(currentNode)) {
//         nodes.push(nextNode);
//         currentNode = nextNode;
//         nextNode = nextNode.next;
//         let nodeSearchResults = isNodeFoundInLoop(nodes, nextNode);
//         if (nodeSearchResults.found) {
//             let numberToDelete = nodeSearchResults.index;
//             nodes.splice(0, numberToDelete);
//             break;
//         }
//     }

//     return nodes.length;
// }

// function isNodeFoundInLoop(array, node) {
//     return { found: (array.findIndex(value => value === node) >= 0), index: array.findIndex(value => value === node) };
// }

// function isThereAnotherNode(node) {
//     if (node != node.next) return true;
//     return false;
// }

let nkhomas = ["Ephraim", "Quinton", "Zoe", "Faith"];
let node = "Thamo";
console.log(`Is the node "${node}" found in the loop [${nkhomas}]: ` + JSON.stringify(isNodeFoundInArray(nkhomas, node)));