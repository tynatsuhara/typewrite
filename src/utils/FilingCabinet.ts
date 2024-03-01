import localforage from 'localforage'
import { Doc } from '../core/Doc'
import { Frame, Vector2 } from '../types'

type SaveFormat = {
  frames: Array<Frame>
  caret: Vector2
  newFrame: boolean
}

export const FilingCabinet = Object.freeze({
  put: async (): Promise<void> => {
    // JSON stringify/parse to strip out solidjs magic that is breaking serialization
    const data: SaveFormat = {
      frames: JSON.parse(JSON.stringify(Doc.frames)),
      caret: Doc.caretPosition(),
      newFrame: Doc.newFrame(),
    }
    console.log(`saving document ${Doc.name()} data: ${JSON.stringify(data)}`)
    await localforage.setItem(Doc.name()!, data)
    Doc.setHasUnsavedChanges(false)
  },

  get: async (name: string): Promise<void> => {
    const data = (await localforage.getItem(name)) as SaveFormat
    Doc.setName(name)
    Doc.setFrames(data.frames)
    Doc.setCaretPosition(data.caret) // TODO reset offset to make caret centered
    Doc.setNewFrame(data.newFrame)
    Doc.recenter()
    console.log(`loaded document ${Doc.name()} data: ${data}`)
  },

  contains: async (document: string): Promise<boolean> => {
    const keys = await localforage.keys()
    return keys.includes(document)
  },

  index: async () => localforage.keys(),
})
