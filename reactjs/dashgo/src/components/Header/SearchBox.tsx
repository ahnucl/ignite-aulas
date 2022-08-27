import { Button, Flex, Icon, Input } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export function SearchBox() {
  // const [search, setSearch] = useState('') // controlled components
  // debounce

  const searchInputRef = useRef<HTMLInputElement>(null) // uncontrolled component

  // current é o valor atual da ref no momento
  // forma imperativa

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
        // value={search} // controlled component
        // onChange={event => setSearch(event.target.value)} // controlled component
        ref={searchInputRef} // uncontrolled component
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}
