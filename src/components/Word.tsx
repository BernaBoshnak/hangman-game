import { KeyboardLetter } from './Keyboard/Keyboard'
import { classnames as cn } from '../utils/classnames'
import styles from './Word.module.scss'

type WordProps = {
  word: string
  pressedKeys: KeyboardLetter[]
  unlock: boolean
}

const generateLetterElement = (letter: string) => {
  return (
    <span className={styles.letter}>
      <svg viewBox="0 0 50 25" className={styles['letter-svg']}>
        <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle">
          {letter}
        </text>
      </svg>
    </span>
  )
}

const Word = ({ word, pressedKeys, unlock }: WordProps) => {
  const wordToShow = word.split('').map((letter, index) => {
    const isCorrect = pressedKeys.some((key) => key === letter)
    const isIncorrect = unlock && !isCorrect
    const letterElement =
      isCorrect || isIncorrect ? generateLetterElement(letter) : null
    return (
      <span
        key={index}
        className={cn(styles['letter-wrapper'], {
          [styles['letter-wrapper-correct']]: isCorrect,
          [styles['letter-wrapper-incorrect']]: isIncorrect,
        })}
      >
        {letterElement}
      </span>
    )
  })

  return <div className={styles.container}>{wordToShow}</div>
}

export default Word
