import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, Card, Grid, CardContent, CardHeader, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import BookingStatistics from 'src/views/dashboard/BookingStatus/BookingStats';
import IconComponent from 'src/views/dashboard/common/IconComponent';
import { useCommonStyles } from 'src/styles/common';

const useStyles = makeStyles(() => ({
  bookingContent: {
    paddingBottom: '16px !important'
  },
  bookingBottom: {
    paddingBottom: '8px !important'
  }
}));

const BookingStatus = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [status, setStatus] = useState('active');

  return (
    <Grid item xs={6} className={classes.bookingBottom}>
      <Card>
        <CardHeader
          title={
            <Typography component="h3" variant="h3" color="primary">
              Booking Status
            </Typography>
          }
          action={
            <Box>
              <IconComponent
                className={clsx(
                  commonClasses['gridIcon2'],
                  status === 'active' ? commonClasses.active : commonClasses.completed
                )}
                src="/static/images/active.svg"
                onClick={() => {
                  if (status !== 'active') setStatus('active');
                }}
                title="Active"
              />
              <IconComponent
                className={clsx(
                  commonClasses['gridIcon2'],
                  status === 'completed' ? commonClasses.active : commonClasses.completed
                )}
                src="/static/images/completed.svg"
                onClick={() => {
                  if (status !== 'completed') setStatus('completed');
                }}
                title="Completed"
              />
            </Box>
          }
        />
        <CardContent className={classes.bookingContent}>
          <Box>
            <Grid container spacing={2}>
              <BookingStatistics {...{ status }} />
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookingStatus;
