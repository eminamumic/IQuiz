import { getData } from './data.js'

const USER_SELECTION = {}
const CARDS_CATEGORY = document.querySelectorAll('[data-category]')
const CARDS_DIFFICULTY = document.querySelectorAll('[data-difficulty]')
const MODAL = document.querySelector('#modal')
const CLOSE_BTN = document.querySelector('#closeBtn')
let ACTIVE_CARD_CATEGORY = null
let ACTIVE_CARD_DIFFICULTY = null

document.addEventListener('DOMContentLoaded', () => {
  localStorage.clear()
})

CARDS_CATEGORY.forEach((card) => {
  card.addEventListener('click', function () {
    USER_SELECTION.category = this.getAttribute('data-category')
    localStorage.setItem('User', JSON.stringify(USER_SELECTION))
  })
})

CARDS_DIFFICULTY.forEach((card) => {
  card.addEventListener('click', function () {
    USER_SELECTION.difficulty = this.getAttribute('data-difficulty')
    localStorage.setItem('User', JSON.stringify(USER_SELECTION))
  })
})

document.querySelector('#name-input').addEventListener('input', function () {
  USER_SELECTION.userName = this.value
  localStorage.setItem('User', JSON.stringify(USER_SELECTION))
})

document
  .querySelector('#question-number')
  .addEventListener('input', function () {
    USER_SELECTION.limit = parseInt(this.value) || 1
    localStorage.setItem('User', JSON.stringify(USER_SELECTION))
  })

document.querySelector('#about-us').addEventListener('click', function () {
  MODAL.style.display = 'block'
})

document
  .querySelector('#start-quiz-btn')
  .addEventListener('click', async () => {
    if (!USER_SELECTION.category || !USER_SELECTION.difficulty) {
      alert('Please choose category and difficulty')
      return
    }

    if (!USER_SELECTION.userName) {
      alert('Plase enter your name')
      return
    }

    await getData(
      USER_SELECTION.category,
      USER_SELECTION.difficulty,
      USER_SELECTION.limit
    )

    window.location.href = 'quiz.html'
  })

CARDS_CATEGORY.forEach((card) => {
  card.addEventListener('click', function () {
    if (ACTIVE_CARD_CATEGORY) {
      ACTIVE_CARD_CATEGORY.classList.remove('highlight-card')
    }

    if (ACTIVE_CARD_CATEGORY !== this) {
      this.classList.add('highlight-card')
      ACTIVE_CARD_CATEGORY = this
    } else {
      ACTIVE_CARD_CATEGORY = null
    }
  })
})

CARDS_DIFFICULTY.forEach((card) => {
  card.addEventListener('click', function () {
    if (ACTIVE_CARD_DIFFICULTY) {
      ACTIVE_CARD_DIFFICULTY.classList.remove('highlight-card-diff')
    }

    if (ACTIVE_CARD_DIFFICULTY !== this) {
      this.classList.add('highlight-card-diff')
      ACTIVE_CARD_DIFFICULTY = this
    } else {
      ACTIVE_CARD_DIFFICULTY = null
    }
  })
})
window.addEventListener('click', (event) => {
  if (event.target === MODAL) {
    MODAL.style.display = 'none'
  }
})

CLOSE_BTN.addEventListener('click', () => {
  MODAL.style.display = 'none'
})
