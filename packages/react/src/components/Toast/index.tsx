import { ComponentProps, ReactNode } from 'react'
import { X } from 'phosphor-react'

import {
  ToastClose,
  ToastBody,
  ToastDescription,
  ToastTitle,
  ToastProvider as RadixToastProvider,
  ToastViewport,
} from './styles'

export interface ToastProps extends ComponentProps<typeof ToastBody> {
  id: string
  title: string
  description: string
}

export function Toast({ id, description, title, ...props }: ToastProps) {
  return (
    <ToastBody {...props}>
      <ToastTitle>{title}</ToastTitle>
      <ToastDescription>{description}</ToastDescription>
      <ToastClose asChild>
        <X weight="bold" />
      </ToastClose>
    </ToastBody>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <RadixToastProvider>
      {children}

      <ToastViewport />
    </RadixToastProvider>
  )
}
