import { Heading } from '@chakra-ui/layout'
import { Box, Flex, Stack, Badge } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { AdminLayout } from '@/src/components/admin/layout'
import { useRouter } from 'next/router'
import { SmMenu } from '@/src/components/admin/sm-menu'
import { withMiddleware } from '@/src/hocs/with-middleware'
import { useSiteStore } from '@/src/stores/use-site-store'

const Alerts: NextPage = () => {
  const router = useRouter()

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  return (
    <AdminLayout title={`ダッシュボード`} noIndex noFollow>
      <Box p={{ base: 4, lg: 10 }} color={`white`}>
        <Stack spacing={8} align={`start`}>
          <SmMenu />
          <Heading
            as={`h2`}
            fontSize={{ base: '16', lg: '24' }}
            fontWeight="bold"
            color={`white`}
          >
            ダッシュボード
          </Heading>
          <Badge size={`lg`}>Coming Soon</Badge>
        </Stack>
      </Box>
    </AdminLayout>
  )
}

export default withMiddleware(Alerts)
