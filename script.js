const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay() {
    display.value = currentInput || '0';
}

function handleNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '÷':
            result = prev / current;
            break;
        case '×':
            result = prev * current;
            break;
        case '−':
            result = prev - current;
            break;
        case '+':
            result = prev + current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function handleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function handlePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleEqual() {
    calculate();
}

document.querySelectorAll('.btn.number').forEach(button => {
    button.addEventListener('click', () => handleNumber(button.textContent));
});

document.querySelectorAll('.btn.operator').forEach(button => {
    button.addEventListener('click', () => handleOperator(button.textContent));
});

document.querySelector('.btn.clear').addEventListener('click', handleClear);
document.querySelector('.btn.sign').addEventListener('click', handleSign);
document.querySelector('.btn.percentage').addEventListener('click', handlePercentage);
document.querySelector('.btn.equals').addEventListener('click', handleEqual);
document.querySelector('.btn.number').forEach(button => {
    button.addEventListener('click', () => handleDecimal(button.textContent));
});