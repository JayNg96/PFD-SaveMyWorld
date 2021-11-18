const startButton = document.querySelector('#start-btn')
const nextButton = document.querySelector('#next-btn')
const questionContainerElement = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answer-buttons')

let shuffledQuestions, currentQuestionIndex
$("#next-btn").hide()
$("#question-container").hide()
$("#game-end").hide()

const startQuiz = () => {
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    $("#question-container").show()
    $("#start-btn").hide()
    $("#next-btn").show()
    setNextQuestion()
}


const setNextQuestion = () => {
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])

}

const displayQuestion = (question) => {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer)
        answerButtonsElement.appendChild(button)
    })

}

const resetState = () => {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

const chooseAnswer = (e) => {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

const setStatusClass = (element, correct) => {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

const clearStatusClass = (element) => {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Choose 1',
        answers: [
            { text: '1', correct: true },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: false }
        ]
    },
    {
        question: 'Choose A',
        answers: [
            { text: 'A', correct: true },
            { text: 'B', correct: false },
            { text: 'C', correct: false },
            { text: 'D', correct: false }
        ]
    },
    {
        question: 'Choose 10',
        answers: [
            { text: 'A', correct: false },
            { text: 'B', correct: false },
            { text: '100', correct: false },
            { text: '10', correct: true }
        ]
    }, 

    {
        question: 'Choose B',
        answers: [
            { text: 'G', correct: false },
            { text: 'H', correct: false },
            { text: 'K', correct: false },
            { text: 'B', correct: true }
        ]
    }
]

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length-1){
        currentQuestionIndex++;
        setNextQuestion()
    }
    else{
        $("#next-btn").hide()
        $("#question-container").hide()
        $("#game-end").show()
    }
})



