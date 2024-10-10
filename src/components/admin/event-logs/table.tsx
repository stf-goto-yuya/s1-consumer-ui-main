import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Link,
  Badge,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'

interface Props {
  columns: any
  data: any[]
}

export const EventLogTable: React.FC<Props> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <Table
      {...getTableProps()}
      color="white"
      fontSize="13"
      variant="unstyled"
      w={{ base: '100%', lg: `100%` }}
      size="md"
    >
      <Thead border="1px" borderColor="gray.700">
        {headerGroups.map((headerGroup: any, i) => {
          return (
            <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, i: number) => {
                return (
                  <Th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                    color="gray.400"
                    whiteSpace={`nowrap`}
                  >
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                )
              })}
            </Tr>
          )
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any, i) => {
          prepareRow(row)

          const name = row.cells.filter(
            (cell: any) => cell.column.id === 'name',
          )

          return (
            <Tr
              key={i}
              {...row.getRowProps()}
              border="1px"
              borderColor="gray.700"
              _hover={{ bg: 'blue.800' }}
            >
              {row.cells.map((cell: any, i: number) => {
                return (
                  <Td
                    key={i}
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.column.id === 'condos' ? (
                      <Link
                        href={`/admin/condos?squery=Area.name->equals->${name[0].value}`}
                        color={`blue.300`}
                      >
                        {cell.render('Cell')}
                      </Link>
                    ) : cell.column.id ===
                      'threatInfo.incidentStatusDescription' ? (
                      <Badge
                        colorScheme={
                          cell.value === 'Resolved' ? 'green' : 'yellow'
                        }
                      >
                        {cell.render('Cell')}
                      </Badge>
                    ) : cell.column.id ===
                      'threatInfo.mitigationStatusDescription' ? (
                      <Badge
                        colorScheme={
                          cell.value === 'Mitigated' ? 'green' : 'yellow'
                        }
                      >
                        {cell.render('Cell')}
                      </Badge>
                    ) : (
                      <>{cell.render('Cell')}</>
                    )}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
