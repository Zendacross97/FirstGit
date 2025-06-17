const num1Element = document.getElementById('num1') as HTMLInputElement;// Assuming there's an input with id 'num1'
const num2Element = document.getElementById('num2') as HTMLInputElement;// Assuming there's an input with id 'num2'
const buttonElement = document.querySelector('button')!;// Assuming there's a button in the HTML

const numResults: Array<number> = [];// Array to store number results
const textResults: string[] = [];

type numOrString = number | string;
type Result = {val: number, timestamp: Date};

interface ResultObject { // This interface is not used in the code but can be used for type safety
    val: number;
    timestamp: Date;
}

function addNumbers(num1: numOrString, num2: numOrString) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 +' '+ num2;
    }
    return +num1 + +num2;
}

function printResult(resultObject: Result) {
    console.log(resultObject.val);
}

buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = addNumbers(+num1, +num2);
    numResults.push(result as number);
    const stringResult = addNumbers(num1, num2);
    textResults.push(stringResult as string);
    printResult({ val: result as number, timestamp: new Date() });
    console.log(numResults, textResults);
});

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});

myPromise.then((result) => {
    console.log(result.split(' '));
}).catch((error) => {
    console.error(error);
});