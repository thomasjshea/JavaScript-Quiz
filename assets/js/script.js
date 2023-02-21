var startButtonEl = document.getElementById('start-button');
var startScreenEl = document.querySelector('.start-screen');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerGridEl = document.getElementById('answer-buttons');
var answerButtonEl = document.querySelector('.answer-button');
var endScreenEl = document.querySelector('.end-screen');
var timerEl = document.querySelector('.timer');

var currentQuestionIndex
var timeLeft
// Adds event listener to start button to call function startQuiz
startButtonEl.addEventListener('click', startQuiz);

// startQuiz function, hides the start screen and displays the questions
function startQuiz() {
    startScreenEl.classList.add('hide')
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide');
    // Calls countdown function to start the timer
    countdown()
    // calls nextQuestion function to display the next Question
    nextQuestion()
}

function countdown() {
    // start with 75 seconds
    timeLeft = 75;

    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = "Time: " + timeLeft + " seconds";
            timeLeft--
        } else if (timeLeft === 1) {
            timerEl.textContent= "Time: " + timeLeft + " second"; 
            timeLeft--
        } else {
            timerEl.textContent = "Time: " + timeLeft;
            clearInterval(timeInterval)
            questionContainerEl.classList.add('hide');
            endScreenEl.classList.remove('hide');
        }
    }, 1000)
}

function nextQuestion() {
    resetQuestion()
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        button.classList.add('answer-button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerGridEl.appendChild(button)
    })
}

function resetQuestion() {
    while (answerGridEl.firstChild) {
        answerGridEl.removeChild(answerGridEl.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    Array.from(answerGridEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++
        nextQuestion()
    } else {
        questionContainerEl.classList.add('hide')
        endScreenEl.classList.remove('hide')
    }

    if (correct){
        var correctAnswer = document.createElement('div')
        correctAnswer.textContent = "Correct!"
        correctAnswer.classList.add('result')
        questionContainerEl.appendChild(correctAnswer)
    } else {
        var wrongAnswer = document.createElement('div')
        wrongAnswer.textContent = "Wrong!"
        wrongAnswer.classList.add('result')
        questionContainerEl.appendChild(wrongAnswer)
        timeLeft-10
    }

}

function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: 'Commonly used data types do NOT include:',
        answers: [
            { text: "1. strings", correct: false },
            { text: "2. booleans", correct: false },
            { text: "3. alerts", correct: true },
            { text: "4. numbers", correct: false },

        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed with ________.',
        answers: [
            { text: '1. quote marks', correct: false },
            { text: '2. parenthesis', correct: true },
            { text: '3. curly brackets', correct: false },
            { text: '4. square brackets', correct: false },
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.',
        answers: [
            { text: '1. Booleans', correct: false },
            { text: '2. Numbers and Strings', correct: false },
            { text: '3. Other Arrays', correct: false },
            { text: '4. All of the above', correct: true },
        ]
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        answers: [
            { text: '1. quote marks', correct: true },
            { text: '2. commas', correct: false },
            { text: '3. parenthesis', correct: false },
            { text: '4. curly brackets', correct: false },
        ]
    },
    {
        question: 'What is a useful tool used during development and debugging for printing content to the debugger?',
        answers: [
            { text: '1. JavaScript', correct: false },
            { text: '2. for loops', correct: false },
            { text: '3. console.log', correct: true },
            { text: '4. if/else statements', correct: false }
        ]
    }
]