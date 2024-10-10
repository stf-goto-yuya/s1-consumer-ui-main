import { useSiteStore } from '@/src/stores/use-site-store'
import {
  Badge,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
  Input,
  Box,
} from '@chakra-ui/react'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { AiFillDelete } from 'react-icons/ai'
import { useSWRConfig } from 'swr'

export const EmailCreateModal = () => {
  const { mutate } = useSWRConfig()
  const [opening, setOpening] = useState<boolean>(false)
  const [admin, setAdmin] = useState<any>(null)
  const siteStore: any = useSiteStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'emails', // unique name for your Field Array
    },
  )

  const handleOpenModal = async () => {
    onOpen()
  }

  const onSubmit = async (data: any) => {
    const { emails } = data
    const newEmails = emails.map(({ value }: any) => value).join(',')

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/administrators`,
        {
          siteId: siteStore.site.id,
          email: newEmails,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )

      mutate(
        [
          `${process.env.NEXT_PUBLIC_API_HOST}/administrators/site_id/${siteStore.site.id}`,
          session.accessToken,
        ],
        false,
      )

      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button
        isLoading={opening}
        size={`sm`}
        colorScheme="teal"
        onClick={handleOpenModal}
      >
        通知先メールアドレスを設定する
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as={`form`} onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>通知先メールアドレス変更</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack align={`start`} spacing={4} mb={4}>
                <Heading fontSize={16}>サイトID</Heading>
                <Badge>{siteStore.site.id}</Badge>
              </Stack>
              <Stack mb={6}>
                {fields.map((field: any, i: number) => (
                  <Stack key={i} direction={`row`}>
                    <Input
                      size={`sm`}
                      border={`2px`}
                      _focus={{
                        borderColor: !!(errors as any)?.emails?.[i]?.value
                          ? `red.500`
                          : 'teal.500',
                      }}
                      borderColor={
                        !!(errors as any)?.emails?.[i]?.value
                          ? `red.500`
                          : 'gray.100'
                      }
                      {...register(`emails.${i}.value`, { required: true })}
                    />
                    <Button
                      colorScheme="pink"
                      size={`sm`}
                      p={0}
                      onClick={() => remove(i)}
                    >
                      <AiFillDelete size={20} />
                    </Button>
                  </Stack>
                ))}
              </Stack>
              <Button
                size={`sm`}
                colorScheme="teal"
                onClick={() => append({ value: '' })}
              >
                追加
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button type={`submit`} size={`sm`} colorScheme="blue" mr={3}>
                設定
              </Button>
              <Button size={`sm`} onClick={onClose}>
                キャンセル
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
