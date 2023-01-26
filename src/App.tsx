import React, { useState } from 'react'
import Character from './components/Character'
import Gallows from './components/Gallows'
import Keyboard, { KeyboardLetter } from './components/Keyboard'
import { wordsList } from './components/wordsList'
import './styles/index.scss'
import styles from './App.module.scss'

function App() {
  const word = wordsList[Math.floor(Math.random() * wordsList.length)]
  const [pressedKeys, setPressedKeys] = useState<KeyboardLetter[]>([])

  const handleKeyboardClick = (letter: KeyboardLetter) => {
    setPressedKeys([...pressedKeys, letter])
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['left-col']}>
        Left col
        <Character />
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
