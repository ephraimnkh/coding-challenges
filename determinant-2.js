function determinant(m) {
    if (m.length === 1)
      return m[0][0];
    
    if (m.length === 2)
      return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
    
    if (m.length === 3){
      let partA = 0;
      let partB = 0;
      let partC = 0;
      let a = m[0][0];
      let b = m[0][1];
      let c = m[0][2];
      
      let newM1 = copy2DArray(m);
      let newM2 = copy2DArray(m);
      let newM3 = copy2DArray(m);
      
      let okay = insertBlanksInArray(newM1, 0);
      let new2DM1 = getMinorArray(okay);

      newM2 = insertBlanksInArray(newM2, 1);
      let new2DM2 = getMinorArray(newM2);
      
      newM3 = insertBlanksInArray(newM3, 2);
      let new2DM3 = getMinorArray(newM3);
      
      partA = a * determinant(new2DM1);
      partB = b * determinant(new2DM2);
      partC = c * determinant(new2DM3);
      
      return (partA - partB) + partC;
    }
    
    if (m.length === 4){
      let partA = 0;
      let partB = 0;
      let partC = 0;
      let partD = 0;
      let a = m[0][0];
      let b = m[0][1];
      let c = m[0][2];
      let d = m[0][3];
      
      let newM1 = copy2DArray(m);
      let newM2 = copy2DArray(m);
      let newM3 = copy2DArray(m);
      let newM4 = copy2DArray(m);
      
      let okay = insertBlanksInArray(newM1, 0);
      let new2DM1 = getMinorArray(okay);

      newM2 = insertBlanksInArray(newM2, 1);
      let new2DM2 = getMinorArray(newM2);
      
      newM3 = insertBlanksInArray(newM3, 2);
      let new2DM3 = getMinorArray(newM3);
      
      newM4 = insertBlanksInArray(newM4, 3);
      let new2DM4 = getMinorArray(newM4);
      
      partA = a * determinant(new2DM1);
      partB = b * determinant(new2DM2);
      partC = c * determinant(new2DM3);
      partD = d * determinant(new2DM4);
      
      return (partA - partB) + (partC - partD);
    }

    if (m.length === 5){
      let partA = 0;
      let partB = 0;
      let partC = 0;
      let partD = 0;
      let partE = 0;
      let a = m[0][0];
      let b = m[0][1];
      let c = m[0][2];
      let d = m[0][3];
      let e = m[0][4];
      
      let newM1 = copy2DArray(m);
      let newM2 = copy2DArray(m);
      let newM3 = copy2DArray(m);
      let newM4 = copy2DArray(m);
      let newM5 = copy2DArray(m);
      
      let okay = insertBlanksInArray(newM1, 0);
      let new2DM1 = getMinorArray(okay);

      newM2 = insertBlanksInArray(newM2, 1);
      let new2DM2 = getMinorArray(newM2);
      
      newM3 = insertBlanksInArray(newM3, 2);
      let new2DM3 = getMinorArray(newM3);
      
      newM4 = insertBlanksInArray(newM4, 3);
      let new2DM4 = getMinorArray(newM4);
      
      newM5 = insertBlanksInArray(newM5, 4);
      let new2DM5 = getMinorArray(newM5);
      
      partA = a * determinant(new2DM1);
      partB = b * determinant(new2DM2);
      partC = c * determinant(new2DM3);
      partD = d * determinant(new2DM4);
      partE = e * determinant(new2DM5);
      
      return (partA - partB) + (partC - partD) + partE;
    }
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
    array.forEach((numberArray, index, arr) => {
      numberArray.forEach((number, numberIndex) => {
        if (index === 0 || numberIndex === column)
          arr[index][numberIndex] = null;
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