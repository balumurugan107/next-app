import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Container, Slide } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import Page from 'src/components/Page';
import WorkoutsDashboard from 'src/views/dashboard/WorkoutsComponent';
import BookingStatus from 'src/views/dashboard/BookingStatus';
// import GoogleImages from 'src/views/dashboard/GoogleImage';
import ReviewLog from 'src/views/dashboard/ReviewLog';
import { AccountType } from 'src/constants';
import { getSetData, updateHudDate } from 'src/store/dashboard/actions';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 100,
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  }
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const role = useSelector(state => state?.account?.user?.role);
  const dateRange = useSelector(state => state.dashboard.workouts.dateRange);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentStartMillis = moment()
      .startOf('month')
      .valueOf();
    const currentDate =
      (currentStartMillis !== dateRange.fromDate && dateRange.toDate) || moment().valueOf();
    dispatch(
      updateHudDate({
        from: moment(currentDate)
          .clone()
          .startOf('isoWeek')
          .valueOf(),
        to: moment(currentDate)
          .clone()
          .endOf('isoWeek')
          .valueOf()
      })
    );
    const requestParams = {
      fromDate: moment(dateRange.fromDate)
        .startOf('month')
        .valueOf(),
      toDate: moment(dateRange.fromDate)
        .endOf('month')
        .valueOf(),
      role
    };
    dispatch(getSetData(requestParams));
  }, []); // eslint-disable-line

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title="Dashboard">
        <Container>
          <Box mt={1} className={classes.root}>
            <Grid container spacing={3}>
              <WorkoutsDashboard />
              {role === AccountType.COACH_OR_SWIMMING_EXPERT && (
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Grid container spacing={4}>
                    <BookingStatus />
                    <ReviewLog />
                  </Grid>
                  {/* <Grid>
                    <GoogleImages />
                  </Grid> */}
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default Dashboard;
