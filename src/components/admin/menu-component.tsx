import { Heading, List, ListItem } from '@chakra-ui/layout'
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import { FiSettings, FiUsers } from 'react-icons/fi'
import { AiFillAlert, AiFillDashboard, AiFillMail } from 'react-icons/ai'
import { BsChevronExpand, BsSlack } from 'react-icons/bs'
import { signOut, useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher } from '@/src/utils/fetcher'
import { BiNotepad } from 'react-icons/bi'

export const MenuComponent = () => {
  const router = useRouter()
  const { data: session, status }: any = useSession({
    required: true,
  })

  const { data } = useSWR(
    session
      ? [
          `${process.env.NEXT_PUBLIC_API_HOST}/users/${session.id}`,
          session.accessToken,
        ]
      : null,
    fetcher,
  )

  const { user } = data ? data : { user: {} }

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          bg="gray.700"
          height="70px"
          _hover={{
            bg: 'gray.600',
          }}
          _active={{
            bg: 'gray.600',
          }}
          rightIcon={<BsChevronExpand color="white" size="20" />}
        >
          <Flex align="center">
            <Flex direction="column" align="start">
              <Text color="gray.400" fontSize="xs" isTruncated width="80%">
                ID {session && session.id}
              </Text>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>サインアウト</MenuItem>
        </MenuList>
      </Menu>
      <Flex direction="column">
        <Heading
          as={`h2`}
          color="gray.400"
          fontSize="14"
          fontWeight="semibold"
          mt="40px"
        >
          CATEGORIES
        </Heading>
        <List spacing={3} mt="30px">
          <ListItem
            onClick={() => router.push('/dashboard')}
            bg={
              router.pathname.includes('dashboard') ? 'gray.700' : 'transparent'
            }
            cursor={`pointer`}
            _hover={{ bg: 'gray.700' }}
            color="white"
            py="10px"
            px="15px"
            rounded="lg"
          >
            <Flex>
              <AiFillDashboard color="white" size="20" />
              <Text fontSize="14" ml="10px">
                ダッシュボード
              </Text>
            </Flex>
          </ListItem>
          <ListItem
            onClick={() => router.push('/event-logs')}
            bg={
              router.pathname.includes('event-logs')
                ? 'gray.700'
                : 'transparent'
            }
            cursor={`pointer`}
            _hover={{ bg: 'gray.700' }}
            color="white"
            py="10px"
            px="15px"
            rounded="lg"
          >
            <Flex>
              <BiNotepad color="white" size="20" />
              <Text fontSize="14" ml="10px">
                イベントログ
              </Text>
            </Flex>
          </ListItem>
        </List>
      </Flex>
      <Flex direction="column">
        <Heading
          as={`h2`}
          color="gray.400"
          fontSize="14"
          fontWeight="semibold"
          mt="40px"
        >
          SETTINGS
        </Heading>
        <List spacing={3} mt="30px">
          <ListItem
            onClick={() => router.push('/settings/select-site')}
            bg={
              router.pathname.includes('categories')
                ? 'gray.700'
                : 'transparent'
            }
            cursor={`pointer`}
            _hover={{ bg: 'gray.700' }}
            color="white"
            py="10px"
            px="15px"
            rounded="lg"
          >
            <Flex>
              <FiSettings color="white" size="20" />
              <Text fontSize="14" ml="10px">
                表示サイト変更
              </Text>
            </Flex>
          </ListItem>
          <ListItem
            onClick={() => router.push('/settings/mail-notification')}
            bg={
              router.pathname.includes('categories')
                ? 'gray.700'
                : 'transparent'
            }
            cursor={`pointer`}
            _hover={{ bg: 'gray.700' }}
            color="white"
            py="10px"
            px="15px"
            rounded="lg"
          >
            <Flex>
              <AiFillMail color="white" size="20" />
              <Text fontSize="14" ml="10px">
                メールアラート設定
              </Text>
            </Flex>
          </ListItem>
          <ListItem
            onClick={() => router.push('/settings/slack-notification')}
            bg={
              router.pathname.includes('categories')
                ? 'gray.700'
                : 'transparent'
            }
            cursor={`pointer`}
            _hover={{ bg: 'gray.700' }}
            color="white"
            py="10px"
            px="15px"
            rounded="lg"
          >
            <Flex>
              <BsSlack color="white" size="20" />
              <Text fontSize="14" ml="10px">
                SLACKアラート設定
              </Text>
            </Flex>
          </ListItem>
        </List>
      </Flex>
      <Spacer />
      <Flex>
        <Spacer />
        <Text color="white">{process.env.SITE_NAME}</Text>
        <Spacer />
      </Flex>
    </>
  )
}
