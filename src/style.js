function hiddenIcons() {
  document.querySelector('.decor9').classList.add('hidden')
  document.querySelector('.decor10').classList.add('hidden')
  document.querySelector('.decor11').classList.add('hidden')
}

function resetQuestionIcons() {
  document.querySelector('.decor9').classList.remove('hidden')
  document.querySelector('.decor10').classList.add('hidden')
  document.querySelector('.decor11').classList.add('hidden')
}

function highlightCorrectAnswer(correctAnswer) {
  document.querySelector('.decor9').classList.add('hidden')
  document.querySelector('.decor11').classList.remove('hidden')
  let correctSound = document.querySelector('#correct-sound')
  correctSound.play()

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
  let wrongSound = document.querySelector('#wrong-sound')
  wrongSound.play()
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add('correct')
    } else {
      button.classList.add('incorrect')
    }
  })
}

function goBackBtn(buttonText) {
  const button = document.createElement('button')
  button.textContent = buttonText
  button.classList.add('start-button')
  return button
}

function disableAnswerButtons() {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => (button.disabled = true))
}

export {
  hiddenIcons,
  resetQuestionIcons,
  highlightCorrectAnswer,
  highlightIncorrectAnswer,
  goBackBtn,
  disableAnswerButtons,
}
