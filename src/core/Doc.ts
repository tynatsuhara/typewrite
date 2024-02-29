import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Frame } from '../types'

// null represents this file has never been saved
const [name, setName] = createSignal<string | null>(null)
const [frames, setFrames] = createStore<Array<Frame>>([])
// const [hasUnsavedChanges, setHasUnsavedChanges] = createSignal(false)

/**
 * Globally-visible state representing the currently-loaded document
 */
export const Doc = Object.freeze({
  name,
  setName,
  frames,
  setFrames,
})
