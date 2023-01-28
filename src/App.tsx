import React, { useState, useEffect } from 'react'
import Character from './components/Character/Character'
import Gallows from './components/Gallows/Gallows'
import Word from './components/Word'
import Keyboard, {
  KeyboardLetter,
  isKeyboardLetter,
} from './components/Keyboard/Keyboard'
import { wordsList } from './components/wordsList'
import './styles/index.scss'
import styles from './App.module.scss'

function App() {
  // const word = wordsList[Math.floor(Math.random() * wordsList.length)]
  const word = 'react'
  const [wordToGuess, setWordToGuess] = useState(word.toUpperCase())
  const [pressedKeys, setPressedKeys] = useState<KeyboardLetter[]>([])

  const handleKeyboardClick = (letter: KeyboardLetter) => {
    setPressedKeys([...pressedKeys, letter])
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

  return (
    <div className={styles['wrapper']}>
      <div className={styles['left-col']}>
        Left col
        <Character />
        <Word word={wordToGuess} pressedKeys={pressedKeys} />
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
