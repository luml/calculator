let runningTotal = 0;
// recent calculating number
let buffer = "0";
// recent calculating operator
let previousOperator;

const screen = document.querySelector('.screen');

// operation for different operator symbol, +=*/
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
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
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

// symbols operator; clean up the screen when operator is 'C' or '🔙'
function handleSymbols(symbol) {
    // previousOperator = symbol;
    switch(symbol) {
        case '🔙':
        // go back when type more than 2 numbers on the screen
            if(buffer.length>1){
                console.log('buffer.length > 1', buffer);
                buffer = buffer.split('').slice(0, buffer.length-1).join('');
                screen.innerText = buffer;
            }
            break;
        case 'C':
            buffer = '0';
            runningTotal = 0;
            screen.innerText = buffer;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            handleMath(symbol);
            previousOperator = null;
            console.log('Click = runningTotal: ' + runningTotal);
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
        buffer += numberString;
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


