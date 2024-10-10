import { Heading } from '@chakra-ui/layout'
import { Box, Flex, Spacer, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { AdminLayout } from '@/src/components/admin/layout'
import { fetcher } from '@/src/utils/fetcher'
import { useRouter } from 'next/router'
import Pagination from '@/src/components/admin/pagination'
import { EventLogCSVButton } from '@/src/components/admin/event-logs/csv-button'
import { SmMenu } from '@/src/components/admin/sm-menu'
import { Threat } from '@/src/interfaces/sentinel-one/threat'
import { SearchForm } from '../../components/admin/common/search-form'
import { LoadingTable } from '@/src/components/admin/common/loading-table'
import { EmptryTable } from '@/src/components/admin/common/empty-table'
import { EventLogTable } from '@/src/components/admin/event-logs/table'
// import { AlertMakeOrderBox } from '@/src/components/admin/alerts/make-order-box'
import { withMiddleware } from '@/src/hocs/with-middleware'
import { useSiteStore } from '@/src/stores/use-site-store'
import { EventLogsColumn } from '@/src/columns/event-logs.column'
import { EventLog } from '@/src/interfaces/event-log'
import { DEFAULT_DATE_FORMAT } from '@/src/constants/date'

const EventLogs: NextPage = () => {
  let timer: any = 0
  const PER_PAGE = 10
  const router = useRouter()
  const siteStore: any = useSiteStore()
  const [tableWidth, setTableWidth] = useState<number>(0)
  const { page, squery, sorder } = router.query
  const [mPage, setMPage] = useState<number>(page ? Number(page) : 1)
  const [searchColumn, setSearchColumn] = useState<string>('')
  const [mSquery, setMSquery] = useState<string>(squery ? String(squery) : '')
  const [mSorder, setMSorder] = useState<string>(sorder ? String(sorder) : '')

  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  useEffect(() => {
    setTableWidth(window.innerWidth)
  }, [])

  useLayoutEffect(() => {
    window.onresize = resizeHandler
  })

  const resizeHandler = () => {
    if (timer > 0) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      setTableWidth(window.innerWidth)
    }, 200)
  }

  const currentPage: number = mPage ? Number(mPage) : 1
  const skip = (currentPage - 1) * Number(PER_PAGE)

  const { data } = useSWR<any>(
    session && siteStore?.site?.id
      ? [
          `${
            process.env.NEXT_PUBLIC_API_HOST
          }/event-logs?take=${PER_PAGE}&skip=${skip}&site=${
            siteStore.site.id
          }&squery=siteId->equals->${siteStore.site.id}${
            mSquery ? `&squery=${mSquery}` : ''
          }${mSorder ? `&sorder=${mSorder}` : ''}`,
          session.accessToken,
        ]
      : null,
    fetcher,
  )

  const { data: eventLogs, total } = data ? data : { data: [], total: 0 }

  const columns: any = React.useMemo(() => EventLogsColumn, [])

  return (
    <AdminLayout title={`イベントログ`} noIndex noFollow>
      <Box p={{ base: 4, lg: 10 }} color={`white`}>
        <Flex alignItems="center">
          <SmMenu />
          <Heading
            as={`h2`}
            fontSize={{ base: '16', lg: '24' }}
            fontWeight="bold"
            color={`white`}
          >
            イベントログ
          </Heading>
        </Flex>
        <Flex mt="25px" mb="30px" flexDirection={{ base: 'column', lg: 'row' }}>
          <SearchForm
            setMSquery={setMSquery}
            setMSorder={setMSorder}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columns={columns}
          >
            {/* <AlertMakeOrderBox /> */}
          </SearchForm>
          <Spacer my={{ base: 4, lg: 0 }} />
          <Stack direction="row" spacing={4}>
            <EventLogCSVButton squery={mSquery} sorder={mSorder} />
          </Stack>
        </Flex>
        {!data ? (
          <LoadingTable
            columns={columns.filter((column: any) => !column.onlyCsv)}
          />
        ) : (
          <>
            {eventLogs.length === 0 ? (
              <EmptryTable
                columns={columns.filter((column: any) => !column.onlyCsv)}
              />
            ) : (
              <Box
                overflow={{ base: 'scroll', lg: 'scroll' }}
                w={{ base: '100%', lg: `${tableWidth - 440}px` }}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '2px',
                    height: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#2d3748',
                    borderRadius: '24px',
                  },
                }}
              >
                <EventLogTable
                  columns={columns.filter((column: any) => !column.onlyCsv)}
                  data={eventLogs.map((eventLog: EventLog) => ({
                    ...eventLog,
                    created: dayjs(eventLog.created).format(
                      DEFAULT_DATE_FORMAT,
                    ),
                  }))}
                />
              </Box>
            )}
          </>
        )}
        <Pagination
          fetching={!data}
          currentPage={currentPage}
          pages={Math.ceil(total / Number(PER_PAGE))}
          setMPage={setMPage}
          total={total || 0}
          perPage={PER_PAGE}
        />
      </Box>
    </AdminLayout>
  )
}

export default withMiddleware(EventLogs)
