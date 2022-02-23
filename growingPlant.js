// function growingPlant(upSpeed, downSpeed, desiredHeight) {
//     let day = 0;
//     let night = 0;
//     let currentHeight = 0;
//     while (currentHeight < desiredHeight) {
//         currentHeight += upSpeed;
//         day++;
//         console.log(`After day ${day} --> ${currentHeight}`);
//         if (currentHeight < desiredHeight) {
//             currentHeight -= downSpeed;
//             night++;
//             console.log(`After night ${night} --> ${currentHeight}`);
//         }
//     }
//     return day;
// }

// Submitted Solution
function growingPlant(upSpeed, downSpeed, desiredHeight) {
    let day = 0;
    let currentHeight = 0;
    while (currentHeight < desiredHeight) {
        currentHeight += upSpeed;
        day++;
        if (currentHeight < desiredHeight) currentHeight -= downSpeed;
    }
    return day;
}

console.log(growingPlant(100, 10, 910));