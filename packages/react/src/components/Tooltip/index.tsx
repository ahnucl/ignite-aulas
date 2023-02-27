import { ComponentProps } from 'react'
import {
  TooltipContainer,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from './styles'

export interface TooltipProps extends ComponentProps<typeof TooltipContent> {
  label: string
}

export function Tooltip({ children, label, ...props }: TooltipProps) {
  return (
    <TooltipContainer>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={2} {...props}>
        {label}
        <TooltipArrow />
      </TooltipContent>
    </TooltipContainer>
  )
}

export { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
