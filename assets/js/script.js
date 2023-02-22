// Declare element variables
var startButtonEl = document.getElementById('start-button');
var startScreenEl = document.querySelector('.start-screen');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerGridEl = document.getElementById('answer-buttons');
var answerButtonEl = document.querySelector('.answer-button');
var endScreenEl = document.querySelector('.end-screen');
var timerEl = document.querySelector('.timer');
var formEl= document.getElementById('form');
var submitButtonEl = document.getElementById('submit-button')
var scoreScreenEl = document.getElementById('score-screen')
var initialsInput = document.getElementById('initials')

// Create an empty array to store the high scores
var highScores = []

// Declare variables to be called later
var currentQuestionIndex, timeLeft, timeInterval, correctAnswer, wrongAnswer

// Adds event listener to start button to call function startQuiz
startButtonEl.addEventListener('click', startQuiz);

// startQuiz function, hides the start screen and displays the questions
function startQuiz() {
    startScreenEl.classList.add('hide')
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide');
    // Calls countdown function to start the timer when you click the start button
    countdown()
    // calls nextQuestion function to display the next Question
    nextQuestion()
}

function countdown() {
    // start with 50 seconds
    timeLeft = 50;
    // Counts down in one second intervals
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Time: " + timeLeft + " seconds";
            timeLeft--
            // Changes text to read "second" when one second remaining
        } else if (timeLeft === 1) {
            timerEl.textContent = "Time: " + timeLeft + " second";
            timeLeft--
            // When clock reaches zero stop the timer and display the end page
        } else {
            timeLeft = 0
            timerEl.textContent = "Time: " + timeLeft;
            clearInterval(timeInterval)
            questionContainerEl.classList.add('hide');
            endScreenEl.classList.remove('hide');
            timeOut()
        }
    }, 1000)
}
// displays a message if you run out of time
function timeOut() {
    var youLose = document.createElement('h1')
    youLose.textContent = "You've run out of Time!"
    endScreenEl.appendChild(youLose)
}

function nextQuestion() {
    // resets the question and answer choices with each new question
    resetQuestion()
    // shows the next question 
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    // Sets the text for Question element to come from the question array
    questionEl.innerText = question.question
    // Creates a button for each answer in the question array
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        // Sets the text for the button to be the text from the answers array
        button.innerText = answer.text
        // Apply classes to the answer buttons
        button.classList.add('button')
        button.classList.add('answer-button')
        // sets the data element for correct answers to correct
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // Add event listener for each answer button
        button.addEventListener('click', selectAnswer)
        // appends answer button to end of the answer grid
        answerGridEl.appendChild(button)
    })
}

// function to reset answer choices
function resetQuestion() {
    while (answerGridEl.firstChild) {
        answerGridEl.removeChild(answerGridEl.firstChild)
    }
}

function selectAnswer(event) {
    // sets the clicked answer as the selection
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    // creates an array from possible answers, sets class 'correct' for correct answers
    Array.from(answerGridEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    // if answer is correct, display correct and move to next question
    if (correct) {
        correctAnswer = document.createElement('div')
        correctAnswer.textContent = "Correct!"
        correctAnswer.classList.add('correct')
        questionContainerEl.appendChild(correctAnswer)
    // if answer is incorrect, display incorrect, subtract 10 seconds and move to next question
    } else {
        wrongAnswer = document.createElement('div')
        wrongAnswer.textContent = "Wrong!"
        wrongAnswer.classList.add('wrong')
        questionContainerEl.appendChild(wrongAnswer)
        timeLeft = timeLeft - 10
    }
    // if there are questions remaining move to next question
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++
        nextQuestion()
    // if this is the last question, move to the end screen and trigger game win function
    } else {
        questionContainerEl.classList.add('hide')
        endScreenEl.classList.remove('hide')
        gameWin();
        clearInterval(timeInterval);

    }
}

// creates a game over function allowing the user to enter initals and log score
function gameWin() {
    var youWin = document.createElement('h1');
    var enterScore = document.createElement('h2');
    endScreenEl.appendChild(youWin)
    endScreenEl.appendChild(enterScore)
    formEl.classList.remove('hide')
    youWin.textContent = "Congratulations, your score is " + (timeLeft + 1)
    enterScore.textContent = "Please enter your Initials"
    submitButtonEl.addEventListener('click', showScores)
}



function showScores(event) {
    event.preventDefault()
    var score = {
        Name: initialsInput.value,
        Score: (timeLeft + 1)
    }
    highScores.push(score)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    endScreenEl.classList.add('hide')
    formEl.classList.add('hide')
    scoreScreenEl.classList.remove('hide')
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