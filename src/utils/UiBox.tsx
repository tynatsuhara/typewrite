import { Box, Grow, useTheme } from '@suid/material'
import { createEffect, createSignal } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { onEvent } from './onEvent'

const [globalOpen, setGlobalOpen] = createSignal<string | null>(null)
export const isAnyMenuOpen = globalOpen

export const UiBox = (props: {
  isOpen: () => boolean
  setOpen: (b: boolean) => void
  children: JSX.Element
  id: string
}) => {
  const theme = useTheme()
  let ref: HTMLDivElement | undefined = undefined

  createEffect(() => {
    if (props.isOpen()) {
      setGlobalOpen(props.id)
    } else if (!props.isOpen() && globalOpen() === props.id) {
      setGlobalOpen(null)
    }
  })

  onEvent('mousedown', (e) => {
    if (props.isOpen() && !ref?.matches(':hover')) {
      props.setOpen(false)
      setGlobalOpen(null)
    }
  })

  return (
    <Box
      id={props.id}
      ref={ref}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // make sure an open thing always has a higher z-index to make button stuff work right
        zIndex: props.isOpen() ? 10 : 9,
      }}
    >
      <Grow in={props.isOpen()}>
        <Box
          sx={{
            borderRadius: '4px',
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
