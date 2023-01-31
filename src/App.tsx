import React, { useState, useEffect } from 'react'
import Character, { characterElements } from './components/Character/Character'
import Gallows from './components/Gallows/Gallows'
import Word from './components/Word'
import Keyboard, {
  KeyboardLetter,
  isKeyboardLetter,
} from './components/Keyboard/Keyboard'
import { wordsList } from './components/wordsList'
import getRandomWordByDifficulty, { Level } from './components/wordGenerator'
import GameOver from './components/GameOver/GameOver'
import './styles/index.scss'
import styles from './App.module.scss'

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>()
  const [pressedKeys, setPressedKeys] = useState<KeyboardLetter[]>([])

  const handleKeyboardClick = (letter: KeyboardLetter) => {
    setPressedKeys([...pressedKeys, letter])
  }

  const difficultyLevelClick = (difficulty: Level) => {
    const randomWord = getRandomWordByDifficulty(difficulty, wordsList)
    randomWord
      ? setWordToGuess(randomWord.toUpperCase())
      : alert('Something went wrong, unable to continue the game')
  }

  useEffect(() => {
    function callback(e: KeyboardEvent) {
      const key = e.key.toUpperCase()

      if (isKeyboardLetter(key)) {
        setPressedKeys((prevState) => [...prevState, key])
      }
    }

    document.addEventListener('keypress', callback)

    // cleanup
    return () => {
      document.removeEventListener('keypress', callback)
    }
  }, [])

  const incorrectLetters = pressedKeys.filter(
    (letter) => !wordToGuess?.includes(letter),
  )

  const handlePlayAgainClick = () => {
    setPressedKeys([])
    setWordToGuess(undefined)
  }

  const isGameOver = incorrectLetters.length >= characterElements.length
  const isGameWon = Boolean(
    wordToGuess &&
      Array.from(wordToGuess).every((letter) => {
        return pressedKeys.some((key) => key === letter)
      }),
  )

  return (
    <div className={styles['wrapper']}>
      <div className={styles['left-col']}>
        Left col
        <Character progress={incorrectLetters.length} />
        <button onClick={() => difficultyLevelClick('easy')}>Easy</button>
        <button onClick={() => difficultyLevelClick('normal')}>Normal</button>
        <button onClick={() => difficultyLevelClick('hard')}>Hard</button>
        {isGameOver && <GameOver isWin={false} reset={handlePlayAgainClick} />}
        {isGameWon && <GameOver isWin={true} reset={handlePlayAgainClick} />}
        {wordToGuess && <Word word={wordToGuess} pressedKeys={pressedKeys} />}
        <Keyboard onKeyClick={handleKeyboardClick} pressedKeys={pressedKeys} />
      </div>
      <div className={styles['right-col']}>
        <div style={{ textAlign: 'center', fontSize: '2rem' }}>Win || Lose</div>
        <Gallows />
      </div>
    </div>
  )
}

export default App
