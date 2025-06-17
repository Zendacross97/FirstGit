"use strict";
const num1Element = document.getElementById('num1'); // Assuming there's an input with id 'num1'
const num2Element = document.getElementById('num2'); // Assuming there's an input with id 'num2'
const buttonElement = document.querySelector('button'); // Assuming there's a button in the HTML
const numResults = []; // Array to store number results
const textResults = [];
function addNumbers(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
function printResult(resultObject) {
    console.log(resultObject.val);
}
buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = addNumbers(+num1, +num2);
    numResults.push(result);
    const stringResult = addNumbers(num1, num2);
    textResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, textResults);
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
myPromise.then((result) => {
    console.log(result.split(' '));
}).catch((error) => {
    console.error(error);
});
