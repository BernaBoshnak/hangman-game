import React, { useState, useEffect } from 'react'
import Character, { characterElements } from './components/Character/Character'
import Gallows from './components/Gallows/Gallows'
import Word from './components/Word'
import Keyboard, {
  KeyboardLetter,
  isKeyboardLetter,
} from './components/Keyboard/Keyboard'
import getWordLengths, { Level } from './word'
import GameOver from './components/GameOver/GameOver'
import DifficultyButtons from './components/DifficultyButtons'
import ErrorMessage from './components/ErrorMessage'
import Loading from './components/Loading'
import getWordFromApi from './fetchWord'
import hangmanStyles from './components/HangmanContainer.module.scss'
import './styles/index.scss'
import styles from './App.module.scss'

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>()
  const [pressedKeys, setPressedKeys] = useState<KeyboardLetter[]>([])
  const [randomWordFound, setRandomWordFound] = useState<boolean>()
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleKeyboardClick = (letter: KeyboardLetter) => {
    setPressedKeys([...pressedKeys, letter])
  }

  const difficultyLevelClick = async (difficulty: Level) => {
    setIsVisible(false)
    setIsLoading(true)
    setRandomWordFound(undefined)
    const { minLength, maxLength } = getWordLengths(difficulty)

    try {
      const word = await getWordFromApi(minLength, maxLength)
      console.log(word)

      if (!word) {
        setRandomWordFound(false)
        return
      }

      setWordToGuess(word.toUpperCase())
    } catch (_error) {
      setRandomWordFound(false)
    } finally {
      setIsLoading(false)
    }
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
    setIsVisible(true)
    setPressedKeys([])
    setWordToGuess(undefined)
    setRandomWordFound(undefined)
  }

  const isGameLost = incorrectLetters.length >= characterElements.length
  const isGameWon = Boolean(
    wordToGuess &&
      Array.from(wordToGuess).every((letter) => {
        return pressedKeys.some((key) => key === letter)
      }),
  )
  const isGameOver = isGameLost || isGameWon

  return (
    <div className={styles['full-screen-wrapper']}>
      {!wordToGuess ? (
        <div className={styles['center-wrapper']}>
          {randomWordFound === false && (
            <ErrorMessage>Oops, something went wrong. Try again.</ErrorMessage>
          )}
          {isLoading && <Loading />}
          {isVisible && (
            <DifficultyButtons difficultyLevelClick={difficultyLevelClick} />
          )}
        </div>
      ) : (
        <>
          <div className={styles['left-col']}>
            {isGameLost && (
              <GameOver isWon={false} reset={handlePlayAgainClick} />
            )}
            {isGameWon && (
              <GameOver isWon={true} reset={handlePlayAgainClick} />
            )}
            <Word
              word={wordToGuess}
              pressedKeys={pressedKeys}
              unlock={isGameOver}
            />
            <Keyboard
              onKeyClick={handleKeyboardClick}
              pressedKeys={pressedKeys}
              isKeyboardDisabled={isGameOver}
            />
          </div>
          <div className={styles['right-col']}>
            <div className={hangmanStyles['hangman-container']}>
              <Gallows />
              <Character progress={incorrectLetters.length} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
