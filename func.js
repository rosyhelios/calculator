class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computedResult;
      const previousValue = parseFloat(this.previousOperand);
      const currentValue = parseFloat(this.currentOperand);
      if (isNaN(previousValue) || isNaN(currentValue)) return;
      switch (this.operation) {
        case '+':
          computedResult = previousValue + currentValue;
          break;
        case '-':
          computedResult = previousValue - currentValue;
          break;
        case '*':
        case 'x':
          computedResult = previousValue * currentValue;
          break;
        case '/':
          computedResult = previousValue / currentValue;
          break;
        case '%':
          computedResult = previousValue % currentValue;
          break;
        default:
          return;
      }
      this.currentOperand = computedResult;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
  }
  
  // Element selections
  const numberButtons = Array.from(document.getElementsByClassName('number'));
  const operationButtons = Array.from(document.getElementsByClassName('operation'));
  const equalsButton = document.getElementById('equals');
  const allClearButton = document.getElementById('AC');
  const deleteButton = document.getElementById('del');
  const previousOperandTextElement = document.querySelector('.previous-operand');
  const currentOperandTextElement = document.querySelector('.current-operand');
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
  // Event listeners
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });
  
  window.addEventListener('keydown', (e) => {
    let keyValue = e.key;
    if ((keyValue >= '0' && keyValue <= '9') || keyValue === '.') {
      calculator.appendNumber(keyValue);
      calculator.updateDisplay();
    } else if (keyValue === 'Enter') {
      calculator.compute();
      calculator.updateDisplay();
    } else if (keyValue === 'Backspace') {
      calculator.delete();
      calculator.updateDisplay();
    } else if (keyValue === 'c' || keyValue === 'C') {
      calculator.clear();
      calculator.updateDisplay();
    } else if ('+-*/%'.includes(keyValue)) {
      calculator.chooseOperation(keyValue);
      calculator.updateDisplay();
    }
  });
  