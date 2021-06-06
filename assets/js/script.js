// Retrieve buttons from document
var startButton = document.getElementById("startbutton");
var viewscoreslink = document.getElementById("viewscoreslink");
var goback = document.getElementById("goback");
var clearscores = document.getElementById("clearscores");

// Retrive differnt main UIs from document
var menu = document.getElementById("menu");
var game = document.getElementById("game");
var finish = document.getElementById("finish");
var scoreboard = document.getElementById("scoreboard");

// Coding Quiz Game Functionality
var question1 = {
    
}

// Button Functionality
function beginGame(){
    menu.setAttribute("style","display: none;");
    game.setAttribute("style","display: flex;");
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
viewscoreslink.addEventListener("click", viewScores)
goback.addEventListener("click", returnToMenu);
clearscores.addEventListener("click", clearScoreBoard);