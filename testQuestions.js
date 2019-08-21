/*
Написать функцию, которая преобразует массив в строку следуюшим образом:
[1, 4, 2, 3, 8, 5, 9, 11] -> '1-5,8-9,11'
Числа целые, положительные.
*/
const arraySummary = (array) => {
    if (!array || array.length === 0) {
      throw new Error('invalid string');
    }
  
    const sortedArray = array.sort((a, b) => a - b); 
    let lastNumber = sortedArray[0];
  
    const output = sortedArray.reduce((result, number, index, array) => {
      if (index === array.length - 1) {
        return lastNumber === number - 1
        ? `${result}-${number}`
        : `${result}-${lastNumber},${number}`;
      }
      
      if (lastNumber === number - 1) {
        lastNumber = number;
        return result;
      }
      
      const tempResult = `${result}-${lastNumber},${number}`;
      lastNumber = number;
      return tempResult;
    }); 
  
    return `${output}`;
  }
  
  console.log(arraySummary([1]));
  console.log(arraySummary([1, 2, 3, 4]));
  console.log(arraySummary([1, 2, 4]));
  console.log(arraySummary([1, 4, 2, 3, 8, 5, 9, 11]));
  console.log(arraySummary([1, 4, 2, 3, 8, 5, 9, 11, 12, 14]));


// Написать полифил метода reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(callback, accumulator) {
        if (accumulator !== undefined) {
            this.forEach((element, index) => {
                accumulator = callback(accumulator, element, index, this);
            });
        } else {
            accumulator = this[0];
            for (let i = 1; i < this.length; i++) {
                accumulator = callback(accumulator, element, index, this);
            }
        }
    
        return accumulator;
    }
}


// Написать полифилл метода isArray
if (!Array.prototype.isArray) {
    Array.prototype.isArray = function isArray(input) {
        return input instanceof Array;
    }
}


// Сделать плоским массив любой вложенности
function smoosh(a) {
    let arr = [];
    
    for (let element of a) {
        if (!Array.isArray(element)) {
            arr.push(element);
        } else {
            arr = arr.concat(smoosh(element));
        }
    }
    
    return arr;
}

console.log(smoosh([1, 2, [3, [4, 5], 6, 7], 8])); // [1, 2, 3, 4, 5, 6, 7, 8]


// add(1)(2)(3)() === 6
function add(n) {
    let sum = n;

    return function getSum(n) {
        if (n !== undefined) {
            sum += n;
            return getSum;
        } else {
            return sum;
        }
    }
}

console.log(add(1)(2)(3)() === 6);


/**
Дана строка, состоящая из букв A-Z:
AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB
Нужно написать функцию RLE, которая на выходе даст строку вида:
A4B3C2XYZD4E3F3A6B28
И сгенерирует ошибку, если на вход пришла невалидная строка.
*/
function RLE(str) {
    if (/[^A-Z]+/g.test(str) || str === '') {
        throw new Error('invalid string');
    }

    let output = str[0];
    let prevChar = str[0];
    let counter = 1;

    for (let i = 1; i < str.length + 1; i++) {
        if (prevChar === str.charAt(i)) {
            counter++;
        } else {
            output = counter === 1 ? output : output + counter;
            counter = 1;
            prevChar = str.charAt(i);
            
            if (str.charAt(i)) {
                output += str.charAt(i);
            }
        }
    }

    return output;
}

console.log(RLE('A') === 'A');
console.log(RLE('ABBC') === 'AB2C');
console.log(RLE('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB') === 'A4B3C2XYZD4E3F3A6B28');
console.log(RLE('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBC') === 'A4B3C2XYZD4E3F3A6B28C');
