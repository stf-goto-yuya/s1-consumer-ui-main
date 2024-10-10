import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Skeleton } from '@chakra-ui/react'

interface Column {
  accessor: string
  Header: string
}

interface Props {
  columns: Array<Column>
}

export const LoadingTable: React.FC<Props> = ({ columns }) => {
  return (
    <Table color="white" fontSize="13" variant="unstyled" size="md">
      <Thead border="1px" borderColor="gray.700">
        <Tr>
          {columns.map((column, i) => (
            <Th key={i} color="gray.400">
              {column.Header}
            </Th>
          ))}
          <Th color="gray.400">Control</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[...Array.from({ length: 10 })].map((_, i) => (
          <Tr key={i} border="1px" borderColor="gray.700">
            {columns.map((_, i) => (
              <Td key={i}>
                <Skeleton height="40px" w={`100%`} />
              </Td>
            ))}
            <Td>
              <Skeleton height="40px" w={`100%`} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
