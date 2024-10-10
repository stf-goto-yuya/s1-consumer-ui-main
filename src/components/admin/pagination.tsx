import React from 'react'
import { Button, Stack, Skeleton, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { abbreviatedPages } from '@/src/utils/pagination'

interface Props {
  fetching: boolean
  currentPage: number
  setMPage: any
  pages: number
  total: number
  perPage: number
}

const Pagination: React.FC<Props> = ({
  fetching,
  currentPage,
  setMPage,
  pages,
  total,
  perPage,
}) => {
  const router = useRouter()

  return (
    <Skeleton isLoaded={!fetching} w={`300px`}>
      <Stack direction="row" spacing={4} mt="30px" mb={4}>
        <Button
          size={`sm`}
          disabled={currentPage === 1}
          color="white"
          display={{ base: 'none', lg: 'flex' }}
          onClick={() => {
            router.replace(`?page=${currentPage - 1}`)
            setMPage(currentPage - 1)
          }}
          colorScheme="blue"
          p={0}
        >
          <GrFormPrevious size={20} />
        </Button>
        <Button
          size={`sm`}
          disabled={currentPage === 1}
          color="white"
          display={{ base: 'block', lg: 'none' }}
          onClick={() => {
            router.replace(`?page=${currentPage - 1}`)
            setMPage(currentPage - 1)
          }}
          colorScheme="blue"
          p={2}
        >
          戻る
        </Button>

        {abbreviatedPages(pages, currentPage).map((num: any, i: number) => (
          <>
            {num === '...' ? (
              <Text letterSpacing={2}>{num}</Text>
            ) : (
              <Button
                key={i + 1}
                size="sm"
                display={{ base: 'none', lg: 'flex' }}
                onClick={() => {
                  router.replace(`?page=${num}`)
                  setMPage(num)
                }}
                bg="transparent"
                color={`white`}
                _hover={{ bg: 'blue.200' }}
                _active={{ bg: 'blue.300', color: 'blue.700' }}
                isActive={num === currentPage}
              >
                {num}
              </Button>
            )}
          </>
        ))}

        <Button
          size={`sm`}
          disabled={currentPage === pages}
          display={{ base: 'none', lg: 'flex' }}
          onClick={() => {
            router.replace(`?page=${currentPage + 1}`)
            setMPage(currentPage + 1)
          }}
          colorScheme="blue"
          p={0}
        >
          <GrFormNext size={20} />
        </Button>
        <Button
          size={`sm`}
          display={{ base: 'block', lg: 'none' }}
          disabled={currentPage === pages}
          onClick={() => {
            router.replace(`?page=${currentPage + 1}`)
            setMPage(currentPage + 1)
          }}
          colorScheme="blue"
          p={2}
        >
          次へ
        </Button>
      </Stack>
      <Text as={`small`} mt={4}>
        {total}件中 {(currentPage - 1) * perPage + 1}
        {' - '}
        {currentPage === pages ? total : currentPage * perPage}
        件目を表示
      </Text>
    </Skeleton>
  )
}

export default Pagination
