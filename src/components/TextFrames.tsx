import { For } from 'solid-js'
import styles from '../App.module.css'
import { Frame } from '../types'

export const TextFrames = (props: { frames: Array<Frame> }) => {
  return (
    <For each={props.frames}>
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
