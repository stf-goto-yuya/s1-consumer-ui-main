import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Layout } from '../../../../components/layout'
import { withRejectSignin } from '../../../../hocs/with-reject-signin'
import { REGEX_PASSWORD } from '../../../../utils/regex'
import { signIn } from 'next-auth/react'
import { passwordFormatValidation } from '@/src/validations/password-format.validation'

type Inputs = {
  newPassword: string
}

const ChangePassword: NextPage = () => {
  const toast = useToast()
  const router = useRouter()
  const { cuid, expires, hash, signature } = router.query
  const [verifying, setVerifying] = useState<boolean>(true)
  const [verified, setVerified] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  useEffect(() => {
    ;(async () => {
      if (cuid && expires && hash && signature) {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_HOST}/users/${cuid}/password-change-verify`,
            {
              expires,
              hash,
              signature,
            },
          )

          setVerifying(false)
          setVerified(true)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }
      }
    })()
  })

  const onSubmit = async (values: Inputs) => {
    try {
      const { status }: any = await axios.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/users/${cuid}/change-password`,
        {
          ...values,
          expires,
          hash,
          signature,
        },
      )

      if (status === 200) {
        setCompleted(true)
        signIn()
      }
    } catch (err: any) {
      const message = err?.response?.data?.message

      if (message && message === 'VERIFICATION_FAILED') {
        toast({
          title: 'エラー',
          description: '認証に失敗しました。期限が切れている可能性があります',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

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
            {process.env.SITE_NAME} パスワード変更
          </Heading>
          {completed ? (
            <Text>パスワードを変更しました</Text>
          ) : (
            <>
              {verifying ? (
                <Spinner />
              ) : (
                <>
                  {verified ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl
                        isInvalid={!!errors.newPassword}
                        w={{ base: `100%`, lg: `400px` }}
                        mb={4}
                      >
                        <FormLabel htmlFor="newPassword">
                          新しいパスワード
                        </FormLabel>
                        <Input
                          type="password"
                          placeholder="新しいパスワード"
                          _placeholder={{ color: 'white' }}
                          {...register('newPassword', {
                            required: '必須入力です',
                            pattern: passwordFormatValidation,
                          })}
                        />
                        <FormErrorMessage>
                          {errors.newPassword && errors.newPassword.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Button
                        mt={4}
                        size={`sm`}
                        colorScheme="teal"
                        _hover={{ opacity: 0.8 }}
                        isLoading={isSubmitting}
                        type="submit"
                      >
                        変更
                      </Button>
                    </form>
                  ) : (
                    <Text>
                      認証に失敗しました。期限が切れている可能性があります
                    </Text>
                  )}
                </>
              )}
            </>
          )}
        </Stack>
      </Flex>
    </>
  )
}

export default withRejectSignin(ChangePassword)
