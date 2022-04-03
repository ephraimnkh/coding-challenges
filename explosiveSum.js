// Array that stores the answer for sum(n) in answers[n] so that when the function recursively trys to find
// the answer it is not always running a calculation but rather just fetches the answer from the array, saving
// time and resources
let answers = [1, 1];

function sum(n) {
    if (n < 0) return 0;
    if (n < answers.length) return answers[n];
    let answer = 0;
    for (let k = 0; k < n; k++)
        answer += (sumOfPositiveDivisors(n - k) * sum(k));
    answers.push(Math.round((1 / n) * answer));
    return Math.round((1 / n) * answer);
}

function sumOfPositiveDivisors(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++)
        if (n % i === 0) sum += i;
    return sum;
}

console.log(sum(0));
console.log(sum(1));
console.log(sum(2));
console.log(sum(12));
console.log(sum(29));
console.log(sum(30));
console.log(sum(40));
console.log(sum(60));
console.log(sum(100));