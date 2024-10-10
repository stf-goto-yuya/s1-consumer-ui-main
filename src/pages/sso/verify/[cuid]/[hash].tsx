import { Heading, Text } from '@chakra-ui/layout'
import { Flex, Stack } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import axios from 'axios'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const VerifyEmail: NextPage = () => {
  const router = useRouter()
  const { cuid, expires, hash, signature } = router.query
  const [authorized, setAuthorized] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (cuid && expires && hash && signature) {
        try {
          const {
            data: { username },
          } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_HOST}/users/sso/${cuid}/verify`,
            {
              expires,
              hash,
              signature,
            },
          )

          signIn('credentials', {
            username: username,
            password: process.env.NEXT_PUBLIC_SSO_PASSWORD,
            callbackUrl: '/',
          })

          setAuthorized('authorized')
          // router.push('/?verified=true')
        } catch (err) {
          console.log(err)
          setAuthorized('unauthorized')
        }
      }
    })()
  }, [cuid, expires, hash, signature])

  if (authorized === 'authorized') {
    return (
      <Flex
        w={`100%`}
        h={`100vh`}
        justifyContent={`center`}
        alignItems={`center`}
        bg={`gray.900`}
      >
        <Stack spacing={6} align={`start`} color={`white`}>
          <Heading as={`h2`} py={8} fontSize={18}>
            メール認証に成功しました
          </Heading>
          <Text>ダッシュボードに移動します、しばらくお待ちください</Text>
          <Spinner />
        </Stack>
      </Flex>
    )
  }

  if (authorized === 'unauthorized') {
    return (
      <Flex
        w={`100%`}
        h={`100vh`}
        justifyContent={`center`}
        alignItems={`center`}
        bg={`gray.900`}
      >
        <Stack spacing={6} align={`start`} color={`white`}>
          <Heading as={`h2`} py={8} fontSize={18}>
            メール認証に失敗しました
          </Heading>
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex
      w={`100%`}
      h={`100vh`}
      justifyContent={`center`}
      alignItems={`center`}
      bg={`gray.900`}
    >
      <Stack spacing={6} align={`start`} color={`white`}>
        <Heading as={`h2`} py={8} fontSize={18}>
          メール認証中 <Spinner ml={4} />
        </Heading>
      </Stack>
    </Flex>
  )
}

export default VerifyEmail
