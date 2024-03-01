import { Box, Button, TextField, Typography } from '@suid/material'
import { createEffect, createSignal } from 'solid-js'
import { Doc } from '../core/Doc'
import { FilingCabinet } from '../utils/FilingCabinet'
import { UiBox } from '../utils/UiBox'

export const SaveAsMenu = (props: { isOpen: () => boolean; setOpen: (b: boolean) => void }) => {
  const [name, setName] = createSignal('')
  createEffect(() => {
    setName(Doc.name() ?? '')
  })
  const [error, setError] = createSignal('')
  const save = async () => {
    const newName = name()?.trim() ?? ''
    if (!newName.length) {
      setError('Name may not be empty')
      return
    }
    const existing = await FilingCabinet.index()
    if (existing.includes(newName)) {
      setError('File already exists')
      return
    }
    setName(newName)
    Doc.setName(newName)
    FilingCabinet.put()
  }

  return (
    <UiBox {...props} id="save-as">
      <Box
        sx={{
          width: '400px',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Document name"
          variant="outlined"
          fullWidth
          value={name()}
          helperText={error()}
          onChange={(e) => {
            setError('')
            setName(e.target.value)
          }}
          error={!!error()}
        />
        <Typography variant="h6" component="h2"></Typography>
        <Button variant="contained" size="large" onClick={save} sx={{ mt: '1rem' }}>
          Save
        </Button>
      </Box>
    </UiBox>
  )
}
