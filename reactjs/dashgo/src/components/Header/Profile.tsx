import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProficeData: boolean
}

export function Profile({ showProficeData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProficeData && (
        <Box mr="4" textAlign="right">
          <Text>Leonardo Cunha</Text>
          <Text color="gray.300" fontSize="small">
            lalmcunha@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Leonardo Cunha"
        src="https://github.com/ahnucl.png"
      />
    </Flex>
  )
}
