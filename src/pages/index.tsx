import { useSession, signIn } from 'next-auth/react'
import { Spinner, Stack } from '@chakra-ui/react'
import { AdminLayout } from '@/src/components/admin/layout'
import { withMiddleware } from '@/src/hocs/with-middleware'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (!session) return null

  return (
    <AdminLayout>
      <Stack spacing={6} p={8}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Stack>
    </AdminLayout>
  )
}

export default withMiddleware(Home)
