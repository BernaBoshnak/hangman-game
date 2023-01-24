import React from 'react'
import { classnames as cn } from '../utils/classnames'
import styles from './Character.module.scss'

type CharacterProps = {
  myProp?: string
}

const Character = (props: CharacterProps) => {
  return (
    <div className={styles.character}>
      <div
        className={cn(styles['character-common'], styles['character-head'])}
      ></div>
      <div
        className={cn(
          styles['character-common'],
          styles['character-common-body-parts'],
          styles['character-body'],
        )}
      ></div>
      <div
        className={cn(
          styles['character-common'],
          styles['character-common-body-parts'],
          styles['character-arms'],
          styles['character-arm-left'],
        )}
      ></div>
      <div
        className={cn(
          styles['character-common'],
          styles['character-common-body-parts'],
          styles['character-arms'],
          styles['character-arm-right'],
        )}
      ></div>
      <div
        className={cn(
          styles['character-common'],
          styles['character-common-body-parts'],
          styles['character-legs'],
          styles['character-leg-left'],
        )}
      ></div>
      <div
        className={cn(
          styles['character-common'],
          styles['character-common-body-parts'],
          styles['character-legs'],
          styles['character-leg-right'],
        )}
      ></div>
    </div>
  )
}

export default Character
