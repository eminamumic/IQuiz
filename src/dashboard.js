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

document
  .querySelector('#start-quiz-btn')
  .addEventListener('click', async () => {
    if (!userSelection.category || !userSelection.difficulty) {
      alert('Molimo odaberite kategoriju i težinu prije početka kviza!')
      return
    }

    await getData(
      userSelection.category,
      userSelection.difficulty,
      userSelection.limit
    )

    // Prebacujemo korisnika na quiz.html
    window.location.href = 'quiz.html'
  })

document
  .querySelector('#back-to-landingpage-btn')
  .addEventListener('click', () => {
    window.location.href = 'index.html'
  })
