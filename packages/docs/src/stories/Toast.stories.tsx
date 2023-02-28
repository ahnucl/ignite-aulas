import { Meta, StoryObj } from '@storybook/react'
import {
  Toast,
  ToastProps,
  ToastProvider,
  Button,
} from '@leonardo-ignite-ui/react'
import { useState } from 'react'

interface ToastMessage {
  id: string
  title: string
  description: string
}

function generateDateString(date?: Date) {
  const dateAsString = Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
  }).format(date)

  return dateAsString.charAt(0).toUpperCase() + dateAsString.slice(1) + 'h'
}

export default {
  title: 'Alert/Toast',
  component: Toast,
  args: {
    id: 'id_1',
    title: 'Agendamento realizado',
    description: generateDateString(),
  },
  decorators: [
    (Story) => {
      const [totalMessages, setTotalMessages] = useState(0)
      const [messages, setMessages] = useState<ToastMessage[]>([])

      console.log(messages)

      return (
        <ToastProvider>
          <Button
            onClick={() => {
              setMessages((state) => [
                ...state,
                {
                  id: `newId-${totalMessages}`,
                  title: 'Novo agendamento',
                  description: generateDateString(new Date(2023, 3, 10)),
                },
              ])
              setTotalMessages((state) => state + 1)
            }}
          >
            Novo toast
          </Button>
          {Story() /* Toast inicial */}

          {messages.map((message) =>
            Story({
              args: {
                key: message.id,
                id: message.id,
                title: message.title,
                description: message.description,

                onOpenChange: (e) => {
                  console.log(e)

                  setMessages((state) =>
                    state.filter(
                      (stateMessage) => stateMessage.id !== message.id,
                    ),
                  )
                },
              },
            }),
          )}
        </ToastProvider>
      )
    },
  ],
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {}
