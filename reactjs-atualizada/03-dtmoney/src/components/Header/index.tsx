import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog' // Importa todas as exportações dentro de um objeto Dialog
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Dt Money" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
