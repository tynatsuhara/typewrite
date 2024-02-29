import type { Component } from 'solid-js'

import styles from './App.module.css'
import { Typewriter } from './components/Typewriter'
import { UI } from './components/UI'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <UI />
      <Typewriter />
    </div>
  )
}

export default App
