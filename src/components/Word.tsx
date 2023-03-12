import { KeyboardLetter } from './Keyboard/Keyboard'
import Letter from './Letter'
import { classnames as cn } from '../utils/classnames'
import styles from './Word.module.scss'

type WordProps = {
  word: string
  pressedKeys: KeyboardLetter[]
  shouldUnlockAllLetters: boolean
}

const Word = ({ word, pressedKeys, shouldUnlockAllLetters }: WordProps) => {
  const wordToShow = word.split('').map((letter, index) => {
    const isCorrect = pressedKeys.some((key) => key === letter)

    return (
      <span
        key={index}
        className={cn(styles['letter-wrapper'], {
          [styles['letter-wrapper-correct']]: isCorrect,
          [styles['letter-wrapper-incorrect']]:
            !isCorrect && shouldUnlockAllLetters,
        })}
        data-testid="word-letter"
      >
        {(shouldUnlockAllLetters || isCorrect) && <Letter>{letter}</Letter>}
      </span>
    )
  })

  return <div className={styles.container}>{wordToShow}</div>
}

export default Word
