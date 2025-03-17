import { getData } from './data.js'

const userSelection = {}

document.querySelector('#science-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#music-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#sport-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#film-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#history-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#society-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document
  .querySelector('#geography-card')
  .addEventListener('click', function () {
    userSelection.category = this.getAttribute('data-category')
  })

document.querySelector('#food-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#general-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#art-card').addEventListener('click', function () {
  userSelection.category = this.getAttribute('data-category')
})

document.querySelector('#easy').addEventListener('click', function () {
  userSelection.difficulty = this.getAttribute('data-difficulty')
})

document.querySelector('#medium').addEventListener('click', function () {
  userSelection.difficulty = this.getAttribute('data-difficulty')
})

document.querySelector('#hard').addEventListener('click', function () {
  userSelection.difficulty = this.getAttribute('data-difficulty')
})

document
  .querySelector('#question-number')
  .addEventListener('input', function () {
    userSelection.limit = parseInt(this.value) || 1
  })

document.querySelector('#name-input').addEventListener('input', function () {
  userSelection.userName = this.value
})

document
  .querySelector('#start-quiz-btn')
  .addEventListener('click', async () => {
    if (!userSelection.category || !userSelection.difficulty) {
      alert('Please choose category and diificulty')
      return
    }

    await getData(
      userSelection.category,
      userSelection.difficulty,
      userSelection.limit
    )

    window.location.href = 'quiz.html'
  })
