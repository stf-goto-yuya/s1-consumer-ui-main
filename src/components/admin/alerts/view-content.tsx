import { Box, Text, Flex, Stack, Tag } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Threat } from '@/src/interfaces/sentinel-one/threat'

interface Props {
  data: Threat
}

export const AlertViewContent: React.FC<Props> = ({ data: alert }) => {
  return (
    <Box pb={`40px`}>
      <Flex>
        <Box>
          <Stack spacing={4}>
            <Text as={`small`}>{alert.id}</Text>
            <Text fontSize="18" fontWeight="semibold" mr={2}>
              {alert.threatInfo.threatName}
            </Text>
            {/* <Stack direction="row">
              <Tag fontSize={11} p={2}>
                作成日: {dayjs(area.created).format('YYYY/MM/DD HH:mm:ss')}
              </Tag>
              <Tag fontSize={11} p={2}>
                更新日: {dayjs(area.created).format('YYYY/MM/DD HH:mm:ss')}
              </Tag>
            </Stack> */}
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}
