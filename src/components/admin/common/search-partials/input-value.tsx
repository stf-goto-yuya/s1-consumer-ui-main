import React, { useState } from 'react'
import { Stack, Input, Box, Button } from '@chakra-ui/react'
import { SearchState } from '../../../../enums/search-state'
import { SearchBase } from '../../../../providers/search-base'
import { useRouter } from 'next/router'
import 'react-day-picker/dist/style.css'
import dayjs from 'dayjs'
import { SelectedCategories } from './selected/categories'
import { PublishedRadio } from './selected/published'
import { RoleRadio } from './selected/role'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export const InputValue: React.FC = () => {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState(new Date())

  return (
    <SearchBase.Consumer>
      {({
        setInput,
        setSearchState,
        handleSearch,
        setKeyword,
        keyword,
        setMSquery,
        sorder,
        columns,
        searchColumn,
      }) => {
        const column = columns.filter(
          (col: any) => col.accessor === searchColumn,
        )[0]

        const handleDayClick = (date: any) => {
          setSelectedDay(date)
          setKeyword(dayjs(date).format('YYYY-MM-DD'))
        }

        return (
          <>
            <Box color={`gray.100`} py={2} pb={3} fontSize={12}>
              検索キーワード
            </Box>
            {column && (
              <>
                {column.type === 'text' && column.accessor !== 'role' && (
                  <Input
                    bg={`gray.700`}
                    placeholder={`検索キーワードを入力してください`}
                    size={`xs`}
                    color={`white`}
                    value={keyword}
                    onChange={(e: any) => {
                      setKeyword(e.target.value)
                    }}
                    _placeholder={{ color: 'gray.300' }}
                  />
                )}
                {column.type === 'date' && (
                  <Box
                    color={`black`}
                    fontSize={14}
                    bg={`white`}
                    w={`200px`}
                    p={2}
                    rounded={6}
                  >
                    <DatePicker
                      selected={selectedDay}
                      onChange={handleDayClick}
                    />
                  </Box>
                )}
                {column.type === 'selected' &&
                  column.accessor === 'categories' && (
                    <SelectedCategories
                      keyword={keyword}
                      setKeyword={setKeyword}
                    />
                  )}
                {column.type === 'boolean' &&
                  column.accessor ===
                    'threatInfo.incidentStatusDescription' && (
                    <PublishedRadio keyword={keyword} setKeyword={setKeyword} />
                  )}
                {column.type === 'text' && column.accessor === 'role' && (
                  <RoleRadio keyword={keyword} setKeyword={setKeyword} />
                )}
              </>
            )}

            <Stack direction="row" pt={2}>
              <Button size={`xs`} colorScheme={`blue`} onClick={handleSearch}>
                検索
              </Button>
              <Button
                size={`xs`}
                colorScheme={`orange`}
                onClick={() => {
                  setInput('')
                  setKeyword('')
                  setMSquery('')
                  setSearchState(SearchState.INITIAL)
                  router.replace(`?s=1${sorder ? `&sorder=${sorder}` : ``}`)
                }}
              >
                条件クリア
              </Button>
            </Stack>
          </>
        )
      }}
    </SearchBase.Consumer>
  )
}
