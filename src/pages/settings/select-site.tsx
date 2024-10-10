import { useSession, signIn } from 'next-auth/react'
import { Box, Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSiteStore } from '@/src/stores/use-site-store'
import { useState } from 'react'
import { AdminLayout } from '@/src/components/admin/layout'
import axios from 'axios'

export default function SelectSite() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const siteStore: any = useSiteStore()

  const {
    data: session,
    status,
    update,
  }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const setSelectedSiteIntoSession = async (site: string) => {
    setLoading(true)

    await update({ selectSite: site })
    await update()
    const fetched = await siteStore.fetch(site)

    console.log('fetched', fetched)

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/event-logs`,
      {
        eventId: 'SIGN_INTO_A_SITE',
        description: `サイト(${fetched.name})にログインしました`,
        siteId: fetched.id,
        userId: session.id,
      },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    )

    setLoading(false)
    router.push('/')
  }

  console.log(session)

  if (!session) return null

  return (
    <AdminLayout title={`表示サイト変更`} noIndex noFollow>
      <Stack spacing={6} py={12} px={8}>
        <Heading
          fontWeight={`normal`}
          fontSize={20}
          letterSpacing={1.8}
          color={`white`}
        >
          表示するサイトを選択してください
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
          {session?.sentinelOne?.siteRoles && session.sentinelOne.siteRoles.map((site: any) => {
            return (
              <Button
                size={`sm`}
                variant={`unstyled`}
                bg={`teal.600`}
                isLoading={loading}
                key={site.id}
                colorScheme="teal"
                whiteSpace={`unset`}
                px={8}
                minH={`50px`}
                onClick={() => setSelectedSiteIntoSession(site.id)}
              >
                <Text textAlign={`start`} overflowWrap={`break-word`}>
                  {site.name} ({site.roleName})
                </Text>
              </Button>
            )
          })}
        </SimpleGrid>
      </Stack>
    </AdminLayout>
  )
}
