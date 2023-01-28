import React from 'react'
import { KeyboardLetter } from './Keyboard'
import styles from './Word.module.scss'

type WordProps = {
  word: string
  pressedKeys: KeyboardLetter[]
}

const Word = ({ word, pressedKeys }: WordProps) => {
  const wordToShow = word
    .split('')
    .map((letter) => (pressedKeys.some((key) => key === letter) ? letter : '_'))
    .join(' ')

  return <div className={styles.container}>{wordToShow}</div>
}

export default Word
