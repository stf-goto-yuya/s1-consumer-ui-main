import { Flex, Stack, Heading, Spinner } from '@chakra-ui/react'

export default function PortalSignup() {
  return (
    <Flex
      w={`100%`}
      h={`100vh`}
      justifyContent={`center`}
      alignItems={`center`}
      bg={`gray.900`}
    >
      <Stack spacing={6} align={`center`} color={`white`}>
        <Heading fontWeight={`normal`} fontSize={16}>
          データ連携中
        </Heading>
        <Spinner />
      </Stack>
    </Flex>
  )
}
