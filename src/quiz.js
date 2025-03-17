let questionData = null
const questionContainer = document.querySelector('#question-container')
let currentQuestionIndex = 0
let score = {
  correct: 0,
  incorrect: 0,
}
let countdown = null

document.addEventListener('DOMContentLoaded', () => {
  const storedQuestionData = localStorage.getItem('quizData')
  const resultBtn = document.createElement('button')
  resultBtn.textContent = 'Go back'
  resultBtn.classList.add('start-button')

  if (!storedQuestionData) {
    questionContainer.innerHTML =
      '<h1 class="header-text">Nema podataka za kviz.</h1>'
    questionContainer.appendChild(resultBtn)
    resultBtn.addEventListener('click', () => {
      window.location.href = 'index.html'
    })
    return
  }

  questionData = JSON.parse(storedQuestionData)
  showQuestion()
})

function mixAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function hiddenIcons() {
  document.querySelector('.decor9').classList.add('hidden')
  document.querySelector('.decor10').classList.add('hidden')
  document.querySelector('.decor11').classList.add('hidden')
}

function resetQuestion() {
  document.querySelector('.decor9').classList.remove('hidden')
  document.querySelector('.decor10').classList.add('hidden')
  document.querySelector('.decor11').classList.add('hidden')
}

function highlightCorrectAnswer(correctAnswer) {
  document.querySelector('.decor9').classList.add('hidden')
  document.querySelector('.decor11').classList.remove('hidden')

  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add('correct')
    } else {
      button.classList.add('incorrect')
    }
  })
}

function highlightIncorrectAnswer(correctAnswer) {
  document.querySelector('.decor9').classList.add('hidden')
  document.querySelector('.decor10').classList.remove('hidden')

  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add('correct')
    } else {
      button.classList.add('incorrect')
    }
  })
}

function checkAnswer(answer, correctAnswer) {
  clearTimeout(countdown)
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => (button.disabled = true))

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

function showQuestion() {
  questionContainer.innerHTML = ''

  if (currentQuestionIndex >= questionData.length) {
    showResults()
    localStorage.clear()
    return
  }

  const questionObj = questionData[currentQuestionIndex]
  const questionText = document.createElement('h1')
  questionText.classList.add('header-text-question')
  questionText.textContent = questionObj.question.text
  questionContainer.appendChild(questionText)

  const answers = [...questionObj.incorrectAnswers, questionObj.correctAnswer]
  mixAnswers(answers)

  const answersContainer = document.createElement('div')
  answersContainer.classList.add('answer-container')

  answers.forEach((answer) => {
    const answerButton = document.createElement('button')
    answerButton.classList.add('answer-card')
    answerButton.textContent = answer
    answerButton.addEventListener('click', () => {
      checkAnswer(answer, questionObj.correctAnswer)
    })
    answersContainer.appendChild(answerButton)
  })
  questionContainer.appendChild(answersContainer)

  let timerDiv = document.createElement('div')
  timerDiv.id = 'timer'
  timerDiv.textContent = '15'
  timerDiv.classList.add('timer')
  questionContainer.appendChild(timerDiv)

  resetQuestion()

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

function showResults() {
  questionContainer.innerHTML = ''

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

  const resultTextElement = document.createElement('h1')
  resultTextElement.textContent = resultText
  resultTextElement.classList.add('header-text-end')
  questionContainer.appendChild(resultTextElement)

  const resultImageElement = document.createElement('img')
  resultImageElement.classList.add('end-image')
  resultImageElement.src = resultImage
  resultImageElement.alt = 'Quiz result'
  questionContainer.appendChild(resultImageElement)

  const resultBtn = document.createElement('button')
  resultBtn.textContent = 'Go back'
  resultBtn.classList.add('start-button')
  questionContainer.appendChild(resultBtn)
  resultBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
  })
}
