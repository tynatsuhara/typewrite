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
import { FilingCabinet } from '../utils/FilingCabinet'
import { createFullscreenSignal } from '../utils/Fullscreen'
import { onEvent } from '../utils/onEvent'
import { ToolbarButton } from './ToolbarButton'

// TODO
const TOOLBAR_HOVER_AREA = 150
const TOOLBAR_OFFSCREEN_POS = '-230px'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      contrastText: '#e6e4e1',
      main: '#444444',
    },
  },
})

// TODO: hide offscreen unless hovering
// TODO: figure out colors
export const UI = () => {
  const [isFullscreen, setFullscreen] = createFullscreenSignal()
  const [isHoveringToolbarArea, setIsHoveringToolbarArea] = createSignal(false)

  onEvent('mousemove', (e) => {
    setIsHoveringToolbarArea(
      e.clientY > document.body.clientHeight - TOOLBAR_HOVER_AREA &&
        e.clientX < document.body.clientWidth / 4
    )
  })

  return (
    <ThemeProvider theme={theme}>
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
        <ToolbarButton onClick={() => FilingCabinet.put()}>
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

        <ToolbarButton>
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
