// Retrieve buttons used in menu navigation
var startButton = document.getElementById("startbutton");
var viewscoreslink = document.getElementById("viewscoreslink");
var goback = document.getElementById("goback");
var clearscores = document.getElementById("clearscores");
var menu = document.getElementById("menu");
var game = document.getElementById("game");
var finish = document.getElementById("finish");
var scoreboard = document.getElementById("scoreboard");

// elements related to local storage of player scores
var playerName = document.getElementById("playername");
var submit = document.getElementById("submit");

// Retrive Game elements from document
var timer = document.querySelector("header h1");
var qprefix = document.getElementById("qprefix");
var questiontext = document.getElementById("qcontent");
var answeroptions = document.getElementById("answeroptions");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var response = document.getElementById("response");

// Retieve document elements concerning the finish screen
var scoreDisplay = document.getElementById("scoredisplay");

// Retrive document elements concerning scoreboard
var board = document.getElementById("board");

// Array containing objects representing questions to ask the user
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
    answer: 3,
    option1: "Jar Scripted Ordered Notation",
    option2: "Java Styled Object Numbering",
    option3: "Java Script Object Notation",
    option4: "Jar Synced Ordered Numbering"
}]

// Variables that are tracked in the game
var score = 0;
var secondsleft = 0;
var answernum = 0;
var questionNum = 1;

// Booelan to track if the game was interupted
var interupt = false;

// Makes the starting menu invisible and displays/starts the game
function beginGame(){
    menu.setAttribute("style","display: none;");
    game.setAttribute("style","display: flex;");
    startGame();
}

// Upon clicking the Start button, begins the game and timer countdown.
function startGame(){
    //reset score and display a new question and answer
    score = 0;
    setQuestion();

    // Game is not yet interupted
    interupt = false;

    // Set up and start timer countdown
    secondsleft = 60;
    var timerInterval = setInterval(function(){
        timer.textContent = "Time: " + secondsleft;

        // If the timer reaches zero the game is over
        if(secondsleft <= 0){
            //stop the timer regardless of whether the game was interupted
            clearInterval(timerInterval);
            timer.textContent = "Time: " + 0;

            //Check if game was interupted, if not then display the finish screen and show the user's score
            if(!interupt){
                scoreDisplay.textContent = "Your final score is: " + score;
                game.setAttribute("style", "display: none;");
                finish.setAttribute("style", "display: flex;");
            }
        }
        secondsleft--;
    },1000);
}

// Sets up a new question for the user to answer
function setQuestion(){
    // Pick a random question from the array of questions
    var newQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Display the contents of the new question
    questiontext.textContent = newQuestion.questiontxt;
    button1.textContent = newQuestion.option1;
    button2.textContent = newQuestion.option2;
    button3.textContent = newQuestion.option3;
    button4.textContent = newQuestion.option4;

    // Set up the answer to the new question
    answernum = newQuestion.answer;
}

// Upon clicking on the game panel, responds if user clicked a correct or wrong answer button.
function answerinputed(event){
    var element = event.target;

    //checks if element clicked is a button
    if(element.matches("button")){
        //Gets last character of button id to determine which button was pressed
        var input = element.id.charAt(element.id.length - 1);

        //Checks if button number pressed is the button number of the correct answer
        if(input == answernum){
            response.textContent = "Answer for question " + questionNum +" was correct";
            score++;
        }else{
            response.textContent = "Answer for question " + questionNum +" was Wrong";
            secondsleft -= 5;
        }

        //Updates current question numbe and 
        questionNum++
        qprefix.textContent = "Question " + questionNum + ": ";
        setQuestion();
    }
}

// Upon pressing the viewscores link in the top left, brings up the scoreboard
function viewScores() {
    // Prevent the hyperlink from performing it's default behavior
    event.preventDefault();

    // Generate the scoreboard based off of what is in localStorage
    displayScore();

    // If in the middle of a game, reset the game
    interupt = true;
    secondsleft = 0;
    answernum = 0;
    questionNum = 1;
    qprefix.textContent = "Question " + questionNum + ": ";

    // Hide other menus and display the scoreboard
    menu.setAttribute("style", "display: none;");
    game.setAttribute("style", "display: none;");
    finish.setAttribute("style", "display: none;");
    scoreboard.setAttribute("style", "display: flex;");
}

//Hide the scoreboard and display the starting menu
function returnToMenu(){
    scoreboard.setAttribute("style", "display: none;");
    menu.setAttribute("style", "display: flex;");
}

//Declare and initialize scoreArray as well as test if the version of scoreArray in localStorage is empty. If not, then retrieve the localStorage score entries
var test = localStorage.getItem("scoreArray");
var scoreArray = [];
if(!(test == null || test == [])) {
    scoreArray = JSON.parse(localStorage.getItem("scoreArray"))
}

// When the submit button is pressed, adds a new entry into the localStorage score array
function updateScores(){
    //Check if a proper name is entered, else use a placeholder
    if(playerName.value == ""){
        var newname = "N/A"
    }else{
        var newname = playerName.value
    }

    //create a new entry object that holds the player name and their score
    var newEntry = {
        name: newname,
        playerScore: score
    }

    //push the new entry object to localStorage and refresh the scoreboard
    scoreArray.push(newEntry);
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    displayScore();
}

//Updates the scoreboard to reflect what is held in localStorage
function displayScore(){
    //Clears current board
    board.innerHTML = "";

    //Update scoreArray to most recent iteration of the array held in localStorage
    test = localStorage.getItem("scoreArray");
    scoreArray = [];
    if (!(test == null || test == [])) {
        scoreArray = JSON.parse(localStorage.getItem("scoreArray"))
    }

    //For every entry object held in the localStorage array, add a new row on the scoreboard
    for(var i = 0; i < scoreArray.length; i++){
        var entryScore = scoreArray[i];
        console.log(entryScore);
        var li = document.createElement("li");
        li.textContent = entryScore.name + " - " + entryScore.playerScore;

        board.appendChild(li);
    }
}

//empties and resets the scoreArray to clear the scoreboard
function clearScoreBoard(){
    scoreArray = [];
    localStorage.setItem("scoreArray", scoreArray)
    displayScore();
}


// add Listeners to Buttons
startButton.addEventListener("click", beginGame);
viewscoreslink.addEventListener("click", viewScores);
submit.addEventListener("click", viewScores);
submit.addEventListener("click", updateScores);
goback.addEventListener("click", returnToMenu);
clearscores.addEventListener("click", clearScoreBoard);
answeroptions.addEventListener("click", answerinputed)