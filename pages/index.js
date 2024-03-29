import { useEffect, useState } from 'react'
import { fetchCountries } from '../lib/countriesApi'
import styles from '../styles/Home.module.css'

export default function Home () {
  const [countries, setCountries] = useState([])
  const [currentQuiz, setCurrentQuiz] = useState(null)

  useEffect(() => {
    fetchCountries().then(data => {
      setCountries(data)
      generateQuiz(data)
    })
  }, [])

  function generateQuiz (countries) {
    const shuffledCountries = countries.sort(() => Math.random() - 0.5)
    const correctAnswer = shuffledCountries[0]
    const options = shuffledCountries.slice(0, 4)
    setCurrentQuiz({
      correctAnswer,
      options
    })
  }

  function handleAnswer (option) {
    if (option.cca2 === currentQuiz.correctAnswer.cca2) {
      alert('正解！')
      generateQuiz(countries)
    } else {
      alert('不正解！もう一度挑戦してください。')
    }
  }

  if (!currentQuiz) return <div>読み込み中...</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>国旗クイズ</h1>
      <img
        src={currentQuiz.correctAnswer.flags.svg}
        alt='国旗'
        className={styles.flagImage}
      />
      <div className={styles.optionsContainer}>
        {currentQuiz.options.map(option => (
          <button
            key={option.cca2}
            onClick={() => handleAnswer(option)}
            className={styles.optionButton}
          >
            {option.translations.jpn.common}
          </button>
        ))}
      </div>
    </div>
  )
}
