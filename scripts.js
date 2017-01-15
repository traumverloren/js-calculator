const screenInput = document.querySelector('.screen-input');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const numbers = Array.from(document.querySelectorAll('.num')).map(num => num.value);
const operators = Array.from(document.querySelectorAll('.operator')).map(num => num.value);
const equalsButton = document.querySelector('.equals');
const allClearButton = document.querySelector('.all-clear');
const clearEntryButton = document.querySelector('.clear-entry');

let currentNum = '';
let lastNum = '';
let operator = '';

function addToScreen(num) {
  screenInput.innerHTML = num;
}

function handleClearAll() {
  screenInput.innerHTML = '';
  currentNum = '';
  lastNum = '';
  operator = '';
}

function handleNumber() {
  currentNum += this.value;
  addToScreen(currentNum);
}

function calculate() {
  console.log(`${lastNum}${operator}${currentNum}`);
  return eval(`${lastNum}${operator}${currentNum}`);
}

function handleOperator() {
  operator = this.value;
  if (lastNum === '') {
    lastNum = currentNum;
  } else {
    lastNum = calculate();
  }
  currentNum = '';
  addToScreen(lastNum);
}

function handleEquals() {
  if (lastNum === '') {
    lastNum = currentNum;
    currentNum = '';
  } else {
    lastNum = calculate();
  }
  addToScreen(lastNum);
}

numberButtons.forEach(number => number.addEventListener('click', handleNumber));
operatorButtons.forEach(operator => operator.addEventListener('click', handleOperator));
equalsButton.addEventListener('click', handleEquals);
allClearButton.addEventListener('click', handleClearAll);
/*

Input a number, display a number
Add to that number until a operator is clicked

after each operator, calculate new value.
display new value on screen.

when EQUALS clicked, display Final Value.

*/
