class Calculator {
  constructor(previousOperationTextElement, currentOperationTextElement) {
    this.previousOperationTextElement = previousOperationTextElement
    this.currentOperationTextElement = currentOperationTextElement
    this.clear()
  }

  clear() {
    this.currentOperation = ''
    this.previousOperation = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperation.includes('.')) return
    this.currentOperation = this.currentOperation.toString() + number.toString()
  }

  selectOperation(operation) {
    if (this.currentOperation === '') return
    if (this.previousOperation !== '') {
      this.operate()
    }
    this.operation = operation
    this.previousOperation = this.currentOperation
    this.currentOperation = ''
  }

  operate() {
    let computation
    const prev = parseFloat(this.previousOperation)
      const current = parseFloat(this.currentOperation)
      if (isNaN(prev) || isNaN(current))
          return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperation = computation
    this.operation = undefined
    this.previousOperation = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperationTextElement.innerText =
      this.getDisplayNumber(this.currentOperation)
    if (this.operation != null) {
      this.previousOperationTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
    }
    else {
        this.previousOperationTextElement.innerText = '';
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const previousOperationTextElement = document.querySelector('[data-previousOperation]')
const currentOperationTextElement = document.querySelector('[data-currentOperation]')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.operate()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})