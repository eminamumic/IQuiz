import {
  hiddenIcons,
  resetQuestionIcons,
  highlightCorrectAnswer,
  highlightIncorrectAnswer,
  goBackBtn,
} from './style.js'

let countdown = null
let questionData = null
let currentQuestionIndex = 0
let score = {
  correct: 0,
  incorrect: 0,
}
const quizContainer = document.querySelector('#container')

document.addEventListener('DOMContentLoaded', () => {
  startQuiz()
})

function startQuiz() {
  const storedQuestionData = localStorage.getItem('quizData')
  const goBackBtn = goBackBtn('Go back')

  if (!storedQuestionData) {
    displayNoDataMessage(goBackBtn)
    return
  }

  questionData = JSON.parse(storedQuestionData)
  showQuestion()
}

function displayNoDataMessage(resultBtn) {
  quizContainer.innerHTML =
    '<h1 class="header-text">No data available for the quiz.</h1>'
  quizContainer.appendChild(resultBtn)
  resultBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })
}

function mixAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function checkAnswer(answer, correctAnswer) {
  clearTimeout(countdown)
  disableAnswerButtons()

  if (answer === correctAnswer) {
    highlightCorrectAnswer(answer)
    score.correct++
  } else {
    highlightIncorrectAnswer(correctAnswer)
    score.incorrect++
  }

  setTimeout(() => {
    currentQuestionIndex++
    showQuestion()
  }, 2000)
}

function disableAnswerButtons() {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => (button.disabled = true))
}

function displayQuestionText(questionObj) {
  const questionText = document.createElement('h1')
  questionText.classList.add('header-text-question')
  questionText.textContent = questionObj.question.text
  quizContainer.appendChild(questionText)
}

function displayAnswerButtons(questionObj) {
  const answers = [...questionObj.incorrectAnswers, questionObj.correctAnswer]
  mixAnswers(answers)

  const answersContainer = document.createElement('div')
  answersContainer.classList.add('answer-container')

  answers.forEach((answer) => {
    const answerButton = createAnswerButton(answer, questionObj.correctAnswer)
    answersContainer.appendChild(answerButton)
  })
  quizContainer.appendChild(answersContainer)
}

function createAnswerButton(answer, correctAnswer) {
  const answerButton = document.createElement('button')
  answerButton.classList.add('answer-card')
  answerButton.textContent = answer
  answerButton.addEventListener('click', () => {
    checkAnswer(answer, correctAnswer)
  })
  return answerButton
}

function startTimer(questionObj) {
  let timerDiv = document.createElement('div')
  timerDiv.id = 'timer'
  timerDiv.textContent = '15'
  timerDiv.classList.add('timer')
  quizContainer.appendChild(timerDiv)

  let timer = 15
  countdown = setInterval(() => {
    document.querySelector('#timer').textContent = timer
    timer--

    if (timer < 0) {
      clearInterval(countdown)
      highlightIncorrectAnswer(questionObj.correctAnswer)
      setTimeout(() => {
        currentQuestionIndex++
        showQuestion()
      }, 2000)
    }
  }, 1000)
}

function questionBody() {
  const questionObj = questionData[currentQuestionIndex]
  displayQuestionText(questionObj)
  displayAnswerButtons(questionObj)
  startTimer(questionObj)
}

function showQuestion() {
  quizContainer.innerHTML = ''

  if (currentQuestionIndex >= questionData.length) {
    showResults()
    localStorage.clear()
    return
  }

  questionBody()
  resetQuestionIcons()
}

function showResults() {
  quizContainer.innerHTML = ''

  let resultText = ''
  let resultImage = ''

  if (score.correct === questionData.length) {
    resultText = `Excellent! You achieved a perfect score!`
    resultImage = '/materijal/4.png'
    hiddenIcons()
  } else if (score.correct >= questionData.length * 0.75) {
    resultText = 'Great! You achieved a high score!'
    resultImage = '/materijal/5.png'
    hiddenIcons()
  } else if (score.correct >= questionData.length * 0.5) {
    resultText = 'Good! But you can do better.'
    resultImage = '/materijal/op.png'
    hiddenIcons()
  } else {
    resultText = 'Try again! You still have room for improvement.'
    resultImage = '/materijal/3.png'
    hiddenIcons()
  }

  displayResultMessage(resultText, resultImage)
}

function displayResultMessage(resultText, resultImage) {
  const resultTextElement = document.createElement('h1')
  resultTextElement.textContent = resultText
  resultTextElement.classList.add('header-text-end')
  quizContainer.appendChild(resultTextElement)

  const resultImageElement = document.createElement('img')
  resultImageElement.classList.add('end-image')
  resultImageElement.src = resultImage
  resultImageElement.alt = 'Quiz result'
  quizContainer.appendChild(resultImageElement)

  const resultBtn = goBackBtn('Go back')
  quizContainer.appendChild(resultBtn)
  resultBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })
}
