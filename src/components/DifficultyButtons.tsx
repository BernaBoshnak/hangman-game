import { Level } from '../utils/word'
import styles from './DifficultyButtons.module.scss'

type DifficultyButtonsProps = {
  difficultyLevelClick: (difficulty: Level) => void
}

const DifficultyButtons = ({
  difficultyLevelClick,
}: DifficultyButtonsProps) => (
  <div className={styles.buttonsContainer}>
    <button
      className={styles.button}
      onClick={() => difficultyLevelClick('easy')}
    >
      Easy
    </button>
    <button
      className={styles.button}
      onClick={() => difficultyLevelClick('normal')}
    >
      Normal
    </button>
    <button
      className={styles.button}
      onClick={() => difficultyLevelClick('hard')}
    >
      Hard
    </button>
  </div>
)

export default DifficultyButtons
