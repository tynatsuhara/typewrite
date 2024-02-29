import FileOpen from '@suid/icons-material/FileOpen'
import Fullscreen from '@suid/icons-material/Fullscreen'
import Print from '@suid/icons-material/Print'
import Save from '@suid/icons-material/Save'
import SaveAs from '@suid/icons-material/SaveAs'
import Settings from '@suid/icons-material/Settings'
import { Box, Button, ButtonGroup, ThemeProvider, createTheme } from '@suid/material'
import { ButtonProps } from '@suid/material/Button'

const theme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    // Purple and green play nicely together.
    // main: '#e6e4e1',
    // contrastText: '#202020',
    // },
  },
})

// TODO: hide offscreen unless hovering
// TODO: figure out colors
export const UI = () => {
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

          <Button {...buttonProps}>
            <Fullscreen />
          </Button>

          <Button {...buttonProps}>
            <Settings />
          </Button>
        </ButtonGroup>
      </Box>
    </ThemeProvider>
  )
}
