export async function getData(category, difficulty, limit = 10) {
  try {
    const response = await fetch(
      `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=${limit}`
    )
    const data = await response.json()

    localStorage.setItem('quizData', JSON.stringify(data))
  } catch (error) {
    console.error('Greška pri dohvaćanju podataka:', error)
  }
}
