/**
 * Write a function called sumIntervals() that accepts an array of intervals, 
 * and returns the sum of all the interval lengths. 
 * Overlapping intervals should only be counted once.
 */
function sumIntervals(intervals) {
    if (intervals.length > 2){
        intervals = killOverlaps(intervals.slice(0, intervals.length/2)).concat(killOverlaps(intervals.slice(intervals.length/2, intervals.length)));
    }
    intervals = killOverlaps(intervals);
    let sum = 0;
    intervals.forEach(interval => sum += interval[1] - interval[0]);
    return sum;
}

// Remove any intervals that overlap and updated overlapped intervals to include overlapping values.
function killOverlaps(intervals){
    intervals = intervals.sort((currentInterval, nextInterval) => currentInterval[0] - nextInterval[0]);
    for (let currentInterval = 0; currentInterval < intervals.length - 1; currentInterval++) {
        for (let nextInterval = currentInterval + 1; nextInterval < intervals.length; nextInterval++) {
            // Conditions for an overlap
            if (intervals[currentInterval][0] <= intervals[nextInterval][0] && intervals[currentInterval][1] >= intervals[nextInterval][0]) {
                // Check to see if the overlapping interval has a greater end then the current interval so that the current interval's end can be extended.
                if (intervals[currentInterval][1] < intervals[nextInterval][1]){
                    intervals[currentInterval][1] = intervals[nextInterval][1];
                }
                intervals.splice(nextInterval, 1);
                // restart required
                currentInterval -= 1;
                break;
            }
        }
    }
    return intervals;
}

let sum1 = sumIntervals( [
    [1,2],
    [6, 10],
    [11, 15]
 ] ); // => 9
 
 let sum2 = sumIntervals( [
    [1,4],
    [7, 10],
    [3, 5]
 ] ); // => 7
 
 let sum3 = sumIntervals( [
    [1,5],
    [10, 20],
    [1, 6],
    [16, 19],
    [5, 11]
 ] ); // => 19

 let sum4 = sumIntervals([ [ 1, 4 ], [ 3, 6 ], [ 5, 8 ], [ 7, 10 ], [ 9, 12 ] ]); // => 11

 console.log(`expected ${sum1} to equal 9`);
 console.log(`expected ${sum2} to equal 7`);
 console.log(`expected ${sum3} to equal 19`);
 console.log(`expected ${sum4} to equal 11`);