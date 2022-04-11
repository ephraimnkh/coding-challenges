// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(D, C, P) {
    // write your code in JavaScript (Node.js 8.9.4)
    // Check if all objects can be rendered
    let sumOfC = 0;
    sumOfC = C.reduce((num1, num2) => num1 + num2, 0);
    if (sumOfC <= P) return D.length;
    
    // Check if no objects can be rendered
    let validNumber = C.find(number => number < P);
    if (validNumber === undefined) return 0;

    let objectsToBeRendered = 0;
    let computeTotal = 0;

    let includedIndices = [];
    while (computeTotal <= P && D.length !== 0){
        let computeValues = [];
        let computeValuesIndices = [];
        // Find the first closest objects and see if those can be rendered
        let lowestFound = D.filter((distance, index) => {
            if (distance === Math.min(...D)) {
                computeValuesIndices.push(index);
                computeValues.push(C[index]);
            }
            return distance === Math.min(...D);
        });

        let alreadyDeleted = 0;
        computeValuesIndices.forEach((valueIndex, index) => {
            D.splice(valueIndex + alreadyDeleted,1);
            alreadyDeleted--;
        });
        if (lowestFound.length > 1){
            computeValues.sort((a,b) => a - b);
            computeValuesIndices.forEach((valueIndex, index) => {
                if ((computeTotal + computeValues[index]) <= P) {
                    computeTotal += computeValues[index];
                    includedIndices.push(valueIndex);
                }
            });
        } else {
            computeValuesIndices.forEach(valueIndex => {
                if ((computeTotal + C[valueIndex]) <= P) {
                    computeTotal += C[valueIndex];
                    includedIndices.push(valueIndex);
                }
            });
        }
    }


    objectsToBeRendered = includedIndices.length;

    return objectsToBeRendered;
}

// function sortArray
console.log(solution([5,11,1,3], [6,1,3,2], 7));
console.log(solution([10,15,1],[10,1,2],3));
console.log(solution([5,5,5,5],[8,3,3,4],6));
console.log(solution([11,18,1], [9,18,8], 7));
console.log(solution([1,4,2,5], [4,9,2,3], 19));
