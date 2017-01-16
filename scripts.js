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
    clear();
  } else {
    screenInput.innerHTML = num;
  }
}

function clear() {
  currentNum = '';
  lastNum = '';
  operator = '';
  needsNum = true;
}

function handleClearAll() {
  addToScreen('');
  clear();
}

function handleClearEntry() {
  addToScreen('');
  currentNum = '';
}

function handleNumber() {
  currentNum += this.value;
  addToScreen(currentNum);
  needsNum = false;
}

function numTooLong(num) {
  // num needs to be a string not a num to check the length
  num = num.toString();
  return num.length > 10;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function calculate() {
  let total = eval(`${lastNum}${operator}${currentNum}`);
  return roundToTwo(total);
}

function handleOperator() {
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

function handleEquals() {
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

/*

Input a number, display a number
Add to that number until a operator is clicked

after each operator, calculate new value.
display new value on screen.

when EQUALS clicked, display Final Value.

*/
