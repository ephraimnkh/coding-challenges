function incrementString(str) {
    // return 1 appended if no number in the string
    if (str.search(/[0-9]/g) === -1) return str + "1";

    let text = str.replace(/[0-9]/g, '');
    let numberString = str.replace(/[a-z]|[A-Z]/g, '');

    console.log(numberString);
    let initialNumber = numberString;
    let zeros = numberString.replace(/[1-9]/g, '');
    numberString = Number(numberString);
    console.log(zeros);
    console.log(numberString);
    numberString++;

    // Edge Cases
    // if all 0s drop one and increment.
    if (initialNumber === zeros) zeros = zeros.charAt(0).repeat(initialNumber.length - 1);
    // if string number after increment will take up on extra digit space, remove one leading digit if there is one to remove
    //  like 099 (3 digits) to 100 (3 digits) the leading 0 is removed to make space for the extra digit
    // 0099 to 0100 would also be the result of the below.
    if (initialNumber.search(/^0+9+$/g) >= 0) zeros = zeros.charAt(0).repeat(zeros.length - 1);

    return text + zeros + numberString;
}

// console.log(incrementString('foo'));
// console.log(incrementString('foobar23'));
console.log(incrementString('foo0042'));
console.log('---------------------------------');
console.log(incrementString('foobar000'));
console.log('---------------------------------');
console.log(incrementString('foobar0999'));

// Final Submission
// function incrementString(str) {
//     if (str.search(/[0-9]/g) === -1) return str + "1";

//     let text = str.replace(/[0-9]/g, '');
//     let numberString = Number(str.replace(/[a-z]|[A-Z]/g, ''));
//     let initialNumber = str.replace(/[a-z]|[A-Z]/g, '');
//     let zeros = str.replace(/[a-z]|[A-Z]|[1-9]/g, '');

//     if (initialNumber === zeros) zeros = zeros.charAt(0).repeat(initialNumber.length - 1);
//     if (initialNumber.search(/^0+9+$/g) >= 0) zeros = zeros.charAt(0).repeat(zeros.length - 1);

//     return text + zeros + (numberString + 1);
// }