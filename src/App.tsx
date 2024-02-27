import type { Component } from 'solid-js'

import styles from './App.module.css'
import Caret from './components/Caret'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Caret />
    </div>
  )
}

export default App
