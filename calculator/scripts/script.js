// Global variable
const history = document.querySelector('.history');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');
let previousNumber = '';
let currentNumber = '';
let currentOperator;
let currentResult = '';
let userSelection;

// Global functions        
function displayHistory(value){
  history.textContent = value;
}
function displayResult(value){
  result.value = value;
}
function clearAll(){
  previousNumber = undefined;
  currentOperator = undefined;
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
function setOperatorSign(value){
  if (value == 'add'){
    return '+'
  } else if (value == 'subtract'){
    return '-'
  } else if (value == 'multiple'){
    return 'x'
  } else if (value == 'divide'){
    return '÷'
  } else if (value == 'percentage'){
    return '%'
  }
}
function operate(callBackFn, a, b){
  currentResult = callBackFn(a, b);
  displayHistory(`${previousNumber} ${currentOperator} ${currentNumber}`);
  displayResult(currentResult);
  previousNumber = currentNumber;
  currentNumber = undefined;
  return currentResult;
}

// Buttons with click event
buttons.forEach(operation)
function operation(button){
  button.addEventListener('click', e => {
    userSelection = e.target.value;
    if (!isNaN(userSelection) && currentOperator === undefined){
      previousNumber = previousNumber.concat(userSelection);
      displayResult(previousNumber);
    } else if (!isNaN(userSelection)){
      currentNumber = currentNumber.concat(userSelection);
      displayResult(currentNumber);
      displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)} ${currentNumber}`);
    }
  });
}