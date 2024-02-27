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

  const [isShiftDown, setShiftDown] = createSignal(false)
  const [isMouseDown, setMouseDown] = createSignal(false)
  const { clientWidth, clientHeight } = document.body
  const [offset, setOffset] = createSignal<Vector2>([clientWidth / 2, clientHeight * 0.3])
  const [caretPosition, setCaretPosition] = createSignal<Vector2>([0, 0])

  const onMouseDown = () => setMouseDown(true)
  const onMouseUp = () => setMouseDown(false)
  const onMouseMove = (e: MouseEvent) => {
    // whenever the cursor moves, we need to create a new frame
    if (!isMouseDown()) {
      return
    }
    const [x, y] = offset()
    setOffset([x + e.movementX, y + e.movementY])
    if (!isShiftDown()) {
      const [cx, cy] = caretPosition()
      setCaretPosition([cx - e.movementX, cy - e.movementY])
    }
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) {
      return
    } else if (VALID_KEYS.includes(e.key)) {
      console.log(e.key)
    } else if (e.key === 'Enter') {
      console.log('enter')
    } else if (e.key === 'Backspace') {
      console.log('backspace')
    } else if (e.key === 'Shift') {
      setShiftDown(true)
    }
  }
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      setShiftDown(false)
    }
  }

  onEvent('mousedown', onMouseDown)
  onEvent('mouseup', onMouseUp)
  onEvent('mousemove', onMouseMove)
  onEvent('keydown', onKeyDown)
  onEvent('keyup', onKeyUp)

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
        <Caret position={caretPosition()} />
      </div>
    </div>
  )
}
