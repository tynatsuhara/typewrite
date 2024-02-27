import type { Component } from 'solid-js'

import styles from './App.module.css'
import { Typewriter } from './components/Typewriter'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Typewriter />
    </div>
  )
}

export default App
