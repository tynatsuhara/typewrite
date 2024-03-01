import { createSignal } from 'solid-js'
import styles from '../App.module.css'
import { Doc } from '../core/Doc'
import { Sounds } from '../utils/Sounds'
import { isAnyMenuOpen } from '../utils/UiBox'
import { onEvent } from '../utils/onEvent'
import { Caret } from './Caret'
import { TextFrames } from './TextFrames'

const VALID_KEYS = [
  ...' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890€$+-=*/÷%"\'#&_(),.;:?!¿¡\\',
]
const LINE_HEIGHT = 26 // pixels

export const Typewriter = () => {
  // used for tracking held-down keys (currently only shift)
  const [keysDown, setKeysDown] = createSignal<Record<string, boolean>>({})
  const [isMouseDown, setMouseDown] = createSignal(false)

  const moveCaret = (x: number, y: number, newFrame: boolean, moveOffset = true) => {
    if (newFrame) {
      Doc.setNewFrame(true)
    }
    Doc.setCaretPosition(([cx, cy]) => [cx + x, cy + y])
    if (moveOffset) {
      Doc.setOffset(([ox, oy]) => [ox - x, oy - y])
    }
  }

  const type = (key: string) => {
    if (Doc.newFrame()) {
      Doc.setNewFrame(false)
      const [x, y] = Doc.caretPosition()
      Doc.setFrames([...Doc.frames, { text: '', x, y }])
    }

    const id = `frame-${Doc.frames.length - 1}`
    const initialWidth = document.getElementById(id)!.clientWidth ?? 0
    Doc.setFrames(
      (f, i) => i === Doc.frames.length - 1,
      'text',
      (text) => text + key
    )
    // if the mouse is down, don't do any shifting/animation stuff
    if (!isMouseDown()) {
      const shift = document.getElementById(id)!.clientWidth - initialWidth
      moveCaret(shift, 0, false)
    }

    if (key !== ' ') {
      Doc.setHasUnsavedChanges(true)
      Sounds.playTypeSound()
    }
  }

  const enter = () => {
    if (Doc.newFrame()) {
      // if we need a new frame, all we're really doing is moving the cursor down
      if (!isMouseDown()) {
        moveCaret(0, LINE_HEIGHT, false)
      }
    } else {
      const lastFrame = Doc.frames[Doc.frames.length - 1]
      const newX = lastFrame.x // go back to the beginning of the line
      const newY = Doc.caretPosition()[1] + LINE_HEIGHT
      const [cx, cy] = Doc.caretPosition()

      // first, move down
      moveCaret(0, newY - cy, true)

      // then, move left
      setTimeout(() => {
        moveCaret(newX - cx, 0, true)
        Sounds.playNewLineSound()
      }, 250)
    }
  }

  // Event handlers
  {
    const onMouseDown = () => setMouseDown(true)
    const onMouseUp = () => setMouseDown(false)
    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown() || isAnyMenuOpen()) {
        return
      }

      // move the background
      const [x, y] = Doc.offset()
      Doc.setOffset([x + e.movementX, y + e.movementY])

      // move the cursor if they're not holding down shift
      // TODO: determine if there's a better way here — a toggle, probably?
      if (!keysDown()['Shift']) {
        const [cx, cy] = Doc.caretPosition()
        Doc.setNewFrame(true)
        moveCaret(-e.movementX, -e.movementY, true, false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnyMenuOpen() || e.repeat || e.metaKey || e.ctrlKey || e.altKey) {
        return
      } else if (VALID_KEYS.includes(e.key)) {
        type(e.key)
      } else if (e.key === 'Enter') {
        enter()
      } else if (e.key === 'Shift') {
        setKeysDown({ ...keysDown(), [e.key]: true })
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (isAnyMenuOpen()) {
        return
      } else if (e.key === 'Shift') {
        setKeysDown({ ...keysDown(), [e.key]: false })
      }
    }

    onEvent('mousedown', onMouseDown)
    onEvent('mouseup', onMouseUp)
    onEvent('mousemove', onMouseMove)
    onEvent('keydown', onKeyDown)
    onEvent('keyup', onKeyUp)
  }

  return (
    <div
      class={`${styles.Typewriter} ${isMouseDown() ? styles.MouseDown : ''}`}
      style={{ 'background-position': `${Doc.offset()[0]}px ${Doc.offset()[1]}px` }}
    >
      <div
        class={styles.TextContainer}
        style={{ left: `${Doc.offset()[0]}px`, top: `${Doc.offset()[1]}px` }}
      >
        <Caret position={Doc.caretPosition()} />
        <TextFrames frames={Doc.frames} />
      </div>
    </div>
  )
}
