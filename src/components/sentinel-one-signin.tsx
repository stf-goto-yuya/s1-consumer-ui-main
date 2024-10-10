import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Flex,
  Stack,
  Heading,
  Link,
} from '@chakra-ui/react'

import { Inter } from 'next/font/google'
import NL from 'next/link'
import { SignupFlowStatus } from '@/src/constants/signup-flow-status'
import { passwordFormatValidation } from '@/src/validations/password-format.validation'

const inter = Inter({ subsets: ['latin'] })

export type SignupForm = {
  email: string
  password: string
}

type Props = {
  onSubmit: any
  setStatus: any
}

export default function SentinelOneSignin({ onSubmit, setStatus }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>()

  return (
    <Flex
      w={`100%`}
      h={`100vh`}
      justifyContent={`center`}
      alignItems={`center`}
      bg={`gray.900`}
    >
      <Stack spacing={6} color={`white`}>
        <Heading fontWeight={`normal`} fontSize={16}>
          Sentinel Oneアカウントでサインアップ
        </Heading>
        <Stack
          as={`form`}
          onSubmit={handleSubmit(onSubmit)}
          w={`400px`}
          spacing={6}
        >
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email" fontSize={14}>
              メールアドレス
            </FormLabel>
            <Input
              id="email"
              color={`white`}
              _placeholder={{ color: 'gray.400' }}
              placeholder="メールアドレス"
              {...register('email', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password" fontSize={14}>
              パスワード
            </FormLabel>
            <Input
              id="password"
              type="password"
              color={`white`}
              _placeholder={{ color: 'gray.400' }}
              placeholder="パスワード"
              {...register('password', {
                required: 'This is required',
                pattern: passwordFormatValidation,
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            サインアップ
          </Button>
          <Button
            mt={4}
            variant={`outline`}
            colorScheme="teal"
            onClick={() => {
              setStatus(SignupFlowStatus.SENTINEL_ONE_SSO)
            }}
          >
            SSOでログインしてる方はこちら
          </Button>
          <NL href={`/auth/signin`}>
            <Link
              bg={`gray.100`}
              color={`black`}
              rounded={6}
              textAlign="center"
              py={2}
              px={4}
              _hover={{ textDecoration: 'none', bg: 'gray.200' }}
            >
              サインイン
            </Link>
          </NL>
        </Stack>
      </Stack>
    </Flex>
  )
}
