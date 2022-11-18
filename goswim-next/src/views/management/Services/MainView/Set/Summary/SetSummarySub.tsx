import React from 'react';
import { Box, Typography } from '@mui/material';
import { ComponentProps } from 'src/types';

import moment from 'moment';
import 'moment-duration-format';

interface SetSummarySubProps {
  value: number;
  interval: number;
}

const SetSummarySub: React.FC<ComponentProps & Partial<SetSummarySubProps>> = ({
  value,
  interval
}) => (
  <Box>
    <Typography component="span">{value}</Typography>
    <Typography component="span">/</Typography>
    <Typography component="span">{moment.duration(interval).format('mm:ss')}</Typography>
  </Box>
);

export default SetSummarySub;
