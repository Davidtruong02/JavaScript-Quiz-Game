// selectors
var startButton = document.querySelector("#buttonStartQuiz");
var timeLeft = document.querySelector("#timeLeft")
var questionText = document.querySelector("#question-text")
var questionAnswers = document.querySelector("#question-answers")
var quizSection = document.querySelector("#quiz");
var startSection = document.querySelector("#start");


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
      questionAnswers.setAttribute("data-correct-index", question.correctIndex);
    }
  } else {
    endQuiz();
  }
}


function checkAnswer(answerIndex) {
  var currentQuestion = questions[questionIndex];
  if (currentQuestion.correctIndex === parseInt(answerIndex)){
      totalCorrect++;
  } else {
      totalTimeLeft -= penalty;
      if (totalTimeLeft < 0) {
        totalTimeLeft = 0;
      }
  }
}



function answerClickHandler(event) {
  if (event.target.matches("li")) {
    var clickedAnswerIndex = event.target.dataset.index;
    checkAnswer(clickedAnswerIndex);
    questionIndex++;
    displayNextQuestion();
  }
}


function showScore () {
console.log("SCORE:", totalTimeLeft);
console.log("Total Correct:", totalCorrect);
}



function quizIntervalFunction () {
  if (totalTimeLeft > 0 && questionIndex < questions.length){
    displayTimeLeft();
  } else {
      clearInterval(quizInterval);
      showScore();
  }
}



function endQuiz () {
  showScore();
  gameStarted = false;
  var initials = prompt("Please enter your initials to save your score!:");
  var highScore = {
    initials: initials,
    score: totalTimeLeft,
    
    }
    console.log("High Score:", highScore);
  }



function init() {
  startButton.addEventListener("click", startQuiz);
  questionAnswers.addEventListener("click", answerClickHandler);
}

init();


