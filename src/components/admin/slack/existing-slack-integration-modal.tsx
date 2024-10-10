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
  Input,
  Box,
} from '@chakra-ui/react'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'

export const ExistingSlackIntegrationModal = () => {
  const { mutate } = useSWRConfig()
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

  const handleOpenModal = async () => {
    onOpen()
  }

  const onSubmit = async (data: any) => {
    const { channelId } = data

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/chat-agents`,
        {
          siteId: siteStore.site.id,
          providerName: 'SLACK',
          providerEndpoint: channelId,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )

      mutate(
        [
          `${process.env.NEXT_PUBLIC_API_HOST}/chat-agents/site_id/${siteStore.site.id}/provider/SLACK`,
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
        size={`sm`}
        colorScheme="gray"
        color={`black`}
        onClick={handleOpenModal}
      >
        既存のSlackチャネルと連携する
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as={`form`} onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>既存のSlackチャネルと連携</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack align={`start`} spacing={4} mb={4}>
                <Heading fontSize={16}>サイトID</Heading>
                <Badge>{siteStore.site.id}</Badge>
              </Stack>
              <Stack mb={6}>
                <Input
                  size={`sm`}
                  placeholder="SlackチャネルIDを入力してください"
                  {...register(`channelId`, { required: true })}
                />
              </Stack>
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
