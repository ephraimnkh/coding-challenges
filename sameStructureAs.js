// Array.prototype.sameStructureAs = function (other) {
//     // Return 'true' if and only if 'other' has the same
//     // nesting structure as 'this'.

//     // Note: You are given a function isArray(o) that returns
//     // whether its argument is an array.

//     // firstListOfLengths
//     // secondListOfLengths
//     // firstListOfLengths initially add original array length 
//     // secondListOfLengths initially add original array length
//     // make two loops adding the lengths of all the respective elements of an array
//     if (!Array.isArray(this) || !Array.isArray(other)) return false;
//     let firstLengths = getArrayLength(this);
//     let secondLengths = getArrayLength(other);
//     let firstArrayIndices = getArrayIndices(this);
//     let secondArrayIndices = getArrayIndices(other);
//     // console.log(`firstLengths: ${firstLengths}`);
//     // console.log(`secondLengths: ${secondLengths}`);
//     let sameLength = firstLengths.length === secondLengths.length ? true : false;
//     let sameArrayIndiceLength = firstArrayIndices.length === secondArrayIndices.length ? true : false;
//     let count = 0;
//     let length = 0;
//     if (sameLength) {
//         length = firstLengths.length;
//         firstLengths.forEach((value, index) => {
//             if (firstLengths[index] === secondLengths[index]) count++;
//         });
//     }
//     // console.log(`${length} === ${count} && ${sameLength}`);
//     // console.log(length === count && sameLength);
//     let arrayIndiceCount = 0;
//     let arrayIndiceLength = 0;
//     if (sameArrayIndiceLength) {
//         arrayIndiceLength = firstArrayIndices.length;
//         firstArrayIndices.forEach((value, index) => {
//             if (firstArrayIndices[index] === secondArrayIndices[index]) arrayIndiceCount++;
//         });
//     }

//     console.log(length === count && sameLength && sameArrayIndiceLength && arrayIndiceLength === arrayIndiceCount);
//     return length === count && sameLength && sameArrayIndiceLength && arrayIndiceLength === arrayIndiceCount;

//     // console.log(getArrayIndices(this));
// };

// const getArrayLength = array => {
//     let length = [];
//     length.push(array.length);
//     array.forEach(item => {
//         if (Array.isArray(item)) length = length.concat(getArrayLength(item));
//     });
//     return length;
// }

// const getArrayIndices = (array, indices = []) => {
//     array.forEach((item, index) => {
//         if (Array.isArray(item)) {
//             // let newIndice = indices.length > 0 ? indices.push(indices[indices.length - 1], index) : indices.push(index);
//             indices.length > 0 ? indices.push(indices[indices.length - 1], index) : indices.push(index);
//             // indices.push(newIndice);
//             indices.concat(getArrayIndices(item, indices));
//         }
//     });
//     return indices;
// }

// should return true








// Submitted Solution
Array.prototype.sameStructureAs = function (other) {
    if (!Array.isArray(this) || !Array.isArray(other)) return false;
    let firstLengths = getArrayLength(this);
    let secondLengths = getArrayLength(other);
    let firstArrayIndices = getArrayIndices(this);
    let secondArrayIndices = getArrayIndices(other);
    let sameLength = firstLengths.length === secondLengths.length ? true : false;
    let sameArrayIndiceLength = firstArrayIndices.length === secondArrayIndices.length ? true : false;
    let count = 0;
    let length = 0;
    if (sameLength) {
        length = firstLengths.length;
        firstLengths.forEach((value, index) => {
            if (firstLengths[index] === secondLengths[index]) count++;
        });
    }
    let arrayIndiceCount = 0;
    let arrayIndiceLength = 0;
    if (sameArrayIndiceLength) {
        arrayIndiceLength = firstArrayIndices.length;
        firstArrayIndices.forEach((value, index) => {
            if (firstArrayIndices[index] === secondArrayIndices[index]) arrayIndiceCount++;
        });
    }

    return length === count && sameLength && sameArrayIndiceLength && arrayIndiceLength === arrayIndiceCount;
};

const getArrayLength = array => {
    let length = [array.length];
    array.forEach(item => {
        if (Array.isArray(item)) length = length.concat(getArrayLength(item));
    });
    return length;
}

const getArrayIndices = (array, indices = []) => {
    array.forEach((item, index) => {
        if (Array.isArray(item)) {
            indices.length > 0 ? indices.push(indices[indices.length - 1], index) : indices.push(index);
            indices.concat(getArrayIndices(item, indices));
        }
    });
    return indices;
}

[1, 1, 1].sameStructureAs([2, 2, 2]);
[1, [1, 1]].sameStructureAs([2, [2, 2]]);

// should return false 
[1, [1, 1]].sameStructureAs([[2, 2], 2]);
// [1, [1, 1, [1, 1, 1, [1, 1, 1, [1, 1, 1, 1, 1]]]]].sameStructureAs([[2, 2, [2, 2, 2]], 2]);
[1, [1, 1]].sameStructureAs([[2], 2]);

// should return true
[[[], []]].sameStructureAs([[[], []]]);

// should return false
[[[], []]].sameStructureAs([[1, 1]]);

// console.log(`[1, 1, 1] === [1, 1, 1]: ${[1, 1, 1] === [1, 1, 1]}`);
// let temp = [[[], []]];
// console.log(`temp[0][0][0]: ${temp[0][0][0]}`);