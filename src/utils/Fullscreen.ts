import { Accessor, createSignal } from 'solid-js'

export const createFullscreenSignal = (): [Accessor<boolean>, (full: boolean) => Promise<void>] => {
  const [isFullscreen, setFullscreen] = createSignal(!!document.fullscreenElement)

  const wrappedSetter = async (full: boolean) => {
    if (full) {
      return document
        .getElementById('root')!
        .requestFullscreen({
          navigationUI: 'hide',
        })
        .then(() => {
          setFullscreen(true)
        })
    } else {
      return document.exitFullscreen().then(() => {
        setFullscreen(false)
      })
    }
  }

  return [isFullscreen, wrappedSetter]
}
