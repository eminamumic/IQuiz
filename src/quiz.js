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

  // If there is no quiz data in localStorage, show an error
  if (!storedQuestionData) {
    questionContainer.innerHTML = '<h1>Nema podataka za kviz.</h1>'
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
      button.classList.add('correct') // Oznaci tačan odgovor zeleno
    } else {
      button.classList.add('incorrect') // Oznaci sve ostale crveno
    }
  })
}

function highlightIncorrectAnswer(correctAnswer) {
  document.querySelector('.decor9').classList.add('hidden')
  document.querySelector('.decor10').classList.remove('hidden')

  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add('correct') // Tačan odgovor ZELEN
    } else {
      button.classList.add('incorrect') // Svi ostali CRVENI (uključujući i kliknuti)
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
  questionContainer.innerHTML = '' // Očisti prethodno pitanje

  if (currentQuestionIndex >= questionData.length) {
    questionContainer.innerHTML = '<h1>Kviz je završen! Hvala na učešću.</h1>'
    localStorage.clear() // Očisti lokalnu memoriju
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

  // Ako timer već postoji, nemoj ga dodavati ponovo
  if (!document.querySelector('#timer')) {
    let timerDiv = document.createElement('div')
    timerDiv.id = 'timer'
    timerDiv.textContent = '10'
    questionContainer.appendChild(timerDiv)
  }

  resetQuestion()

  let timeRemaining = 10
  countdown = setInterval(() => {
    document.querySelector('#timer').textContent = timeRemaining // Ažuriraj preostalo vreme na stranici
    timeRemaining--

    if (timeRemaining < 0) {
      clearInterval(countdown) // Zaustavi brojač kad istekne vreme
      highlightIncorrectAnswer(questionObj.correctAnswer) // Prikazuje tačan odgovor nakon isteka vremena
      setTimeout(() => {
        currentQuestionIndex++
        showQuestion()
      }, 2000) // Prebaci na sledeće pitanje nakon 2 sekunde
    }
  }, 1000) // Ažurira preostalo vreme svake sekunde
}
