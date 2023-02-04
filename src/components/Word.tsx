import React from 'react'
import { KeyboardLetter } from './Keyboard/Keyboard'
import styles from './Word.module.scss'

type WordProps = {
  word: string
  pressedKeys: KeyboardLetter[]
  unlock: boolean
}

const Word = ({ word, pressedKeys, unlock }: WordProps) => {
  const wordToShow = unlock
    ? word
    : word
        .split('')
        .map((letter) =>
          pressedKeys.some((key) => key === letter) ? letter : '_',
        )
        .join(' ')

  return <div className={styles.container}>{wordToShow}</div>
}

export default Word
