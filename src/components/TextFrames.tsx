import { For } from 'solid-js'
import styles from '../App.module.css'
import { Doc } from '../core/Doc'

export const TextFrames = () => {
  return (
    <For each={Doc.frames}>
      {(frame, index) => (
        <div
          class={styles.MovableType}
          style={{
            left: `${frame.x}px`,
            top: `${frame.y}px`,
          }}
          id={`frame-${index()}`}
        >
          {frame.text}
        </div>
      )}
    </For>
  )
}
