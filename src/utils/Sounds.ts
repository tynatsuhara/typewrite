import { Lists } from './Lists'

const AUDIO_PATH = `${import.meta.env.BASE_URL}audio/`
const TYPING_SOUNDS = Lists.range(1, 12).map((i) => `${AUDIO_PATH}type${i}.mp3`)
const NEW_LINE_SOUND = `${AUDIO_PATH}newline.mp3`

export const Sounds = Object.freeze({
  preload: () => {
    TYPING_SOUNDS.forEach((a) => new Audio(a))
    new Audio(NEW_LINE_SOUND)
  },

  playTypeSound: () => {
    new Audio(Lists.oneOf(TYPING_SOUNDS)).play()
  },

  playNewLineSound: () => {
    new Audio(NEW_LINE_SOUND).play()
  },
})
