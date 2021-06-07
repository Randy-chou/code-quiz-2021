// Retrieve buttons from document
var startButton = document.getElementById("startbutton");
var viewscoreslink = document.getElementById("viewscoreslink");
var goback = document.getElementById("goback");
var clearscores = document.getElementById("clearscores");
var submit = document.getElementById("submit");

// Retrive differnt main UIs from document
var menu = document.getElementById("menu");
var game = document.getElementById("game");
var finish = document.getElementById("finish");
var scoreboard = document.getElementById("scoreboard");

// Retrive Game elements from document
var timer = document.querySelector("header h1");
var questiontext = document.getElementById("qcontent");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");

// Coding Quiz Game Functionality
var questions = [{
    questiontxt: "Arrays in javascript can be used to store:",
    answer: 4,
    option1: "Strings",
    option2: "Objects",
    option3: "Other arrays",
    option4: "All the above"

},{
    questiontxt: "Which of the following is a valid type of function javascript supports?",
    answer: 3,
    option1: "Named function",
    option2: "Anonymous function",
    option3: "Both of the above",
    option4: "None of the above"
},{
    questiontxt: "Which built-in method combines the text of two strings and returns a new string?",
    answer: 2,
    option1: "append()",
    option2: "concat()",
    option3: "attach()",
    option4: "None of the above"
},{
    questiontxt: "Commonly used datatypes DO NOT include",
    answer: 3,
    option1: "Numbers",
    option2: "Strings",
    option3: "Alerts",
    option4: "Booleans"
},{
    questiontxt: "What does CSS stand for?",
    answer: 1,
    option1: "Cascading Style Sheets",
    option2: "Computer Superscripted Styles",
    option3: "Core Sectioned Styles",
    option4: "Color and Styled Sheets"
}]

var score = 0;
var secondsleft = 60;

function startGame(){
    setQuestion();
    var timerInterval = setInterval(function(){
        timer.textContent = "Time: " + secondsleft;
        if(secondsleft <= 0){
            clearInterval(timerInterval);
            timer.textContent = "Time: " + 0;
            game.setAttribute("style", "display: none;");
            finish.setAttribute("style", "display: flex;");
        }
        secondsleft--;
    },1000);
}

function setQuestion(){
    var newQuestion = questions[0];
    questiontext.textContent = newQuestion.questiontxt;
    button1.textContent = newQuestion.option1;
    button2.textContent = newQuestion.option2;
    button3.textContent = newQuestion.option3;
    button4.textContent = newQuestion.option4;
}

// Button Functionality
function beginGame(){
    menu.setAttribute("style","display: none;");
    game.setAttribute("style","display: flex;");
    startGame();
}

//TODO reset game conditions every time you go to view scores.
function viewScores(){
    event.preventDefault();
    menu.setAttribute("style", "display: none;");
    game.setAttribute("style", "display: none;");
    finish.setAttribute("style", "display: none;");
    scoreboard.setAttribute("style", "display: flex;");
}

function returnToMenu(){
    scoreboard.setAttribute("style", "display: none;");
    menu.setAttribute("style", "display: flex;");
}

//Clears Local Storage Scoreboard
function clearScoreBoard(){

}


startButton.addEventListener("click", beginGame);
viewscoreslink.addEventListener("click", viewScores);
submit.addEventListener("click", viewScores);
goback.addEventListener("click", returnToMenu);
clearscores.addEventListener("click", clearScoreBoard);