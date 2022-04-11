/**
 * 
 * @param {number} N - Determines the size of the grid as grid will be N x N large.
 * @param {number[]} A - Array specifying which row/column indices should have all values incremented by 1.
 * @param {string} S - Specifies whether the index value at A[index] which corresponds to S[index] is referring to a 'R' row index or 'C' a column index.
 * @returns {number} - The maximum value found in the grid after all grid actions have occurred.
 */

function solution(N, A, S) {
    // Build Grid
    let grid = [];
    for (let i = 0; i < N; i++){
        let temp = [];
        for (let j = 0; j < N; j++){
            temp.push(0);
        }
        grid.push(temp);
    }

    A.forEach((RCIndex, index) => {
        // Increase all values in the row by 1
        if (S[index] === 'R'){
            for (let column = 0; column < N; column++){
                grid[RCIndex][column] += 1;
            }
        }
        // Increase all values in the column by 1
        if (S[index] === 'C'){
            for (let row = 0; row < N; row++){
                grid[row][RCIndex] += 1;
            }
        }
    });

    return findMax(grid);
}

function findMax(array){
    let max = 0;
    array.forEach(arr => {
        if (Math.max(...arr) > max) 
            max = Math.max(...arr);
    });
    return max;
}

console.log(solution(2, [0,1,0,1], "RCRR"));
console.log(solution(10, [2,4,7,8,5,2,5,8,7], "RCRCRCRCR"));
console.log(solution(1, [0,0], "CR"));
