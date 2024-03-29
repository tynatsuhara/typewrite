import { Box } from '@suid/material'
import { createSignal } from 'solid-js'
import { Doc } from '../core/Doc'
import { Frame } from '../types'
import { TextFrames } from './TextFrames'

const [printView, setPrintView] = createSignal(false)
export const isPrintView = printView

export const printDoc = () => {
  setPrintView(true)
  print()
  setPrintView(false)
}

export const PrintView = () => {
  const normalized = (): Array<Frame> => {
    if (!Doc.frames.length) {
      return []
    }
    let minX = Doc.frames[0].x
    let minY = Doc.frames[0].x
    for (let i = 1; i < Doc.frames.length; i++) {
      minX = Math.min(minX, Doc.frames[i].x)
      minY = Math.min(minY, Doc.frames[i].y)
    }
    return [...Doc.frames].map((f) => ({ ...f, x: f.x - minX, y: f.y - minY }))
  }

  return (
    <Box sx={{ scale: '.6', transformOrigin: 'top left' }}>
      <TextFrames frames={normalized()} />
    </Box>
  )
}
