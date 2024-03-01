import { Box, Typography } from '@suid/material'
import { UiBox } from '../utils/UiBox'

export const FilePicker = (props: { isOpen: () => boolean; setOpen: (b: boolean) => void }) => {
  return (
    <UiBox {...props}>
      <Box
        sx={{
          width: '400px',
        }}
      >
        <Typography variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </UiBox>
  )
}
