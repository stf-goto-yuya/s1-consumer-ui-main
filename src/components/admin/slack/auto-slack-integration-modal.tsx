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

export const AutoSlackIntegrationModal = () => {
  const { mutate } = useSWRConfig()
  const siteStore: any = useSiteStore()

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const onHandleIntegration = async () => {
    try {
      const {
        data: { channelId },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_SLACK_API_ENDPOINT}/conversations`,
        {
          name: siteStore.site.name.toLowerCase().split(' ').join('-'),
          is_private: false,
          inviting_users: process.env.NEXT_PUBLIC_INITIAL_ADMINS,
        },
      )

      if (channelId) {
        const {
          data: { data },
        } = await axios.post(
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
      } else {
        alert('既にSlackルームがあります')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button size={`sm`} colorScheme="teal" onClick={onHandleIntegration}>
        自動でSlackチャネルと連携する
      </Button>
    </>
  )
}
