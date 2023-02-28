import { Meta, StoryObj } from '@storybook/react'
import { Toast, ToastProps, ToastProvider } from '@leonardo-ignite-ui/react'

export default {
  title: 'Alert/Toast',
  component: Toast,
  args: {},
  decorators: [
    (Story) => {
      return <ToastProvider>{Story()}</ToastProvider>
    },
  ],
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {}
