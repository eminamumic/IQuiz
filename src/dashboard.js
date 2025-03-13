import { getData } from './data.js'

const scienceCard = document.querySelector('#science-card')
const musicCard = document.querySelector('#music-card')
const sportCard = document.querySelector('#sport-card')

let zahtjevi = {}

scienceCard.addEventListener('click', function () {
  zahtjevi.category = this.getAttribute('data-category')
})

musicCard.addEventListener('click', function () {
  zahtjevi.category = this.getAttribute('data-category')
})

sportCard.addEventListener('click', function () {
  zahtjevi.category = this.getAttribute('data-category')
})

const easyBtn = document.querySelector('#easy')
const mediumBtn = document.querySelector('#medium')
const hardBtn = document.querySelector('#hard')

easyBtn.addEventListener('click', function () {
  zahtjevi.difficulty = this.getAttribute('data-difficulty')
})

mediumBtn.addEventListener('click', function () {
  zahtjevi.difficulty = this.getAttribute('data-difficulty')
})

hardBtn.addEventListener('click', function () {
  zahtjevi.difficulty = this.getAttribute('data-difficulty')
})

const questionNumber = document.querySelector('#question-number')

questionNumber.addEventListener('input', function () {
  zahtjevi.limit = parseInt(questionNumber.value) || 1
})

const startBtn = document.querySelector('#start-quiz-btn')

startBtn.addEventListener('click', () => {
  if (!zahtjevi.category || !zahtjevi.difficulty) {
    alert('Molimo odaberite kategoriju i težinu prije početka kviza!')
    return
  }
  getData(zahtjevi.category, zahtjevi.difficulty, zahtjevi.limit)
  window.location.href = 'quiz.html'
})

document
  .querySelector('#back-to-landingpage-btn')
  .addEventListener('click', () => {
    window.location.href = 'index.html'
  })
