import { Flex, Stack, Heading } from '@chakra-ui/react'

export default function AllDone() {
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
          作成完了。ログインしています...
        </Heading>
      </Stack>
    </Flex>
  )
}
