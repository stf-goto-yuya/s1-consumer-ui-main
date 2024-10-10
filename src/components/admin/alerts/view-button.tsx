import React, { useCallback, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { TiZoomIn } from 'react-icons/ti'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { AlertViewContent } from '@/src/components/admin/alerts/view-content'
import { Threat } from '@/src/interfaces/sentinel-one/threat'

interface Props {
  id: string
}

export const AlertViewButton: React.FC<Props> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [alert, setAlert] = useState<Threat | null>(null)
  const { data: session, status }: any = useSession({
    required: true,
  })
  const toast = useToast()

  const viewAlert = useCallback(
    async (id: string): Promise<Threat | undefined> => {
      setLoading(true)

      try {
        const {
          data: { data: alerts },
        } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOST}/threats/v2/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        )

        console.log(alerts)
        setLoading(false)
        return alerts[0]
      } catch (err: any) {
        toast({
          title: 'Query Error',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })

        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <>
      <Button
        isLoading={loading}
        onClick={async () => {
          const pl = await viewAlert(id)
          setAlert(pl ? pl : null)
          onOpen()
        }}
        bg="teal.700"
        mr="10px"
        size={`sm`}
        _hover={{ bg: 'teal.600' }}
        p={1}
      >
        <TiZoomIn size="20" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="56rem" bg={`gray.900`} color={`white`}>
          <ModalHeader>脅威詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{alert && <AlertViewContent data={alert} />}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
