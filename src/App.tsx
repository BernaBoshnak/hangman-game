import { useState, useEffect } from 'react'
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
import { classnames as cn } from './utils/classnames'
import styles from './App.module.scss'

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>()
  const [pressedKeys, setPressedKeys] = useState<KeyboardLetter[]>([])
  const [randomWordFound, setRandomWordFound] = useState<boolean>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleKeyboardClick = (letter: KeyboardLetter) => {
    setPressedKeys([...pressedKeys, letter])
  }

  const difficultyLevelClick = async (difficulty: Level) => {
    setIsLoading(true)
    setRandomWordFound(undefined)
    const { minLength, maxLength } = getWordLengths(difficulty)

    try {
      const word = await getWordFromApi(minLength, maxLength)

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
    setPressedKeys([])
    setWordToGuess(undefined)
    setRandomWordFound(undefined)
  }

  let isGameWon: boolean | undefined

  if (incorrectLetters.length >= characterElements.length) {
    isGameWon = false
  }

  if (
    wordToGuess &&
    Array.from(wordToGuess).every((letter) => {
      return pressedKeys.some((key) => key === letter)
    })
  ) {
    isGameWon = true
  }

  const isGameOver = isGameWon !== undefined

  if (!wordToGuess) {
    return (
      <div className={styles['full-screen-wrapper']}>
        <div className={styles['center-wrapper']}>
          {randomWordFound === false && (
            <ErrorMessage>Oops, something went wrong. Try again.</ErrorMessage>
          )}
          {isLoading && <Loading />}
          {!isLoading && (
            <DifficultyButtons difficultyLevelClick={difficultyLevelClick} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(styles['full-screen-wrapper'])}>
      <div className={styles['left-col']}>
        {isGameWon !== undefined && (
          <GameOver isWon={isGameWon} reset={handlePlayAgainClick} />
        )}
        <Word
          word={wordToGuess}
          pressedKeys={pressedKeys}
          shouldUnlockAllLetters={isGameOver}
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
    </div>
  )
}

export default App
