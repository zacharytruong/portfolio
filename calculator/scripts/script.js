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
  currentNumber = '';
  history.textContent = '';
  result.value = '';
}
function add(a, b){
   if (a == ''){
    return b;
   } else if(b == ''){
     return a;
   } else return parseInt(a) + parseInt(b);
}
function subtract(a, b){
  if (a == ''){
    return -b;
   } else if(b == ''){
     return a;
   } else return parseInt(a) - parseInt(b);
}
function multiply(a, b){
  if (a == '' || b == ''){
    return 0;
   } else return parseInt(a) * parseInt(b);
}
function divide(a, b){
  if (b == 0 || b == ''){
    clearAll();
    history.textContent = `ERROR`;
  } else if (a == ''){
    return 0;
   } else return parseInt(a) / parseInt(b);
}
function percentage(value){
  return value / 100;
}
function isDecimal(value){
  return value.includes('.') ? true : false;
}
function setOperatorSign(value){
  let operator = operators.find( operator => {
    if (operator.name === value) return operator;
  })
  return operator.sign;
}
function setOperatorName(value){
  return operators.find( operator => {
    if (operator.name === value) return operator.name;
  })
}
function matchOperator(value){
  return operators.some( operator => operator.name === value)
}
function operate(callBackFn, a, b){
  currentResult = callBackFn(a, b);
  displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)} ${currentNumber}`);
  displayResult(currentResult);
  previousNumber = currentResult;
  currentNumber = '';
  currentOperator = '';
  return currentResult;
}

// Buttons with click event for styling


// Buttons with click event for calculation
buttons.forEach(operation)
function operation(button){
  button.addEventListener('click', e => {
    userSelection = e.target.value;
    if (!isNaN(userSelection) &&
      !currentOperator &&
      !isNaN(currentResult)) {
        previousNumber = previousNumber.toString().concat(userSelection);
        displayResult(previousNumber);
    } else if (!isNaN(userSelection) &&
              currentOperator) {
                currentNumber = currentNumber.toString().concat(userSelection);
                displayResult(currentNumber);
                displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)}`)
    } else if (matchOperator(userSelection) &&
              !previousNumber){
                clearAll();
                displayHistory('ERROR - Need a number');
    } else if (matchOperator(userSelection) &&
              previousNumber){
                currentOperator = userSelection;
    } else if (userSelection == 'equal' &&
              !currentOperator ||
              userSelection == 'equal' &&
              currentOperator &&
              !currentNumber) {
                clearAll();
                displayHistory('');
    } else if (userSelection == 'equal' &&
              currentOperator &&
              currentNumber) {
                return operate(window[currentOperator], previousNumber, currentNumber)
    } else if (userSelection == 'clear'){
              clearAll();
    }
})}

console.log('previous Number is ' + previousNumber)
console.log('current Number is ' + currentNumber)
console.log('current Operator is ' + currentOperator)
console.log('current Result is ' + currentResult)