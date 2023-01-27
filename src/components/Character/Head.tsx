import React from 'react'
import { classnames as cn } from '../../utils/classnames'
import styles from './Character.module.scss'

const Head = () => {
  return (
    <div
      className={cn(styles['character-common'], styles['character-head'])}
    ></div>
  )
}

export default Head
