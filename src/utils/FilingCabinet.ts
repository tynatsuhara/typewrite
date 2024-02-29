import localforage from 'localforage'
import { Doc } from '../core/Doc'
import { Frame } from '../types'

type SaveFormat = {
  frames: Array<Frame>
}

export const FilingCabinet = Object.freeze({
  put: async (): Promise<void> => {
    // JSON stringify/parse to strip out solidjs magic that is breaking serialization
    const data: SaveFormat = { frames: JSON.parse(JSON.stringify(Doc.frames)) }
    console.log(`saving document ${Doc.name()} data: ${JSON.stringify(data)}`)
    await localforage.setItem(Doc.name()!, data)
    Doc.setHasUnsavedChanges(false)
  },

  get: async (name: string): Promise<void> => {
    const data = (await localforage.getItem(name)) as SaveFormat
    Doc.setName(name)
    Doc.setFrames(data.frames)
    console.log(`loaded document ${Doc.name()} data: ${data}`)
  },

  index: async () => localforage.keys(),
})
