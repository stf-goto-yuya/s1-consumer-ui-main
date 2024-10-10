import React from 'react'
import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface Props {
  keyword: string
  setKeyword: any
}

export const PublishedRadio: React.FC<Props> = ({ keyword, setKeyword }) => {
  const [value, setValue] = React.useState(
    keyword === undefined ? '1' : keyword === 'true' ? '1' : '2',
  )

  const publish = (value: any) => {
    setValue(value)
    setKeyword(value === '1' ? 'true' : 'false')
  }

  return (
    <Box fontSize={`0.8rem`} color={`000`}>
      <RadioGroup onChange={publish} value={value}>
        <Stack direction="row">
          <Radio value="1">解決済み</Radio>
          <Radio value="2">未解決</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  )
}
