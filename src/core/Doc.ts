import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Frame } from '../types'

// TODO encapsulate everything nicely?

// null represents this file has never been saved
const [name, setName] = createSignal<string | null>('TODOname')
const [frames, setFrames] = createStore<Array<Frame>>([])
const [hasUnsavedChanges, setHasUnsavedChanges] = createSignal(false)

// TODO?
// const [caretPosition, setCaretPosition] = createSignal<Vector2>([0, 0])

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
})
