import React from 'react'
import Gallows from './components/Gallows'
import styles from './App.module.scss'
import './styles/index.scss'

function App() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['left-col']}>
        Left col
      </div>
      <div className={styles['right-col']}>
        <div style={{ textAlign: 'center', fontSize: '2rem' }}>Win || Lose</div>
        <Gallows />
      </div>
    </div>
  )
}

export default App
