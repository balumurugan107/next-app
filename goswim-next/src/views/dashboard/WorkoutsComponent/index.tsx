import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Grid, CardContent, CardHeader, Divider, LinearProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import moment from 'moment';
import DashboardCalendar from 'src/views/dashboard/WorkoutsComponent/Calendar/CalendarView';
import Filter from 'src/views/dashboard/WorkoutsComponent/Filter';
import { AccountType } from 'src/constants';
import WorkoutChartView from 'src/views/dashboard/WorkoutsComponent/workoutChartView';
import CalendarChartView from 'src/views/dashboard/WorkoutsComponent/CalendarChartView';

export interface ChartData {
  name: string;
  data: Array<{
    x: number | string;
    y: number;
  }>;
}

export interface DashboardCalendarData {
  date: number;
  types: {
    swim: number;
    kick: number;
  };
  totalDistance: number;
}

export interface HudDate {
  fromDate: number;
  toDate: number;
}

const useStyles = makeStyles(theme => ({
  divider1: {
    marginTop: theme.spacing(1.25)
  },
  linearprogress: {
    marginBottom: 16
  },
  fullHeightCard: {
    height: '100%'
  },
  hudGrid: {
    position: 'relative'
  }
}));

const WorkoutsDashboard = () => {
  const classes = useStyles();

  const isFetching = useSelector(state => state?.dashboard?.workouts.isSetsDataLoading);
  const data = useSelector(state => state?.dashboard?.workouts.setsData);
  const activeTeam = useSelector(state => state.dashboard.workouts.activeTeam);
  const activeRoster = useSelector(state => state.dashboard.workouts.activeRoster);
  const activeSwimmer = useSelector(state => state.dashboard.workouts.activeSwimmer);
  const dateRange = useSelector(state => state.dashboard.workouts.dateRange);
  const role = useSelector(state => state?.account?.user?.role);

  const calculateCalendarData = () => {
    let filteredData = data?.filter(
      it =>
        it.sets_team_id === activeTeam?.id &&
        it.swimmer_id === activeSwimmer?.id &&
        it.roster_group.includes(activeRoster?.id || '')
    );

    const calendarData: DashboardCalendarData[] = [];
    let startDate = dateRange.fromDate;
    while (startDate < dateRange.toDate) {
      calendarData.push({
        date: startDate,
        types: {
          swim: 0,
          kick: 0
        },
        totalDistance: 0
      });
      startDate = moment(startDate)
        .add(1, 'day')
        .startOf('day')
        .valueOf();
    }

    filteredData?.forEach(datum => {
      const foundData = calendarData.find(
        ({ date: startDate }) =>
          startDate ===
          moment(datum.scheduled_datetime)
            .clone()
            .startOf('day')
            .valueOf()
      );
      if (foundData) {
        foundData.totalDistance += datum.set_distance_yard;
        switch (datum.action_name) {
          case 'Kick':
            foundData.types.kick += datum.set_distance_yard;
            break;

          case 'Swim':
            foundData.types.swim += datum.set_distance_yard;
            break;
          default:
            break;
        }
      }
    });
    return calendarData?.filter(calData => !!calData.totalDistance);
  };

  const calendarData = calculateCalendarData();

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12}>
      <Card className={classes.fullHeightCard}>
        <CardHeader
          title={
            <Typography variant="h3" component="h3" color="primary">
              Workouts
            </Typography>
          }
        />
        {role === AccountType.COACH_OR_SWIMMING_EXPERT && !!data?.length && <Filter />}
        <Divider className={classes.divider1} />
        <CardContent>
          {isFetching ? (
            <LinearProgress className={classes.linearprogress} />
          ) : (
            <Grid container>
              <Grid item md={12} lg={7}>
                <DashboardCalendar
                  data={calendarData}
                  team={activeTeam?.name || ''}
                  roster={activeRoster?.name || ''}
                  swimmer={activeSwimmer?.name || ''}
                />
                {!!calendarData.length && (
                  <CalendarChartView data={calendarData} dateRange={_.omit(dateRange, 'role')} />
                )}
              </Grid>
              <Grid className={classes.hudGrid} item md={12} lg={5}>
                <WorkoutChartView />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorkoutsDashboard;
