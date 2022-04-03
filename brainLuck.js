// Runs obscure code similar to that of the Brainf**k language with some input.
function brainLuck(code, input) {
    let dataPointer = 0;
    let bytes = Array(12000);
    let output = [];
    let codeArray = code.split('');
    let bracketPairings = matchSquareBrackets(code);

    for (let codeIndex = 0; codeIndex < codeArray.length; codeIndex++) {

        if (codeArray[codeIndex] === '>' && dataPointer < bytes.length) dataPointer++;

        if (codeArray[codeIndex] === '<' && dataPointer >= 0) dataPointer--;

        if (codeArray[codeIndex] === '+' || codeArray[codeIndex] === '-') {
            let temp = bytes[dataPointer] ? bytes[dataPointer] : 0;
            if (codeArray[codeIndex] === '+') temp < 255 ? temp++ : temp = 0;
            if (codeArray[codeIndex] === '-') temp > 0 ? temp-- : temp = 255;
            bytes[dataPointer] = temp;
        }

        if (codeArray[codeIndex] === '.') output.push(String.fromCharCode(bytes[dataPointer]));

        if (codeArray[codeIndex] === ',') {
            bytes[dataPointer] = input.charCodeAt(0);
            input = input.substring(1);
        }

        if (codeArray[codeIndex] === '[' && (bytes[dataPointer] === 0 || bytes[dataPointer] === undefined)) {
            // Get the index after the right bracket of a paticular bracket pairing
            let newIndex = bracketPairings.find(pair => pair[0] === codeIndex)[1];
            (newIndex + 1) < codeArray.length ? codeIndex = newIndex : codeIndex = codeArray.length;
        }

        // Loop-like mechanism for Brainf*ck emulator
        if (codeArray[codeIndex] === ']' && (bytes[dataPointer] > 0 && bytes[dataPointer] !== undefined)) {
            // Get the index after the left bracket of a paticular bracket pairing
            let newIndex = bracketPairings.find(pair => pair[1] === codeIndex)[0];
            (newIndex + 1) < codeArray.length ? codeIndex = newIndex : codeIndex = codeArray.length;
        }

    }

    return output.join('');
}

function matchSquareBrackets(code) {
    // Contains arrays of square bracket pairings in the form [leftIndex, rightIndex] for a single pairing.
    let squareBracketPairings = []; 
    let includedIndices = []; // Used to prevent specific brackets from being counted twice
    let leftBracketIndices = [];
    let rightBracketIndices = [];

    code.split('').forEach((item, index) => {
        if (item === '[') leftBracketIndices.push(index);
        if (item === ']') rightBracketIndices.push(index);
    });

    // Reverse the indices found in the leftBracketIndices array so that the first index
    // found is the inner most left bracket meaning it is meant to match the first index
    // in the rightBracketIndices array as it's first index is the inner most right bracket
    leftBracketIndices.reverse(); 
    leftBracketIndices.forEach(leftBracketIndex => {
        rightBracketIndices.forEach(rightBracketIndex => {
            // Check if the current right bracket is to the right of the current left bracket
            if (rightBracketIndex - leftBracketIndex > 0) {
                // Ensure that the right and left brackets are not already accounted for.
                if (!includedIndices.includes(leftBracketIndex) && !includedIndices.includes(rightBracketIndex)) {
                    squareBracketPairings.push([leftBracketIndex, rightBracketIndex]);
                    includedIndices.push(leftBracketIndex, rightBracketIndex);
                }
            }
        });
    });

    return squareBracketPairings;
}

console.log(`\nOutput: ${brainLuck(',+[-.,+]', 'Codewars' + String.fromCharCode(255))}`);
console.log(`\nOutput: ${brainLuck(',[.[-],]', 'Codewars' + String.fromCharCode(0))}`);
console.log(`\nOutput: ${brainLuck(',[.[-],]', 'Codewars' + String.fromCharCode(0))}`);
console.log(`\nOutput: ${brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8, 9))}`);
