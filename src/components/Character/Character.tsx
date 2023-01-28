import React from 'react'
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

const Character = ({ progress }: CharacterProps) => (
  <div className={styles.character}>
    {characterElements.slice(0, progress).map((Component, index) => (
      <Component key={index} />
    ))}
  </div>
)

export default Character
