import { Heading } from '@chakra-ui/layout'
import { Box, Text, Stack, Badge, Spinner, Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { AdminLayout } from '@/src/components/admin/layout'
import { useRouter } from 'next/router'
import { SmMenu } from '@/src/components/admin/sm-menu'
import { withMiddleware } from '@/src/hocs/with-middleware'
import { useSiteStore } from '@/src/stores/use-site-store'
import { fetcher } from '@/src/utils/fetcher'
import useSWR from 'swr'
import { SendTextSlackNotificationButton } from '@/src/components/admin/slack/send-test-slack-notification-button'
import axios from 'axios'
import { ExistingSlackIntegrationModal } from '@/src/components/admin/slack/existing-slack-integration-modal'
import { AutoSlackIntegrationModal } from '@/src/components/admin/slack/auto-slack-integration-modal'

const SettingSlackNotification: NextPage = () => {
  const router = useRouter()
  const siteStore: any = useSiteStore()

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const { data, isLoading, mutate } = useSWR<any>(
    session && siteStore?.site?.id
      ? [
          `${process.env.NEXT_PUBLIC_API_HOST}/chat-agents/site_id/${siteStore?.site?.id}/provider/SLACK`,
          session.accessToken,
        ]
      : null,
    fetcher,
  )

  const { data: slackInfo } = data ? data : { data: null }

  const deleteSlackIntegration = async () => {
    if (confirm('SLACKアラート設定を削除しますか？')) {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_HOST}/chat-agents/${slackInfo._id}`,
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
    }
  }

  return (
    <AdminLayout title={`SLACKアラート設定`} noIndex noFollow>
      <Box p={{ base: 4, lg: 10 }} color={`white`}>
        <Stack spacing={8} align={`start`}>
          <SmMenu />
          <Heading
            as={`h2`}
            fontSize={{ base: '16', lg: '24' }}
            fontWeight="bold"
            color={`white`}
          >
            SLACKアラート設定
          </Heading>
          {siteStore?.site?.id ? (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  {slackInfo ? (
                    <>
                      <Stack spacing={8} align={`start`}>
                        <Stack spacing={4}>
                          <Heading fontSize={16}>サイトID</Heading>
                          <Badge>{slackInfo.siteId}</Badge>
                        </Stack>
                        <Stack spacing={4} align={`start`}>
                          <Heading fontSize={16}>SLACKチャネルID</Heading>
                          <Badge>{slackInfo.providerEndpoint}</Badge>
                        </Stack>
                        <Stack direction={`row`}>
                          <SendTextSlackNotificationButton
                            channelId={slackInfo.providerEndpoint}
                          />
                        </Stack>
                      </Stack>
                      <Button
                        size={`sm`}
                        colorScheme="pink"
                        onClick={deleteSlackIntegration}
                      >
                        SLACK連携解除
                      </Button>
                    </>
                  ) : (
                    <>
                      <Stack spacing={6}>
                        <Text>SLACKアラート設定がありません</Text>
                        <Stack direction={`row`}>
                          <ExistingSlackIntegrationModal />
                          <AutoSlackIntegrationModal />
                        </Stack>
                      </Stack>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </Stack>
      </Box>
    </AdminLayout>
  )
}

export default withMiddleware(SettingSlackNotification)
