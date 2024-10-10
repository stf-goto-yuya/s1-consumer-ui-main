import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Heading,
  Flex,
  Link,
  Stack,
  Text,
  Box,
} from '@chakra-ui/react'
import type { InferGetStaticPropsType } from 'next'
import { getProviders, signIn, useSession } from 'next-auth/react'
import NL from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Loading } from '../../components/loading'
import { REGEX_PASSWORD } from '@/src/utils/regex'
import axios from 'axios'

type Inputs = {
  email: string
}

const Signin: any = ({
  providers,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { error, callbackUrl } = router.query
  const { data: session, status } = useSession({
    required: false,
  })

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  function onSubmit(values: Inputs) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_HOST}/users/sso/resend`, {
            username: values.email,
          })
          .then((res) => {
            console.log(res)
            router.push('/auth/sso-completed')
            resolve()
          })
      }, 500)
    })
  }

  if (status === 'loading') return <Loading />
  if (status === 'unauthenticated')
    return (
      <>
        <Flex
          w={`100%`}
          h={`100vh`}
          justifyContent={`center`}
          alignItems={`center`}
          bg={`gray.900`}
        >
          <Stack>
            <Heading as={`h2`} py={8} fontSize={18} color={`white`}>
              {process.env.SITE_NAME} サインイン
            </Heading>
            {error && (
              <Box bg={`red.100`} mb={8} p={4} rounded={2}>
                <Text color={`red.500`}>
                  サインインできませんでした。
                  <br />
                  メールアドレスとパスワードを確認してください
                </Text>
              </Box>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.email} w={`400px`} mb={4}>
                <Input
                  id="email"
                  type="email"
                  placeholder="メールアドレス"
                  color={`white`}
                  _placeholder={{ color: 'gray.400' }}
                  {...register('email', {
                    required: '必須入力です',
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <Stack direction="column" spacing={8} mt={8}>
                <Button
                  colorScheme="teal"
                  _hover={{ opacity: 0.8 }}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  認証メールを送信する
                </Button>
                <Button
                  colorScheme="teal"
                  variant={`outline`}
                  _hover={{ opacity: 0.8 }}
                  isLoading={isSubmitting}
                  onClick={() => router.push('/auth/signin')}
                >
                  パスワードでサインインする
                </Button>
                <NL href={`/auth/signup`}>
                  <Link
                    bg={`gray.100`}
                    color={`black`}
                    rounded={6}
                    textAlign="center"
                    py={2}
                    px={4}
                    _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                  >
                    新規登録はこちら
                  </Link>
                </NL>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </>
    )
  if (status === 'authenticated') router.push('/')

  return <Loading />
}

export default Signin

export async function getServerSideProps(ctx: any): Promise<any> {
  const providers: any = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
