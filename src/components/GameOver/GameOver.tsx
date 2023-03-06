import styles from './GameOver.module.scss'

type GameOverProps = {
  reset: () => void
  isWon: boolean
}

const GameOver = ({ isWon, reset }: GameOverProps) => (
  <div className={`${styles.container} ${isWon ? styles.win : styles.lose}`}>
    <h1 className={styles.title}>{isWon ? 'Congratulations!' : 'Game Over'}</h1>
    <button className={styles.button} onClick={reset}>
      Play Again
    </button>
  </div>
)

export default GameOver
