import React, { useCallback, useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Threat } from '@/src/interfaces/sentinel-one/threat'

interface Props {
  id: string
}

export const AlertDeleteButton: React.FC<Props> = ({ id }) => {
  const { data: session, status }: any = useSession({
    required: true,
  })

  const [area, setArea] = useState<Threat | null>(null)
  const [confirmAreaID, setConfirmAreaID] = useState<string>('')
  const toast = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  const deleteCategory = useCallback(async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/areas/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })

      return true
    } catch (err: any) {
      toast({
        title: 'Query Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      return false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={close}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          onClick={async () => {
            try {
              const {
                data: { area },
              } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_HOST}/areas/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                  },
                },
              )
              setArea(area)
              open()
            } catch (err: any) {
              toast({
                title: 'Query Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            }
          }}
          bg="red.700"
          size={`sm`}
          p={1}
          _hover={{ bg: 'red.600' }}
        >
          <RiDeleteBin7Fill size="20" />
        </Button>
      </PopoverTrigger>
      <PopoverContent bg={`gray.900`}>
        <PopoverHeader fontWeight="semibold" color="red.200">
          取り返しのつかないアクションです
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody color={`red.100`}>
          再度本当に削除が必要か確認お願いします。
          <Text as={`div`} fontWeight="bold" my={2}>
            (ID:
            {area && area.id})
          </Text>
          一度削除すると復元するとこはできません、それでもよろしければ下のテキストボックスにIDを入力してDELETEをクリックしてください
          <Input
            type={`text`}
            mt={4}
            my={2}
            size={`sm`}
            value={confirmAreaID}
            onChange={(ev) => setConfirmAreaID(ev.target.value)}
            placeholder={`勤務地IDを入力してください`}
            _placeholder={{ color: 'red.100' }}
          />
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button
              onClick={() => {
                setConfirmAreaID('')
                close()
              }}
              variant="outline"
              bg="green.500"
              size={`xs`}
              _hover={{ bg: 'green.400' }}
            >
              キャンセル
            </Button>
            <Button
              onClick={async () => {
                if (area?.id === confirmAreaID) {
                  await deleteCategory(id)

                  close()
                  setConfirmAreaID('')

                  toast({
                    title: '正常に勤務地が削除されました',
                    description: '正常に勤務地が削除されました',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                } else {
                  toast({
                    title: 'IDがマッチしません',
                    description: '削除するIDを正しく入力してください',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
                }
              }}
              size={`xs`}
              colorScheme="red"
            >
              削除
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
