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
  userSelection = e.target.value;
  return setOperatorLogic(e.target);
}
function setOperatorLogic(target){
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
  return setNumbersLogic();
}
function setNumbersLogic(){
  if (!isNaN(userSelection) &&  
          !currentOperator &&         
          !previousNumber){            
            previousNumber = userSelection;
            currentResult = previousNumber;
            displayResult(currentResult)
            return previousNumber;
} else if (!isNaN(userSelection) && 
          !currentOperator &&       
          previousNumber){
            if (previousNumber.charAt(0) == '0') previousNumber = previousNumber.slice(1, -1)
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
            if (currentNumber.charAt(0) == '0') currentNumber = currentNumber.slice(1, -1)
            currentNumber = currentNumber.toString().concat(userSelection);
            currentResult = currentNumber;
            displayResult(currentResult)
            return currentNumber;
}
}
function performCalculation(e){
  userSelection = e.target.value;
  return performCalculationLogic();
}
function performCalculationLogic(){
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
              removeActiveClass(buttons)
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
              removeActiveClass(buttons)
              return currentResult;
  } else if (previousNumber && // Previous number and operator were defined
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
              removeActiveClass(buttons)
              return currentResult;
  }
}
function createDecimal(e){
  userSelection = e.target.value;
  return createDecimalLogic();
}
function createDecimalLogic(){
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

// Keyboard support for number buttons
window.addEventListener('keydown', setNumbersbyKey);
function setNumbersbyKey(e){
  const key = document.querySelector(`.button[data-key="${e.keyCode}"]`);
  if (!key) return;
  if (isNaN(key.value)) {
    return;
  } else if (!e.shiftKey) {
    userSelection = key.value;
    key.classList.add('active')
    return setNumbersLogic();
  }
}
buttons.forEach( button => button.addEventListener('transitionend', removeTransform))
function removeTransform(e){
  if (e.propertyName !== 'transform' || isNaN(this.value)) return;
  this.classList.remove('active')
}

// Keyboard support for operator buttons
window.addEventListener('keydown', setOperatorByKey);
function setOperatorByKey(e){
  if (e.keyCode == '56' && e.shiftKey){
    const key = document.querySelector(`.button[value="multiply"]`);
    if (!key) return;
    userSelection = 'multiply';
    return setOperatorLogic(key)
  } else {
    const key = document.querySelector(`.button[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (isNaN(key.value) && checkExistOperator(key.value)){
      userSelection = key.value;
      return setOperatorLogic(key)
    }
  }
}

// Keyboard support for equal button
window.addEventListener('keydown', calculateByKey);
function calculateByKey(e){
  if (e.keyCode == '13'){
    userSelection = 'equal';
    return performCalculationLogic();
  }
}
