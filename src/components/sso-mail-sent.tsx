import { Flex, Heading, Stack, Text } from '@chakra-ui/react'

export default function SsoMailSent() {
  return (
    <Flex
      w={`100%`}
      h={`100vh`}
      justifyContent={`center`}
      alignItems={`center`}
      bg={`gray.900`}
    >
      <Stack spacing={6} align={`start`} color={`white`}>
        <Heading fontSize={24}>S1 Portal UI</Heading>
        <Text fontWeight={`normal`} fontSize={16}>
          メールアドレス宛にメール認証リンク付きのメールを送信しました。
        </Text>
        <Text fontWeight={`normal`} fontSize={16}>
          リンクからメール認証を完了させてください
        </Text>
      </Stack>
    </Flex>
  )
}
