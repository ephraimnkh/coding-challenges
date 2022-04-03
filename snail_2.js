// snail = function (array) {
//     if (array[0].length === 0) return [];
//     if (array.length === 1 && array[0].length === 1) return array[0];
//     let output = [];
//     let tranversalLength = Math.pow(array.length, 2);
//     // Box Mappings
//     let firstColumn = 0;
//     let lastColumn = array.length - 1;
//     let firstRow = 0;
//     let lastRow = array.length - 1;
//     // Make Mapping for all corners
//     let firstCorner = [firstRow, firstColumn];
//     let secondCorner = [firstRow, lastColumn];
//     let thirdCorner = [lastRow, lastColumn];
//     let fourthCorner = [lastRow, firstColumn];
//     let corners = [firstCorner, secondCorner, thirdCorner, fourthCorner];
//     let rowMover = 0;
//     let columnMover = 1;
//     let activeRow = 0;
//     let activeColumn = 0;
//     for (let i = 0; i < tranversalLength; i++) {
//         // Add square 
//         output.push(array[activeRow][activeColumn]);
//         // Check if movers must be updated as current position is a corner
//         let { isCorner, cornerNumber } = getPositionInformation(corners, activeRow, activeColumn);
//         if (isCorner) {
//             switch (cornerNumber) {
//                 case 0:
//                     rowMover = 0;
//                     columnMover = 1;
//                     if (corners[cornerNumber][0] === 0 && corners[cornerNumber][1] === 0 && array[activeRow + 1][activeColumn] !== undefined)
//                         corners[cornerNumber] = [activeRow + 1, activeColumn];
//                     else if (array[activeRow + 1][activeColumn + 1] !== undefined) corners[cornerNumber] = [activeRow + 1, activeColumn + 1];
//                     break;
//                 case 1:
//                     rowMover = 1;
//                     columnMover = 0;
//                     if (array[activeRow + 1][activeColumn - 1] !== undefined) corners[cornerNumber] = [activeRow + 1, activeColumn - 1];
//                     break;
//                 case 2:
//                     rowMover = 0;
//                     columnMover = -1;
//                     if (array[activeRow - 1][activeColumn - 1] !== undefined) corners[cornerNumber] = [activeRow - 1, activeColumn - 1];
//                     break;
//                 case 3:
//                     rowMover = -1;
//                     columnMover = 0;
//                     if (array[activeRow - 1][activeColumn + 1] !== undefined) corners[cornerNumber] = [activeRow - 1, activeColumn + 1];
//                     break;
//             }
//         }
//         // Move to the next Square
//         activeRow += rowMover;
//         activeColumn += columnMover;
//     }
//     return output;
// };

// Submitted Solution
snail = function (array) {
    if (array[0].length === 0) return [];
    if (array.length === 1 && array[0].length === 1) return array[0];
    let output = [];
    let tranversalLength = Math.pow(array.length, 2);
    // Make Mapping for all initial 4 corners
    let corners = [[0, 0], [0, array.length - 1], [array.length - 1, array.length - 1], [array.length - 1, 0]];
    let rowMover = 0;
    let columnMover = 1;
    let activeRow = 0;
    let activeColumn = 0;
    for (let i = 0; i < tranversalLength; i++) {
        // Add square 
        output.push(array[activeRow][activeColumn]);
        // Check if movers must be updated as current position is a corner
        let { isCorner, cornerNumber } = getPositionInformation(corners, activeRow, activeColumn);
        if (isCorner) {
            switch (cornerNumber) {
                case 0:
                    rowMover = 0;
                    columnMover = 1;
                    // Setting the new corner after the old corner is reached
                    // If the first initial corner [0,0] move down one block, every other time move down and in one block
                    if (corners[cornerNumber][0] === 0 && corners[cornerNumber][1] === 0 && array[activeRow + 1][activeColumn] !== undefined)
                        corners[cornerNumber] = [activeRow + 1, activeColumn];
                    else if (array[activeRow + 1][activeColumn + 1] !== undefined) corners[cornerNumber] = [activeRow + 1, activeColumn + 1];
                    break;
                case 1:
                    rowMover = 1;
                    columnMover = 0;
                    // Setting the new corner after the old corner is reached
                    if (array[activeRow + 1][activeColumn - 1] !== undefined) corners[cornerNumber] = [activeRow + 1, activeColumn - 1];
                    break;
                case 2:
                    rowMover = 0;
                    columnMover = -1;
                    // Setting the new corner after the old corner is reached
                    if (array[activeRow - 1][activeColumn - 1] !== undefined) corners[cornerNumber] = [activeRow - 1, activeColumn - 1];
                    break;
                case 3:
                    rowMover = -1;
                    columnMover = 0;
                    // Setting the new corner after the old corner is reached
                    if (array[activeRow - 1][activeColumn + 1] !== undefined) corners[cornerNumber] = [activeRow - 1, activeColumn + 1];
                    break;
            }
        }
        // Move to the next Square
        activeRow += rowMover;
        activeColumn += columnMover;
    }
    return output;
};

function getPositionInformation(corners, row, column) {
    let isCorner = false;
    let cornerNumber = 0;
    corners.forEach((position, index) => {
        if ((position[0] === row) && (position[1] === column)) {
            isCorner = true;
            cornerNumber = index;
        }
    });
    return { isCorner: isCorner, cornerNumber: cornerNumber };
}
// End Submitted Solution

// console.log('output: ' + snail([[]]));
// console.log("output: " + snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// console.log('output: ' + snail([[934, 500, 515], [595, 964, 713], [713, 770, 666]]));
console.log(`output ${snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]])}`);
// console.log(`output ${snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]])}`);

printSquare = (square) => {
    for (let i = 0; i < square.length; i++) {
        for (let j = 0; j < square.length; j++) {
            process.stdout.write(`${square[i][j]}`);
            if ((j + 1) != square.length) process.stdout.write(` | `);
        }
        console.log('');
    }
}

printArraySquare = (square) => {
    let pointer = 0;
    for (let i = 0; i < 15; i++) {
        let j = 0;
        while (j < 15) {
            process.stdout.write(`${square[pointer]}`);
            if (j + 1 != 15) process.stdout.write(` | `);
            j++;
            pointer++;
        }
        console.log("");
    }
};
// printSquare([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]);
// printSquare([[934, 500, 515], [595, 964, 713], [713, 770, 666]]);
// printSquare([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]);
// printArraySquare([
//     574, 803, 261, 567, 906, 143, 747, 546, 496, 287, 49, 787, 85, 645, 494, 815,
//     231, 303, 14, 416, 494, 179, 497, 513, 517, 689, 616, 91, 89, 491, 488, 240,
//     261, 734, 84, 708, 927, 65, 984, 78, 281, 56, 711, 509, 149, 736, 719, 915,
//     876, 402, 53, 19, 587, 46, 700, 456, 310, 436, 582, 552, 122, 210, 800, 826,
//     866, 664, 203, 800, 238, 854, 244, 696, 488, 711, 841, 612, 36, 174, 412, 200,
//     379, 401, 690, 509, 229, 300, 917, 755, 142, 883, 461, 182, 522, 487, 120,
//     481, 803, 175, 636, 64, 910, 964, 375, 475, 749, 370, 331, 614, 561, 710, 586,
//     469, 297, 397, 913, 107, 724, 550, 520, 851, 378, 208, 80, 683, 726, 83, 2,
//     209, 762, 92, 492, 913, 222, 47, 755, 121, 561, 791, 153, 617, 217, 502, 487,
//     278, 911, 226, 152, 422, 608, 291, 995, 44, 412, 45, 232, 542, 281, 475, 809,
//     499, 709, 657, 865, 679, 746, 348, 885, 297, 29, 69, 851, 105, 455, 280, 946,
//     387, 248, 142, 641, 563, 96, 540, 726, 561, 979, 114, 907, 63, 777, 295, 746,
//     957, 68, 599, 320, 492, 897, 406, 364, 416, 235, 747, 918, 874, 619, 80, 322,
//     842, 73, 661, 518, 463, 735, 558, 881, 320, 255, 248, 635, 619, 647, 876, 594,
//     934, 792
// ]);
