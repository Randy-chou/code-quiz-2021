// Retrieve buttons from document
var startButton = document.getElementById("startbutton");
var viewscoreslink = document.getElementById("viewscoreslink");
var goback = document.getElementById("goback");
var clearscores = document.getElementById("clearscores");

// Local high score storage related elements
var playerName = document.getElementById("playername");
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
var answeroptions = document.getElementById("answeroptions");
var response = document.getElementById("response");
var qprefix = document.getElementById("qprefix");

// Retieve document elements concerning the finish screen
var scoreDisplay = document.getElementById("scoredisplay");

// Retrive document elements concerning scoreboard
var board = document.getElementById("board");

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
},{
    questiontxt: "What does JSON stand for?",
    answer: 1,
    option1: "Jar Scripted Ordered Notation",
    option2: "Java Styled ",
    option3: "JavaScript Object Notation",
    option4: "Jpeg "
}]

var score = 0;
var secondsleft = 0;
var answernum = 0;
var interupt = false;
var questionNum = 1;

function startGame(){
    setQuestion();
    interupt = false;
    secondsleft = 60;
    var timerInterval = setInterval(function(){
        timer.textContent = "Time: " + secondsleft;
        if(secondsleft <= 0){
            clearInterval(timerInterval);
            timer.textContent = "Time: " + 0;
            if(!interupt){
                scoreDisplay.textContent = "Your final score is: " + score;
                game.setAttribute("style", "display: none;");
                finish.setAttribute("style", "display: flex;");
            }
        }
        secondsleft--;
    },1000);
}

function setQuestion(){
    //TODO: add question randomization
    var newQuestion = questions[Math.floor(Math.random() * questions.length)];
    questiontext.textContent = newQuestion.questiontxt;
    button1.textContent = newQuestion.option1;
    button2.textContent = newQuestion.option2;
    button3.textContent = newQuestion.option3;
    button4.textContent = newQuestion.option4;
    answernum = newQuestion.answer;
}

function answerinputed(event){
    var element = event.target;
    var input = element.id.charAt(element.id.length - 1);
    if(input == answernum){
        response.textContent = "Answer for question " + questionNum +" was correct";
        score++;
    }else{
        response.textContent = "Answer for question " + questionNum +" was Wrong";
        secondsleft -= 5;
    }
    questionNum++
    qprefix.textContent = "Question " + questionNum + ": ";
    setQuestion();
}

// Button Functionality
function beginGame(){
    menu.setAttribute("style","display: none;");
    game.setAttribute("style","display: flex;");
    startGame();
}

function viewScores() {
    event.preventDefault();
    displayScore();
    interupt = true;
    secondsleft = 0;
    score = 0;
    answernum = 0;
    questionNum = 1;
    qprefix.textContent = "Question " + questionNum + ": ";
    menu.setAttribute("style", "display: none;");
    game.setAttribute("style", "display: none;");
    finish.setAttribute("style", "display: none;");
    scoreboard.setAttribute("style", "display: flex;");
}

function returnToMenu(){
    scoreboard.setAttribute("style", "display: none;");
    menu.setAttribute("style", "display: flex;");
}

//Local Storage Scoreboard
var test = localStorage.getItem("scoreArray");
var scoreArray = [];

if(!(test == null || test == [])) {
    scoreArray = JSON.parse(localStorage.getItem("scoreArray"))
}

console.log(scoreArray);

function updateScores(){
    console.log(scoreArray)
    if(playerName.value == ""){
        var newname = "N/A"
    }else{
        var newname = playerName.value
    }
    var newEntry = {
        name: newname,
        playerScore: score
    }
    console.log(newEntry);
    scoreArray.push(newEntry);
    console.log(scoreArray);
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    displayScore();
}

function displayScore(){
    board.innerHTML = "";

    //Update scoreArray to most recent iteration regardless of instance
    test = localStorage.getItem("scoreArray");
    scoreArray = [];
    if (!(test == null || test == [])) {
        scoreArray = JSON.parse(localStorage.getItem("scoreArray"))
    }

    for(var i = 0; i < scoreArray.length; i++){
        var entryScore = scoreArray[i];
        console.log(entryScore);
        var li = document.createElement("li");
        li.textContent = entryScore.name + " - " + entryScore.playerScore;

        board.appendChild(li);
    }
}

function clearScoreBoard(){
    scoreArray = [];
    localStorage.setItem("scoreArray", scoreArray)
    displayScore();
}

startButton.addEventListener("click", beginGame);
viewscoreslink.addEventListener("click", viewScores);
submit.addEventListener("click", viewScores);
submit.addEventListener("click", updateScores);
goback.addEventListener("click", returnToMenu);
clearscores.addEventListener("click", clearScoreBoard);
answeroptions.addEventListener("click", answerinputed)