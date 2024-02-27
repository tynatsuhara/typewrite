import { For, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import styles from '../App.module.css'
import { Vector2 } from '../types'
import { onEvent } from '../utils/onEvent'
import { Caret } from './Caret'

const VALID_KEYS = [
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890€$+-*/÷%"\'#@&_(),.;:?!¿¡\\|{}<>[]`^~',
]

type Frame = {
  text: string
  x: number
  y: number
}

export const Typewriter = () => {
  const [frames, setFrames] = createStore<Array<Frame>>([
    {
      text: 'Example!',
      x: 50,
      y: 100,
    },
  ])

  const type = (key: string) => {}

  const [isMouseDown, setMouseDown] = createSignal(false)
  const [offset, setOffset] = createSignal<Vector2>([100, 100])

  const onMouseDown = () => setMouseDown(true)
  const onMouseUp = () => setMouseDown(false)
  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown()) {
      const [x, y] = offset()
      setOffset([x + e.movementX, y + e.movementY])
    }
  }
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.repeat) {
      return
    } else if (VALID_KEYS.includes(e.key)) {
      console.log(e.key)
    } else if (e.key === 'Enter') {
      console.log('enter')
    }
  }

  onEvent('mousedown', onMouseDown)
  onEvent('mouseup', onMouseUp)
  onEvent('mousemove', onMouseMove)
  onEvent('keypress', onKeyPress)

  return (
    <div
      class={styles.Typewriter}
      style={{ 'background-position': `${offset()[0]}px ${offset()[1]}px` }}
    >
      <div style={{ position: 'relative', left: `${offset()[0]}px`, top: `${offset()[1]}px` }}>
        <For each={frames}>
          {({ text, x, y }) => (
            <div style={{ position: 'relative', left: `${x}px`, top: `${y}px` }}>{text}</div>
          )}
        </For>
        <Caret />
      </div>
    </div>
  )
}
