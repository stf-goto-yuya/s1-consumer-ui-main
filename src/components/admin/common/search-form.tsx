import React, { ReactNode, useEffect, useState } from 'react'
import {
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  useOutsideClick,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { SearchState } from '@/src/enums/search-state'
import { SearchBase } from '@/src/providers/search-base'
import { SearchColumns } from '@/src/components/admin/common/search-partials/search-columns'
import { SearchOptions } from '@/src/components/admin/common/search-partials/search-options'
import { InputValue } from '@/src/components/admin/common/search-partials/input-value'
import { SearchFormWrapper } from '@/src/components/admin/common/search-partials/search-form-wrapper'

interface Props {
  setMSquery: any
  searchColumn: string
  setSearchColumn: React.Dispatch<React.SetStateAction<string>>
  setMSorder: any
  columns: any
  children: ReactNode
}

export const SearchForm: React.FC<Props> = ({
  searchColumn,
  setSearchColumn,
  setMSquery,
  setMSorder,
  columns,
  children,
}) => {
  const router = useRouter()
  const { squery, sorder } = router.query
  const ref: any = React.useRef()
  const [input, setInput] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [focusing, setFocusing] = useState<boolean>(false)
  const [searchState, setSearchState] = useState<SearchState>(
    SearchState.INITIAL,
  )

  useOutsideClick({
    ref: ref,
    handler: () => setFocusing(false),
  })

  const handleOrder = async (ev: any) => {
    setMSorder(ev.target.value)
    router.replace(
      `?s=1${squery ? `&squery=${squery}` : ''}&sorder=${ev.target.value}`,
    )
  }

  const handleSearch = async () => {
    setMSquery(`${input}${keyword}`)
    setFocusing(false)

    return `${input}${keyword}`
      ? router.replace(
          `?s=1&squery=${input}${keyword}${sorder ? `&sorder=${sorder}` : ''}`,
        )
      : router.replace(`?s=1${sorder ? `&sorder=${sorder}` : ''}`)
  }

  useEffect(() => {
    if (squery) {
      const q: any = squery
      const [column, option, value] = q?.split('->')
      setSearchState(SearchState.OPTION_SELECTED)
      setInput(`${column}->${option}->`)
      setKeyword(value)
      setSearchColumn(column)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squery])

  return (
    <SearchBase.Provider
      value={{
        setMSquery,
        setSearchColumn,
        setSearchState,
        setInput,
        input,
        setKeyword,
        keyword,
        columns,
        searchColumn,
        handleSearch,
        handleOrder,
        sorder,
      }}
    >
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={4}>
        <Stack position="relative" ref={ref}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon w={4} h={4} mt={-2} color="gray.300" />}
            />
            <Input
              type="text"
              size={`sm`}
              border="1px"
              readOnly
              fontSize="12"
              borderColor="gray.600"
              w={{ base: '100%', lg: `400px` }}
              color="white"
              placeholder="フィルタ"
              rounded={5}
              value={`${input}${keyword}`}
              onFocus={() => {
                setFocusing(true)
              }}
            />
          </InputGroup>
          {focusing && (
            <SearchFormWrapper>
              {searchState === SearchState.INITIAL && <SearchColumns />}
              {searchState === SearchState.COLUMN_SELECTED && <SearchOptions />}
              {searchState === SearchState.OPTION_SELECTED && <InputValue />}
            </SearchFormWrapper>
          )}
        </Stack>
        {children}
      </Stack>
    </SearchBase.Provider>
  )
}
