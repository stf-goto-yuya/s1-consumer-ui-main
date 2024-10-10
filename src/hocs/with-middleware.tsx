import React, { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Loading } from '@/src/components/loading'
import { useSiteStore } from '@/src/stores/use-site-store'

export const withMiddleware = (Component: NextPage) => {
  return function WrappedComponent(): ReactNode {
    const siteStore: any = useSiteStore()
    const router = useRouter()
    const { data: session, status }: any = useSession({
      required: false,
    })

    useEffect(() => {
      if (session && session.selectSite && !siteStore.site) {
        siteStore.fetch(session.selectSite)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    if (status === 'loading') return <Loading />
    if (status === 'authenticated') {
      if (!session.selectSite) {
        router.push('/settings/select-site')
      }
    }

    return <Component />
  }
}
