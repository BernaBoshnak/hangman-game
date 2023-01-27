import React from 'react'
import { classnames as cn } from '../../utils/classnames'
import styles from './Character.module.scss'

const Leg_Left = () => {
  return (
    <div
      className={cn(
        styles['character-common'],
        styles['character-common-body-parts'],
        styles['character-legs'],
        styles['character-leg-left'],
      )}
    ></div>
  )
}

export default Leg_Left
