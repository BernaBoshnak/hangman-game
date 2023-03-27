import { classnames as cn } from '../../utils/classnames'
import { CharacterElementProps } from './Character'
import styles from './Character.module.scss'

const LegRight = ({ isFilled }: CharacterElementProps) => (
  <div
    className={cn(
      styles['character-common'],
      styles['character-common-body-parts'],
      styles['character-legs'],
      styles['character-leg-right'],
      {
        [styles['character-fill']]: isFilled,
        [styles['character-line']]: !isFilled,
      },
    )}
    data-testid="body-part"
  >
    {isFilled && (
      <span className={styles['body-part-description']} data-testid="body-text">
        Right leg appeared.
      </span>
    )}
  </div>
)

export default LegRight
