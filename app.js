let previousVal = "";
let currentVal = "";
let op = "";
let store = 0;


/* Stores document element */
const printOnScreen = document.querySelector('#print');
const digits = document.querySelectorAll('.digit');
const deleteKey = document.querySelector('#delete');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('#decimal');
const reset = document.querySelector('#reset');
const equal = document.querySelector('#equal');
const keys = document.querySelectorAll('.keys');


printOnScreen.style.userSelect = "none";

/* Listens for user interaction with elements */
keys.forEach((key) => key.addEventListener('mousedown', (e) => {
    e.target.style.opacity = "0.7";
    e.target.style.backgroundColor = "red";
}))

keys.forEach((key) => key.addEventListener('mouseup', (e) => {
    e.target.style.opacity = "";
    e.target.style.backgroundColor = "";
}))

printOnScreen.textContent = "0";

digits.forEach((digit) => digit.addEventListener('click', (e) => {
    handleNum(e.target.textContent);
    printOnScreen.textContent = currentVal;
}))

operators.forEach((operator) => operator.addEventListener('click', (e) => {
    handleSign(e.target.textContent);
}))

equal.addEventListener('click', () => {
    operate();
    if (store.length <= 8)
        printOnScreen.textContent = store;
    else
    {
        printOnScreen.textContent = ".." + store.slice(0,12);
    }
})

reset.addEventListener('click', () => {
    currentVal = "";
    printOnScreen.textContent = "0";
    previousVal = "";
    op = "";
})

decimal.addEventListener('click', () => {
    addDecimal();
})

deleteKey.addEventListener('click', () => {
    printOnScreen.textContent = currentVal.slice(0, -1);
    currentVal = printOnScreen.textContent;
    if (currentVal.length === 0)
    {
        currentVal = "";
        printOnScreen.textContent = "0";
        previousVal = "";
        op = "";
    }
})

/* Handles value output */
function handleNum(num)
{
    if (currentVal.length <= 14)
    {
        currentVal += num;
    }
}

/* Assigns an operator for mathematical operations*/
function handleSign(sign)
{
    if (previousVal.length > 0)
    {
        previousVal = store;
    }
    else
    {
        previousVal = currentVal;
    }
    op = sign;
    currentVal = "";
}

/* Carries out mathematical operations */
function operate()
{
    previousVal = Number(previousVal);
    currentVal = Number(currentVal);
    if (op === "+")
        add();
    else if (op === "x")
        mult();
    else if (op === "-")
        subtract();
    else if (op === "/")
        divide();

    previousVal = store;

    if (store < 0)
    {
        store = store * -1;
        store = store.toString() + "-";
    }
    else
        store = store.toString();
    previousVal = previousVal.toString();
    currentVal = currentVal.toString();

    console.log(store);
}

/* Adds values */
function add()
{
    store = previousVal + currentVal;
}
/* Multiplies values */
function mult()
{
    store = previousVal * currentVal;
}
/* Subtracts values */
function subtract()
{
    store = previousVal + (-1 * currentVal);
}
/* Divides values */
function divide()
{
    store = previousVal / currentVal;
}

/* Adds decimal point */
function addDecimal()
{
    if (!currentVal.includes("."))
    {
        currentVal += ".";
    }
}