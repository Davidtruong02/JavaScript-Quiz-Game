
var questions = [
  {
      Text: "How do you copy an Object in Javascript?",
      answers: [
          "Copy and Paster",
          "Object.assign()",
          "Using spread parameter"
      ],
      correctIndex: 0,
  },
  {  
      Text: "Inside which HTML element do we put the JavaScript?",
      answers: [
          "<scripting>",
          "<script>",
          "<JavaScript>",
          "<Java>"
      ],
      correctIndex: 1,
  },
  {
      Text: "Where is the correct place to insert a JavaScript?",
      answers: [
          "Both the <head> section and the <body> section are correct",
          "The <head> section",
          "The <body> section"
      ],
      correctIndex: 2,
  },
  {
      Text: "The external JavaScript file must contain the <script> tag.",
      answers: [
          "true",
          "false"
      ],
      correctIndex: 3,
  },  
  {
      Text: "The external JavaScript file must contain the <script> tag.",
      answers: [
          "true",
          "false"
      ],
      correctIndex: 4,
  }
];

// selectors
var startButton = document.querySelector("#buttonStartQuiz");
// var submitButton = document.querySelector("#buttonSubmitAnswer");
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

function displayTimeLeft (){
  totalTimeLeft--;
  timeLeft.textContent = totalTimeLeft;
}



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
    endGame();
  }
}



function checkAnswer (answerIndex) {
  var currentQuestion = questions[questionIndex];
  if (currentQuestion.correctIndex === parseInt(answerIndex)){
      totalCorrect++;
  } else {
      totalTimeLeft -= penalty;
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

function endGame () {
  showScore();
  gameStarted =false;
}


function quizIntervalFunction () {
  if (totalTimeLeft > 0){
    displayTimeLeft();
    displayNextQuestion();
  } else {
      clearInterval(quizInterval);
      showScore();
  }
}




function startQuiz() {
  gameStarted = true;
  startSection.style.display = "none";
  quizSection.style.display = "flex";

 quizInterval = setInterval(quizIntervalFunction, 1000);
}





function init() {
  startButton.addEventListener("click", startQuiz);
  questionAnswers.addEventListener("click", answerClickHandler);
}

init();

