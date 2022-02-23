// Submitted solution
var decodeBits = function (bits) {
    bits = bits.replace(/^0+1|10+$/g, '1');
    let originalBits = bits;
    bits = replaceSpecialOnes(bits);
    bits = bits === originalBits ? bits : replaceSpecialZeros(bits);
    bits = abortBasedOnZero(bits) ? originalBits : bits;
    return bits.replace(/1{6,}/g, '111').replace(/1{3}/g, '-').replace(/1{2,}/g, '1').replace(/1{1}/g, '.').replace(/0{14,}/g, '0000000').replace(/0{7}/g, '   ').replace(/0{6,}/g, '000').replace(/0{3}/g, ' ').replace(/0{2,}/g, '0').replace(/0{1}/g, '');
}

var replaceSpecialOnes = function (bits) {
    let originalBits = bits;
    const oneRegex = new RegExp(`1{3,}`, 'g');
    const seriesOfOnes = bits.match(oneRegex);

    let uniqueSeriesOfOnes = [];

    // Check if multiple bit 1s are present if not then return the originalBits
    if (seriesOfOnes == null) return originalBits;

    // take all multiple bits of 1 and add unique ones to the unique array if they are an odd sequence of 1s 
    // as those seem to indicate that it is weird 1s as regular 1s are even or small and odd not large and odd like
    // 5 1s and more or 3 if there isn't a single 1 present
    seriesOfOnes.forEach(value => {
        if (!uniqueSeriesOfOnes.includes(value) && (value.length % 2 > 0))
            uniqueSeriesOfOnes.push(value);
    });

    // if only 2 types of unique numbers then likely it's a pattern for - and . with the bigger number being for a -
    // and the smaller number being for a .
    if (uniqueSeriesOfOnes.length % 2 === 0) {
        let bigger1 = uniqueSeriesOfOnes[0] > uniqueSeriesOfOnes[1] ? uniqueSeriesOfOnes[0] : uniqueSeriesOfOnes[1];
        uniqueSeriesOfOnes.forEach(value => {
            let expression = new RegExp(`${value}`, 'g');
            if (value === bigger1) bits = bits.replace(expression, '-');
            else bits = bits.replace(expression, '.');
        });
    } else {
        // transform all the weird types of 1s into a . as this is the default if it is difficult to decipher if a 1 is a 
        // multi bit 1 or a regular 1
        uniqueSeriesOfOnes.forEach(value => {
            let expression = new RegExp(`${value}`, 'g');
            bits = bits.replace(expression, '.');
        });
    }

    // abort if there is a regular 1 still left as it means single ones are in use instead of 1s with multiple bits.
    if (bits.indexOf('1') >= 0) return originalBits;

    return bits;
}

var replaceSpecialZeros = function (bits) {
    let originalBits = bits;
    const oneRegex = new RegExp(`0{3,}`, 'g');
    const seriesOfZeros = bits.match(oneRegex);

    let uniqueSeriesOfZeros = [];

    if (seriesOfZeros == null) return bits;

    seriesOfZeros.forEach(value => {
        if (!uniqueSeriesOfZeros.includes(value) && (value.length % 2 > 0))
            uniqueSeriesOfZeros.push(value);
    });


    uniqueSeriesOfZeros = uniqueSeriesOfZeros.sort().reverse();

    // if only 3 types of unique numbers then likely it's a pattern for no space, \s  and \s\s\s, with the biggest number being 
    // for a \s\s\s
    // the next smaller number being for a \s and the smallest number being for no space, so we'll order the numbers
    // from smallest to largest and apply the appropriate spacing.
    // so when sorted the first number (index === 0) will be for no spacing, the second number (index === 1) will be for 1 space
    // and the last or third number (index === 2) will be for triple spacing.
    if (uniqueSeriesOfZeros.length % 3 === 0) {
        uniqueSeriesOfZeros.forEach((value, index) => {
            let expression = new RegExp(`${value}`, 'g');
            if (index === 0) bits = bits.replace(expression, '   ');
            if (index === 1) bits = bits.replace(expression, ' ');
            if (index === 2) bits = bits.replace(expression, '');
        });
    } else {
        // transform all the weird types of 0s into a '' as this is the default if it is difficult to decipher if a 0 is a 
        // multi bit 0 or a regular 0
        uniqueSeriesOfZeros.forEach(value => {
            let expression = new RegExp(`${value}`, 'g');
            bits = bits.replace(expression, '');
        });
    }

    return bits.indexOf('0') >= 0 ? originalBits : bits;
}

var abortBasedOnZero = function (bits) {
    const seriesOfZeros = bits.match(/0{3,}/g);

    if (seriesOfZeros == null) return bits.indexOf('0') >= 0;

    let uniqueSeriesOfZeros = [];

    seriesOfZeros.forEach(value => {
        if (!uniqueSeriesOfZeros.includes(value) && (value.length % 2 > 0))
            uniqueSeriesOfZeros.push(value);
    });

    uniqueSeriesOfZeros.forEach(value => {
        let expression = new RegExp(`${value}`, 'g');
        bits = bits.replace(expression, '');
    });

    return bits.indexOf('0') >= 0;
}

var decodeMorse = function (morseCode) {
    let morseWords = morseCode.trim().split(/\s\s\s+/g);
    let tempWord = [];
    let words = [];
    morseWords = morseWords.map(word => {
        word.split(/\s/g).forEach(item => {
            tempWord.push(MORSE_CODE[item]);
        });
        words.push(tempWord.join(''));
        tempWord = [];
    });
    return words.join(' ');
}

let expected = '- .... .   --.- ..- .. -.-. -.-   -... .-. --- .-- -.   ..-. --- -..-   .--- ..- -- .--. ...   --- ...- . .-.   - .... .   .-.. .- --.. -.--   -.. --- --. .-.-.-';

console.log(decodeBits('110011'));

console.log(`length of digits: ${'000000000000000'.length}`);

// var decodeBits = function (bits) {
//     bits = bits.replace(/^0+1|10+$/g, '1'); // trim leading and trailing 0s
//     let originalBits = bits;
//     bits = replaceSpecialOnes(bits);
//     bits = bits === originalBits ? bits : replaceSpecialZeros(bits);
//     let abort = abortBasedOnZero(bits);
//     bits = abort ? originalBits : bits;
//     console.log(`decodeBits bits: ${bits}`);
//     return bits.replace(/1{6,}/g, '111').replace(/1{3}/g, '-').replace(/1{2,}/g, '1').replace(/1{1}/g, '.').replace(/0{14,}/g, '0000000').replace(/0{7}/g, '   ').replace(/0{6,}/g, '000').replace(/0{3}/g, ' ').replace(/0{2,}/g, '0').replace(/0{1}/g, '');
// }

// var replaceSpecialOnes = function (bits) {
//     let originalBits = bits;
//     const oneRegex = new RegExp(`1{3,}`, 'g');
//     const seriesOfOnes = bits.match(oneRegex);

//     let uniqueSeriesOfOnes = [];

//     // Check if multiple bit 1s are present if not then return the originalBits
//     if (seriesOfOnes == null) return originalBits;

//     // take all multiple bits of 1 and add unique ones to the unique array if they are an odd sequence of 1s 
//     // as those seem to indicate that it is weird 1s as regular 1s are even or small and odd not large and odd like
//     // 5 1s and more or 3 if there isn't a single 1 present
//     seriesOfOnes.forEach(value => {
//         if (!uniqueSeriesOfOnes.includes(value) && (value.length % 2 > 0))
//             uniqueSeriesOfOnes.push(value);
//     });

//     console.log(`Types of 1s: ${uniqueSeriesOfOnes}`);
//     console.log(`No. of types of 1s: ${uniqueSeriesOfOnes.length}`);

//     // if only 2 types of unique numbers then likely it's a pattern for - and . with the bigger number being for a -
//     // and the smaller number being for a .
//     if (uniqueSeriesOfOnes.length % 2 === 0) {
//         let bigger1 = uniqueSeriesOfOnes[0] > uniqueSeriesOfOnes[1] ? uniqueSeriesOfOnes[0] : uniqueSeriesOfOnes[1];
//         uniqueSeriesOfOnes.forEach(value => {
//             let expression = new RegExp(`${value}`, 'g');
//             if (value === bigger1) bits = bits.replace(expression, '-');
//             else bits = bits.replace(expression, '.');
//         });
//     } else {
//         // transform all the weird types of 1s into a . as this is the default if it is difficult to decipher if a 1 is a 
//         // multi bit 1 or a regular 1
//         uniqueSeriesOfOnes.forEach(value => {
//             let expression = new RegExp(`${value}`, 'g');
//             bits = bits.replace(expression, '.');
//         });
//     }

//     // abort if there is a regular 1 still left as it means single ones are in use instead of 1s with multiple bits.
//     if (bits.indexOf('1') >= 0) return originalBits;

//     return bits;
// }

// var replaceSpecialZeros = function (bits) {
//     let originalBits = bits;
//     const oneRegex = new RegExp(`0{3,}`, 'g');
//     const seriesOfZeros = bits.match(oneRegex);

//     let uniqueSeriesOfZeros = [];
//     let includedSeriesOfZeros = [];

//     if (seriesOfZeros == null) return bits;

//     seriesOfZeros.forEach(value => {
//         if (!includedSeriesOfZeros.includes(value) && (value.length % 2 > 0)) {
//             uniqueSeriesOfZeros.push(value);
//             includedSeriesOfZeros.push(value);
//         }
//     });

//     console.log(`Types of 0s: ${uniqueSeriesOfZeros}`);
//     console.log(`No. of types of 0s: ${uniqueSeriesOfZeros.length}`);


//     uniqueSeriesOfZeros = uniqueSeriesOfZeros.sort().reverse();

//     console.log(`Types of 0s post sort: ${uniqueSeriesOfZeros}`);

//     // if only 3 types of unique numbers then likely it's a pattern for no space, \s  and \s\s\s, with the biggest number being 
//     // for a \s\s\s
//     // the next smaller number being for a \s and the smallest number being for no space, so we'll order the numbers
//     // from smallest to largest and apply the appropriate spacing.
//     // so when sorted the first number (index === 0) will be for no spacing, the second number (index === 1) will be for 1 space
//     // and the last or third number (index === 2) will be for triple spacing.
//     if (uniqueSeriesOfZeros.length % 3 === 0) {
//         uniqueSeriesOfZeros.forEach((value, index) => {
//             let expression = new RegExp(`${value}`, 'g');
//             if (index === 0) bits = bits.replace(expression, '   ');
//             if (index === 1) bits = bits.replace(expression, ' ');
//             if (index === 2) bits = bits.replace(expression, '');
//         });
//     } else {
//         // transform all the weird types of 0s into a '' as this is the default if it is difficult to decipher if a 0 is a 
//         // multi bit 0 or a regular 0
//         uniqueSeriesOfZeros.forEach(value => {
//             let expression = new RegExp(`${value}`, 'g');
//             bits = bits.replace(expression, '');
//         });
//     }


//     if (bits.indexOf('0') >= 0) return originalBits;

//     return bits;
// }

// var abortBasedOnZero = function (bits) {
//     const zeroRegex = new RegExp(`0{3,}`, 'g');
//     const seriesOfZeros = bits.match(zeroRegex);

//     let uniqueSeriesOfZeros = [];
//     let includedSeriesOfZeros = [];

//     let abort = bits.indexOf('0') >= 0 ? true : false;

//     if (seriesOfZeros == null) return abort;

//     seriesOfZeros.forEach(value => {
//         if (!includedSeriesOfZeros.includes(value) && (value.length % 2 > 0)) {
//             uniqueSeriesOfZeros.push(value);
//             includedSeriesOfZeros.push(value);
//         }
//     });

//     uniqueSeriesOfZeros.forEach(value => {
//         let expression = new RegExp(`${value}`, 'g');
//         bits = bits.replace(expression, '.');
//     });

//     return bits.indexOf('0') >= 0;
// }

// var decodeMorse = function (morseCode) {
//     console.log(`morseCode: ${morseCode}`);
//     let morseWords = morseCode.trim().split(/\s\s\s+/g);
//     let tempWord = [];
//     let words = [];
//     morseWords = morseWords.map(word => {
//         word.split(/\s/g).forEach(item => {
//             tempWord.push(MORSE_CODE[item]);
//         });
//         words.push(tempWord.join(''));
//         tempWord = [];
//     });
//     return words.join(' ');
// }