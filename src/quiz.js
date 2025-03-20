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
let BRAVO_SOUND = document.querySelector('#bravo-sound')
let GAME_OVER_SOUND = document.querySelector('#game-over-sound')
const QUIZ_CONTAINER = document.querySelector('#container')
const TICKSOUND = document.querySelector('#tick-sound')
let USER = JSON.parse(localStorage.getItem('User'))

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
  const question = QUESTION_DATA[CURRENT_QUESTION_INDEX]
  displayQuestionText(question)
  displayAnswerButtons(question)
  startTimer(question)
}

function checkAnswer(answer, correctAnswer) {
  clearInterval(COUNTDOWN)
  TICKSOUND.pause()
  TICKSOUND.currentTime = 0
  disableAnswerButtons()

  if (answer === correctAnswer) {
    highlightCorrectAnswer(answer)
    SCORE++
  } else {
    highlightIncorrectAnswer(correctAnswer)
  }

  CURRENT_QUESTION_INDEX++
  setTimeout(() => {
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
  let timer = 14
  timerDiv.id = 'timer'
  timerDiv.textContent = '15'
  QUIZ_CONTAINER.appendChild(timerDiv)

  COUNTDOWN = setInterval(() => {
    document.querySelector('#timer').textContent = timer
    TICKSOUND.play()
    timer--

    if (timer < 0) {
      clearInterval(COUNTDOWN)
      disableAnswerButtons()
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
    resultText = `Excellent ${USER.userName}!<br>You achieved a perfect score!<br>${SCORE} / ${QUESTION_DATA.length}`
    resultImage = '/materijal/4.png'
    BRAVO_SOUND.play()
    setTimeout(() => {
      BRAVO_SOUND.pause()
    }, 5000)
    hiddenIcons()
  } else if (SCORE >= QUESTION_DATA.length * 0.75) {
    resultText = `Great ${USER.userName}!<br>You achieved a high score!<br>${SCORE} / ${QUESTION_DATA.length}`
    resultImage = '/materijal/5.png'
    BRAVO_SOUND.play()
    setTimeout(() => {
      BRAVO_SOUND.pause()
    }, 5000)
    hiddenIcons()
  } else if (SCORE >= QUESTION_DATA.length * 0.5) {
    resultText = `Good ${USER.userName}!<br>But you can do better.<br>${SCORE} / ${QUESTION_DATA.length}`
    resultImage = '/materijal/op.png'
    hiddenIcons()
    GAME_OVER_SOUND.play()
  } else {
    resultText = `${USER.userName}, Try again!<br>You still have room for improvement.<br>${SCORE} / ${QUESTION_DATA.length}`
    resultImage = '/materijal/3.png'
    hiddenIcons()
    GAME_OVER_SOUND.play()
  }
  displayResult(resultText, resultImage)
}

function displayResult(resultText, resultImage) {
  displayResultMessage(resultText)
  displayResultImage(resultImage)
  displayGoBackBtn()
}

function displayResultMessage(resultText) {
  const resultTextElement = document.createElement('h1')
  resultTextElement.innerHTML = resultText
  resultTextElement.classList.add('header-text-end')
  QUIZ_CONTAINER.appendChild(resultTextElement)
}

function displayResultImage(resultImage) {
  const resultImageElement = document.createElement('img')
  resultImageElement.classList.add('end-image')
  resultImageElement.src = resultImage
  resultImageElement.alt = 'Quiz result'
  QUIZ_CONTAINER.appendChild(resultImageElement)
}

function displayGoBackBtn() {
  const resultBtn = goBackBtn('Go back')
  QUIZ_CONTAINER.appendChild(resultBtn)
  resultBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })
}
