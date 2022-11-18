import React, { useCallback, useEffect, useMemo, memo } from 'react';
import { Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CircleDot from '@mui/icons-material/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux';
import { getLiveLessonsStatData, getVideoReviewStats } from 'src/store/dashboard/actions';
import { VideoReviewStat } from 'src/store/dashboard';
import AttachMoneyIcon from 'src/components/MoneyIcon';

const BorderLinearProgress = withStyles(theme =>
  createStyles({
    root: {
      height: 12,
      borderRadius: 5
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.secondary.main
    },
    colorPrimary: {
      backgroundColor: theme.palette.secondary.dark
    }
  })
)(LinearProgress);

const useStyles = makeStyles(theme => ({
  title3: {
    fontWeight: 700
  },
  dollarVr: {
    fontSize: 80,
    marginRight: -27,
    opacity: 0.2
  },

  dollarLl: {
    fontSize: 80,
    fill: '#BB739B',
    marginRight: -27,
    opacity: 0.2
  },
  dollarCardContent: {
    paddingBottom: '6px !important'
  },
  availableCircleVr: {
    color: theme.palette.secondary.dark
  },
  bookedCircleLl: {
    color: '#BB739B'
  },
  availableCircleLl: {
    color: 'rgba(187, 115, 155, 0.5)'
  },
  paper: {
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 2px 2px -2px rgba(0,0,0,0.50)'
  },
  llProgressBar: {
    backgroundColor: 'rgba(187, 115, 155, 0.5)'
  },
  videoReviewIcon: {
    marginRight: 5,
    color: theme.palette.secondary.main
  },
  liveLessonIcon: { marginRight: 5, color: '#A03CEA' },
  barLivelesson: {
    backgroundColor: '#BB739B'
  }
}));

interface BookingStatisticsProps {
  status: string;
}

const BookingStatistics = (props: BookingStatisticsProps) => {
  const { status } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const isFetching = useSelector(state => state.dashboard?.videoReviewStat?.isFetching);
  const data = useSelector(state => state.dashboard?.videoReviewStat?.data);
  const isLiveLessonsFetching = useSelector(state => state.dashboard?.liveLessonsStat?.isFetching);
  const liveLessonsData = useSelector(state => state.dashboard?.liveLessonsStat?.data);
  const settings = useSelector(state => state.account.settings);

  useEffect(() => {
    dispatch(getVideoReviewStats({ status }));
    dispatch(getLiveLessonsStatData({ status }));
  }, [status, dispatch]);

  const toString = (n: number, d: number) => {
    let x = ('' + n).length;
    const p = Math.pow;
    d = p(10, d);
    x -= x % 3;
    return Math.round((n * d) / p(10, x)) / d + ' KMGTPE'[x / 3];
  };

  const computeCount = useCallback((data: VideoReviewStat[]) => {
    const obtainList = (key: string, arr: VideoReviewStat[]) => arr.map((it: any) => it[key]);
    const sum = (arr: number[]) => arr.reduce((f, s) => f + s);

    if (data?.length) {
      const totalSlots = sum(obtainList('created_slots_count', data));
      const availSlots = sum(obtainList('available_slots_count', data));
      const bookedSlots = sum(obtainList('booked_slots_count', data));
      const totalPercentage = (bookedSlots / totalSlots) * (100 * data.length);
      const totalRevenue = sum(obtainList('cost_collected', data));
      return {
        totalSlots,
        availSlots,
        bookedSlots,
        totalPercentage: totalPercentage / data.length,
        totalRevenue:
          totalRevenue >= 1000 ? toString(Math.round(totalRevenue), 1) : Math.round(totalRevenue)
      };
    }
    return {
      totalSlots: 0,
      availSlots: 0,
      bookedSlots: 0,
      totalPercentage: 0,
      totalRevenue: 0
    };
  }, []);

  const bookingStatusValue = useMemo(() => {
    return computeCount(data || []);
  }, [data, computeCount]);

  const liveLessonsStatusValue = useMemo(() => {
    return computeCount(liveLessonsData || []);
  }, [liveLessonsData, computeCount]);

  const BookingLegend: React.FC<{ title: string; value?: string | number }> = ({
    title,
    value
  }) => {
    let showValue: string | number | undefined = '';
    if (value !== undefined) {
      showValue = title === 'REVENUE' ? settings?.currency?.concat(value.toString()) : value;
    }
    return (
      <Box>
        <Typography component="span" variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography component="div" variant="h3" className={classes.title3}>
          {showValue}
        </Typography>
      </Box>
    );
  };
  return (
    <Grid item xs={12} sm={12} xl={12}>
      {isFetching || isLiveLessonsFetching ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex">
              <VideoLibraryOutlinedIcon fontSize="small" className={classes.videoReviewIcon} />
              <Typography component="h6" variant="h6">
                VIDEO REVIEW
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} xl={9}>
            <Card className={classes.paper}>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <BookingLegend title="TOTAL SLOTS" value={bookingStatusValue?.totalSlots} />
                  <BookingLegend title="BOOKED" value={bookingStatusValue?.bookedSlots} />
                  <BookingLegend title="AVAILABLE" value={bookingStatusValue?.availSlots} />
                </Box>
                <Box mt={2}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={bookingStatusValue?.totalPercentage}
                  />
                  <Box display="flex" justifyContent="center" mt={1.25}>
                    <Box display="flex" alignItems="center">
                      <CircleDot fontSize="small" color="secondary" />
                      <Typography component="span"> Booked</Typography>
                    </Box>
                    <Box ml={3} display="flex" alignItems="center">
                      <CircleDot fontSize="small" className={classes.availableCircleVr} />
                      <Typography component="span"> Available</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Card className={classes.paper}>
              <CardContent className={classes.dollarCardContent}>
                <Box>
                  <BookingLegend title="REVENUE" value={bookingStatusValue?.totalRevenue} />
                  <Box display="flex" justifyContent="flex-end">
                    <AttachMoneyIcon fillColor="#EA8C00" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <PlayCircleOutlineIcon className={classes.liveLessonIcon} fontSize="small" />
              <Typography component="h6" variant="h6">
                LIVE LESSONS
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} xl={9}>
            <Card className={classes.paper}>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <BookingLegend title="TOTAL SLOTS" value={liveLessonsStatusValue?.totalSlots} />
                  <BookingLegend title="BOOKED" value={liveLessonsStatusValue?.bookedSlots} />
                  <BookingLegend title="AVAILABLE" value={liveLessonsStatusValue?.availSlots} />
                </Box>
                <Box mt={2}>
                  <BorderLinearProgress
                    className={classes.llProgressBar}
                    variant="determinate"
                    value={liveLessonsStatusValue?.totalPercentage}
                    classes={{ bar: classes.barLivelesson }}
                  />
                  <Box display="flex" justifyContent="center" mt={1.25}>
                    <Box display="flex" alignItems="center">
                      <CircleDot fontSize="small" className={classes.bookedCircleLl} />
                      <Typography component="span"> Booked</Typography>
                    </Box>
                    <Box ml={3} display="flex" alignItems="center">
                      <CircleDot fontSize="small" className={classes.availableCircleLl} />
                      <Typography component="span"> Available</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Card className={classes.paper}>
              <CardContent className={classes.dollarCardContent}>
                <Box>
                  <BookingLegend title="REVENUE" value={liveLessonsStatusValue?.totalRevenue} />
                  <Box display="flex" justifyContent="flex-end">
                    <AttachMoneyIcon fillColor="rgba(187, 115, 155)" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(BookingStatistics);
