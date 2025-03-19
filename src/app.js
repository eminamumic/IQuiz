import { getData } from './data.js'

const userSelection = {}
const cardsCategory = document.querySelectorAll('[data-category]')

document.querySelector('#about-us').addEventListener('click', function () {
  this.style.display = 'block'
})

document.querySelector('#name-input').addEventListener('input', function () {
  userSelection.userName = this.value
  localStorage.setItem('User', JSON.stringify(userSelection))
})

cardsCategory.forEach((card) => {
  card.addEventListener('click', function () {
    userSelection.category = this.getAttribute('data-category')
    localStorage.setItem('User', JSON.stringify(userSelection))
  })
})

const cardsDifficulty = document.querySelectorAll('[data-difficulty]')

cardsDifficulty.forEach((card) => {
  card.addEventListener('click', function () {
    userSelection.difficulty = this.getAttribute('data-difficulty')
    localStorage.setItem('User', JSON.stringify(userSelection))
  })
})

document
  .querySelector('#question-number')
  .addEventListener('input', function () {
    userSelection.limit = parseInt(this.value) || 1
    localStorage.setItem('User', JSON.stringify(userSelection))
  })

document
  .querySelector('#start-quiz-btn')
  .addEventListener('click', async () => {
    if (!userSelection.category || !userSelection.difficulty) {
      alert('Please choose category and difficulty')
      return
    }

    await getData(
      userSelection.category,
      userSelection.difficulty,
      userSelection.limit
    )

    window.location.href = 'quiz.html'
  })

const modal = document.querySelector('#modal')

document.getElementById('about-us').addEventListener('click', () => {
  modal.style.display = 'block'
})

document.querySelector('#closeBtn').addEventListener('click', () => {
  modal.style.display = 'none'
})

let activeCardCategory = null
cardsCategory.forEach((card) => {
  card.addEventListener('click', function () {
    if (activeCardCategory) {
      activeCardCategory.classList.remove('highlight-card')
    }

    if (activeCardCategory !== this) {
      this.classList.add('highlight-card')
      activeCardCategory = this
    } else {
      activeCardCategory = null
    }
  })
})

let activeCardDifficulty = null
cardsDifficulty.forEach((card) => {
  card.addEventListener('click', function () {
    if (activeCardDifficulty) {
      activeCardDifficulty.classList.remove('highlight-card')
    }

    if (activeCardDifficulty !== this) {
      this.classList.add('highlight-card')
      activeCardDifficulty = this
    } else {
      activeCardDifficulty = null
    }
  })
})

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
})
