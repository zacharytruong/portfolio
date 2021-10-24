// Global variable
const history = document.querySelector('.history');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');
let previousNumber;
let currentNumber;
let currentOperator;
let currentResult;

// Global functions        
function displayHistory(value){
  history.textContent = value;
}
function displayResult(value){
  result.value = value;
}
function clearAll(){
  previousNumber = undefined;
  currentNumber = undefined;
  currentNumber = undefined;
  currentResult = undefined;
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
  if (b == 0){
    clearAll();
    history.textContent = `ERROR`;
  } else return a / b;
}
function operate(callBackFn, a, b){
  currentResult = callBackFn(a, b);
  displayHistory(`${previousNumber} ${currentOperator} ${currentNumber}`);
  displayResult(currentResult);
  previousNumber = currentNumber;
  currentNumber = undefined;
  return currentResult;
}

// Events for buttons
buttons.forEach(operation)
function operation(button){
  button.addEventListener('click', e => {

  });
}