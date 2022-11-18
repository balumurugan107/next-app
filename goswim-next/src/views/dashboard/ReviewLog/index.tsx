import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  TextField,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import ReviewResult from 'src/views/dashboard/ReviewLog/RiviewResult';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBookingHistoryData,
  getLiveLessons,
  getLiveLessonsHistoryData,
  getVideoReviews
} from 'src/store/dashboard/actions';
import BookingChart from 'src/views/dashboard/BookingStatus/BookingChart';
import { useCommonStyles } from 'src/styles/common';
import IconComponent from 'src/views/dashboard/common/IconComponent';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from 'src/constants';

const useStyles = makeStyles(() => ({
  rlDivider: {
    marginTop: 15,
    marginBottom: 15
  },
  fullCardContent: {
    height: '32.7rem'
  }
}));

const ReviewLog = () => {
  const classes = useStyles();
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const laptop = useMediaQuery(theme.breakpoints.only('md'));
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const range = useSelector(state => state?.dashboard?.videoReview?.dateRange.period);
  const loadedStatus = useSelector(state => state?.dashboard?.videoReview?.dateRange.status);
  const [period, setPeriod] = useState<{ value: moment.unitOfTime.StartOf }>({
    value: (range as moment.unitOfTime.StartOf) || 'week'
  });
  const [status, setStatus] = useState('videoReview');
  const isFetching = useSelector(state => state?.dashboard?.videoReview?.isFetching);
  const data = useSelector(state => state?.dashboard?.videoReview?.videoReviewList);

  const dateRange = useMemo(() => {
    const today = moment();
    let startDate = '';
    let endDate = '';
    let startDateMillis = 0;
    let endDateMillis = 0;
    startDate = today.startOf(period.value).format('DD/MM/YYYY');
    endDate = today.endOf(period.value).format('DD/MM/YYYY');
    startDateMillis = today.startOf(period.value).valueOf();
    endDateMillis = today.endOf(period.value).valueOf();
    return {
      endDate,
      startDate,
      startDateMillis,
      endDateMillis
    };
  }, [period.value]);

  useEffect(() => {
    const fromDate = dateRange.startDateMillis;
    const toDate = dateRange.endDateMillis;
    if (status === 'videoReview') {
      dispatch(
        getBookingHistoryData({
          role: '',
          fromDate,
          toDate,
          period: String(period.value)
        })
      );
    } else {
      dispatch(
        getLiveLessonsHistoryData({
          role: '',
          fromDate,
          toDate,
          period: String(period.value)
        })
      );
    }
  }, [dateRange, dispatch, period, status]);

  useEffect(() => {
    const fromDate = dateRange.startDateMillis;
    const toDate = dateRange.endDateMillis;
    if (status === 'videoReview') {
      dispatch(
        getVideoReviews({ role: '', fromDate, toDate, period: String(period.value), status })
      );
    } else {
      dispatch(
        getLiveLessons({ role: '', fromDate, toDate, period: String(period.value), status })
      );
    }
  }, [dateRange, dispatch, period, status]);

  const SelectRange = () => {
    return (
      <TextField
        label="Select Period"
        name="period"
        size="small"
        select
        fullWidth
        variant="outlined"
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transitionDuration: 750,
            getContentAnchorEl: null,
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
              }
            }
          }
        }}
        onChange={event => {
          setPeriod(prevState => ({
            ...prevState,
            value: event?.target.value as moment.unitOfTime.StartOf
          }));
        }}
        value={period.value}
      >
        <MenuItem value="week">This Week</MenuItem>
        <MenuItem value="month">This Month</MenuItem>
        <MenuItem value="year">This Year</MenuItem>
      </TextField>
    );
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          title={
            <Typography component="h3" variant="h3" color="primary">
              Review Log
            </Typography>
          }
          action={
            <Box mt={1} display="flex" width={tablet ? 220 : laptop ? 280 : 340}>
              <IconComponent
                className={clsx(
                  commonClasses['gridIcon1'],
                  status === 'videoReview' ? commonClasses.active : commonClasses.completed
                )}
                src="/static/images/video-review.svg"
                onClick={() => {
                  if (status !== 'videoReview') setStatus('videoReview');
                }}
                title="Video Review"
              />
              <IconComponent
                className={clsx(
                  commonClasses['gridIcon1'],
                  status === 'liveLesson' ? commonClasses.active : commonClasses.completed
                )}
                src="/static/images/live-lessons.svg"
                onClick={() => {
                  if (status !== 'liveLesson') setStatus('liveLesson');
                }}
                title="Live Lessons"
              />
              <SelectRange />
            </Box>
          }
        />
        <CardContent className={classes.fullCardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} xl={12}>
              <BookingChart />
            </Grid>
          </Grid>

          <Divider className={classes.rlDivider} />
          {isFetching ? (
            <LinearProgress />
          ) : (
            <>
              {data?.length ? (
                <ReviewResult data={data || []} status={status} />
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" minHeight="23rem">
                  <div>{`No ${loadedStatus === 'videoReview' ? 'Video Reviews' : 'Live Lessons'
                    } found`}</div>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReviewLog;
