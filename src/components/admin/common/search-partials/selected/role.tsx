import React, { useEffect } from 'react'
import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface Props {
  keyword: string
  setKeyword: any
}

export const RoleRadio: React.FC<Props> = ({ keyword, setKeyword }) => {
  const [value, setValue] = React.useState(
    keyword === undefined ? '1' : keyword === 'USER' ? '1' : '2',
  )

  const publish = (value: any) => {
    setValue(value)
    setKeyword(value === '1' ? 'USER' : 'ADMIN')
  }

  useEffect(() => {
    setKeyword(value === '1' ? 'USER' : 'ADMIN')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box fontSize={`0.8rem`} color={`000`}>
      <RadioGroup onChange={publish} value={value}>
        <Stack direction="row">
          <Radio value="1">一般ユーザ</Radio>
          <Radio value="2">管理者</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  )
}
