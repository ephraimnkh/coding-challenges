// var Sudoku = function (data) {
//     //   Private methods
//     // -------------------------
//     let isSolutionValid = false;
//     let n = Math.sqrt(data.length);
//     let includedInRow = [];
//     let validRows = 0;
//     let grids = n * n;
//     let currentGrid = 1;
//     let includedInGrid = [];
//     let validGrids = 0;
//     let gridRows = n;
//     let gridColumns = n;


//     //   Public methods
//     // -------------------------
//     return {
//         isValid: function () {
//             if (grids > 1) {
//                 // Verify Rows
//                 for (let i = 0; i < (n * n); i++) {
//                     for (let j = 0; j < (n * n); j++) {
//                         if (!includedInRow.includes(data[i][j])) includedInRow.push(data[i][j]);
//                     }
//                     if (includedInRow.length == (n * n)) {
//                         includedInRow = [];
//                         validRows++;
//                     } else {
//                         i = (n * n);
//                     }
//                 }

//                 // Verify Grids
//                 let rowStart = 0;
//                 let columnStart = 0;
//                 while (currentGrid <= grids) {
//                     for (let i = rowStart; i < gridRows; i++) {
//                         for (let j = columnStart; j < gridColumns; j++) {
//                             if (!includedInGrid.includes(data[i][j])) includedInGrid.push(data[i][j]);
//                         }
//                     }
//                     if (includedInGrid.length == (n * n)) {
//                         includedInGrid = [];
//                         currentGrid++;
//                         validGrids++;
//                         if (gridColumns < (n * n)) {
//                             columnStart += n;
//                             gridColumns += n;
//                         } else {
//                             rowStart += n;
//                             gridRows += n;
//                             columnStart = 0;
//                             gridColumns = n;
//                         }
//                     } else break;
//                 }

//                 isSolutionValid = (validRows === (n * n)) && (validGrids === grids) ? true : false;
//             }
//             if (grids === 1) {
//                 validRows = data[0][0] === 1 ? n * n : 0;
//                 validGrids = data[0][0] === 1 ? grids : 0;
//                 isSolutionValid = (validRows === (n * n)) && (validGrids === grids) ? true : false;
//             }

//             return isSolutionValid;
//         }
//     };
// };



// Submitted Solution 
var Sudoku = function (data) {
    let isSolutionValid = false;
    let n = Math.sqrt(data.length);
    let grids = n * n;

    return {
        isValid: function () {
            if (grids > 1) {
                // Verify Rows
                let validRows = 0;
                let includedInRow = [];
                for (let i = 0; i < (n * n); i++) {
                    for (let j = 0; j < (n * n); j++)
                        if (!includedInRow.includes(data[i][j])) includedInRow.push(data[i][j]);
                    if (includedInRow.length == (n * n)) {
                        includedInRow = [];
                        validRows++;
                    }
                    else i = (n * n);
                }

                // Verify Grids
                let rowStart = 0;
                let columnStart = 0;
                let gridRows = n;
                let gridColumns = n;
                let validGrids = 0;
                let currentGrid = 1;
                let includedInGrid = [];
                while (currentGrid <= grids) {
                    for (let i = rowStart; i < gridRows; i++) {
                        for (let j = columnStart; j < gridColumns; j++)
                            if (!includedInGrid.includes(data[i][j])) includedInGrid.push(data[i][j]);
                    }
                    if (includedInGrid.length == (n * n)) {
                        includedInGrid = [];
                        currentGrid++;
                        validGrids++;
                        if (gridColumns < (n * n)) {
                            columnStart += n;
                            gridColumns += n;
                        } else {
                            rowStart += n;
                            gridRows += n;
                            columnStart = 0;
                            gridColumns = n;
                        }
                    } else break;
                }

                isSolutionValid = (validRows === (n * n)) && (validGrids === grids) ? true : false;
            }
            
            // if (grids === 1) isSolutionValid = data[0][0] === 1 ? true : false;

            return isSolutionValid;
        }
    };
};

var goodSudoku1 = new Sudoku([
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],

    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],

    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 4]
]);

var goodSudoku2 = new Sudoku([
    [1, 4, 2, 3],
    [3, 2, 4, 1],

    [4, 1, 3, 2],
    [2, 3, 1, 4]
]);

var badSudoku1 = new Sudoku([
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],

    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],

    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
]);

var badSudoku2 = new Sudoku([
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1]
]);

var badSudoku3 = new Sudoku([
    [1]
]);

console.log(goodSudoku1.isValid());
console.log(goodSudoku2.isValid());
console.log(badSudoku1.isValid());
console.log(badSudoku2.isValid());
console.log(badSudoku3.isValid());