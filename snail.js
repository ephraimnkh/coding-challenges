snail = function (array) {
    console.log(`array: ${array}`);
    console.log(`array.length: ${array.length}`);
    if (array[0].length === 0) return [];
    // enjoy
    let duplicates = canDuplicate(array);
    let output = [];
    let tranversalLength = Math.pow(array.length, 2);
    let innerTranversalLength = Math.sqrt(tranversalLength);
    // Box Mappings
    let firstColumn = 0;
    let lastColumn = array.length - 1;
    let firstRow = 0;
    let lastRow = array.length - 1;
    let activeRow = 0;
    let activeColumn = 0;
    // Make Mapping for all corners
    let firstCorner = [firstRow, firstColumn];
    let secondCorner = [firstRow, lastColumn];
    let thirdCorner = [lastRow, lastColumn];
    let fourthCorner = [lastRow, firstColumn];
    let initialCorners = [firstCorner, secondCorner, thirdCorner, fourthCorner];
    let corners = [firstCorner, secondCorner, thirdCorner, fourthCorner];
    // console.log(`tranversalLength: ${tranversalLength}`);
    // console.log(`firstColumn: ${firstColumn}`);
    // console.log(`lastColumn: ${lastColumn}`);
    // console.log(`firstRow: ${firstRow}`);
    // console.log(`lastRow: ${lastRow}`);
    // console.log(`firstCorner: ${firstCorner}`);
    // console.log(`secondCorner: ${secondCorner}`);
    // console.log(`thirdCorner: ${thirdCorner}`);
    // console.log(`fourthCorner: ${fourthCorner}`);
    // console.table(corners);
    let activeCorner = 0;
    // If at a corner then update to new corner if there is one and change direction if not start and 
    // continue traversal until traversal length
    for (let i = 0; i < tranversalLength; i++) {
        if (activeCorner === 0) {
            activeRow = corners[activeCorner][0];
            activeColumn = corners[activeCorner][1];
            // console.log(`--------------------------------`);
            // console.log(`activeCorner 0`);
            while (activeColumn < innerTranversalLength) {
                // console.log(`active row: ${activeRow}, activeColumn: ${activeColumn}, array[activeRow][activeColumn]: ${array[activeRow][activeColumn]}`);
                if (!output.includes(array[activeRow][activeColumn]) || (duplicates.includes(array[activeRow][activeColumn]) && duplicates[duplicates.indexOf(array[activeRow][activeColumn]) + 1] > getOccurances(output, array[activeRow][activeColumn]))) output.push(array[activeRow][activeColumn]);
                activeColumn++;
            }
            activeCorner++;
            if (!array[activeRow + 1]) break;
            if (array[activeRow + 1][activeColumn - innerTranversalLength] != undefined) corners[0] = [activeRow + 1, activeColumn - innerTranversalLength];
        }
        if (activeCorner === 1) {
            activeRow = corners[activeCorner][0];
            activeColumn = corners[activeCorner][1];
            // console.log(`--------------------------------`);
            // console.log(`activeCorner 1`);
            while (activeRow < innerTranversalLength) {
                // console.log(`active row: ${activeRow}, activeColumn: ${activeColumn}, array[activeRow][activeColumn]: ${array[activeRow][activeColumn]}`);
                if (!output.includes(array[activeRow][activeColumn]) || (duplicates.includes(array[activeRow][activeColumn]) && duplicates[duplicates.indexOf(array[activeRow][activeColumn]) + 1] > getOccurances(output, array[activeRow][activeColumn]))) output.push(array[activeRow][activeColumn]);
                activeRow++;
            }
            activeCorner++;
            if (array[activeRow - (innerTranversalLength - 1)][activeColumn - 1] != undefined) corners[1] = [activeRow - (innerTranversalLength - 1), activeColumn - 1];
        }
        if (activeCorner === 2) {
            activeRow = corners[activeCorner][0];
            activeColumn = corners[activeCorner][1];
            // console.log(`--------------------------------`);
            // console.log(`activeCorner 2`);
            while (activeColumn >= 0) {
                // console.log(`active row: ${activeRow}, activeColumn: ${activeColumn}, array[activeRow][activeColumn]: ${array[activeRow][activeColumn]}`);
                if (!output.includes(array[activeRow][activeColumn]) || (duplicates.includes(array[activeRow][activeColumn]) && duplicates[duplicates.indexOf(array[activeRow][activeColumn]) + 1] > getOccurances(output, array[activeRow][activeColumn]))) output.push(array[activeRow][activeColumn]);
                activeColumn--;
            }
            activeCorner++;
            if (array[activeRow - 1][activeColumn + (innerTranversalLength - 1)] != undefined) corners[2] = [activeRow - 1, activeColumn + (innerTranversalLength - 1)];
        }
        // console.table(corners);
        if (activeCorner === 3) {
            // console.table(corners);
            activeRow = corners[activeCorner][0];
            activeColumn = corners[activeCorner][1];
            // console.log(`--------------------------------`);
            // console.log(`activeCorner 3`);
            let deadEnd = false;
            while (activeRow > 0 && !deadEnd) {
                if ((activeRow == initialCorners[0][0] && activeColumn == initialCorners[0][1])) {
                    // console.log('Dead end!');
                    deadEnd = true;
                } else {
                    // console.log(`active row: ${activeRow}, activeColumn: ${activeColumn}, array[activeRow][activeColumn]: ${array[activeRow][activeColumn]}`);
                    if (!output.includes(array[activeRow][activeColumn]) || (duplicates.includes(array[activeRow][activeColumn]) && duplicates[duplicates.indexOf(array[activeRow][activeColumn]) + 1] > getOccurances(output, array[activeRow][activeColumn]))) output.push(array[activeRow][activeColumn]);
                    activeRow--;
                }
            }
            if (tranversalLength !== (i + 1)) {
                activeCorner = 0;
                activeRow = activeRow === 0 ? activeRow + (innerTranversalLength - 1) : activeRow;
                // console.log(`active row: ${activeRow}, activeColumn: ${activeColumn}`);
                if (array[activeRow - 1][activeColumn + 1] != undefined) corners[3] = [activeRow - 1, activeColumn + 1];
            }
        }
    }
    // console.table(corners);
    return output;
}

getOccurances = (array, value) => {
    let occurances = 0;
    array.forEach(number => {
        if (number === value) occurances += 1;
    });
    // console.log(`occurances: ${occurances}`);
    return occurances;
}

canDuplicate = (array) => {
    let occurances = [];
    let numbers = [];
    let duplicates = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (numbers.includes(array[i][j])) occurances[numbers.indexOf(array[i][j])] += 1;
            else {
                numbers.push(array[i][j]);
                occurances.push(1);
            }
        }
    }
    occurances.forEach((value, index) => {
        if (value > 1) {
            duplicates.push(numbers[index]);
            duplicates.push(value);
        }
    })
    return duplicates;
}

// snail([1, 2, 3]);
// console.log('output: ' + snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
// console.log('output: ' + snail([[934, 500, 515], [595, 964, 713], [713, 770, 666]]));
// console.log(`output ${snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]])}`);
// console.log(`output ${snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]])}`);


// printSquare = (square) => {
//     for (let i = 0; i < square.length; i++) {
//         for (let j = 0; j < square.length; j++) {
//             process.stdout.write(`${square[i][j]}`);
//             if ((j + 1) != square.length) process.stdout.write(` | `);
//         }
//         console.log('');
//     }
// }

printSquare = (square) => {
    let pointer = 0;
    for (let i = 0; i < 15; i++) {
        let j = 0;
        while (j < 15) {
            process.stdout.write(`${square[pointer]}`);
            if ((j + 1) != 15) process.stdout.write(` | `);
            j++;
            pointer++;
        }
        console.log('');
    }
}
// printSquare([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]);
// printSquare([[934, 500, 515], [595, 964, 713], [713, 770, 666]]);
printSquare([574, 803, 261, 567, 906, 143, 747, 546, 496, 287, 49, 787, 85, 645, 494, 815, 231, 303, 14, 416, 494, 179, 497, 513, 517, 689, 616, 91, 89, 491, 488, 240, 261, 734, 84, 708, 927, 65, 984, 78, 281, 56, 711, 509, 149, 736, 719, 915, 876, 402, 53, 19, 587, 46, 700, 456, 310, 436, 582, 552, 122, 210, 800, 826, 866, 664, 203, 800, 238, 854, 244, 696, 488, 711, 841, 612, 36, 174, 412, 200, 379, 401, 690, 509, 229, 300, 917, 755, 142, 883, 461, 182, 522, 487, 120, 481, 803, 175, 636, 64, 910, 964, 375, 475, 749, 370, 331, 614, 561, 710, 586, 469, 297, 397, 913, 107, 724, 550, 520, 851, 378, 208, 80, 683, 726, 83, 2, 209, 762, 92, 492, 913, 222, 47, 755, 121, 561, 791, 153, 617, 217, 502, 487, 278, 911, 226, 152, 422, 608, 291, 995, 44, 412, 45, 232, 542, 281, 475, 809, 499, 709, 657, 865, 679, 746, 348, 885, 297, 29, 69, 851, 105, 455, 280, 946, 387, 248, 142, 641, 563, 96, 540, 726, 561, 979, 114, 907, 63, 777, 295, 746, 957, 68, 599, 320, 492, 897, 406, 364, 416, 235, 747, 918, 874, 619, 80, 322, 842, 73, 661, 518, 463, 735, 558, 881, 320, 255, 248, 635, 619, 647, 876, 594, 934, 792]);
// console.log(canDuplicate([[934, 500, 515], [595, 964, 713], [713, 770, 666]]));

let arr = [
    574, 803, 261, 567, 906, 143, 747, 546, 496, 287, 49, 787, 85, 645, 494, 494,
    491, 149, 552, 841, 883, 749, 851, 755, 291, 746, 563, 320, 661, 792, 934,
    594, 876, 647, 619, 635, 248, 255, 320, 881, 558, 735, 463, 518, 492, 96, 348,
    995, 121, 378, 370, 461, 612, 122, 736, 488, 815, 231, 303, 14, 416, 179, 497,
    513, 517, 689, 616, 91, 89, 509, 582, 711, 142, 475, 520, 47, 608, 679, 641,
    599, 73, 842, 322, 80, 619, 874, 918, 747, 235, 416, 364, 406, 897, 492, 540,
    885, 44, 561, 208, 331, 182, 36, 210, 719, 240, 488, 261, 734, 84, 708, 927,
    65, 984, 78, 281, 56, 711, 509, 436, 755, 375, 550, 222, 422, 865, 142, 68,
    957, 746, 295, 777, 63, 907, 114, 979, 561, 726, 726, 297, 412, 791, 80, 614,
    522, 174, 800, 915, 876, 402, 53, 19, 587, 46, 700, 456, 310, 696, 917, 964,
    724, 913, 152, 657, 248, 387, 946, 280, 455, 105, 851, 69, 29, 297, 561, 45,
    153, 683, 487, 412, 826, 800, 866, 664, 203, 238, 854, 244, 281, 300, 910,
    107, 226, 709, 499, 809, 475, 542, 232, 617, 710, 120, 200, 379, 401, 690,
    229, 64, 913, 92, 911, 278, 487, 502, 217, 83, 586, 481, 803, 175, 636, 397,
    762, 209, 2, 2, 469, 2, 2
];

let arr2 = [
    574, 803, 261, 567, 906, 143, 747, 546, 496, 287, 49, 787, 85, 645, 494, 491,
    149, 552, 841, 883, 749, 851, 755, 291, 746, 563, 320, 661, 792, 934, 594,
    876, 647, 619, 635, 248, 255, 320, 881, 558, 735, 463, 518, 492, 96, 348, 995,
    121, 378, 370, 461, 612, 122, 736, 488, 815, 231, 303, 14, 416, 494, 179, 497,
    513, 517, 689, 616, 91, 89, 509, 582, 711, 142, 475, 520, 47, 608, 679, 641,
    599, 73, 842, 322, 80, 619, 874, 918, 747, 235, 416, 364, 406, 897, 540, 885,
    44, 561, 208, 331, 182, 36, 210, 719, 240, 261, 734, 84, 708, 927, 65, 984,
    78, 281, 56, 711, 436, 488, 755, 375, 550, 222, 422, 865, 142, 68, 957, 746,
    295, 777, 63, 907, 114, 979, 561, 726, 297, 412, 791, 80, 614, 522, 174, 800,
    915, 876, 402, 53, 19, 587, 46, 700, 456, 310, 696, 917, 964, 724, 913, 152,
    657, 248, 387, 946, 280, 455, 105, 851, 69, 29, 45, 153, 683, 561, 487, 412,
    826, 866, 664, 203, 800, 238, 854, 244, 300, 910, 107, 492, 226, 709, 499,
    809, 475, 281, 542, 232, 617, 726, 710, 120, 200, 379, 401, 690, 509, 229, 64,
    913, 92, 911, 278, 487, 502, 217, 83, 586, 481, 803, 175, 636, 397, 762, 209,
    2, 469, 297
];
