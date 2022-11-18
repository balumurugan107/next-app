import React from 'react';
import { Box } from '@mui/material';
import { ComponentProps } from 'src/types';

const ErrorText: React.FC<ComponentProps> = ({ className, children }) => {
  return (
    <Box
      component="span"
      color="#f44336"
      fontSize={12}
      lineHeight={1.66}
      letterSpacing={0.5}
      mt={0.5}
      mr={1.75}
      ml={1.75}
      className={className}
    >
      {children}
    </Box>
  );
};

export default ErrorText;
