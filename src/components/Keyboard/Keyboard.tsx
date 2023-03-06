import Key from './Key'
import styles from './Keyboard.module.scss'

export const letters = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
] as const
export type KeyboardLetter = (typeof letters)[number][number]

export const isKeyboardLetter = (key: string): key is KeyboardLetter => {
  return letters.flat().some((letter) => key === letter)
}

type KeyboardProps = Omit<React.ComponentProps<typeof Key>, 'children'>

const Keyboard = ({
  onKeyClick,
  pressedKeys,
  isKeyboardDisabled,
}: KeyboardProps) => (
  <div className={styles.container}>
    {letters.map((lettersGroup, index) => {
      return (
        <div key={index}>
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

export default Keyboard
