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
  const goBackBtn = document.createElement('button')
  goBackBtn.textContent = buttonText
  goBackBtn.classList.add('start-button')
  return goBackBtn
}

export {
  hiddenIcons,
  resetQuestionIcons,
  highlightCorrectAnswer,
  highlightIncorrectAnswer,
  goBackBtn,
}
