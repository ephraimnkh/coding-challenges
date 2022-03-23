function determinant(m) {
    let answer = 0;
    
    if (m.length === 1) 
      return m[0][0];
    
    if (m.length === 2) 
      return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
  
    for (let i = 0; i < m.length; i++){
      let newM = copy2DArray(m);
      newM = insertBlanksInArray(newM, i);
      let minor = getMinorArray(newM);
      let part = m[0][i] * determinant(minor);
      let modifier = ((i + 1) % 2 == 0) ? -1 : 1;
      answer += (part * modifier);
    }

    return answer;
}
    
function copy2DArray(array){
  let newArray = [];
  array.forEach(numberArray => {
    let tempArray = [];
    numberArray.forEach(number => {
      tempArray.push(number);
    });
    newArray.push(tempArray);
  });
  return newArray;
}

function insertBlanksInArray(array, column){
  array.forEach((numberArray, index) => {
    numberArray.forEach((number, numberIndex) => {
      if (index === 0 || numberIndex === column)
        array[index][numberIndex] = null;
    });
  });
  return array;
}

function getMinorArray(array){
    let newArray = [];
    array.forEach(numberArray => {
        let tempArray = [];
        numberArray.forEach(value => {
          if (value !== null) 
            tempArray.push(value);
        });
        if (tempArray.length > 0)
          newArray.push(tempArray);
    });
    return newArray;
}

console.log(determinant([[2,4,2],[3,1,1],[1,2,0]]));
console.log(determinant([[1,2,3,4], [5,0,2,8], [3,5,6,7], [2,5,3,1]]));
console.log(determinant([[2,5,3,6,3], [17,5,7,4,2], [7,8,5,3,2], [9,4,-6,8,3], [2,-5,7,4,2]]));
console.log(determinant([[1,2,4,0,9], [2,3,4,1,1], [6,7,3,9,3], [2,0,3,0,2], [4,5,2,3,1]]));