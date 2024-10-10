import {
  Badge,
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Meta } from '@/src/components/meta'
import { MenuComponent } from '@/src/components/admin/menu-component'
import { useSiteStore } from '@/src/stores/use-site-store'

interface Props {
  children: ReactNode
  title?: string
  description?: string
  og?: {
    title?: string
    description?: string
    type?: string
    url?: string
    image?: string
    site_name?: string
    locale?: string
  }
  noIndex?: boolean
  noFollow?: boolean
}

export const AdminLayout: React.FC<Props> = ({
  children,
  title,
  description,
  og,
  noIndex,
  noFollow,
}) => {
  const siteStore: any = useSiteStore()

  return (
    <Box>
      <Meta
        title={title}
        description={description}
        og={og}
        noIndex={noIndex}
        noFollow={noFollow}
      />
      <Flex>
        <Flex
          bg="gray.900"
          width="400px"
          p="25px"
          direction="column"
          display={{ base: 'none', lg: 'flex' }}
        >
          <MenuComponent />
        </Flex>

        <Box as={`main`} bg="gray.800" width="100%" minH={`100vh`}>
          {siteStore.loading ? (
            <Box pt={8} px={8}>
              <Spinner />
            </Box>
          ) : (
            <Stack p={8}>
              <Stack
                color={`white`}
                direction={`row`}
                align={`center`}
                justify={`start`}
              >
                <Badge>{siteStore.site.id}</Badge>
                <Text>{siteStore.site.name}</Text>
              </Stack>
            </Stack>
          )}

          {children}
        </Box>
      </Flex>
    </Box>
  )
}
