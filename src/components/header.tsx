import { Box } from '@chakra-ui/layout'
import { Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useSiteStore } from '@/src/stores/use-site-store'

export const Header = () => {
  const siteStore: any = useSiteStore()

  return (
    <Box>
      <Heading>layout2</Heading>
    </Box>
  )
}
