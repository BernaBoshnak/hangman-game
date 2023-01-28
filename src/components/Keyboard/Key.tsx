import React from 'react'
import { KeyboardLetter } from './Keyboard'
import styles from './Keyboard.module.scss'

type KeyProps = {
  children: KeyboardLetter
  onKeyClick: (letter: KeyboardLetter) => void
  pressedKeys: KeyboardLetter[]
}

const Key = ({ children, onKeyClick, pressedKeys }: KeyProps) => {
  const isDisabled = pressedKeys.includes(children)

  return (
    <button
      className={styles.button}
      onClick={() => onKeyClick(children)}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Key
