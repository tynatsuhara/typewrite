import { For, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import styles from '../App.module.css'
import { Frame, Vector2 } from '../types'
import { onEvent } from '../utils/onEvent'
import { Caret } from './Caret'

const VALID_KEYS = [
  ...' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890€$+-*/÷%"\'#&_(),.;:?!¿¡\\',
]

export const Typewriter = () => {
  // each "frame" represents a div of text
  const [frames, setFrames] = createStore<Array<Frame>>([
    {
      text: 'Example!',
      x: 50,
      y: 100,
    },
  ])
  const [isShiftDown, setShiftDown] = createSignal(false)
  const [isMouseDown, setMouseDown] = createSignal(false)
  const { clientWidth, clientHeight } = document.body
  const [offset, setOffset] = createSignal<Vector2>([clientWidth / 2, clientHeight * 0.45])
  const [caretPosition, setCaretPosition] = createSignal<Vector2>([0, 0])
  // we need a new frame on the initial render and anytime that the cursor moves
  const [newFrame, setNewFrame] = createSignal(true)

  const type = (key: string) => {
    if (newFrame()) {
      setNewFrame(false)
      const [x, y] = caretPosition()
      setFrames([...frames, { text: '', x, y }])
    }

    const id = `frame-${frames.length - 1}`
    const initialWidth = document.getElementById(id)!.clientWidth ?? 0
    setFrames(
      (f, i) => i === frames.length - 1,
      'text',
      (text) => text + key
    )
    // if the mouse is down, don't do any shifting/animation stuff
    if (!isMouseDown()) {
      const shift = document.getElementById(id)!.clientWidth - initialWidth
      console.log(shift)
      setOffset(([x, y]) => [x - shift, y])
      setCaretPosition(([x, y]) => [x + shift, y])
    }
  }

  // Event handlers
  {
    const onMouseDown = () => setMouseDown(true)
    const onMouseUp = () => setMouseDown(false)
    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown()) {
        return
      }
      // move the background
      const [x, y] = offset()
      setOffset([x + e.movementX, y + e.movementY])
      // move the cursor if they're not holding down shift
      // TODO: determine if there's a better way here — a toggle, probably?
      if (!isShiftDown()) {
        const [cx, cy] = caretPosition()
        setCaretPosition([cx - e.movementX, cy - e.movementY])
        // @ts-ignore
        // whenever the cursor moves, we need to create a new frame
        setNewFrame(true)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) {
        return
      } else if (VALID_KEYS.includes(e.key)) {
        type(e.key)
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
  }

  return (
    <div
      class={styles.Typewriter}
      style={{ 'background-position': `${offset()[0]}px ${offset()[1]}px` }}
    >
      <div
        class={`${styles.TextContainer} ${isMouseDown() ? styles.MouseDown : ''}`}
        style={{ left: `${offset()[0]}px`, top: `${offset()[1]}px` }}
      >
        <Caret position={caretPosition()} />

        <For each={frames}>
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
      </div>
    </div>
  )
}
