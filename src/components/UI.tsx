import FileOpen from '@suid/icons-material/FileOpen'
import Fullscreen from '@suid/icons-material/Fullscreen'
import FullscreenExit from '@suid/icons-material/FullscreenExit'
import Print from '@suid/icons-material/Print'
import Save from '@suid/icons-material/Save'
import SaveAs from '@suid/icons-material/SaveAs'
import Settings from '@suid/icons-material/Settings'
import { Box, Button, ButtonGroup, ThemeProvider, createTheme } from '@suid/material'
import { ButtonProps } from '@suid/material/Button'
import { createFullscreenSignal } from '../utils/Fullscreen'

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

  const blur = () => (document.activeElement as HTMLElement).blur()

  const buttonProps: ButtonProps = { sx: { padding: '8px 12px' } }
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
          <Button {...buttonProps}>
            <Save />
          </Button>

          <Button {...buttonProps}>
            <SaveAs />
          </Button>

          <Button {...buttonProps}>
            <FileOpen />
          </Button>

          <Button {...buttonProps}>
            <Print />
          </Button>

          <Button
            {...buttonProps}
            onClick={() => {
              setFullscreen(!isFullscreen())
              blur()
            }}
          >
            {isFullscreen() ? <FullscreenExit /> : <Fullscreen />}
          </Button>

          <Button {...buttonProps}>
            <Settings />
          </Button>
        </ButtonGroup>
      </Box>
    </ThemeProvider>
  )
}
