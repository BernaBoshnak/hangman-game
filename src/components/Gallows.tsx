import React from 'react'
import { classnames as cn } from '../utils/classnames'
import styles from './Gallows.module.scss'

const Gallows = () => {
  return (
    <div className={styles.gallows}>
      <div
        className={cn(styles['gallows-common'], styles['gallows-head-holder'])}
      />
      <div
        className={cn(styles['gallows-common'], styles['gallows-top-line'])}
      />
      <div className={cn(styles['gallows-common'], styles['gallows-pillar'])} />
      <div className={cn(styles['gallows-common'], styles['gallows-base'])} />
    </div>
  )
}

export default Gallows
