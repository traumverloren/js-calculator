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
  screenInput.innerHTML = num;
}

function handleClearAll() {
  screenInput.innerHTML = '';
  currentNum = '';
  lastNum = '';
  needsNum = true;
}

function handleClearEntry() {
  screenInput.innerHTML = '';
  currentNum = '';
}

function handleNumber() {
  currentNum += this.value;
  addToScreen(currentNum);
  needsNum = false;
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
  console.log("current",currentNum);
  if (lastNum === '') {
    lastNum = currentNum;
  } else if (needsNum === false){
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
