function permutations(string, iteration = 0) {
    if (string.length === 1) return string.split('');
    let stringArray = string.split('');
    let stringLength = stringArray.length;
    let pointer = 0; // the letter of concern based on its index in the original string
    let variations = [];

    while (pointer < stringLength) {
        let index = pointer; // index that follows the chosen letter as it moves through the string
        let done = false;

        while (!done) {
            let str = stringArray.splice(index, 1);
            if ((index + 1) === stringLength) index = 0;
            else index++;
            stringArray.splice(index, 0, str);
            // To have more varients reverse the current string and add it then reverse again to add the normal string, second reverse is there because
            // reverse is destructive so we must return the array back to the original design so this loop can work well.
            variations.push(stringArray.reverse().join(''), stringArray.reverse().join(''));
            // once the string is back in its orignal position then the shifting is done.
            // point to the next letter
            if (index === pointer) {
                done = true;
                pointer++;
            }
        }
    }

    // make a new string for the next permutation function that has the last character be the first.
    // doing this makes more unique varients that can be added to make one super cluster of varients
    let tempString = string.split('');
    tempString.unshift(tempString.pop());

    // use iteration to only work on enough iterations so that each character in a string can be the first character once as this will make more unique
    // varients.
    return iteration < stringLength ? clearDuplicates(variations.concat(permutations(tempString.join(''), iteration + 1))) : clearDuplicates(variations);
}

function clearDuplicates(array) {
    let output = [];
    array.forEach(values => {
        if (!output.includes(values)) output.push(values);
    });
    return output;
}

// Submitted Solution
// function permutations(string, iteration = 0) {
//     if (string.length === 1) return string.split('');
//     let stringArray = string.split('');
//     let stringLength = stringArray.length;
//     let pointer = 0;
//     let variations = [];

//     while (pointer < stringLength) {
//         let index = pointer;
//         let done = false;

//         while (!done) {
//             let str = stringArray.splice(index, 1);
//             if ((index + 1) === stringLength) index = 0;
//             else index++;
//             stringArray.splice(index, 0, str);
//             variations.push(stringArray.reverse().join(''), stringArray.reverse().join(''));
//             if (index === pointer) {
//                 done = true;
//                 pointer++;
//             }
//         }
//     }

//     let tempString = string.split('');
//     tempString.unshift(tempString.pop());

//     return iteration < stringLength ? clearDuplicates(variations.concat(permutations(tempString.join(''), iteration + 1))) : clearDuplicates(variations);
// }

// function clearDuplicates(array) {
//     let output = [];
//     array.forEach(values => {
//         if (!output.includes(values)) output.push(values);
//     });
//     return output;
// }

// 'abc'
// 'abc', 'bac', 'bca', 'acb', 'cab'

console.log(permutations('a').sort());
console.log(permutations('ab').sort());
console.log(permutations('abc').sort());
console.log(permutations('aabb').sort());
console.log(permutations('abcd').sort());
