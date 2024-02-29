import FileOpen from '@suid/icons-material/FileOpen'
import Fullscreen from '@suid/icons-material/Fullscreen'
import FullscreenExit from '@suid/icons-material/FullscreenExit'
import Print from '@suid/icons-material/Print'
import Save from '@suid/icons-material/Save'
import SaveAs from '@suid/icons-material/SaveAs'
// import Settings from '@suid/icons-material/Settings'
import { Box, ButtonGroup, ThemeProvider, createTheme } from '@suid/material'
import { Doc } from '../core/Doc'
import { FilingCabinet } from '../utils/FilingCabinet'
import { createFullscreenSignal } from '../utils/Fullscreen'
import { ToolbarButton } from './ToolbarButton'

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

  return (
    <ThemeProvider theme={theme}>
      <Box
      // sx={{
      //   ':hover': {
      //     opacity: '1',
      //   },
      //   opacity: 0.5,
      // }}
      >
        <ButtonGroup
          color="primary"
          variant="contained"
          sx={{
            position: 'absolute',
            left: '1rem',
            bottom: '1rem',
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
      </Box>
    </ThemeProvider>
  )
}
