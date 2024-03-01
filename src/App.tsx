import type { Component } from 'solid-js'

import styles from './App.module.css'
import { PrintView, isPrintView } from './components/PrintView'
import { Typewriter } from './components/Typewriter'
import { UI } from './components/UI'

const App: Component = () => {
  const content = () => {
    if (isPrintView()) {
      return <PrintView />
    }
    return (
      <>
        <UI />
        <Typewriter />
      </>
    )
  }
  return <div class={styles.App}>{content()}</div>
}

export default App
