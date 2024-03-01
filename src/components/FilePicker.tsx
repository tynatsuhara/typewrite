import DeleteIcon from '@suid/icons-material/Delete'

import { Box, IconButton } from '@suid/material'
import { For, createEffect, createSignal } from 'solid-js'
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

  // TODO: handle the zero case

  return (
    <UiBox {...props} id="file-picker">
      <Box
        sx={{
          width: '400px',
        }}
      >
        <For each={files()}>
          {(item, index) => {
            return (
              <Box>
                {item}
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )
          }}
        </For>
      </Box>
    </UiBox>
  )
}
