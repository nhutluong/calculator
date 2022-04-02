//CREATE ClASS
class Calculator {
    constructor() {
        this.displayValue = '';
    }//end constructor();

}//end function

class Stack {
    constructor() {
        this.items = [];
    }//end constructor

    //functions
    push(element) {
        //push element into items
        this.items.push(element);
    }//end function

    pop() {
        //return top element in stack
        //removes from stack
        //null exception if stack empty
        if (this.items.length == 0) {
            return "Exception: stack empty";
            return this.items.pop();
        }//end if
    }//end function

    peek() {
        //return top element 
        return this.items[this.items.length - 1];
    }//end function

    isEmpty() {
        //return true if stack empty
        return this.items.length == 0;
    }//end function

    printStack() {
        var string = "";
        for (var index = 0; index < this.items.length; index++) {
            string += this.items[index] + " ";
            return string;
        }//end for
    }//end function

    getLength() {
        return this.items.length;
    }//end function
}//end class

function ConvertInfixToPostfix(tempOutput) {
    var priority = 0;
    var tempPostFix = "";
    const stringArray = tempOutput.split(" ");

    let stack = new Stack();

    for (var index = 0; index < stringArray.length; index++) {
        var operator = stringArray[index];

        if (operator == "+" || operator == "-" || operator == "*" || operator == "/") {
            //check precedence
            if (stack.getLength() <= 0) {
                stack.push(operator)
            } else {
                if (stack.peek() == "*" || stack.peek() == "/") {
                    priority = 1;
                } else {
                    priority = 0;
                }//end if

                if (priority == 1) {
                    if (operator == "+" || operator == "-") {
                        tempPostFix += stack.pop() + " ";
                        index--;
                    } else { // Same
                        tempPostFix += stack.pop() + " ";
                        index--;
                    }//end if
                } else {
                    if (operator == "+" || operator == "-") {
                        tempPostFix += stack.pop() + " ";
                        stack.push(operator);
                    } else {
                        stack.push(operator);
                    }//end if
                }//end if
            }//end if
        } else {
            if (tempPostFix == "") {
                tempPostFix += operator + " ";
            } else {

                if (index == stringArray.length) {
                    tempPostFix += operator;
                } else {
                    tempPostFix += operator + " ";
                }//end if
            }//end if
        }//end if
    }//end for

    var length = stack.getLength();

    for (var index2 = 0; index2 < length; index2++) {
        if (stack.getLength() == 1) {
            tempPostFix += stack.pop();
        } else {
            tempPostFix += stack.pop() + " ";
        }//end if  
    }//end for

    return tempPostFix;
}//end function

var newStack = new Stack();

function SolveProblem(inputString) {
    //split string on spaces and store to array
    var stringArray = inputString.split(' ');

    for (var index = 0; index < stringArray.length; index++) {
        //check if the current index is an operator or operand
        if (IsOperator(stringArray[index]) == true) {//if operator perform the operation
            Operate(stringArray[index]);

        } else {//if operand add to stack
            newStack.push(stringArray[index]);
            
        }//end if               
    }//end for
    //return result
    return newStack.peek();
}//end function

function isOperator(operator) {
    if (operator == "+" || operator == "-" || operator == "*" || operator == "/") {
        return true;
    } else {
        return false;
    }//end if 
}//end function

function Evaluate(operator) {
    //pop the first 2 operands from top of stack and store values                                
    var num1 = newStack.pop();
    var num2 = newStack.pop();

    //if/else if to check operator, call the method and push result onto stack
    if (operator == "+") {

        var result = Add(num1, num2);
        newStack.push(result.toString());
        
    } else if (operator == "-") {

        var result = Subtract(num1, num2);
        newStack.push(result.toString());
        
    } else if (operator == "*") {

        var result = Multiply(num1, num2);
        newStack.push(result.toString());
        
    } else if (operator == "/") {

        var result = Divide(num1, num2);
        newStack.push(result.toString());
        
    }//end if                               
}//end function

//The parseFloat() function parses an argument (converting it to a string first if needed) 
//and returns a floating point number
function Add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}//end function
function Subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}//end function
function Divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}//end function
function Multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
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
    //var answer = 56;
    let infix = webCalculator.displayValue;
    var answer = SolveProblem(ConvertInfixToPostfix(infix));
    webCalculator.displayValue = answer;
    RefreshScreen();
}//end function