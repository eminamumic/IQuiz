import { getData } from './data.js'

const userSelection = {}

const cardCategories = document.querySelectorAll('[data-category]')
cardCategories.forEach((card) => {
  card.addEventListener('click', function () {
    userSelection.category = this.getAttribute('data-category')
  })
})

const cardDifficulties = document.querySelectorAll('[data-difficulty]')
cardDifficulties.forEach((card) => {
  card.addEventListener('click', function () {
    userSelection.difficulty = this.getAttribute('data-difficulty')
  })
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
