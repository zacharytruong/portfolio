// Global variable
const history = document.querySelector('.history');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');
let previousNumber = '';
let currentNumber = '';
let currentOperator = '';
let currentResult = '';
let userSelection = '';
const operators = [
                  {name: 'add',
                  sign: '+',},
                  {name: 'subtract',
                  sign: '-',},
                  {name: 'multiply',
                  sign: 'x',},
                  {name: 'divide',
                  sign: '÷',},
                  {name: 'percentage',
                  sign: '%',},
]
function findOperator(operator){
  return operator.name = userSelection;
}
// Global functions        
function displayHistory(value){
  history.textContent = value;
}
function displayResult(value){
  result.value = value;
}
function clearAll(){
  previousNumber = '';
  currentOperator = '';
  history.textContent = '';
  result.value = '';
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
function percentage(value){
  return value / 100;
}
function isDecimal(value){
  return value.includes('.') ? true : false;
}
function operate(callBackFn, a, b){
  currentResult = callBackFn(a, b);
  displayHistory(`${previousNumber} ${currentOperator} ${currentNumber}`);
  displayResult(currentResult);
  previousNumber = currentNumber;
  currentNumber = '';
  return currentResult;
}

// Buttons with click event
buttons.forEach(operation)
function operation(button){
  button.addEventListener('click', e => {
    userSelection = e.target.value;
    
})}