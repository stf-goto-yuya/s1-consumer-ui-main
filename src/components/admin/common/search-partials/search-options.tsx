import React, { createContext, useState } from 'react'
import { Box, Link, Text, Flex, Tag } from '@chakra-ui/react'
import { SearchFilter } from '@/src/enums/search-filter'
import { SearchState } from '@/src/enums/search-state'
import { SearchBase } from '@/src/providers/search-base'

export const SearchOptions: React.FC = () => {
  return (
    <SearchBase.Consumer>
      {({ setInput, input, setSearchState, columns, searchColumn }) => {
        const clickOption = (value: string) => {
          setInput(`${input}${value}`)
          setSearchState(SearchState.OPTION_SELECTED)
        }

        const column = columns.filter(
          (col: any) => col.accessor === searchColumn,
        )[0]

        return (
          <>
            <Box color={`gray.100`} py={1} fontSize={12}>
              フィルタ
            </Box>
            {column.allowedOptions.includes(SearchFilter.EQUALS) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption(`equals->`)}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`equals->`}</Tag>
                  <Text>等しい</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(SearchFilter.NOT_EQUALS) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('not->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`not->`}</Tag>
                  <Text>ではない</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(SearchFilter.LESS_THAN) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('lt->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`lt->`}</Tag>
                  <Text>より少ない</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(
              SearchFilter.LESS_THAN_OR_EQUALS,
            ) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('lte->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`lte->`}</Tag>
                  <Text>以下</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(SearchFilter.GREATER_THAN) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('gt->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`gt->`}</Tag>
                  <Text>より多い</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(
              SearchFilter.GREATER_THAN_OR_EQUALS,
            ) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('gte->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`gte->`}</Tag>
                  <Text>以上</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(SearchFilter.STARTS_WITH) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('startsWith->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`startsWith->`}</Tag>
                  <Text>で始まる</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(SearchFilter.ENDS_WITH) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('endsWith->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`endsWith->`}</Tag>
                  <Text>で終わる</Text>
                </Flex>
              </Link>
            )}
            {column.allowedOptions.includes(SearchFilter.CONTAINS) && (
              <Link
                py={1}
                px={2}
                fontSize={12}
                rounded={`md`}
                color={`gray.100`}
                alignItems={`center`}
                _hover={{ bg: 'purple.200', color: 'purple.900' }}
                onClick={() => clickOption('contains->')}
              >
                <Flex alignItems={`center`}>
                  <Tag
                    bg={`gray.300`}
                    mr={2}
                    fontSize={11}
                    color={`gray.700`}
                    size={`sm`}
                  >{`contains->`}</Tag>
                  <Text>含む</Text>
                </Flex>
              </Link>
            )}
          </>
        )
      }}
    </SearchBase.Consumer>
  )
}
