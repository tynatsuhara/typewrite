import { onCleanup, onMount } from 'solid-js'

/**
 * A hook which adds a listener to the document onMount and removes it onCleanup
 */
export const onEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  onMount(() => document.addEventListener(type, listener, options))
  onCleanup(() => document.removeEventListener(type, listener, options))
}
