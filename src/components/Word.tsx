import React from 'react'
import { KeyboardLetter } from './Keyboard/Keyboard'
import { classnames as cn } from '../utils/classnames'
import styles from './Word.module.scss'

type WordProps = {
  word: string
  pressedKeys: KeyboardLetter[]
  unlock: boolean
}

const Word = ({ word, pressedKeys, unlock }: WordProps) => {
  const wordToShow = unlock
    ? word.split('').map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter}
        </span>
      ))
    : word.split('').map((letter, index) => (
        <span
          key={index}
          className={cn(styles['letter-wrapper'], {
            [styles.correct]: pressedKeys.some((key) => key === letter),
          })}
        >
          {pressedKeys.some((key) => key === letter) && (
            <span className={styles.letter}>
              <svg viewBox="0 0 50 25" className={styles['letter-svg']}>
                <text
                  x="50%"
                  y="70%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {letter}
                </text>
              </svg>
            </span>
          )}
        </span>
      ))

  return <div className={styles.container}>{wordToShow}</div>
}

export default Word
