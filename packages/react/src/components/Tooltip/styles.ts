import * as Tooltip from '@radix-ui/react-tooltip'
import { keyframes, styled } from '../../styles'

export const TooltipContainer = styled(Tooltip.Root, {})

export const TooltipTrigger = styled(Tooltip.Trigger, {})

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: '$gray900',
  width: '$4',
  height: '$2',
})

const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const TooltipContent = styled(Tooltip.Content, {
  fontFamily: '$default',
  color: '$gray100',
  fontWeight: '$medium',
  fontSize: '$sm',

  backgroundColor: '$gray900',
  padding: '$3 $4',
  borderRadius: '$sm',

  '&[data-state="delayed-open"]': {
    animation: `${slideDownAndFade} 200ms`,
  },
})
