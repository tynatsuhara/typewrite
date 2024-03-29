import { Box, Button, TextField, Typography } from '@suid/material'
import { createEffect, createSignal } from 'solid-js'
import { Doc } from '../core/Doc'
import { FilingCabinet } from '../utils/FilingCabinet'
import { UiBox } from '../utils/UiBox'

export const SaveAsMenu = (props: { isOpen: () => boolean; setOpen: (b: boolean) => void }) => {
  const [name, setName] = createSignal('')
  const [error, setError] = createSignal('')
  createEffect(() => {
    if (props.isOpen()) {
      setName(Doc.name() ?? '')
      setError('')
    }
  })
  const save = async () => {
    const newName = name()?.trim() ?? ''
    if (!newName.length) {
      setError('Name cannot be empty')
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
    props.setOpen(false)
  }

  return (
    <UiBox {...props} id="save-as">
      <Box
        sx={{
          width: '400px',
        }}
      >
        <TextField
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              save()
            }
          }}
        />
        <Typography variant="h6" component="h2"></Typography>
        <Button variant="contained" size="large" onClick={save} sx={{ mt: '1rem' }}>
          Save
        </Button>
      </Box>
    </UiBox>
  )
}
