import React from 'react';
import { Grid, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { DashboardCalendarData } from 'src/views/dashboard/WorkoutsComponent';

interface ChartSeries {
  Swim: number[];
  Kick: number[];
  Others: number[];
}

interface DateRange {
  fromDate: number;
  toDate: number;
}

interface CalendarChartViewProps {
  data: DashboardCalendarData[];
  dateRange: DateRange;
}

const useStyles = makeStyles(() => ({
  subGridHeading: {
    textAlign: 'center',
    padding: '2rem 0 1rem 0'
  },
  chartHolder: {
    padding: '0 15px',
    textAlign: 'center'
  }
}));

const chartOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: true
    }
  },
  fill: {
    colors: ['#ec7969', '#e64c37', '#525253'],
    opacity: 1
  },
  legend: {
    show: false
  }
};

const computeChartValues = (data: DashboardCalendarData[]) => {
  return data.reduce(
    (acc, curr) => {
      acc.swim += curr.types.swim;
      acc.kick += curr.types.kick;
      acc.totalDistance += curr.totalDistance;
      return acc;
    },
    { swim: 0, kick: 0, totalDistance: 0 }
  );
};

const getDayValues = (dateRange: DateRange) => {
  const start = moment(dateRange.fromDate).subtract(1, 'days'),
    end = moment(dateRange.toDate);

  const days: { [key: number]: number[] } = {};

  for (let i = 0; start.isBefore(end.endOf('day')); i++) {
    const currentDay = start.add(1, 'days');
    const currentDayValue = currentDay.valueOf();
    const day = currentDay.day() === 0 ? 7 : currentDay.day();
    days[day] ? days[day].push(currentDayValue) : (days[day] = [currentDayValue]);
  }

  return days;
};

const generateDaySeries = (data: DashboardCalendarData[], dateRange: DateRange) => {
  const series: ChartSeries = {
    Swim: [],
    Kick: [],
    Others: []
  };

  const weekDaysValues = getDayValues(dateRange);
  for (let i = 1; i <= 7; i++) {
    const weekDayValue = weekDaysValues[i];
    const filteredDays = data?.filter(datum => weekDayValue.includes(datum.date));
    const computedValues = computeChartValues(filteredDays);
    series.Swim.push(computedValues.swim);
    series.Kick.push(computedValues.kick);
    series.Others.push(computedValues.totalDistance - (computedValues.swim + computedValues.kick));
  }

  return series;
};

const getWeekValues = (dateRange: DateRange) => {
  const start = moment(dateRange.fromDate).subtract(1, 'days'),
    end = moment(dateRange.toDate);

  let weekNumber = 1;

  const weeks: { [key: number]: number[] } = {};

  for (let i = 0; start.isBefore(end.endOf('day')); i++) {
    const currentDay = start.add(1, 'days');
    if (i !== 0 && currentDay.day() === 1) weekNumber++;
    const currentDayValue = currentDay.valueOf();
    weeks[weekNumber]
      ? weeks[weekNumber].push(currentDayValue)
      : (weeks[weekNumber] = [currentDayValue]);
  }

  return weeks;
};

const generateWeekSeries = (
  data: DashboardCalendarData[],
  dateRange: DateRange,
  numberOfWeeks: number
) => {
  const series: ChartSeries = {
    Swim: [],
    Kick: [],
    Others: []
  };

  const weekValues = getWeekValues(dateRange);
  for (let i = 1; i <= numberOfWeeks; i++) {
    const weekValue = weekValues[i];
    const filteredDays = data?.filter(datum => weekValue.includes(datum.date));
    const computedValues = computeChartValues(filteredDays);
    series.Swim.push(computedValues.swim);
    series.Kick.push(computedValues.kick);
    series.Others.push(computedValues.totalDistance - (computedValues.swim + computedValues.kick));
  }
  return series;
};

const CalendarChartView: React.FC<CalendarChartViewProps> = ({ data, dateRange }) => {
  const classes = useStyles();
  const theme = useTheme();

  const axisLabels = {
    labels: { style: { colors: theme.palette.mode === 'light' ? '#000000' : '#ffffff' } }
  };

  const numberOfWeeks = Math.ceil(
    (Math.abs(moment(dateRange.fromDate).diff(moment(dateRange.toDate), 'days')) + 1) / 7
  );

  return (
    <Grid container>
      <Grid item md={12} lg={6}>
        <h4 className={classes.subGridHeading}>Yards per Day of the Week</h4>
        <div className={classes.chartHolder}>
          <Chart
            type="bar"
            options={{
              ...chartOptions,
              xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                ...axisLabels
              },
              yaxis: {
                ...axisLabels
              },
              tooltip: {
                theme: theme.palette.mode
              }
            }}
            series={Object.entries(generateDaySeries(data, dateRange))?.map(datum => ({
              name: datum[0],
              data: datum[1]
            }))}
            height={'350'}
          />
        </div>
      </Grid>
      <Grid item md={12} lg={6}>
        <h4 className={classes.subGridHeading}>Yards per Week</h4>
        <div className={classes.chartHolder}>
          <Chart
            type="bar"
            options={{
              ...chartOptions,
              xaxis: {
                categories: Array(numberOfWeeks)
                  ?.fill(null)
                  ?.map((_1, index) => `Week ${index + 1}`),
                ...axisLabels
              },
              yaxis: {
                ...axisLabels
              },
              tooltip: {
                theme: theme.palette.mode
              }
            }}
            series={Object.entries(generateWeekSeries(data, dateRange, numberOfWeeks))?.map(
              datum => ({
                name: datum[0],
                data: datum[1]
              })
            )}
            height={'350'}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default CalendarChartView;
