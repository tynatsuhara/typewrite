import { onCleanup, onMount } from 'solid-js'
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
  const handleKeyPress = (e: Event) => {
    if (e instanceof KeyboardEvent && VALID_KEYS.includes(e.key)) {
      console.log(e.key)
    }
  }

  onMount(() => document.addEventListener('keypress', handleKeyPress))
  onCleanup(() => document.removeEventListener('keypress', handleKeyPress))

  return (
    <>
      <Caret />
    </>
  )
}
