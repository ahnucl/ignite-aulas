import * as Toast from '@radix-ui/react-toast'
import { keyframes, styled } from '../../styles'

const slideIn = keyframes({
  from: {
    transform: 'translateX(calc(100% + 32px))', // Como usar variáveis aqui dentro? 32px = $8
  },
  to: {
    transform: 'translateX(0)',
  },
})

const hide = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const swipeOut = keyframes({
  from: {
    transform: 'translateX(var(--radix-toast-swipe-end-x))',
  },
  to: {
    transform: 'translateX(calc(100% + var(--viewport-padding)))',
  },
})

export const ToastBody = styled(Toast.Root, {
  width: '360px',
  minHeight: '82px',
  boxSizing: 'border-box',
  border: '1px solid $gray600',
  backgroundColor: '$gray800',
  padding: '$3 $5',
  borderRadius: '$sm',

  fontFamily: '$default',
  lineHeight: '$base',

  display: 'grid',
  gridTemplateAreas: `'title action' 'description description'`,
  gridTemplateColumns: `1fr auto`,

  '&:hover': {
    borderColor: '$ignite500',
  },

  '&[data-state="open"]': {
    animation: `${slideIn} 300ms`,
  },

  '&[data-state="closed"]': {
    animation: `${hide} 200ms ease-in`, // Tempo que deve estar no onOpenChange
  },

  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))',
  },

  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out',
  },

  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
})

export const ToastTitle = styled(Toast.Title, {
  gridArea: 'title',
  color: '$white',
  fontSize: '$xl',
  fontWeight: '$bold',
})

export const ToastDescription = styled(Toast.Description, {
  gridArea: 'description',
  color: '$gray200',
  fontSize: '$sm',
  fontWeight: '$regular',
})

export const ToastClose = styled(Toast.Close, {
  gridArea: 'action',
  color: '$gray200',
  fontSize: '$xl',

  '&:hover': {
    color: '$gray100',
  },
})

export const ToastProvider = styled(Toast.Provider, {})

export const ToastViewport = styled(Toast.Viewport, {
  bottom: 0,
  right: 0,
  position: 'fixed',
  padding: '$8',
  maxWidth: '100vw',
  margin: 0,

  listStyle: 'none',
})
