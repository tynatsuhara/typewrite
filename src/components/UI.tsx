import FolderIcon from '@suid/icons-material/Folder'
import FullscreenIcon from '@suid/icons-material/Fullscreen'
import FullscreenExitIcon from '@suid/icons-material/FullscreenExit'
import HelpIcon from '@suid/icons-material/Help'
import PrintIcon from '@suid/icons-material/Print'
import SaveIcon from '@suid/icons-material/Save'
import SaveAsIcon from '@suid/icons-material/SaveAs'
// import Settings from '@suid/icons-material/Settings'
import { Box, ButtonGroup, ThemeProvider, createTheme } from '@suid/material'
import { createSignal } from 'solid-js'
import { Doc } from '../core/Doc'
import { Vector2 } from '../types'
import { FilingCabinet } from '../utils/FilingCabinet'
import { createFullscreenSignal } from '../utils/Fullscreen'
import { onEvent } from '../utils/onEvent'
import { FilePicker } from './FilePicker'
import { HelpMenu } from './HelpMenu'
import { printDoc } from './PrintView'
import { SaveAsMenu } from './SaveAsMenu'
import { ToolbarButton } from './ToolbarButton'

const TOOLBAR_HOVER_MARGIN: Vector2 = [150, 400]
const TOOLBAR_OFFSCREEN_POS = '-280px'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#303030',
    },
  },
})

const toolbarTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#303030',
    },
  },
})

export const UI = () => {
  const [isFullscreen, setFullscreen] = createFullscreenSignal()
  const [isHoveringToolbarArea, setIsHoveringToolbarArea] = createSignal(false)
  const [isSaveAsMenuOpen, setSaveAsMenuOpen] = createSignal(false)
  const [isFilePickerMenuOpen, setFilePickerMenuOpen] = createSignal(false)
  const [isHelpMenuOpen, setHelpMenuOpen] = createSignal(false)

  const saveAsFn = () => {
    setSaveAsMenuOpen(true)
  }

  const saveFn = () => {
    if (!Doc.name()) {
      saveAsFn()
    } else {
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
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault()
        saveFn()
      } else if (e.key === 'p') {
        e.preventDefault()
        printDoc()
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <FilePicker isOpen={isFilePickerMenuOpen} setOpen={setFilePickerMenuOpen} />
      <SaveAsMenu isOpen={isSaveAsMenuOpen} setOpen={setSaveAsMenuOpen} />
      <HelpMenu isOpen={isHelpMenuOpen} setOpen={setHelpMenuOpen} />

      <ThemeProvider theme={toolbarTheme}>
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
            <SaveIcon />
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
            <SaveAsIcon />
          </ToolbarButton>

          <ToolbarButton onClick={() => setFilePickerMenuOpen(true)}>
            <FolderIcon />
          </ToolbarButton>

          <ToolbarButton onClick={printDoc}>
            <PrintIcon />
          </ToolbarButton>

          <ToolbarButton onClick={() => setFullscreen(!isFullscreen())}>
            {isFullscreen() ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </ToolbarButton>

          <ToolbarButton onClick={() => setHelpMenuOpen(true)}>
            <HelpIcon />
          </ToolbarButton>
        </ButtonGroup>
      </ThemeProvider>
    </ThemeProvider>
  )
}
