import React from 'react'
import { Box, Link, Text, Flex, Tag } from '@chakra-ui/react'
import { SearchState } from '@/src/enums/search-state'
import { SearchBase } from '@/src/providers/search-base'

interface Props {
  setMSquery: any
  searchColumn: string
  setSearchColumn: React.Dispatch<React.SetStateAction<string>>
  setMSorder: any
  name: string
  columns: any
}

export const SearchColumns: React.FC = () => {
  return (
    <SearchBase.Consumer>
      {({ setSearchColumn, setSearchState, setInput, columns }) => (
        <>
          <Box color={`gray.100`} py={1} fontSize={12}>
            検索する項目を選んでください
          </Box>
          {columns
            .filter((col: any) => col.searchable)
            .map((col: any) => (
              <Link
                key={col.accessor}
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                onClick={() => {
                  setSearchColumn(col.accessor)
                  setSearchState(SearchState.COLUMN_SELECTED)
                  setInput(`${col.accessor}->`)
                }}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >
                    {col.accessor}
                  </Tag>
                  <Text>{col.Header}</Text>
                </Flex>
              </Link>
            ))}
        </>
      )}
    </SearchBase.Consumer>
  )
}
