// Global variable
let previousNumber;
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');

// Global functions        
function displayHistory(value){
   if (previousNumber === undefined){
     history.innerText = '';
   } else history.innerText = previousNumber;
}
function addition(a, b){
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
