// Global variable
const history = document.querySelector('.history');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const deletion = document.getElementById('delete')
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
function displayHistory(value) {history.textContent = value}
function displayResult(value) {result.value = value}
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
  return (a == '' || b == '') ? 0 : parseInt(a) * parseInt(b);
}
function divide(a, b){
  if (b == 0 || b == ''){
    clearAll();
    history.textContent = `ERROR`;
  } else if (a == ''){
    return 0;
   } else return parseInt(a) / parseInt(b);
}
function percentage(value) { return value / 100};
function isDecimal(value){return value.toString().includes('.') ? true : false}
function setOperatorSign(value){
  let operator = operators.find( operator => {
    if (operator.name === value) return operator;
  })
  return operator.sign;
}
function setOperatorName(value){
  let operator = operators.find( operator => {
    if (operator.name === value) return operator.name;
  })
  return operator.name;
}
function checkExistOperator(value){
  return operators.some( operator => operator.name === value)
}
function calculate(callBackFn, a, b){
  currentResult = callBackFn(a, b);
  displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)} ${currentNumber}`);
  displayResult(currentResult);
  previousNumber = currentResult;
  currentNumber = '';
  currentOperator = '';
  return currentResult;
}

// Events for utility buttons
clearButton.addEventListener('click', clearAll);
deletion.addEventListener('click', removeLastNumber);
function removeLastNumber(){
  return result.value = result.value.slice(0, -1);
}
// Events for operator buttons
buttons.forEach( button => {
  button.addEventListener('click', e => {
    userSelection = e.target.value;
    if (checkExistOperator(userSelection) &&
      !previousNumber){
      return displayHistory('ERROR - Need a number');
    } else if (checkExistOperator(userSelection) &&
              previousNumber){
                currentOperator = setOperatorName(userSelection);
                displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)}`);
    }
  })
})

// Events for number buttons
buttons.forEach( button => {
  button.addEventListener('click', e => {
    userSelection = e.target.value;
    if (!isNaN(userSelection) && // User clicks a number, no operater was defined, and previousNumber is empty
      !currentOperator &&
      !previousNumber){
        previousNumber = userSelection;
        displayResult(userSelection);
        return previousNumber;
    } else if (!isNaN(userSelection) && // User clicks a number, no operater was defined, and previousNumber is not empty
              !currentOperator &&
              previousNumber){
        previousNumber = previousNumber.toString().concat(userSelection);
        displayResult(previousNumber);
        return previousNumber;
    } else if (!isNaN(userSelection) && // User clicks a number, operater was defined, and currentNumber is empty
              currentOperator &&
              !currentNumber){
                currentNumber = userSelection;
                displayResult(currentNumber);
                return currentNumber;
    } else if (!isNaN(userSelection) && // User clicks a number, operater was defined, and currentNumber is not empty
              currentOperator &&
              currentNumber){
                currentNumber = currentNumber.toString().concat(userSelection);
                displayResult(currentNumber);
                return currentNumber;
}
  })
})

// Events for equal buttons
equalButton.addEventListener('click', performCalculation);
function performCalculation(){
  if (!previousNumber &&
    !currentNumber &&
    !currentOperator &&
    !currentResult){
    displayHistory('')
  }
}






console.log('previous Number is ' + previousNumber)
console.log('current Number is ' + currentNumber)
console.log('current Operator is ' + currentOperator)
console.log('current Result is ' + currentResult)