var startButtonEl = document.getElementById('start-button');
var startScreenEl = document.querySelector('.start-screen');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerGridEl = document.getElementById('answer-buttons');
var answerButtonEl = document.querySelector('.answer-button');
var endScreenEl = document.querySelector('.end-screen')

var currentQuestionIndex

startButtonEl.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('Started')
    startScreenEl.classList.add('hide')
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide');
    nextQuestion()
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