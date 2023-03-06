import Head from './Head'
import Body from './Body'
import ArmLeft from './ArmLeft'
import ArmRight from './ArmRight'
import LegLeft from './LegLeft'
import LegRight from './LegRight'
import styles from './Character.module.scss'

export const characterElements = [
  Head,
  Body,
  ArmLeft,
  ArmRight,
  LegLeft,
  LegRight,
]

type CharacterProps = {
  progress: number
}

export type CharacterElementProps = {
  isFilled: boolean
}

const Character = ({ progress }: CharacterProps) => (
  <div className={styles.character}>
    {characterElements.map((Component, index) => {
      const isFilled = index < progress

      return <Component key={index} isFilled={isFilled} />
    })}
  </div>
)

export default Character
