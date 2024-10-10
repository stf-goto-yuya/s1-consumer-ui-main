import React, { ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

export const SearchFormWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Stack
      position='absolute'
      w={`400px`}
      top={10}
      bg={`gray.700`}
      rounded={5}
      px={2}
      pb={2}
      zIndex={999}
      spacing={1}
    >
      {children}
    </Stack>
  );
};
