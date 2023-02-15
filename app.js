let previousVal = "";
let currentVal = "";
let op = "";
let updateScreen = "";

const allElements = document.querySelectorAll("*");

allElements.forEach((element) => {
  element.style.userSelect = "none";
})

/* Stores document elements */
const primaryScreen = document.querySelector("#primary-screen");
const secondaryScreen = document.querySelector("#secondary-screen");
const digits = document.querySelectorAll(".digit");
const deleteKey = document.querySelector("#delete");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector("#decimal");
const reset = document.querySelector("#reset");
const equal = document.querySelector("#equal");
const keys = document.querySelectorAll(".keys");

primaryScreen.textContent = "0";
secondaryScreen.textContent = "0";

keys.forEach((key) =>
  key.addEventListener("mousedown", (e) => {
    e.target.style.backgroundColor = "grey";
  })
);

keys.forEach((key) =>
  key.addEventListener("mouseup", (e) => {
    e.target.style.backgroundColor = "";
  })
);

digits.forEach((digit) =>
  digit.addEventListener("click", (e) => {
    handleDigit(e.target.textContent);
    if (previousVal !== "") {
      secondaryScreen.textContent = currentVal + " " + updateScreen;
      primaryScreen.textContent = currentVal;
    } else {
      primaryScreen.textContent = currentVal;
    }
  })
);

operators.forEach((operator) =>
  operator.addEventListener("click", (e) => {
    handleSign(e.target.textContent);
    updateScreen = op + " " + previousVal;
    secondaryScreen.textContent = updateScreen;
    primaryScreen.textContent = previousVal;
  })
);

equal.addEventListener("click", (e) => {
  operateWhenEqual();
  primaryScreen.textContent = previousVal;
  if (previousVal.length <= 10) primaryScreen.textContent = previousVal;
  else {
    primaryScreen.textContent = `...${previousVal.slice(0, 13)}`;
  }
});

equal.addEventListener("mousedown", (e) => {
  primaryScreen.style.color = "orangered";
});

equal.addEventListener("mouseup", (e) => {
  primaryScreen.style.color = "";
});

reset.addEventListener("click", () => {
  previousVal = "";
  currentVal = "";
  op = "";
  updateScreen = "";
  primaryScreen.textContent = "0";
  secondaryScreen.textContent = "0";
});

deleteKey.addEventListener("click", () => {
  primaryScreen.textContent = currentVal.slice(0, -1);
  currentVal = primaryScreen.textContent;

  if (currentVal.length === 0) {
    previousVal = "";
    currentVal = "";
    op = "";
    updateScreen = "";
    primaryScreen.textContent = "0";
    secondaryScreen.textContent = "0";
  }
});

decimal.addEventListener("click", () => {
  addDecimal();
});

function handleDigit(digit) {
  if (currentVal.length <= 14) {
    currentVal += digit;
  }
}

function handleSign(sign) {
  if (previousVal !== "") {
    operate();
  } else {
    op = sign;
    previousVal = currentVal;
  }
  op = sign;
  currentVal = "";
}

function operate() {
  previousVal = Number(previousVal);
  currentVal = Number(currentVal);
  if (op === "+") {
    previousVal += currentVal;
  } else if (op === "-") {
    if (previousVal < 0)
      previousVal = -1 * (-1 * previousVal) + -1 * currentVal;
    else previousVal = previousVal + -1 * currentVal;
  } else if (op === "/") {
    previousVal /= currentVal;
  } else if (op === "×") {
    previousVal *= currentVal;
  }
  if (previousVal < 0) {
    previousVal *= -1;
    previousVal = previousVal + "-";
  } else previousVal = previousVal.toString();
  currentVal = currentVal.toString();
}

function operateWhenEqual() {
  previousVal = Number(previousVal);
  currentVal = Number(currentVal);
  if (op === "+") {
    previousVal += currentVal;
    currentVal = 0;
  } else if (op === "-") {
    if (previousVal < 0)
      previousVal = -1 * (-1 * previousVal) + -1 * currentVal;
    else previousVal = previousVal + -1 * currentVal;
    currentVal = 0;
  } else if (op === "/") {
    previousVal /= currentVal;
    currentVal = 1;
  } else if (op === "×") {
    previousVal *= currentVal;
    currentVal = 1;
  }
  if (previousVal < 0) {
    previousVal *= -1;
    previousVal = previousVal + "-";
  } else previousVal = previousVal.toString();
  currentVal = currentVal.toString();
}

function addDecimal() {
  if (!currentVal.includes(".") && currentVal.length > 0) {
    currentVal += ".";
  } else if (!currentVal.includes(".") && currentVal.length === 0) {
    currentVal += "0.";
  }
}
