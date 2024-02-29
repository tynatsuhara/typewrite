import localforage from 'localforage'
import { Doc } from '../core/Doc'
import { Frame } from '../types'

type SaveFormat = {
  frames: Array<Frame>
}

export const FilingCabinet = Object.freeze({
  put: async (): Promise<void> => {
    const data: SaveFormat = { frames: Doc.frames }
    await localforage.setItem(Doc.name()!, data)
  },

  get: async (name: string): Promise<void> => {
    const data = (await localforage.getItem(name)) as SaveFormat
    Doc.setName(name)
    Doc.setFrames(data.frames)
  },

  index: async () => localforage.keys(),
})
