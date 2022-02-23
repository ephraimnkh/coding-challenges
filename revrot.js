function revrot(str, sz) {
    if (sz <= 0 || str.length === 0) return "";
    if (sz > str.length) return "";
    // Remove what doesn't fit in the chunk
    str = str.substring(0, str.length - (str.length % sz));
    let compositeArray = [];

    let substr = '';
    for (let i = 0; i < str.length; i++) {
        substr += str.charAt(i);
        if ((i + 1) % sz === 0) {
            compositeArray.push(substr);
            substr = '';
        }
    }

    compositeArray.forEach((digits, index, array) => {
        if (sumOfCubeOfDigits(digits) % 2 === 0) array[index] = digits.split('').reverse().join('');
        else {
            let splitDigits = digits.split('');
            splitDigits.push(splitDigits.shift());
            array[index] = splitDigits.join('');
        }
    });

    return compositeArray.join('');
}

function sumOfCubeOfDigits(digits) {
    let digitsArray = digits.split('');
    digitsArray = digitsArray.map(stringDigit => Number(stringDigit));
    let sum = 0;
    digitsArray.forEach(number => {
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