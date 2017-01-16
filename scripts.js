const screenInput = document.querySelector('.screen-input');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const numbers = Array.from(document.querySelectorAll('.num')).map(num => num.value);
const operators = Array.from(document.querySelectorAll('.operator')).map(num => num.value);
const equalsButton = document.querySelector('.equals');
const clearAllButton = document.querySelector('.all-clear');
const clearEntryButton = document.querySelector('.clear-entry');

let currentNum = '';
let lastNum = '';
let operator = '';
let needsNum = true;

function addToScreen(num) {
  if (numTooLong(num)) {
    screenInput.innerHTML = "Too long";
    reset();
  } else {
    screenInput.innerHTML = num;
  }
}

// resets values to defaults
function reset() {
  currentNum = '';
  lastNum = '';
  operator = '';
  needsNum = true;
}

// resets values and clears screen if AC pressed
function handleClearAll() {
  addToScreen('');
  reset();
}

// resets currentNum & clears screen if CE pressed
function handleClearEntry() {
  addToScreen('');
  currentNum = '';
}

// takes care of adding number to screen & adding it to currentNum if num pressed
function handleNumber() {
  this.blur();
  currentNum += this.value;
  addToScreen(currentNum);
  needsNum = false;
}

// checks if a num entered or calculated is too big to display on screen
function numTooLong(num) {
  // num needs to be a string not a num to check the length
  num = num.toString();
  return num.length > 10;
}

// rounds up to 2 decimal places
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

// returns a calculated & rounded value
function calculate() {
  let total = eval(`${lastNum}${operator}${currentNum}`);
  return roundToTwo(total);
}

// takes care of +,-,*,/ when pressed and either does calculation or does nothing if no currentNum
function handleOperator() {
  this.blur();
  operator = this.value;
  if (lastNum === '') {
    lastNum = currentNum;
  } else if (needsNum === false){
    lastNum = calculate();
  }
  currentNum = '';
  addToScreen(lastNum);
  needsNum = true;
}

// takes care when EQUALS pressed.
// if has operator & currentNum, calculates, else does nothing, displays lastNum only
function handleEquals() {
  this.blur();
  if (lastNum === '') {
    lastNum = currentNum;
    currentNum = '';
  } else if (operator !== '' && currentNum !== '') {
    lastNum = calculate();
  }
  needsNum = true;
  addToScreen(lastNum);
}

numberButtons.forEach(number => number.addEventListener('click', handleNumber));
operatorButtons.forEach(operator => operator.addEventListener('click', handleOperator));
equalsButton.addEventListener('click', handleEquals);
clearAllButton.addEventListener('click', handleClearAll);
clearEntryButton.addEventListener('click', handleClearEntry);
