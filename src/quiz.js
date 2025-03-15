function mixAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function highlightCorrectAnswer(answer) {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    if (button.textContent === answer) {
      button.classList.add('correct')
    }
  })
}

function highlightIncorrectAnswer(answer) {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    if (button.textContent === answer) {
      button.classList.add('incorrect')
    }
  })
}

function checkAnswer(answer, correctAnswer) {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => (button.disabled = true))

  if (answer === correctAnswer) {
    highlightCorrectAnswer(answer)
  } else {
    highlightIncorrectAnswer(answer)
  }
  setTimeout(() => {
    currentQuestionIndex++
    showQuestion()
  }, 2000)
}

function showQuestion() {
  questionContainer.innerHTML = ''

  if (currentQuestionIndex >= questionData.length) {
    questionContainer.innerHTML = '<h1>Kviz je završen! Hvala na učešću.</h1>'
    return
  }

  const questionObj = questionData[currentQuestionIndex]
  const questionText = document.createElement('h1')
  questionText.textContent = questionObj.question.text
  questionContainer.appendChild(questionText)

  const answers = [...questionObj.incorrectAnswers, questionObj.correctAnswer]
  mixAnswers(answers)

  const answersContainer = document.createElement('div')
  answers.forEach((answer) => {
    const answerButton = document.createElement('button')
    answerButton.textContent = answer
    answerButton.addEventListener('click', () => {
      checkAnswer(answer, questionObj.correctAnswer)
    })
    answersContainer.appendChild(answerButton)
  })

  questionContainer.appendChild(answersContainer)
}

document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem('quizData')

  if (!storedData) {
    alert(
      'Nema učitanih pitanja! Molimo vratite se nazad i pokrenite kviz ponovo.'
    )
    window.location.href = 'index.html'
    return
  }

  const data = JSON.parse(storedData)
  console.log('Učitani podaci:', data)
})
