//CREATE ClASS
class Calculator {
    constructor() {
        this.displayValue = '';
    }//end constructor();

}//end function

//CREATE INSTANCE OF THE CLASS THIS INSTANCE IS GLOBAL
webCalculator = new Calculator;

//EVENTS
function InputDigit(digit) {
    webCalculator.displayValue += digit;
    RefreshScreen();
}//end function

function InputOperator(digit) {
    webCalculator.displayValue += " " + digit + " ";
    RefreshScreen();
}//end function

function ResetCalculator() {
    webCalculator.displayValue = '';
    RefreshScreen();
}//end function

//ALTER THE CALCULATOR'S SCREEN
function RefreshScreen() {
    //GRAB THE ELEMENT THAT REPRESENTS THE SCREEN <INPUT>
    var inputElement = document.querySelector('.calculator-screen');

    //CHANGE THE VALUE PROPERTY OF THE ELEMENT
    inputElement.value = webCalculator.displayValue;
}//end function

//PROCESS INPUT ON CALCULATOR SCREEN
function ProcessInput() {
    //TO DO
    var answer = 56;
    webCalculator.displayValue = answer;
    RefreshScreen();
}//end function