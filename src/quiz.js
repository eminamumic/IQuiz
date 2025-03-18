import {
  hiddenIcons,
  resetQuestionIcons,
  highlightCorrectAnswer,
  highlightIncorrectAnswer,
  goBackBtn,
  disableAnswerButtons,
} from './style.js'

let COUNTDOWN = null
let QUESTION_DATA = null
let CURRENT_QUESTION_INDEX = 0
let SCORE = 0
const QUIZ_CONTAINER = document.querySelector('#container')

document.addEventListener('DOMContentLoaded', () => {
  startQuiz()
})

function startQuiz() {
  const storedQuestionData = localStorage.getItem('quizData')

  if (!storedQuestionData) {
    const goBackButton = goBackBtn('Go back')
    displayNoDataMessage(goBackButton)
    return
  }

  QUESTION_DATA = JSON.parse(storedQuestionData)
  showQuestion()
}

function displayNoDataMessage(resultBtn) {
  QUIZ_CONTAINER.innerHTML =
    '<h1 class="header-text">No data available for the quiz.</h1>'
  QUIZ_CONTAINER.appendChild(resultBtn)
  resultBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })
}

function showQuestion() {
  QUIZ_CONTAINER.innerHTML = ''

  if (CURRENT_QUESTION_INDEX >= QUESTION_DATA.length) {
    showResults()
    localStorage.clear()
    return
  }

  questionBody()
  resetQuestionIcons()
}

function questionBody() {
  const questionObj = QUESTION_DATA[CURRENT_QUESTION_INDEX]
  displayQuestionText(questionObj)
  displayAnswerButtons(questionObj)
  startTimer(questionObj)
}

function checkAnswer(answer, correctAnswer) {
  clearTimeout(COUNTDOWN)
  disableAnswerButtons()

  if (answer === correctAnswer) {
    highlightCorrectAnswer(answer)
    SCORE++
  } else {
    highlightIncorrectAnswer(correctAnswer)
  }

  setTimeout(() => {
    CURRENT_QUESTION_INDEX++
    showQuestion()
  }, 2000)
}

function displayQuestionText(questionObj) {
  const questionText = document.createElement('h1')
  questionText.classList.add('header-text-question')
  questionText.textContent = questionObj.question.text
  QUIZ_CONTAINER.appendChild(questionText)
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
  QUIZ_CONTAINER.appendChild(answersContainer)
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

function mixAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function startTimer(questionObj) {
  let timerDiv = document.createElement('div')
  let timer = 15
  timerDiv.id = 'timer'
  timerDiv.textContent = `${timer}`
  QUIZ_CONTAINER.appendChild(timerDiv)

  COUNTDOWN = setInterval(() => {
    document.querySelector('#timer').textContent = timer
    timer--

    if (timer < 0) {
      clearInterval(COUNTDOWN)
      highlightIncorrectAnswer(questionObj.correctAnswer)
      CURRENT_QUESTION_INDEX++
      setTimeout(() => {
        showQuestion()
      }, 2000)
    }
  }, 1000)
}

function showResults() {
  QUIZ_CONTAINER.innerHTML = ''

  let resultText = ''
  let resultImage = ''

  if (SCORE === QUESTION_DATA.length) {
    resultText = `Excellent! You achieved a perfect score!`
    resultImage = '/materijal/4.png'
    hiddenIcons()
  } else if (SCORE >= QUESTION_DATA.length * 0.75) {
    resultText = 'Great! You achieved a high score!'
    resultImage = '/materijal/5.png'
    hiddenIcons()
  } else if (SCORE >= QUESTION_DATA.length * 0.5) {
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
  QUIZ_CONTAINER.appendChild(resultTextElement)

  const resultImageElement = document.createElement('img')
  resultImageElement.classList.add('end-image')
  resultImageElement.src = resultImage
  resultImageElement.alt = 'Quiz result'
  QUIZ_CONTAINER.appendChild(resultImageElement)

  const resultBtn = goBackBtn('Go back')
  QUIZ_CONTAINER.appendChild(resultBtn)
  resultBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })
}
