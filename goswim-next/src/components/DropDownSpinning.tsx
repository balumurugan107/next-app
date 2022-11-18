import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const DropDownSpinning = () => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <CircularProgress size={20} />
    </Box>
  );
};

export default DropDownSpinning;
