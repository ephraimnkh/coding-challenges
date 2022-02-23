// function zeros(n, iterations = 1) {
//     if (n === 0) return 0;
//     if (n > 100000) {
//         n /= 4;
//     } else iterations = 4;
//     console.log(`n: ${n}`);
//     let max = Math.floor(n / Math.log(5));
//     // console.log(`max: ${max}`);
//     let sum = 0;
//     for (let i = 1; i < max; i++)
//         sum += Math.floor(n / Math.pow(5, i));
//     return iterations === 4 ? sum : sum + zeros(n * 4, iterations + 1);
// }

// function zeros(n) {
//     if (n === 0) return 0;
//     let max = Math.floor(n / Math.log(5));
//     let sum = 0;
//     // for (let i = 5; i < max; i += 5) {
//     //     if (i - 5 >= 0) sum += Math.floor(n / Math.pow(5, i - 5));
//     //     if (i - 4 >= 0) sum += Math.floor(n / Math.pow(5, i - 4));
//     //     if (i - 3 >= 0) sum += Math.floor(n / Math.pow(5, i - 3));
//     //     if (i - 2 >= 0) sum += Math.floor(n / Math.pow(5, i - 2));
//     //     if (i - 1 >= 0) sum += Math.floor(n / Math.pow(5, i - 1));
//     //     if (i < max) sum += Math.floor(n / Math.pow(5, i));
//     // }

//     for (let i = 1; i < max; i++)
//         sum += Math.floor(n / Math.pow(5, i));


//     return sum;
// }

// function zeros(n) {
//     if (n === 0) return 0;
//     let sum = 0;
//     let max = Math.floor(n / Math.log(5));
//     if (n > 100000000) {
//         n /= 10;
//         max = (n / Math.log(5));
//         console.log(`max: ${max}`);
//         for (let i = 1; i < max; i++) {
//             console.log(`Math.pow(5, i)): ${Math.pow(5, i)}`);
//             sum += (n / Math.pow(5, i));
//         }
//         sum *= 10;
//     } else {
//         for (let i = 1; i < max; i++)
//             sum += Math.floor(n / Math.pow(5, i));
//     }

//     return sum;
// }

// Submmited solution
// function zeros(n) {
//     if (n === 0) return 0;
//     let max = Math.floor(n / Math.log(5));
//     let sum = 0;
//     for (let i = 1; i < max; i++)
//         sum += Math.floor(n / Math.pow(5, i));

//     return sum;
// }

let answers = [0];
let sum = 0;
let max = 0;
let counter = 0;
let counterSet = false;
let answer = 0;
let answerSet = false;

function zeros(n) {
    if (!counterSet) {
        console.log(`n: ${n}`);
        console.log(`Math.floor(n / Math.log(5)): ${Math.floor(n / Math.log(5))}`);
        counter = Math.floor(n / Math.log(5));
        max = counter;
        counterSet = true;
        console.log(`counter: ${counter}`);
    }
    if (!answerSet) {
        answer = n;
        answerSet = true;
        console.log(`answer: ${answer}`);
    }
    if (n === 0) return answers[0];
    if (n < answers.length && answers[n] != undefined) return answers[n];
    if (counter > 0) {
        sum += Math.floor(answer / Math.pow(5, counter));
        counter--;
        sum += zeros(counter);
    }
    if (answers[answer] === undefined && (counter + 1) === max) answers[answer] = sum;
    return sum;
}

// console.log(Math.floor(5 / Math.log(5)));

// answers[5] = 230;
// console.log(answers);
// console.log(answers[0]);
// console.log(answers[2]);
// console.log(answers[5]);

// function zeros(n) {
//     if (n === 0) return 0;
//     if (arguments[1] === 0) return 0;
//     let i = arguments[1] === undefined ? n : arguments[1];
//     return Math.floor(n / Math.pow(5, i)) + zeros(n, i - 1);
// }

// console.log(`Math.floor(n / Math.pow(5, n)): ${Math.floor(6 / Math.pow(5, 6))}`);
// console.log(zeros(0));
console.log(zeros(5));
// console.log(zeros(6));
// console.log(zeros(10) + zeros(10));
// console.log(zeros(20));
// console.log(zeros(100000000));
// console.log(zeros(621334934));
console.log(zeros(30));
// console.log(answers);
// console.log(zeros(1000));
// console.log(zeros(282878403)); // 70719595
// console.log(zeros(1000000000)); // 249999998