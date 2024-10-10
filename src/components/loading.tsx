import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'
import React from 'react'

export const Loading = () => {
  return (
    <Flex
      h={`100vh`}
      justifyContent="center"
      alignItems="center"
      bg={`gray.900`}
    >
      <Spinner size={`lg`} />
    </Flex>
  )
}
