import { Box, Grow, useTheme } from '@suid/material'
import { createSignal } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { onEvent } from './onEvent'

const [globalOpen, setGlobalOpen] = createSignal(false)
export const isAnyMenuOpen = globalOpen

export const UiBox = (props: {
  isOpen: () => boolean
  setOpen: (b: boolean) => void
  children: JSX.Element
}) => {
  const theme = useTheme()
  let ref: HTMLDivElement | undefined = undefined

  if (props.isOpen()) {
    setGlobalOpen(true)
  }

  onEvent('mousedown', (e) => {
    if (!ref?.matches(':hover')) {
      props.setOpen(false)
      setGlobalOpen(false)
    }
  })

  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
    >
      <Grow in={props.isOpen()}>
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.primary.contrastText,
            boxShadow: '24px',
            p: 4,
          }}
        >
          {props.children}
        </Box>
      </Grow>
    </Box>
  )
}
