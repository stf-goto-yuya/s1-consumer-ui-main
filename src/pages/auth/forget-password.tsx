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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loading } from '../../components/loading'
import { REGEX_PASSWORD } from '@/src/utils/regex'
import axios from 'axios'

type Inputs = {
  email: string
  password: string
}

const Signin: any = ({
  providers,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const [completed, setCompleted] = useState<boolean>(false)
  const router = useRouter()

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
        const { email } = values

        axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/forget-password`,
          {
            email
          }
        ).then(() => {
          resolve()
        })
      }, 500)
    }).finally(() => {
      setCompleted(true)
    })
  }

  console.log(completed)

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
              {process.env.SITE_NAME} パスワードリセット リクエスト
            </Heading>
            {completed ? (
              <>
                <Text>パスワード変更リンクをメールで送信しました。</Text>
                <Text>メールボックスをご確認ください</Text>
              </>
            ): (
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
                  送信
                </Button>
              </Stack>
            </form>
            )}
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
