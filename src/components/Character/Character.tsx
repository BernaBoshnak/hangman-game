import React from 'react'
import Head from './Head'
import Body from './Body'
import Arm_Left from './Arm_Left'
import Arm_Right from './Arm_Right'
import Leg_Left from './Leg_Left'
import Leg_Right from './Leg_Right'
import styles from './Character.module.scss'

type CharacterProps = {
  progress: number
}

const Character = ({ progress }: CharacterProps) => {
  return (
    <div className={styles.character}>
      {progress >= 1 && <Head />}
      {progress >= 2 && <Body />}
      {progress >= 3 && <Arm_Left />}
      {progress >= 4 && <Arm_Right />}
      {progress >= 5 && <Leg_Left />}
      {progress >= 6 && <Leg_Right />}
    </div>
  )
}

export default Character
