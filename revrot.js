function revrot(str, chunkSize) {
    if (chunkSize <= 0 || str.length === 0) return "";
    if (chunkSize > str.length) return "";
    // Remove what wouldn't fit in a chunk from the the end of the string
    str = str.substring(0, str.length - (str.length % chunkSize));
    let arrayOfChunks = [];

    // String is broken into chunks of chunkSize
    let newChunk = '';
    for (let i = 0; i < str.length; i++) {
        newChunk += str.charAt(i);
        // Once chunk size is reached add chunk to array of chunks
        if ((i + 1) % chunkSize === 0) {
            arrayOfChunks.push(newChunk);
            newChunk = '';
        }
    }

    arrayOfChunks.forEach((chunk, index, array) => {
        // Reverse digits where the sum of the cube of each number in a chunk is even.
        if (sumOfCubeOfDigits(chunk) % 2 === 0) array[index] = chunk.split('').reverse().join('');
        // Else if not even remove the first digit from the chunk and add it to the end of the chunk
        else {
            let splitChunks = chunk.split('');
            splitChunks.push(splitChunks.shift());
            array[index] = splitChunks.join('');
        }
    });

    return arrayOfChunks.join('');
}

function sumOfCubeOfDigits(chunk) {
    let chunkDigitsArray = chunk.split('');
    chunkDigitsArray = chunkDigitsArray.map(stringDigit => Number(stringDigit));
    let sum = 0;
    chunkDigitsArray.forEach(number => {
        sum += Math.pow(number, 3);
    });
    return sum;
}

// Final submitted solution
// function revrot(str, sz) {
//     if (sz <= 0 || str.length === 0) return "";
//     if (sz > str.length) return "";
//     str = str.substring(0, str.length - (str.length % sz));

//     let compositeArray = [];
//     let substr = '';
//     for (let i = 0; i < str.length; i++) {
//         substr += str.charAt(i);
//         if ((i + 1) % sz === 0) {
//             compositeArray.push(substr);
//             substr = '';
//         }
//     }

//     compositeArray.forEach((digits, index, array) => {
//         if (sumOfCubeOfDigits(digits) % 2 === 0) array[index] = digits.split('').reverse().join('');
//         else {
//             let splitDigits = digits.split('');
//             splitDigits.push(splitDigits.shift());
//             array[index] = splitDigits.join('');
//         }
//     });

//     return compositeArray.join('');
// }

// function sumOfCubeOfDigits(digits) {
//     let sum = 0;
//     digits.split('').forEach(number => sum += Math.pow(number, 3));
//     return sum;
// }