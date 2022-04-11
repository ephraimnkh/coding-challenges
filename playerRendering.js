/**
 * 
 * @param {number[]} D - array containing distance of environment objects for game, distance from the player
 * @param {number[]} C - array containing the compute power needed to render each environmental object in the game
 * @param {number} P - The total amount of processing power that the computer has, where the total objects rendered must be less than the computer processing power.
 * @returns {number} - The total number of objects that can be rendered.
 */

// Video Game Environment Object rendering engine is this solution
function solution(D, C, P) {
    // Check if all objects can be rendered by checking if the total compute power of all objects in C are less than or equal to the total processing power
    let sumOfC = 0;
    sumOfC = C.reduce((num1, num2) => num1 + num2, 0);
    if (sumOfC <= P) return D.length;
    
    // Check if no objects can be rendered due to none of the objects taking less or equal compute power to the total processing power
    let validNumber = C.find(number => number <= P);
    if (validNumber === undefined) return 0;

    let objectsToBeRendered = 0;
    let computeTotal = 0;

    let renderedObjects = [];
    while (computeTotal <= P && D.length !== 0){
        let computeValues = [];
        let computeValuesIndices = [];
        // Find the all the closest objects
        let lowestFound = D.filter((distance, index) => {
            if (distance === Math.min(...D)) {
                computeValuesIndices.push(index);
                computeValues.push(C[index]);
            }
            return distance === Math.min(...D);
        });

        // used to ensure that value being deleted is the desired value after the D array has had all 
        // it's objects shifted by alreadyDeleted spaces to the left.
        let alreadyDeleted = 0;
        // Delete all objects to be considered for rendering
        computeValuesIndices.forEach(valueIndex => {
            D.splice(valueIndex + alreadyDeleted, 1);
            alreadyDeleted--; 
        });

        // If there is more than one object that appears to be closest at the same distance, 
        // then sort the compute values for each object and try render as many as the 
        // processing power allows, starting from the easiest to render due to low computer power.
        // Else see if the current single object can be rendered and render it if processing power allows.
        if (lowestFound.length > 1){
            computeValues.sort((a,b) => a - b);
            computeValuesIndices.forEach((valueIndex, index) => {
                if ((computeTotal + computeValues[index]) <= P) {
                    computeTotal += computeValues[index];
                    renderedObjects.push(valueIndex);
                }
            });
        } else {
            computeValuesIndices.forEach(valueIndex => {
                if ((computeTotal + C[valueIndex]) <= P) {
                    computeTotal += C[valueIndex];
                    renderedObjects.push(valueIndex);
                }
            });
        }
    }


    objectsToBeRendered = renderedObjects.length;

    return objectsToBeRendered;
}

console.log(solution([5,11,1,3], [6,1,3,2], 7));
console.log(solution([10,15,1],[10,1,2],3));
console.log(solution([5,5,5,5],[8,3,3,4],6));
console.log(solution([11,18,1], [9,18,8], 7));
console.log(solution([1,4,2,5], [4,9,2,3], 19));
