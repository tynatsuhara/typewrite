import { createSignal } from 'solid-js'
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
  const [isMouseDown, setMouseDown] = createSignal(false)
  const [offset, setOffset] = createSignal<Vector2>([0, 0])

  const onMouseDown = () => setMouseDown(true)
  const onMouseUp = () => setMouseDown(false)
  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown()) {
      const [x, y] = offset()
      setOffset([x + e.movementX, y + e.movementY])
      console.log(offset())
    }
  }
  const onKeyPress = (e: KeyboardEvent) => {
    if (!e.repeat && VALID_KEYS.includes(e.key)) {
      console.log(e.key)
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
      <Caret offset={offset()} />
    </div>
  )
}
