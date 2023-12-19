// selectors
var startButton = document.querySelector("#buttonStartQuiz");
var timeLeft = document.querySelector("#timeLeft")
var questionText = document.querySelector("#question-text")
var questionAnswers = document.querySelector("#question-answers")
var quizSection = document.querySelector("#quiz");
var startSection = document.querySelector("#start");
var endSection = document.querySelector("#end");
var finalScore = document.querySelector("#finalScore");
var initialsForm = document.querySelector("#initialsForm");


// initial Values
var totalTimeLeft = 75;
var penalty = 10;
var questionIndex = 0;
var quizInterval;
var totalCorrect = 0;
var gameStarted = false;


// The fuction starts the quiz
function startQuiz() {
  gameStarted = true;
  startSection.style.display = "none";
  quizSection.style.display = "flex";
  quizInterval = setInterval(quizIntervalFunction, 800);
  displayNextQuestion();
}


var questions = [
  {
      Text: "Commonly used data types DO NOT include?",
      answers: [
          "strings",
          "booleans",
          "alerts",
          "numbers",
      ],
      correctIndex: 1,
  },
  {  
      Text: "The condition in an if / else statement is enclosed with ____?",
      answers: [
          "quotes",
          "curly brackets",
          "parenthesis",
          "square brackets"
      ],
      correctIndex: 2,
  },
  {
      Text: "Arrays in JavaScript can be used to store _____?",
      answers: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above"
      ],
      correctIndex: 3,
  },
  {
      Text: "String values must be enclosed withing ____ when being assigned to variables.",
      answers: [
          "Commas",
          "curly brackets",
          "quotes",
          "paraenthesis"
      ],
      correctIndex: 1,
  },  
  {
      Text: "A very useful tool used during development and debugging for printing content to the debugger is?",
      answers: [
          "JavaScript",
          "terminal/bash",
          "for loops",
          "console.log"
      ],
      correctIndex: 2,
  },
];

function endGame () {
  showScore();
  gameStarted =false;
}



function displayTimeLeft (){
  totalTimeLeft--;
  timeLeft.textContent = totalTimeLeft;
}


// This piece of code helps display the next question
function displayNextQuestion() {
  if (timeLeft && questionIndex < questions.length) {
    questionAnswers.innerHTML = "";
    var question = questions[questionIndex];
    questionText.textContent = question.Text;
    for (var i = 0; i < question.answers.length; i++) {
      var answerChoice = question.answers[i];
      var liEl = document.createElement("li");
      liEl.textContent = answerChoice;
      liEl.setAttribute("data-index", i);
      questionAnswers.appendChild(liEl);
    }
    } else {
    endGame();
  }
}


function checkAnswer(answerIndex) {
  var currentQuestion = questions[questionIndex];
 // console.log("currentQuestion:", currentQuestion);
 // console.log("answerIndex:", answerIndex);
 // console.log("currentQuestion.correctIndex:", currentQuestion.correctIndex);

  if(isNaN(answerIndex) || answerIndex < 0 || answerIndex >= currentQuestion.answers.length) {
    console.log("Invalid answer index.");
    return;
  }
  if (currentQuestion.correctIndex === parseInt(answerIndex)) {
    totalCorrect++;
    console.log("Correct answer!");
  } else {
    totalTimeLeft -= penalty;
    if (totalTimeLeft < 0) {
      totalTimeLeft = 0;
    }
    console.log("Incorrect answer!");
  }
}



function answerClickHandler(event) {
  if (event.target.matches("li")) {
    var clickedAnswerIndex = event.target.dataset.index;
    checkAnswer(clickedAnswerIndex);
    questionIndex++;
    displayNextQuestion();


  
  displayNextQuestion();

  questionAnswers.addEventListener("click", answerClickHandler);
  }
}


function showScore () {
console.log("SCORE:", totalTimeLeft);
console.log("Total Correct:", totalCorrect);
quizSection.style.display = "none";
endSection.style.display = "block";
finalScore.textContent = totalTimeLeft;
}



function quizIntervalFunction () {
  if (totalTimeLeft > 0 && questionIndex < questions.length){
    displayTimeLeft();
  } else {
      clearInterval(quizInterval);
      showScore();
  }
}




function init() {
  startButton.addEventListener("click", startQuiz);
  questionAnswers.addEventListener("click", answerClickHandler);
}

init();

