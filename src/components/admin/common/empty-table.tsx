import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

interface Column {
  accessor: string
  Header: string
}

interface Props {
  columns: Array<Column>
}

export const EmptryTable: React.FC<Props> = ({ columns }) => {
  return (
    <Table color="white" fontSize="13" variant="unstyled" size="md">
      <Thead border="1px" borderColor="gray.700">
        <Tr>
          {columns.map((column: Column, i: number) => (
            <Th key={i} color="gray.400">
              {column.Header}
            </Th>
          ))}
          <Th color="gray.400">コントロール</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr border="1px" borderColor="gray.700">
          <Td>該当するデータがありません</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
