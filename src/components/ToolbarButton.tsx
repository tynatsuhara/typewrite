import { Button } from '@suid/material'
import { ButtonProps } from '@suid/material/Button'

const blur = () => (document.activeElement as HTMLElement).blur()

const DEFAULT_PROPS: ButtonProps = { sx: { padding: '8px 12px' } }

export const ToolbarButton = (props: ButtonProps) => {
  return (
    <Button
      {...DEFAULT_PROPS}
      {...props}
      onClick={(e) => {
        if (typeof props.onClick === 'function') {
          props.onClick?.(e)
        }
        blur()
      }}
    ></Button>
  )
}
