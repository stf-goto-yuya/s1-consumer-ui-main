import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export type SignupForm = {
  email: string
}

type Props = {
  onSubmit: any
}

export default function SsoMailResend({ onSubmit }: Props) {
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
      <Stack spacing={6} align={`start`} color={`white`}>
        <Heading fontSize={24}>S1 Portal UI</Heading>
        <Text fontWeight={`normal`} fontSize={16}>
          既にメールアドレス宛に、認証メールをお送りしています
        </Text>
        <Text fontWeight={`normal`} fontSize={16}>
          再送しますか？
        </Text>
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            サインアップ
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
