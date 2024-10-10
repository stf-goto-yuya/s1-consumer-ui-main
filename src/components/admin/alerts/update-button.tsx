import React, { useCallback } from 'react'
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { TiEdit } from 'react-icons/ti'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

type FormData = {
  name: string
}

interface Props {
  id: string
}

export const AlertUpdateButton: React.FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session, status }: any = useSession({
    required: true,
  })
  const toast = useToast()
  const firstField = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({ mode: 'onBlur' })

  const getTargetArea = useCallback(async (id: string) => {
    const {
      data: { area },
    } = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/areas/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })

    setValue('name', area.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: FormData) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/areas/${id}`,
        {
          name: values.name,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      )

      if (res.status) {
        toast({
          title: '正常に更新されました',
          description: '正常に更新されました',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        reset()
        onClose()
      }
    } catch (err: any) {
      toast({
        title: '更新できませんでした',
        description: err.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button
        bg="orange.700"
        mr="10px"
        p={1}
        size={`sm`}
        onClick={async () => {
          await getTargetArea(id)
          onOpen()
        }}
        _hover={{ bg: 'orange.600' }}
      >
        <TiEdit size="20" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={`lg`}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={`white`} />
          <DrawerHeader
            borderBottomWidth="1px"
            bg="gray.900"
            border={0}
            color={`white`}
          >
            エリア情報更新
          </DrawerHeader>

          <DrawerBody pt="40px" bg="gray.900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name ? true : false}>
                <FormLabel htmlFor="name" color={`gray.400`}>
                  エリア名
                </FormLabel>
                <Input
                  id="name"
                  placeholder="name"
                  size="sm"
                  color={`white`}
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={8}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                送信
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
