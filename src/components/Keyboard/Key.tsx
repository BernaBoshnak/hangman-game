import { KeyboardLetter } from './Keyboard'
import styles from './Keyboard.module.scss'

type KeyProps = {
  children: KeyboardLetter
  onKeyClick: (letter: KeyboardLetter) => void
  pressedKeys: KeyboardLetter[]
  isKeyboardDisabled: boolean
}

const Key = ({
  children,
  onKeyClick,
  pressedKeys,
  isKeyboardDisabled,
}: KeyProps) => {
  const isButtonDisabled = pressedKeys.includes(children)

  return (
    <button
      className={styles.button}
      onClick={() => onKeyClick(children)}
      disabled={isButtonDisabled || isKeyboardDisabled}
    >
      <span className={styles.key}>{children}</span>
    </button>
  )
}

export default Key
