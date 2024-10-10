import React, { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Loading } from '@/src/components/loading'

export const withRejectSignin = (Component: NextPage) => {
  return function WrappedComponent(): ReactNode {
    const router = useRouter()
    const { data: session, status } = useSession({
      required: false,
    })

    if (status === 'loading') return <Loading />
    if (status === 'unauthenticated') return <Component />
    if (status === 'authenticated') {
      router.push('/')
    }

    return <Loading />
  }
}
