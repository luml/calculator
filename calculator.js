let runningTotal = 0;
// recent calculating number
let buffer = "0";
// recent calculating operator
let previousOperator;

const screen = document.querySelector('.screen');

// operation for different operator symbol, +=*/
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;// 0 + 9, intBuffer = 9
    } else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    } else if(previousOperator === '*'){
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

// do math with buffer, 
function handleMath(symbol){
    if(buffer === '0'){
        // Do nothing
        return;
    }
    const intBuffer = parseInt(buffer);// '9' parseInt to 9
    if(runningTotal === 0){
        runningTotal = intBuffer; // runningTotal = 9
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

// symbols operator
function handleSymbols(symbol) {
    // previousOperator = symbol;
    switch(symbol) {
        case '🔙':
        // TODO what do we want it to go back?
            break;
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            handleMath(symbol);
            previousOperator = null;
            console.log('Click = runningTotal: ' + runningTotal);// Why is this 12?
            buffer = runningTotal;
            runningTotal = 0;
            screen.innerText = buffer;
            break;
        case '+':
            handleMath(symbol);
            console.log('Click + buffer: ' +runningTotal);
            buffer = '0';
            console.log('Click + runningTotal: ' +runningTotal);
            break;
        case '-':
            handleMath(symbol);
            console.log('Click - buffer: ' +runningTotal);
            break;
        case '*':
            handleMath(symbol);
            break;
        case '➗':
            handleMath(symbol);
            break;
    }
}

// number operator
function handleNumbers(numberString) {
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString; // if click two number in a row, buffer = 23
    }
}

// Seperate number button and operator button
// click operator button, screen doesn't change; click number button, screen change with number
function buttonClick(value){
    if(isNaN(value)) {
        // If value is not a number
        handleSymbols(value);
    }else {
        handleNumbers(value);
        screen.innerText = buffer;
    }
    // Becasue we don't show 0 on screen everytime we click the operator
    // screen.innerText = buffer;
}

// init function for calculating
function init() {
    document.querySelector('.calc-buttons').addEventListener("click", function(){
        buttonClick(event.target.innerText);
    })
}
init();


