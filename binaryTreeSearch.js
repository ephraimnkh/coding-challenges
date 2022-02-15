// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

let zigzagLength = [];
let counter = 0;

function solution(T) {
    // write your code in JavaScript (Node.js 8.9.4)
    // console.log(T);
    searchTree(T);
    zigzagLength.sort((a, b) => {
        return b - a;
    });
    return zigzagLength[0];
    // Variables
    // zig zag array

    // {x: num, l: null, r: null} is the end.

    // Zig Zag Counting
    // first zig has counter at 1
    // Increment counter with each subsequent turn.
    // If end found add counter to array.
    // If turns end add counter to array.
    // If nodes in current direction are available
    // continue search.

    // Search Mode
    // Go left or right direction
    // While in direction keep going in direction until a 
    // node in the opposite direction is found
    // then start the zig zag counting above ^

}

// Search Node
// Given Object To Look At right and left
// Given current count value of current zig zag if any
// Count is incremented if zag found based on direction
// End is based on left and right being null
function searchTree(obj, direction = null) {
    // console.log(`x is currently ${obj.x} and count is ${count}`);
    // If at end then end
    if (obj.l === null && obj.r === null) {
        zigzagLength.push(counter);
        counter = 0;
        return;
    }

    // If the direction is null, meaning not provided then it's the start
    // so go down left and right.
    if (obj.l != null && direction === null) searchTree(obj.l, 'left');
    if (obj.r != null && direction === null) searchTree(obj.r, 'right');

    if (obj.l != null && direction === 'left') searchTree(obj.l, direction);
    if (obj.r != null && direction === 'right') searchTree(obj.r, direction);

    if (obj.l != null && direction === 'right') {
        counter++;
        searchTree(obj.l, 'left');
    }
    if (obj.r != null && direction === 'left') {
        counter++;
        searchTree(obj.r, 'right');
    }

    return;
}



let tree = {
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
console.log(solution(tree));