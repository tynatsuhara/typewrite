import DeleteIcon from '@suid/icons-material/Delete'
import EditIcon from '@suid/icons-material/Edit'

import { Box, Divider, IconButton, Typography, useTheme } from '@suid/material'
import { For, createEffect, createSignal } from 'solid-js'
import { Doc } from '../core/Doc'
import { FilingCabinet } from '../utils/FilingCabinet'
import { UiBox } from '../utils/UiBox'

export const FilePicker = (props: { isOpen: () => boolean; setOpen: (b: boolean) => void }) => {
  const [files, setFiles] = createSignal<Array<string>>([])

  const loadFileNames = async () => {
    const keys = await FilingCabinet.index()
    keys.sort()
    setFiles(keys)
  }

  createEffect(() => {
    if (props.isOpen()) {
      loadFileNames()
    }
  })

  const theme = useTheme()

  const content = () => {
    if (files().length === 0) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color={theme.palette.text.primary}>
            No saved files
          </Typography>
        </Box>
      )
    }

    return (
      <For each={files()}>
        {(item, index) => {
          return (
            <Box sx={{ height: '50px' }}>
              <Divider sx={{ margin: '0px 0', opacity: index() === 0 ? 0 : 1 }} />
              <Box sx={{ margin: '4px 0' }}>
                <Box>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                    sx={{ float: 'left', display: 'inline-block', marginTop: '8px' }}
                  >
                    {item}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    float: 'right',
                  }}
                >
                  <IconButton
                    onClick={async () => {
                      FilingCabinet.get(item)
                      props.setOpen(false)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      FilingCabinet.remove(item)
                      setFiles([...files()].filter((f) => f !== item))
                      if (Doc.name() === item) {
                        Doc.setHasUnsavedChanges(true)
                        Doc.setName(null)
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )
        }}
      </For>
    )
  }

  return (
    <UiBox {...props} id="file-picker">
      <Box
        sx={{
          width: '400px',
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        {content()}
      </Box>
    </UiBox>
  )
}
