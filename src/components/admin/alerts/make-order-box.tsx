import React from 'react'
import { Select } from '@chakra-ui/react'
import { SearchBase } from '../../../providers/search-base'
import { useRouter } from 'next/router'

export const AlertMakeOrderBox: React.FC = () => {
  const router = useRouter()
  const { sorder } = router.query

  return (
    <SearchBase.Consumer>
      {({ handleOrder }) => {
        return (
          <Select placeholder="並び替え" size={`sm`} onChange={handleOrder}>
            <option value="updated->desc" selected={sorder === 'updated->desc'}>
              最新順
            </option>
            <option value="updated->asc" selected={sorder === 'updated->asc'}>
              古い順
            </option>
            <option value="name->asc" selected={sorder === 'name->asc'}>
              あいうえお順
            </option>
          </Select>
        )
      }}
    </SearchBase.Consumer>
  )
}
