import { Heading } from '@chakra-ui/layout'
import { Box, Text, Stack, Badge, Button, Spinner } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { AdminLayout } from '@/src/components/admin/layout'
import { useRouter } from 'next/router'
import { SmMenu } from '@/src/components/admin/sm-menu'
import { withMiddleware } from '@/src/hocs/with-middleware'
import { useSiteStore } from '@/src/stores/use-site-store'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '@/src/utils/fetcher'
import { SendTextMailButton } from '@/src/components/admin/emails/send-test-mail-button'
import { EmailUpdateModal } from '@/src/components/admin/emails/email-update-modal'
import axios from 'axios'
import { EmailCreateModal } from '@/src/components/admin/emails/email-create-modal'

const SettingMailNotification: NextPage = () => {
  const { mutate } = useSWRConfig()
  const siteStore: any = useSiteStore()

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const { data, isLoading } = useSWR<any>(
    session && siteStore?.site?.id
      ? [
          `${process.env.NEXT_PUBLIC_API_HOST}/administrators/site_id/${siteStore.site.id}`,
          session.accessToken,
        ]
      : null,
    fetcher,
  )

  const { data: admin } = data ? data : { data: null }

  const deleteMailSetting = async () => {
    if (confirm('メールアラート設定を削除しますか？')) {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_HOST}/administrators/${admin._id}`,
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
    }
  }

  return (
    <AdminLayout title={`メールアラート設定`} noIndex noFollow>
      <Box p={{ base: 4, lg: 10 }} color={`white`}>
        <Stack spacing={8} align={`start`} mb={8}>
          <SmMenu />
          <Heading
            as={`h2`}
            fontSize={{ base: '16', lg: '24' }}
            fontWeight="bold"
            color={`white`}
          >
            メールアラート設定
          </Heading>
          {siteStore?.site?.id ? (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  {admin ? (
                    <>
                      <Stack spacing={8} align={`start`}>
                        <Stack spacing={4}>
                          <Heading fontSize={16}>サイトID</Heading>
                          <Badge>{admin.siteId}</Badge>
                        </Stack>
                        <Stack spacing={2}>
                          <Text>通知先メールアドレス</Text>
                          <Stack spacing={3}>
                            {admin.email.split(',').map((email: string) => (
                              <Badge key={email} textTransform={`lowercase`}>
                                {email}
                              </Badge>
                            ))}
                          </Stack>
                        </Stack>

                        <Stack direction={`row`}>
                          <EmailUpdateModal />
                          <SendTextMailButton />
                        </Stack>
                      </Stack>
                      <Button
                        size={`sm`}
                        colorScheme="pink"
                        onClick={deleteMailSetting}
                      >
                        メールアラート設定削除
                      </Button>
                    </>
                  ) : (
                    <>
                      <Text>メールアラート設定がありません</Text>
                      <EmailCreateModal />
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

export default withMiddleware(SettingMailNotification)
