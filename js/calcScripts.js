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

function ConvertInfixToPostfix(infixBuffer) {
    var priority = 0;
    var postfixBuffer = "";
    const stringArray = infixBuffer.split(" ");

    let stack1 = new Stack();

    for (var index = 0; index < stringArray.length; index++) {
        var operator = stringArray[index];

        if (operator == "+" || operator == "-" || operator == "*" || operator == "/") {
            //check precedence
            if (stack1.getLength() <= 0) {
                stack1.push(operator)
            } else {
                if (stack1.peek() == "*" || stack1.peek() == "/") {
                    priority = 1;
                } else {
                    priority = 0;
                }//end if

                if (priority == 1) {
                    if (operator == "+" || operator == "-") {
                        postfixBuffer += stack1.pop() + " ";
                        index--;
                    } else { // Same
                        postfixBuffer += stack1.pop() + " ";
                        index--;
                    }//end if
                } else {
                    if (operator == "+" || operator == "-") {
                        postfixBuffer += stack1.pop() + " ";
                        stack1.push(operator);
                    } else {
                        stack1.push(operator);
                    }//end if
                }//end if
            }//end if
        } else {
            if (postfixBuffer == "") {
                postfixBuffer += operator + " ";
            } else {

                if (index == stringArray.length) {
                    postfixBuffer += operator;
                } else {
                    postfixBuffer += operator + " ";
                }//end if
            }//end if
        }//end if
    }//end for

    var length = stack1.getLength();

    for (var index2 = 0; index2 < length; index2++) {
        if (stack1.getLength() == 1) {
            postfixBuffer += stack1.pop();
        } else {
            postfixBuffer += stack1.pop() + " ";
        }//end if  
    }//end for

    return postfixBuffer;
}//end function

var newStack = new Stack();

function SolveProblem(inputString) {
    //split string on spaces and store to array
    var stringArray = inputString.split(' ');

    for (var index = 0; index < stringArray.length; index++) {
        //as we walk the array check to see if the current index is an operator or operand
        if (IsOperator(stringArray[index]) == true) {//if operator perform the required operation
            Operate(stringArray[index]);

        } else {//if operand add to stack
            newStack.push(stringArray[index]);
            //lsbListBox.Items.Add("After Push: " + newStack.ToString());
        }//end if               
    }//end for
    //return final result
    return newStack.peek();
}//end function

function isOperator(symbol) {
    if (symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/") {
        return true;
    } else {
        return false;
    }//end if 
}//end function

function Evaluate(symbol) {
    //pop the first 2 operands from the stack and store their values to variables                                 
    var num2 = newStack.pop();
    var num1 = newStack.pop();

    //depending on the operator call the required method and push result onto stack
    if (symbol == "+") {

        var result = Add(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Addition: " + newStack.ToString());

    } else if (symbol == "-") {

        var result = Subtract(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Subtraction: " + newStack.ToString());

    } else if (symbol == "*") {

        var result = Multiply(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Multiplication: " + newStack.ToString());

    } else if (symbol == "/") {

        var result = Divide(num1, num2);
        newStack.push(result.toString());
        //lsbListBox.Items.Add("After Division: " + newStack.ToString());
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