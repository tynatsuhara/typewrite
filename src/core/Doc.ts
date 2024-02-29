import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Frame, Vector2 } from '../types'

// TODO encapsulate everything nicely?

const getCenterOffset = (): Vector2 => {
  const { clientWidth, clientHeight } = document.body
  return [clientWidth / 2, clientHeight * 0.45]
}

// null represents this file has never been saved
const [name, setName] = createSignal<string | null>('TODOname')
const [frames, setFrames] = createStore<Array<Frame>>([])
const [hasUnsavedChanges, setHasUnsavedChanges] = createSignal(false)
const [caretPosition, setCaretPosition] = createSignal<Vector2>([0, 0])
// we need a new frame on the initial render and anytime that the cursor moves
const [newFrame, setNewFrame] = createSignal(true)
const [offset, setOffset] = createSignal<Vector2>(getCenterOffset())

const recenter = () => {
  const [ox, oy] = getCenterOffset()
  const [cx, cy] = caretPosition()
  setOffset([ox - cx, oy - cy])
}

/**
 * Globally-visible state representing the currently-loaded document
 */
export const Doc = Object.freeze({
  name,
  setName,
  frames,
  setFrames,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  caretPosition,
  setCaretPosition,
  newFrame,
  setNewFrame,
  offset,
  setOffset,
  recenter,
})
