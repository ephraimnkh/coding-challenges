function brainLuck(code, input) {
    let dataPointer = 0;
    let bytes = Array(12000);
    let codeArray = code.split('');
    let output = [];
    let bracketPairings = matchBrackets(bracketMapping(code));
    for (let i = 0; i < codeArray.length; i++) {
        // console.log(`--------------------------------------`);
        // console.log(`code right now: ${codeArray[i]}`);
        // console.log(`--------------------------------------`);
        // console.log(`i: ${i}`);
        // console.log(`--------------------------------------`);
        if (codeArray[i] === '>' && dataPointer < bytes.length) {
            // console.log(`--------------------------------------`);
            // console.log(`>: data pointer before: ${dataPointer}`);
            dataPointer++;
            // console.log(`>: data pointer after: ${dataPointer}`);
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === '<' && dataPointer >= 0) {
            // console.log(`--------------------------------------`);
            // console.log(`<: data pointer before: ${dataPointer}`);
            dataPointer--;
            // console.log(`<: data pointer after: ${dataPointer}`);
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === '+') {
            // console.log(`--------------------------------------`);
            let temp = bytes[dataPointer] ? bytes[dataPointer] : 0;
            // console.log(`+: initial temp: ${temp}`);
            temp < 255 ? temp++ : temp = 0;
            // console.log(`+: incremented temp: ${temp}`);
            bytes[dataPointer] = temp;
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === '-') {
            // console.log(`--------------------------------------`);
            let temp = bytes[dataPointer] ? bytes[dataPointer] : 0;
            // console.log(`-: initial temp: ${temp}`);
            temp > 0 ? temp-- : temp = 255;
            // console.log(`-: decremented temp: ${temp}`);
            bytes[dataPointer] = temp;
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === '.') {
            // console.log(`--------------------------------------`);
            // console.log(`output byte: ${bytes[dataPointer]}`);
            process.stdout.write(`${String.fromCharCode(bytes[dataPointer])}`);
            output.push(String.fromCharCode(bytes[dataPointer]));
            // console.log(`.: Print: ${String.fromCharCode(bytes[dataPointer])}`);
            // console.log(`output byte: ${String.fromCharCode(bytes[dataPointer])}`);
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === ',') {
            // console.log(`--------------------------------------`);
            // console.log(`old input: ${input}`);
            bytes[dataPointer] = input.charCodeAt(0);
            // console.log(`take byte: ${bytes[dataPointer]}`);
            // console.log(`push byte: ${input.charAt(0)}`);
            input = input.substring(1);
            // console.log(`new input: ${input}`);
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === '[' && (bytes[dataPointer] === 0 || bytes[dataPointer] === undefined)) {
            // console.log(`--------------------------------------`);
            // console.log(`[: i before: ${i}`);
            let pairing = bracketPairings.find(pair => pair[0] === i);
            let newIndex = pairing[1];
            (newIndex + 1) < codeArray.length ? i = newIndex : i = codeArray.length;
            // console.log(`[: i after: ${i}`);
            // console.log(`--------------------------------------`);
        }

        if (codeArray[i] === ']' && (bytes[dataPointer] > 0 && bytes[dataPointer] !== undefined)) {
            // console.log(`--------------------------------------`);
            // console.log(`]: i before: ${i}`);
            let pairing = bracketPairings.find(pair => pair[1] === i);
            let newIndex = pairing[0];
            (newIndex + 1) < codeArray.length ? i = newIndex : i = codeArray.length;
            // console.log(`]: i after: ${i}`);
            // console.log(`--------------------------------------`);
        }

    }
    return output.join('');
}

// console.log(`\nOutput: ${brainLuck(',+[-.,+]', 'Codewars' + String.fromCharCode(255))}`);
console.log(`\nOutput: ${brainLuck(',[.[-],]', 'Codewars' + String.fromCharCode(0))}`);
// console.log(brainLuck(',[.[-],]', 'Codewars' + String.fromCharCode(0)));
// console.log(brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8, 9)));
// bracketMapping(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.');
// console.log(matchBrackets(bracketMapping(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.')));

function bracketMapping(code) {
    let leftBrackets = [];
    let rightBrackets = [];
    code.split('').forEach((item, index) => {
        if (item === '[') leftBrackets.push(index);
        if (item === ']') rightBrackets.push(index);
    });
    // return `Left Brackets: ${leftBrackets} | Right Brackets: ${rightBrackets}`;
    console.log(`Left Brackets: ${leftBrackets} | Right Brackets: ${rightBrackets}`);
    return { left: leftBrackets, right: rightBrackets };
}



function matchBrackets(brackets) {
    let bracketPairings = [];
    let includedNumbers = [];
    let left = brackets.left.reverse();
    let right = brackets.right;
    left.forEach((leftBracket, leftIndex) => {
        right.forEach((rightBracket, rightIndex) => {
            if (rightBracket - leftBracket > 0) {
                if (!includedNumbers.includes(leftBracket) && !includedNumbers.includes(rightBracket)) {
                    bracketPairings.push([leftBracket, rightBracket]);
                    includedNumbers.push(leftBracket, rightBracket);
                }
            }
        });
    });
    console.log(`Bracket Pairings: ${bracketPairings} | Included Numbers: ${includedNumbers}`);
    return bracketPairings;
}

// Submitted Solution
// function brainLuck(code, input) {
//     let dataPointer = 0;
//     let bytes = Array(12000);
//     let output = [];
//     let codeArray = code.split('');
//     let bracketPairings = matchBrackets(code);

//     for (let i = 0; i < codeArray.length; i++) {

//         if (codeArray[i] === '>' && dataPointer < bytes.length) dataPointer++;

//         if (codeArray[i] === '<' && dataPointer >= 0) dataPointer--;

//         if (codeArray[i] === '+' || codeArray[i] === '-') {
//             let temp = bytes[dataPointer] ? bytes[dataPointer] : 0;
//             if (codeArray[i] === '+') temp < 255 ? temp++ : temp = 0;
//             if (codeArray[i] === '-') temp > 0 ? temp-- : temp = 255;
//             bytes[dataPointer] = temp;
//         }

//         if (codeArray[i] === '.') output.push(String.fromCharCode(bytes[dataPointer]));

//         if (codeArray[i] === ',') {
//             bytes[dataPointer] = input.charCodeAt(0);
//             input = input.substring(1);
//         }

//         if (codeArray[i] === '[' && (bytes[dataPointer] === 0 || bytes[dataPointer] === undefined)) {
//             let newIndex = bracketPairings.find(pair => pair[0] === i)[1];
//             (newIndex + 1) < codeArray.length ? i = newIndex : i = codeArray.length;
//         }

//         if (codeArray[i] === ']' && (bytes[dataPointer] > 0 && bytes[dataPointer] !== undefined)) {
//             let newIndex = bracketPairings.find(pair => pair[1] === i)[0];
//             (newIndex + 1) < codeArray.length ? i = newIndex : i = codeArray.length;
//         }

//     }
//     return output.join('');
// }

// function matchBrackets(code) {
//     let bracketPairings = [];
//     let includedNumbers = [];
//     let leftBrackets = [];
//     let rightBrackets = [];

//     code.split('').forEach((item, index) => {
//         if (item === '[') leftBrackets.push(index);
//         if (item === ']') rightBrackets.push(index);
//     });

//     leftBrackets = leftBrackets.reverse();
//     leftBrackets.forEach((leftBracket, leftIndex) => {
//         rightBrackets.forEach((rightBracket, rightIndex) => {
//             if (rightBracket - leftBracket > 0) {
//                 if (!includedNumbers.includes(leftBracket) && !includedNumbers.includes(rightBracket)) {
//                     bracketPairings.push([leftBracket, rightBracket]);
//                     includedNumbers.push(leftBracket, rightBracket);
//                 }
//             }
//         });
//     });

//     return bracketPairings;
// }

