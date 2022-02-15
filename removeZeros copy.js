function removeZeros(array) {
    // console.log(array);

    // Get number of zeros
    let numberOfZeros = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 0 || array[i] === '0') numberOfZeros++;
    }

    let shifts = 0;
    for (let i = 0; i < array.length; i++) {
        if ((array[i] === 0 || array[i] === '0') && shifts < numberOfZeros) {
            for (let j = i; j < array.length; j++) {
                if ((j + 1) != array.length) {
                    let num1 = array[j];
                    let num2 = array[j + 1];
                    array[j] = num2;
                    array[j + 1] = num1;
                }
            }
            shifts++;
            if (!onlyZerosAtEnd(array)) i = -1;
        }
    }

    return array;
}

function onlyZerosAtEnd(array) {
    for (let i = 0; array.length; i++) {
        if (array[i] == 0) {
            for (let j = i; j < array.length; j++) {
                if (array[j] != 0) {
                    return false;
                }
            }
        }
    }

    return true;
}

// console.log(removeZeros([0, 1, 2, 0, 3]));
// console.log(removeZeros([0, "0", 1, 2, 3]));
// console.log(removeZeros(["0", 0, 1, 2, 3]));
console.log(onlyZerosAtEnd([1, 2, 3, 0, "0"]));
console.log(onlyZerosAtEnd([1, 2, 3, 0, 0, 0]));
console.log(onlyZerosAtEnd([1, 2, 3, 0, 0, 5, 0, 0]));
console.log(onlyZerosAtEnd([0, "0", 1, 2, 3]));

// console.log(0 == 0);
// console.log("0" != 1);

