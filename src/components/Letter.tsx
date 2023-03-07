import styles from './Word.module.scss'

type LetterProps = {
  children: string
}

const Letter = ({ children }: LetterProps) => (
  <span className={styles.letter}>
    <svg viewBox="0 0 50 25" className={styles['letter-svg']}>
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle">
        {children}
      </text>
    </svg>
  </span>
)

export default Letter
