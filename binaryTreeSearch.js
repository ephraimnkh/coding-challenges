
let zigzagLengths = [];  // Contains the lengths of all zig-zag patterns found in a tree
let turns = 0; // Counter to count all the turns in a zig-zag pattern

// A zig zag pattern is defined as a pattern in which the left or right side of a tree
// switches to the opposite direction such as from right-to-left or left-to-right
// and possibly back to the starting direction, but this does not have to be the case.
// Each turn is added to a counter and the most amount of turns found before reaching the
// end of a tree's left or right side refers to the longest zig zag pattern.
function findLongestZigZagInATree(tree) {
    // Function to go through a Tree Structure.
    navigateTree(tree);

    // Put the highest length at the end of the array list using sort function as generic sort does not work
    // well with numbers
    zigzagLengths.sort((a, b) => a - b);

    return zigzagLengths.pop(); // return the longest zig-zag length found in a tree.

}

// Searches Each Node in a tree recursively.
function navigateTree(node, direction = null) {
    
    // The end is marked by both the right and left node of the current node (object) being null
    if (node.l === null && node.r === null) {
        zigzagLengths.push(turns);
        turns = 0;
        return;
    }

    // If the direction is null, meaning not provided then it's the start of the tree
    // so go down both the left and the right of the tree. Direction is provided so 
    // that function can take note of changes in direction
    if (node.l != null && direction === null) navigateTree(node.l, 'left');
    if (node.r != null && direction === null) navigateTree(node.r, 'right');


    // If a node is found in the current navigation direction continue until there are no more nodes 
    // in the current direction which would mark the beginning of a zig zag pattern
    if (node.l != null && direction === 'left') navigateTree(node.l, direction);
    if (node.r != null && direction === 'right') navigateTree(node.r, direction);

    // Once direction changes from the previous direction (due to there being no more nodes in the previous direction
    // hence none of the above statements running instead) a zig zag pattern is being formed 
    // and the counter for the zig zag pattern's length should be incremented by one for each turn
    // until the end of the pattern/tree's side.
    if ((node.l != null && direction === 'right') || (node.r != null && direction === 'left')) {
        turns++;
        // if left is not null then clearly go left otherwise go to the right.
        node.l != null ? navigateTree(node.l, 'left') : navigateTree(node.r, 'right');
    }
}



let myTree = {
    x: 5,
    l: {
        x: 3,
        l: {
            x: 20,
            l: {
                x: 6,
                l: null,
                r: null
            },
            r: null
        },
        r: null
    },
    r: {
        x: 10,
        l: {
            x: 1,
            l: null,
            r: null
        },
        r: {
            x: 15,
            l: {
                x: 30,
                l: null,
                r: {
                    x: 9,
                    l: null,
                    r: null
                }
            },
            r: {
                x: 8,
                l: null,
                r: null
            }
        }
    }
};

console.log(findLongestZigZagInATree(myTree));