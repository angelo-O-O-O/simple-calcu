const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
let currentDisplay = display.textContent;
let resultDisplay = false; //gagamitin to kung mag start ng new expression after ipress ang operation or number
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const btnValue = button.textContent.trim();
        //c
        if (btnValue === "C") {
            currentDisplay = "0";
            resultDisplay = false;
        }
        //del
        else if (btnValue === "DEL") {
            currentDisplay = currentDisplay.slice(0, -1);
            currentDisplay = currentDisplay === "" ? "0" : currentDisplay;
        }
        //calculate if equal is pressed
        else if (btnValue === "="){
            calculate();
            resultDisplay = true;
            return;
        }
        else{ //calcu display logic
            if (resultDisplay) {
                continueExpression(btnValue);
                display.textContent = currentDisplay;
                return;
            }
            if (!checkOperation(btnValue)) { //para di magdoble ng pindot ng operator
                return;
            }

          if (currentDisplay === "0") {
            currentDisplay = btnValue;
        } else {
            currentDisplay += btnValue;
        }}
        display.textContent = currentDisplay;
    });
});

function checkOperation(btnValue){
    if (!resultDisplay && btnValue === "+" || btnValue === "-" || btnValue === "*" || btnValue === "/") {//check if last character is operator
        let lastCharacter = currentDisplay.slice(-1); //get last character
        if (lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "*" || lastCharacter === "/") {
            return false; //pag ang last char ay operator, bawal na pindutin yung isa pang operator
        }
    }
    return true; //pag ang last char ay number, pwede mag pindot ng operator
}
function continueExpression(btnValue){ //pag nadisplay na ang result
    if(resultDisplay && (btnValue === "+" || btnValue === "-" || btnValue === "*" || btnValue === "/")){ //tingnan kung operator ang pinindot
        currentDisplay = currentDisplay + btnValue; //idagdag yung operator sa result
    }
     else {
        currentDisplay = btnValue; //if number ang btnValue, new expression na
    }
    resultDisplay = false;
}
function calculate(){
    let expression = currentDisplay;

    if(expression.includes("/0")){
        display.textContent = "Error: Division by zero";
        return;
    }
    let result = eval(expression); //evaluate yung expression sa display
    display.textContent = "=" +result;
    currentDisplay = result.toString(); //istore yung previous result para magamit sa susunod na expression
}