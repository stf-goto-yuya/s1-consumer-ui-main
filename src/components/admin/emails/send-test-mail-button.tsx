import { Button, useToast } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useSiteStore } from '@/src/stores/use-site-store'
import { sendEmailNotification } from '@/src/utils/email'

export const SendTextMailButton = () => {
  const toast = useToast()
  const [sending, setSending] = useState<boolean>(false)
  const siteStore: any = useSiteStore()

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const sendTestMail = async () => {
    setSending(true)

    const {
      data: { message },
    }: any = await sendEmailNotification(
      'hirosige1@gmail.com',
      {
        fileContentHash: '3395856ce81f2b7382dee72602f798b642f14140',
        fileSha256: '3395856ce81f2b7382dee72602f798b642f14140',
        agentComputerName: 'dmae3-mbp14',
        rank: 2,
        threatName: 'eicar.com',
        filePath: '/Users/dmae3/.Trash/eicar.com',
        mitigationStatus: 'mitigated',
        id: '1578738163391957740',
        engines: ['On-Write DFI'],
        siteName: 'TTM-test',
        initiatedBy: 'agent_policy',
        classification: 'Malware',
        siteId: siteStore.site.id,
      },
      session.accessToken,
    )

    if (message === 'SUCCESS') {
      toast({
        title: 'メール送信テスト',
        description: '正常にメールが送信されました',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'メール送信テスト',
        description: 'メール送信に失敗しました',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }

    setSending(false)
  }

  return (
    <Button
      isLoading={sending}
      size={`sm`}
      colorScheme="gray"
      onClick={sendTestMail}
    >
      メール送信テスト
    </Button>
  )
}
