import { Box, Link, Typography, useTheme } from '@suid/material'
import { UiBox } from '../utils/UiBox'

export const HelpMenu = (props: { isOpen: () => boolean; setOpen: (b: boolean) => void }) => {
  const theme = useTheme()

  return (
    <UiBox {...props} id="file-picker">
      <Box
        sx={{
          width: '400px',
          maxHeight: '600px',
        }}
      >
        <Typography variant="body1" color={theme.palette.text.primary}>
          Press [shift] to lock the cursor while moving the paper.
          <Box sx={{ marginTop: '1rem' }} />
          Made by{' '}
          <Link href="https://ty.pizza" target="_blank">
            Ty Natsuhara
          </Link>
          . Source available on{' '}
          <Link href="https://github.com/tynatsuhara/typewrite" target="_blank">
            GitHub
          </Link>
          .
        </Typography>
      </Box>
    </UiBox>
  )
}
