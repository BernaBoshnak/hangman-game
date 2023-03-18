import styles from './GameOver.module.scss'

type GameOverProps = {
  reset: () => void
  isWon: boolean
}

const GameOver = ({ isWon, reset }: GameOverProps) => (
  <div className={`${styles.container} ${isWon ? styles.win : styles.lose}`}>
    <div className={styles.gameText}>
      {isWon ? 'Congratulations!' : 'Game Over'}
    </div>
    <button className={styles.button} onClick={reset}>
      Play Again
    </button>
  </div>
)

export default GameOver
