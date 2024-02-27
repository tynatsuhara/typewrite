import { createSignal } from 'solid-js'
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

  const mousedown = () => setMouseDown(true)
  const mouseup = () => setMouseDown(false)
  const mousemove = () => (e: MouseEvent) => {
    console.log(e.clientX)
    console.log(e.clientY)
  }
  const keypress = (e: KeyboardEvent) => {
    if (!e.repeat && VALID_KEYS.includes(e.key)) {
      console.log(e.key)
    }
  }

  onEvent('mousedown', mousedown)
  onEvent('mouseup', mouseup)
  onEvent('mousemove', mousemove)
  onEvent('keypress', keypress)

  return (
    <>
      <Caret />
    </>
  )
}
