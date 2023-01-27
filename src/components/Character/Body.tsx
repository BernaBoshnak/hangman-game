import React from 'react'
import { classnames as cn } from '../../utils/classnames'
import styles from './Character.module.scss'

const Body = () => {
  return (
    <div
      className={cn(
        styles['character-common'],
        styles['character-common-body-parts'],
        styles['character-body'],
      )}
    ></div>
  )
}

export default Body
