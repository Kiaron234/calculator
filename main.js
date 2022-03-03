class Calculator{
    constructor(previousOutput,currentOutput)
    {
        this.previousOutput = previousOutput;
        this.currentOutput = currentOutput;
        this.clear();
    }

    clear()
    {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    appendNumber(number)
    {
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay()
    {
        this.currentOutput.innerText = this.currentOperand;
        if (this.operation != null)
        {
            this.previousOutput.innerText = 
            `${this.previousOperand} ${this.operation}`
        }else{
            this.previousOutput.innerText = this.previousOperand;
        }
        
    }

    compute()
    {
        let computation;
        const prev = parseInt(this.previousOperand);
        const curr = parseInt(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation)
        {
            case '+':
                computation = prev+curr;
                break;
            case 'x':
                computation = prev*curr;
                break;
            case '/':
                computation = prev/curr;
                break;
            case '-':
                computation = prev-curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperaton(operation)
    {
        if (this.currentOperand === '') return;
        if(this.previousOperand != '')
        {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const previousOutput = document.querySelector('[data-previousOutput]');
const currentOutput = document.querySelector('[data-currentOutput]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const delBtn = document.querySelector('[data-delete]');


const calculator = new Calculator(previousOutput,currentOutput);

numberBtn.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationBtn.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperaton(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
})

delBtn.addEventListener('click',() =>{
    calculator.delete();
    calculator.updateDisplay();
})
