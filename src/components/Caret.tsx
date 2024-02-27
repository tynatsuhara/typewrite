import styles from '../App.module.css'
import { Vector2 } from '../types'

export const Caret = (props: { offset: Vector2 }) => {
  return (
    <span
      class={styles.Caret}
      style={{ left: `${props.offset[0]}px`, top: `${props.offset[1]}px` }}
    >
      _
    </span>
  )
}
