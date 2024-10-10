import { Box } from '@chakra-ui/layout'
import {
  Text,
  HStack,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import NL from 'next/link'
import React from 'react'
import { FiUser } from 'react-icons/fi'
import { useSiteStore } from '@/src/stores/use-site-store'

export const Layout = ({ children }: any) => {
  const router = useRouter()
  const siteStore: any = useSiteStore()

  return (
    <>
      <HStack spacing={0} h={`100vh`}>
        <Stack bg={`gray.900`} color={`white`} minW={`20vw`} h={`100vh`}>
          <Stack
            justify={`center`}
            h={`6vh`}
            bg={`gray.900`}
            px={8}
            borderBottom={`1px`}
            borderColor={`gray.800`}
          >
            <Heading fontWeight={`normal`} fontSize={24}>
              S1 Portal Console
            </Heading>
          </Stack>
          {siteStore.loading ? (
            <Box p={8}>
              <Spinner />
            </Box>
          ) : (
            <Stack h={`94vh`} overflowY={`auto`} spacing={0}>
              <NL href={`/`}>
                <Link>
                  <Stack h={`60px`} justify={`center`} px={8}>
                    <Text>ダッシュボード</Text>
                  </Stack>
                </Link>
              </NL>
            </Stack>
          )}
        </Stack>
        <Stack bg={`gray.800`} color={`white`} w={`80vw`} h={`100vh`}>
          <Stack
            justify={`center`}
            h={`6vh`}
            bg={`gray.900`}
            px={8}
            borderLeft={`1px`}
            borderColor={`gray.800`}
          >
            <Stack
              direction={`row`}
              w={`100%`}
              justify={`space-between`}
              align={`center`}
            >
              <Heading fontWeight={`normal`} fontSize={24}>
                {siteStore.loading ? <Spinner /> : <>{siteStore.site.name}</>}
              </Heading>
              <Stack direction={`row`}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FiUser />}
                    variant="unstyled"
                    _hover={{ bg: `gray.800` }}
                    justifyContent={`center`}
                    alignItems={`center`}
                    px={3}
                  />
                  <MenuList bg={`gray.800`}>
                    <MenuItem
                      bg={`gray.800`}
                      onClick={() => router.push('/settings/select-site')}
                    >
                      設定
                    </MenuItem>
                    <MenuItem bg={`gray.800`} onClick={() => signOut()}>
                      サインアウト
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Stack>
          </Stack>
          <Box as={`main`} p={8} h={`94vh`}>
            {children}
          </Box>
        </Stack>
      </HStack>
    </>
  )
}
