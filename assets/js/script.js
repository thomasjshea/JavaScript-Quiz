var timerEl = document.querySelector(".timer");
var questionEl = document.querySelector(".question");
var question1 = document.querySelector("#question-1");
var question2 = document.querySelector("#question-2");
var startButtonEl = document.querySelector(".start-button");
var splashPageEl = document.querySelector(".splash-page")
var answerButtonEl = document.querySelector(".answer-button");

function startQuiz() {
  question1.style.display = "block";
  splashPageEl.style.display = "none";
  answerButtonEl.addEventListener("click", question)
}

function question() {
    if (answerButtonEl.className === "correct") {
        var correct = document.createElement("<p>");
        correct.textContent = "Correct!";
        questionEl.appendChild(correct);
    } else {
        var incorrect = document.createTextNode("Incorrect!");
    }
}


startButtonEl.addEventListener("click", startQuiz);
answerButtonEl.addEventListener("click", question)