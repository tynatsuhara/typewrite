import FileOpen from '@suid/icons-material/FileOpen'
import Fullscreen from '@suid/icons-material/Fullscreen'
import FullscreenExit from '@suid/icons-material/FullscreenExit'
import Print from '@suid/icons-material/Print'
import Save from '@suid/icons-material/Save'
import SaveAs from '@suid/icons-material/SaveAs'
// import Settings from '@suid/icons-material/Settings'
import { Box, ButtonGroup, ThemeProvider, createTheme } from '@suid/material'
import { createSignal } from 'solid-js'
import { Doc } from '../core/Doc'
import { Vector2 } from '../types'
import { FilingCabinet } from '../utils/FilingCabinet'
import { createFullscreenSignal } from '../utils/Fullscreen'
import { onEvent } from '../utils/onEvent'
import { FilePicker } from './FilePicker'
import { SaveAsMenu } from './SaveAsMenu'
import { ToolbarButton } from './ToolbarButton'

const TOOLBAR_HOVER_MARGIN: Vector2 = [150, 400]
const TOOLBAR_OFFSCREEN_POS = '-230px'

const theme = createTheme({
  palette: {
    mode: 'dark',
    // TODO fix colors
    // primary: {
    // contrastText: '#e6e4e1',
    // main: '#444444',
    // },
  },
})

// TODO: make sure you can't open other menus when one's already open. maybe it'll close so that's already fine?
export const UI = () => {
  const [isFullscreen, setFullscreen] = createFullscreenSignal()
  const [isHoveringToolbarArea, setIsHoveringToolbarArea] = createSignal(false)
  const [isFilePickerMenuOpen, setFilePickerMenuOpen] = createSignal(false)
  const [isSaveAsMenuOpen, setSaveAsMenuOpen] = createSignal(false)

  const saveAsFn = () => {
    setSaveAsMenuOpen(true)
  }

  const saveFn = () => {
    if (!Doc.name()) {
      saveAsFn()
    } else {
      // TODO save as, prompt for name
      FilingCabinet.put()
    }
  }

  onEvent('mousemove', (e) => {
    setIsHoveringToolbarArea(
      e.clientY > document.body.clientHeight - TOOLBAR_HOVER_MARGIN[0] &&
        e.clientX < TOOLBAR_HOVER_MARGIN[1]
    )
  })

  onEvent('keydown', (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      saveFn()
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <FilePicker isOpen={isFilePickerMenuOpen} setOpen={setFilePickerMenuOpen} />
      <SaveAsMenu isOpen={isSaveAsMenuOpen} setOpen={setSaveAsMenuOpen} />
      <ButtonGroup
        color="primary"
        variant="contained"
        sx={{
          position: 'absolute',
          left: isHoveringToolbarArea() ? '1rem' : TOOLBAR_OFFSCREEN_POS,
          bottom: '1rem',
          transition: 'left .3s ease',
        }}
      >
        <ToolbarButton onClick={saveFn}>
          <Save />
          {Doc.hasUnsavedChanges() && (
            <Box
              sx={{
                position: 'absolute',
                top: '1px',
                right: '10px',
              }}
            >
              *
            </Box>
          )}
        </ToolbarButton>

        <ToolbarButton onClick={saveAsFn}>
          <SaveAs />
        </ToolbarButton>

        <ToolbarButton onClick={() => FilingCabinet.get('TODOname')}>
          <FileOpen />
        </ToolbarButton>

        <ToolbarButton>
          <Print />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            setFullscreen(!isFullscreen())
            blur()
          }}
        >
          {isFullscreen() ? <FullscreenExit /> : <Fullscreen />}
        </ToolbarButton>

        {/* <ToolbarButton>
            <Settings />
          </ToolbarButton> */}
      </ButtonGroup>
    </ThemeProvider>
  )
}
