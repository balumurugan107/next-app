import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DateRange, DateRangePicker } from '@mui/lab';
export const MuiDateRangePicker = () => {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);
  return (
    <Box width="500px">
      <DateRangePicker
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
        renderInput={(startProps: any, endProps: any) => {
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}>To</Box>
            <TextField {...endProps} />
          </>;
        }}
      />
    </Box>
  );
};
