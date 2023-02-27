import React from 'react'
import { classnames as cn } from '../../utils/classnames'
import { CharacterElementProps } from './Character'
import styles from './Character.module.scss'

const Head = ({ isFilled }: CharacterElementProps) => (
  <div
    className={cn(styles['character-common'], styles['character-head'], {
      [styles['character-fill']]: isFilled,
      [styles['character-line']]: !isFilled,
    })}
  />
)

export default Head
