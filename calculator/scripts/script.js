// Global variable
const history = document.querySelector('.history');
const result = document.querySelector('.result');
const buttons = Array.from(document.querySelectorAll('.button'));
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
];

// Global functions        
function displayHistory(value) {history.textContent = value}
function displayResult(value) {result.textContent = value}
function clearAll(){
  previousNumber = '';
  currentOperator = '';
  currentNumber = '';
  currentResult = '';
  removeActiveClass(buttons)
  history.textContent = '';
  result.textContent = '';
}
function removeLastNumber(){
  result.textContent = result.textContent.slice(0, -1);
  if (!checkExistOperator(currentOperator)){
    previousNumber = parseFloat(result.textContent);
    currentResult = previousNumber;
    return previousNumber;
  } else {
      currentNumber = parseFloat(result.textContent);
      currentResult = currentNumber;
      return currentNumber;
  }
}
function add(a, b){
   if (a == ''){
    return b
   } else if(b == ''){
     return a
   } else return parseFloat(a) + parseFloat(b)
}
function subtract(a, b){
  if (a == ''){
    return -b
   } else if(b == ''){
     return a
   } else return parseFloat(a) - parseFloat(b)
}
function multiply(a, b){
  return (a == '' || b == '') ? 0 : parseFloat(a) * parseFloat(b)
}
function divide(a, b){
  if (b == 0 || b == ''){
    clearAll()
    history.textContent = `ERROR`;
  } else if (a == ''){
    return 0
   } else return parseFloat(a) / parseFloat(b)
}
function percentage(value) { return value / 100}
function isDecimal(value){return value.toString().includes('.') ? true : false}
function setOperatorSign(value){
  return operators.find( operator => {
    if (operator.name === value) return operator;
  }).sign
}
function checkExistOperator(value){
  return operators.some( operator => operator.name === value)
}
function calculate(callBackFn, a, b){
  currentResult = callBackFn(a, b);
  return currentResult
}
function removeActiveClass(arr){
  arr.forEach(button => {
    if (button.className.includes('active')){
      button.classList.remove('active')
    }
  })
}
function setOperator(e){
  let target = e.target;
  userSelection = e.target.value;
  if (checkExistOperator(userSelection) && // User clicks a number, no number was defined
    !previousNumber){
    return displayHistory('ERROR');
  } else if (checkExistOperator(userSelection) &&
            previousNumber){
              currentOperator = userSelection;
              removeActiveClass(buttons)
              target.classList.add('active')
              displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)}`);
  }
}
function setNumbers(e){
  userSelection = e.target.value;
  if (!isNaN(userSelection) &&
    userSelection == '0'){            
      currentResult = userSelection;
      displayResult(currentResult)
      return currentResult;
  } else if (!isNaN(userSelection) &&  
    !currentOperator &&         
    !previousNumber){            
      previousNumber = userSelection;
      currentResult = previousNumber;
      displayResult(currentResult)
      return previousNumber;
  } else if (!isNaN(userSelection) && 
            !currentOperator &&       
            previousNumber){           
              previousNumber = previousNumber.toString().concat(userSelection);
              currentResult = previousNumber;
              displayResult(currentResult)
              return previousNumber;
} else if (!isNaN(userSelection) && 
            currentOperator &&
            !currentNumber){
              currentNumber = userSelection;
              currentResult = currentNumber;
              displayResult(currentResult);
              return currentNumber;
  } else if (!isNaN(userSelection) && 
            currentOperator &&
            currentNumber){
              currentNumber = currentNumber.toString().concat(userSelection);
              currentResult = currentNumber;
              displayResult(currentResult)
              return currentNumber;
  }
}
function performCalculation(e){
  userSelection = e.target.value;
  if (!previousNumber && // Nothing was defined
    !currentNumber &&
    !currentOperator &&
    !currentResult){
    displayHistory('')
  } else if (previousNumber && // Previous number and operator were defined
            currentNumber &&
            currentOperator &&
            currentResult){
              calculate( window[currentOperator], previousNumber, currentNumber);
              displayResult(currentResult)
              displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)} ${currentNumber}`)
              previousNumber = '';
              currentNumber = '';
              currentOperator = '';
              return currentResult;
  } else if (previousNumber && // Previous number and operator were defined
    !currentNumber &&
    currentOperator == 'percentage' &&
    currentResult){
      currentResult = calculate( window[currentOperator], previousNumber);
      displayResult(currentResult)
      displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)}`)
      previousNumber = '';
      currentOperator = '';
      return currentResult;
  }
  else if (previousNumber && // Previous number and operator were defined
            !currentNumber &&
            currentOperator &&
            currentResult){
              currentNumber = previousNumber;
              calculate( window[currentOperator], previousNumber, currentNumber);
              displayResult(currentResult)
              displayHistory(`${previousNumber} ${setOperatorSign(currentOperator)} ${currentNumber}`)
              previousNumber = '';
              currentNumber = '';
              currentOperator = '';
              return currentResult;
  }
}
function createDecimal(e){
  userSelection = e.target.value;
  if (userSelection == 'decimal' &&
    !isDecimal(previousNumber)){
      previousNumber = previousNumber.toString().concat('.');
      currentResult = previousNumber;
      displayResult(currentResult)
      return previousNumber
    } else if (userSelection == 'decimal' &&
              !isDecimal(currentNumber)){
                currentNumber = currentNumber.toString().concat('.');
                  currentResult = currentNumber;
                  displayResult(currentResult)
                  return currentNumber
    } else return
}

// Events for utility buttons
clearButton.addEventListener('click', clearAll)
deletion.addEventListener('click', removeLastNumber)

// Events for operator buttons
buttons.forEach( button => button.addEventListener('click', setOperator) )

// Events for number buttons
buttons.forEach( button => button.addEventListener('click', setNumbers) )


// Events for equal buttons
equalButton.addEventListener('click', performCalculation);


// Events for period button
buttons.forEach( button => button.addEventListener('click', createDecimal) )

// Keyboard support



console.log('previous Number is ' + previousNumber)
console.log('current Number is ' + currentNumber)
console.log('current Operator is ' + currentOperator)
console.log('current Result is ' + currentResult)