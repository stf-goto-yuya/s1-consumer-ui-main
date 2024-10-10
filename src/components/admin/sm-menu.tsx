import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher'
import { MenuComponent } from './menu-component'

export const SmMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef: any = React.useRef()

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
      <Button
        mr="20px"
        display={{ base: 'flex', lg: 'none' }}
        ref={btnRef}
        onClick={onOpen}
        bg={`gray.900`}
        px={2}
        py={0}
      >
        <BiMenu size={20} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={`full`}
      >
        <DrawerOverlay />
        <DrawerContent bg={`gray.900`} px={4} pt={14} pb={8}>
          <DrawerCloseButton color={`white`} />
          <MenuComponent />
        </DrawerContent>
      </Drawer>
    </>
  )
}
