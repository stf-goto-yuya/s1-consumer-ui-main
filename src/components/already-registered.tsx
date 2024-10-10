import { Flex, Stack, Heading } from '@chakra-ui/react'

export default function AlreadyRegistered() {
  return (
    <Flex
      w={`100%`}
      h={`100vh`}
      justifyContent={`center`}
      alignItems={`center`}
    >
      <Stack spacing={6} align={`center`}>
        <Heading fontWeight={`normal`} fontSize={16}>
          既に登録されてます、ログインしてください
        </Heading>
      </Stack>
    </Flex>
  )
}
