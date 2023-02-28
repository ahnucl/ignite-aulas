import { ComponentProps, ReactNode } from 'react'
import { X } from 'phosphor-react'

import {
  ToastClose,
  ToastContainer,
  ToastDescription,
  ToastTitle,
  ToastProvider as RadixToastProvider,
  ToastViewport,
} from './styles'

// export interface ToastProps extends ComponentProps<typeof ToastContainer> {} // Não preciso mexer nas propriedades do radix
export interface ToastProps {
  title: string
  description: string
}

export function Toast(props: ToastProps) {
  return (
    <ToastContainer
      onOpenChange={(open) => console.log('fechou: ', open)}
      {...props}
    >
      <ToastTitle>Agendamento realizado</ToastTitle>
      <ToastDescription>Terça-feira, 28 de fevereiro às 08h</ToastDescription>
      <ToastClose asChild>
        <X weight="bold" />
      </ToastClose>
    </ToastContainer>
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
