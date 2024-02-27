import styles from '../App.module.css'
import { Vector2 } from '../types'

export const Caret = (props: { position: Vector2 }) => {
  return (
    <span
      class={styles.Caret}
      style={{ left: `${props.position[0]}px`, top: `${props.position[1]}px` }}
    >
      _
    </span>
  )
}
