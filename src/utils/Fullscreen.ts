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
          console.log('fullscreen enabled')
        })
    } else {
      return document.exitFullscreen().then(() => {
        setFullscreen(false)
        console.log('fullscreen disabled')
      })
    }
  }

  return [isFullscreen, wrappedSetter]
}
