let screen = document.querySelector('.screen');
const digits = document.querySelector('.numbers-container');
const operatorButtons = document.querySelector('.operators-container');
const equals = document.querySelector('.equals');
const upperButtons = document.querySelector('.upper-keys');

let numberOne = '';
let numberTwo = '';
let operator = '';
let resultDisplayed = false;

digits.addEventListener("click", (e) => {
    if (e.target.classList.contains("number")) {
        if (resultDisplayed) {
            numberOne = '';
            numberTwo = '';
            operator = '';
            resultDisplayed = false;
        }

        if (operator === '') {
            if (numberOne.length >= 9) return;
            numberOne += e.target.textContent;
            screen.textContent = numberOne;
        } else {
            if (numberTwo.length >= 9) return;
            numberTwo += e.target.textContent;
            screen.textContent = numberTwo;
        }
    }
});

operatorButtons.addEventListener("click", function (e) {
    if (e.target.classList.contains('operator-button')) {
        if (resultDisplayed) {
            resultDisplayed = false;
            operator = e.target.textContent;
            screen.textContent = `${numberOne} ${operator}`;
        } else if (numberOne !== '' && numberTwo === '') {
            operator = e.target.textContent;
            screen.textContent = `${numberOne} ${operator}`;
        } else if (numberOne !== '' && numberTwo !== '') {
            evaluate();
            operator = e.target.textContent;
            screen.textContent = `${numberOne} ${operator}`;
        }
    }
});

equals.addEventListener("click", function () {
    if (numberOne !== '' && numberTwo !== '' && operator !== '') {
        evaluate();
    }
});

upperButtons.addEventListener("click", function (e) {
    if (e.target.classList.contains("cancel-button")) {
        resetCalculator();
    } else if (e.target.classList.contains('backspace')) {
        if (operator === '') {
            numberOne = numberOne.slice(0, -1);
            screen.textContent = numberOne;
        } else if (numberTwo === '') {
            operator = '';
            screen.textContent = numberOne;
        } else {
            numberTwo = numberTwo.slice(0, -1);
            screen.textContent = numberTwo;
        }
    }
});

function addition(numberOne, numberTwo) {
    return parseFloat(numberOne) + parseFloat(numberTwo);
}

function subtraction(numberOne, numberTwo) {
    return parseFloat(numberOne) - parseFloat(numberTwo);
}

function multiplication(numberOne, numberTwo) {
    return parseFloat(numberOne) * parseFloat(numberTwo);
}

function division(numberOne, numberTwo) {
    if (parseFloat(numberTwo) === 0) {
        return 'Error';
    }
    return parseFloat(numberOne) / parseFloat(numberTwo);
}

function evaluate() {
    let result = 0;
    switch (operator) {
        case '+':
            result = addition(numberOne, numberTwo);
            break;
        case '-':
            result = subtraction(numberOne, numberTwo);
            break;
        case '*':
            result = multiplication(numberOne, numberTwo);
            break;
        case '/':
            result = division(numberOne, numberTwo);
            break;
    }

    result = result.toString().slice(0, 9);
    screen.textContent = result;
    numberOne = result;
    numberTwo = '';
    operator = '';
    resultDisplayed = true;
}

function resetCalculator() {
    numberOne = '';
    numberTwo = '';
    operator = '';
    resultDisplayed = false;
    screen.textContent = '';
}
