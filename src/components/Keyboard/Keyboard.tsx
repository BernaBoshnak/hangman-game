import { useLayoutEffect } from 'react'
import Key from './Key'
import styles from './Keyboard.module.scss'

export const letters = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
] as const
export type KeyboardLetter = (typeof letters)[number][number]

const isKeyboardLetter = (key: string): key is KeyboardLetter => {
  return letters.flat().some((letter) => key === letter)
}

type KeyboardProps = Omit<React.ComponentProps<typeof Key>, 'children'>

const Keyboard = ({
  onKeyClick,
  pressedKeys,
  setPressedKeys,
  isKeyboardDisabled,
}: KeyboardProps & {
  setPressedKeys: React.Dispatch<React.SetStateAction<KeyboardLetter[]>>
}) => {
  useLayoutEffect(() => {
    function callback(e: KeyboardEvent) {
      const key = e.key.toUpperCase()

      setPressedKeys((pressedKeys) => {
        if (isKeyboardLetter(key) && !pressedKeys.includes(key)) {
          return [...pressedKeys, key]
        }
        return pressedKeys
      })
    }

    document.addEventListener('keypress', callback)

    // cleanup
    return () => {
      document.removeEventListener('keypress', callback)
    }
  }, [setPressedKeys])

  return (
    <div className={styles.container} data-testid="keyboard">
      {letters.map((lettersGroup, index) => {
        return (
          <div key={index} className={styles.row}>
            {lettersGroup.map((letter) => {
              return (
                <Key
                  onKeyClick={onKeyClick}
                  pressedKeys={pressedKeys}
                  isKeyboardDisabled={isKeyboardDisabled}
                  key={letter}
                >
                  {letter}
                </Key>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard
