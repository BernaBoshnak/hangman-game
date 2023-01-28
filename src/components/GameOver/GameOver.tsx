import React from 'react'
import styles from './GameOver.module.scss'

type GameOverProps = {
  reset: () => void
  isWin: boolean
}

const GameOver = ({ isWin, reset }: GameOverProps) => (
  <div className={`${styles.container} ${isWin ? styles.win : styles.lose}`}>
    <h1 className={styles.title}>{isWin ? 'Congratulations!' : 'Game Over'}</h1>
    <button className={styles.button} onClick={reset}>
      Play Again
    </button>
  </div>
)

export default GameOver
