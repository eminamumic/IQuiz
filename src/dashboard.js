const scienceCard = document.querySelector('#science-card')
const musicCard = document.querySelector('#music-card')
const sportCard = document.querySelector('#sport-card')

scienceCard.addEventListener('click', function () {
  console.log(this.getAttribute('data-category'))
})

musicCard.addEventListener('click', function () {
  console.log(this.getAttribute('data-category'))
})

sportCard.addEventListener('click', function () {
  console.log(this.getAttribute('data-category'))
})
