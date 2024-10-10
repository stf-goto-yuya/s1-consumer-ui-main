import React from 'react'
import { Box } from '@chakra-ui/react'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { fetcher } from '@/src/utils/fetcher'
import Select from 'react-select'

interface Props {
  keyword: string
  setKeyword: any
}

export const SelectedCategories: React.FC<Props> = ({
  keyword,
  setKeyword,
}) => {
  const { data: session, status }: any = useSession({
    required: false,
  })

  const { data } = useSWR(
    session
      ? [`${process.env.NEXT_PUBLIC_API_HOST}/categories`, session.accessToken]
      : null,
    fetcher,
  )

  const { categories } = data ? data : { categories: null }

  return (
    <Box fontSize={`0.8rem`} color={`000`}>
      <Select
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black',
          }),
          menu: (base) => ({
            ...base,
          }),
        }}
        value={{ value: '', label: keyword }}
        onChange={(ev: any) => setKeyword(ev.label)}
        placeholder={`test`}
        options={categories.map((field: any) => ({
          value: field.id,
          label: field.name,
        }))}
      />
    </Box>
  )
}
