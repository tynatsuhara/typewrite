import localforage from 'localforage'
import { Frame } from '../types'

export const FilingCabinet = Object.freeze({
  put: async (name: string, frames: Array<Frame>): Promise<void> => {
    await localforage.setItem(name, frames)
  },

  get: async (name: string): Promise<Array<Frame>> => {
    return (await localforage.getItem(name))!
  },

  index: async () => localforage.keys(),
})
