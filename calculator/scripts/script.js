// Global variable
let previousNumber;
let currentNumber;
let currentOperator;
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');

// Global functions        
function displayHistory(value){
   if (previousNumber === undefined ||
      Number.isNaN(previousNumber)){
     history.innerText = '';
   } else history.innerText = previousNumber;
}
function add(a, b){
  return a + b;
}
function subtract(a, b){
  return a - b;
}
function multiply(a, b){
  return a * b;
}
function divide(a, b){
  if (b === 0){
    return 'ERROR'
  } else return a / b;
}
function operate(callBackFn, a, b){
  return callBackFn(a, b);
}

// Events for buttons
buttons.forEach(button => {
  button.addEventListener('click', e => {
    if (e.target.value === 'add' ||
        e.target.value === 'subtract'||
        e.target.value === 'multiply' ||
        e.target.value === 'divide') {
      return currentOperator = e.target.value;
    } else if (e.target.value === 'equal'){
        let result = window[currentOperator](previousNumber, currentNumber);
        currentNumber = result;
        displayHistory(currentNumber);
        return currentNumber
    } else if (!isNaN(e.target.value && currentOperator === undefined)){
        previousNumber = parseInt(e.target.value);
        displayHistory(previousNumber);
        return previousNumber;
    } else {
        currentNumber = parseInt(e.target.value);
        displayHistory(currentNumber)
        return currentNumber;
    }
  })
})

console.log(previousNumber)
console.log(currentNumber)
console.log(currentOperator)