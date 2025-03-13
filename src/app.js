// Btn for moving from landing page to dashboard page
const landingPageBtn = document.querySelector('#landingpage-btn')

landingPageBtn.addEventListener('click', () => {
  window.location.href = 'dashboard.html'
})

async function getData() {
  try {
    const response = await fetch('https://the-trivia-api.com/v2/questions')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Greška pri dohvaćanju podataka:', error)
  }
}

getData()
