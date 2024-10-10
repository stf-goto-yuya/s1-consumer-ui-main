import { Button, useToast } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useSiteStore } from '@/src/stores/use-site-store'
import { sendEmailNotification } from '@/src/utils/email'
import axios from 'axios'

export const SendTextSlackNotificationButton = ({ channelId }: any) => {
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

    await axios.post(
      `${process.env.NEXT_PUBLIC_SLACK_API_ENDPOINT}/sendThreat`,
      {
        threatName: 'ダミーちゃん2',
        threatLevel: 7,
        pcName: 'ダミーちゃんのPC',
        directory: 'ダミーちゃんのファイルパス',
        virusTotalLink:
          'https://www.virustotal.com/latest-scan/3395856ce81f2b7382dee72602f798b642f14140',
        status: 'mitigated',
        conversationId: channelId,
        adminURL:
          'https://apne1-1001.sentinelone.net/incidents/threats/1093047526137786210/overview',
        engines: ['pre_execution'],
        siteName: 'ダミーちゃんのサイト',
        initiatedBy: 'agentPolicy',
        classification: 'Malware',
        score: '64/67',
        fileHash: '3395856ce81f2b7382dee72602f798b642f14140',
      },
    )

    setSending(false)
  }

  return (
    <Button
      isLoading={sending}
      size={`sm`}
      colorScheme="gray"
      onClick={sendTestMail}
    >
      SLACK通知テスト
    </Button>
  )
}
