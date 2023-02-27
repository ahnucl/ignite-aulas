import { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  Text,
  Tooltip,
  TooltipProps,
  TooltipProvider,
} from '@leonardo-ignite-ui/react'

export default {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  args: {
    children: <Text size="sm">Accept terms of use</Text>,
    label: 'Lorem ipsum',
  },
  decorators: [
    (Story) => {
      return (
        <TooltipProvider>
          <Box
            as="label"
            css={{ display: 'flex', flexDirection: 'row', gap: '$2' }}
          >
            {Story()}
          </Box>
        </TooltipProvider>
      )
    },
  ],
} as Meta<TooltipProps>

export const Primary: StoryObj<TooltipProps> = {}
