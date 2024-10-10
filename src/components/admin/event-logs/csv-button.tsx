import React, { useRef, useState } from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import dayjs from 'dayjs'
import { CSVLink } from 'react-csv'
import { TiExport } from 'react-icons/ti'
import { useSession } from 'next-auth/react'
import { Threat } from '@/src/interfaces/sentinel-one/threat'
import { useSiteStore } from '@/src/stores/use-site-store'
import { EventLogsColumn } from '@/src/columns/event-logs.column'

export const EventLogCSVButton: React.FC<{
  squery?: string
  sorder?: string
}> = ({ squery, sorder }) => {
  const siteStore: any = useSiteStore()
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session, status }: any = useSession({
    required: true,
  })

  const [eventLogs, setEventLogs] = useState<Threat[]>([])
  const [fileDate, setFileDate] = useState<string>('')
  const csvExportRef = useRef<{ link: HTMLAnchorElement } | any>()

  const exportCSV = async () => {
    setLoading(true)

    try {
      const {
        data: { data: eventLogs },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/event-logs/csv?s=1&site=${
          siteStore.site.id
        }${squery ? `&squery=${squery}` : ``}${
          sorder ? `&sorder=${sorder}` : ``
        }`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      )

      console.log(eventLogs)

      setEventLogs(eventLogs)
      setFileDate(dayjs().format('YYYYMMDDhhmmss'))

      setTimeout(() => {
        csvExportRef?.current?.link?.click()
        setLoading(false)
      }, 2000)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <>
      <Stack align={`end`} spacing={6}>
        <Button
          isLoading={loading}
          onClick={exportCSV}
          variant="outline"
          color="white"
          border="1px"
          fontSize="14"
          size={`sm`}
          _hover={{ bg: 'gray.700' }}
          borderColor="gray.600"
        >
          <TiExport />
          <Text ml={1}>CSVエクスポート</Text>
        </Button>
        <Stack>
          <Text fontSize={12}>※ 1000件までのエクスポートが可能です</Text>
          <Text fontSize={12}>
            ※ 1000件を超える場合は、検索条件を絞ってから試してください
          </Text>
        </Stack>
      </Stack>

      <CSVLink
        filename={`${fileDate}-event-logs.csv`}
        data={eventLogs}
        headers={EventLogsColumn.map((column: any) => ({
          label: column.Header,
          key: column.accessor,
        }))}
        ref={csvExportRef}
      />
    </>
  )
}
