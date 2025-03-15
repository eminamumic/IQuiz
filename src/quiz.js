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
