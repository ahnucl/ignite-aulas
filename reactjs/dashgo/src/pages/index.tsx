import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'

/**
 * alignItems e align são iguais, assim como w e width, justifyContent e justyfy, etc
 */

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={4}>
          <Input label="E-mail" name="email" type="email" />

          <Input label="Senha" name="password" type="password" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
