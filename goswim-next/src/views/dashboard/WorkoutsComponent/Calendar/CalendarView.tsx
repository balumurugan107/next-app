import React, { useRef, memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
import Chart from 'react-apexcharts';
import { Box, Container, Grid, Paper, useTheme, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from 'src/views/calendar/MainView/Toolbar';
import { getSetData, updateHudDate } from 'src/store/dashboard/actions';
import { DashboardCalendarData } from 'src/views/dashboard/WorkoutsComponent';
import { OptionsInputBase } from '@fullcalendar/core/types/input-types';

interface DashboardCalendarProps {
  data: DashboardCalendarData[];
  team: string;
  roster: string;
  swimmer: string;
}

export interface DashboardCSVData {
  date: string;
  swim: number;
  kick: number;
  totalDistance: number;
  team: string;
  roster: string;
  swimmer: string;
}

export interface TableData {
  swim: number;
  kick: number;
  totalDistance: number;
}

const useStyles = makeStyles(theme => ({
  calendar: {
    '& .fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content, .fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td': {
      borderColor: theme.palette.divider
    },
    boxShadow: 'none',
    backgroundColor: 'unset',
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider,
      verticalAlign: 'middle'
    },
    '& .fc-unthemed td.fc-today': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-head': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-body': {
      backgroundColor:
        theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(40, 44, 52, 0.75)'
    },
    '& .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc th': {
      borderColor: theme.palette.divider,
      cursor: 'default'
    },
    '& .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.675rem'
      }
    },
    '& .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-highlight': {
      backgroundColor: theme.palette.mode === 'light' ? '#cccccc' : '#666666',
      cursor: 'pointer'
    },
    '& .fc-day.fc-widget-content.fc-disabled-day': {
      opacity: 0
    },
    '& .fc-day:not(.fc-disabled-day),.fc-day-top:not(.fc-disabled-day),.fc-highlight-skeleton,.fc-content-skeleton': {
      cursor: 'pointer'
    },
    '& .fc-unthemed': {
      '& .fc-list-heading': {
        '& td': {
          backgroundColor: theme.palette.background.dark
        }
      }
    },
    '& .fc-unthemed ': {
      '& .fc-list-empty': {
        backgroundColor: 'unset !important'
      }
    },
    '& .fc-unthemed .fc-popover .fc-header': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-content': {
      cursor: 'pointer'
    },
    '& .fc-day-number ': {
      cursor: 'default'
    },
    '& .fc-scroller': {
      overflow: 'unset !important',
      height: 'unset !important'
    },
    '& .fc-ltr .fc-h-event.fc-not-start': {
      marginLeft: 'unset',
      borderLeftWidth: 2,
      paddingLeft: 0,
      borderRadius: 3
    },
    '& .fc-ltr .fc-h-event.fc-not-end': {
      marginRight: 'unset',
      borderRightWidth: 2,
      paddingRight: 0,
      borderRadius: 3
    },
    '& .fc-other-month.fc-past': {
      opacity: '0.6'
    },
    '& .fc-highlight-skeleton': {
      pointerEvents: 'none'
    }
  },
  workoutChartRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .apexcharts-legend-series .apexcharts-legend-text': {
      color: theme.palette.mode === 'dark' ? '#e6e5e8 !important' : '#999999 !important'
    },
    '& .apexcharts-zoom-icon': {
      display: 'none'
    },
    '& .apexcharts-reset-icon': { transform: 'unset' },
    '& .apexcharts-tooltip': {
      color: theme.palette.text.secondary
    },
    '& .apexcharts-text.apexcharts-datalabel-value': {
      fill: theme.palette.mode === 'light' ? '#000000' : '#ffffff'
    }
  }
}));

export const getOptions = (totalDistance: number, theme: Theme) => {
  const charts = {
    options: {
      colors: ['#E64C37', '#EC7969'],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          offsetX: 0,
          offsetY: 0,
          hollow: {
            margin: 0,
            size: '42%'
          },
          track: {
            show: true,
            background: '#525253'
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              offsetY: 5,
              formatter: (value: any) => {
                return Math.floor((totalDistance / 100) * value);
              }
            },
            total: {
              show: true,
              label: 'total',
              fontSize: '6px',
              formatter: (_value: any) => {
                return totalDistance;
              }
            }
          }
        }
      },
      labels: ['Swim', 'Kick'],
      tooltip: {
        fillSeriesColor: false,
        theme: theme.palette.mode,
        enabled: true,
        y: {
          formatter: (_val: number) => {
            return '';
          },
          title: {
            formatter: (seriesName: string) => seriesName
          }
        }
      }
    }
  };

  return charts.options;
};

const DashboardCalendar: React.FC<DashboardCalendarProps> = ({ data, team, roster, swimmer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const calendarRef = useRef<FullCalendar>(null);
  const dateRange = useSelector(state => state.dashboard.workouts.dateRange);
  const [date, setDate] = useState(dateRange.fromDate);
  const role = useSelector(state => state?.account?.user?.role);
  const dateFormat = useSelector(state => state.account.settings.dateFormat);
  const hudDate = useSelector(state => state.dashboard.workouts.hudDate);

  useEffect(() => {
    const requestParams = {
      fromDate: moment(date)
        .startOf('month')
        .valueOf(),
      toDate: moment(date)
        .endOf('month')
        .valueOf(),
      role
    };
    const currentStartMillis = moment()
      .startOf('month')
      .valueOf();
    const currentDate =
      (currentStartMillis !== requestParams.fromDate && requestParams.toDate) || moment().valueOf();

    if (requestParams.fromDate !== dateRange.fromDate) {
      dispatch(getSetData(requestParams));
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
    }
  }, [date, dateRange.fromDate, dateRange.toDate, role, dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      calendarEl?.getApi()?.select(
        hudDate.from,
        moment(hudDate.to)
          .clone()
          .add(1, 'days')
          .valueOf()
      );
    }
  }, []); // eslint-disable-line

  const handleMonth = (type: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      if (type === 'previous') {
        calendarApi.prev();
      } else {
        calendarApi.next();
      }
      const selectedDate = calendarApi.getDate();
      setDate(moment(selectedDate).valueOf());
    }
  };

  const handleDayRender = (date: Date, el: HTMLElement) => {
    const dateTimestamp = moment(date)
      .startOf('day')
      .valueOf();
    const chartData = data.find(datum => datum.date === dateTimestamp);
    if (chartData) {
      const swim =
        (chartData.totalDistance && (chartData.types.swim / chartData.totalDistance) * 100) || 0;
      const kick =
        (chartData.totalDistance && (chartData.types.kick / chartData.totalDistance) * 100) || 0;
      const seriesData = [swim, kick];
      const options = getOptions(chartData.totalDistance, theme);
      ReactDOM.render(
        <Box className={classes.workoutChartRoot}>
          <Chart
            key={`${dateTimestamp}`}
            options={options}
            series={seriesData}
            type="radialBar"
            height={150}
            width={100}
          />{' '}
        </Box>,
        el
      );
    }
  };

  const handleSelect = (arg: Parameters<NonNullable<OptionsInputBase['select']>>[0]) => {
    if (
      moment(arg.start)
        .clone()
        .startOf('day')
        .valueOf() ===
        moment(hudDate.from)
          .clone()
          .startOf('day')
          .valueOf() &&
      moment(arg.end)
        .clone()
        .endOf('day')
        .valueOf() ===
        moment(hudDate.to)
          .clone()
          .endOf('day')
          .valueOf()
    )
      return;
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const from = moment(arg.start)
        .clone()
        .valueOf();
      const to = moment(arg.end)
        .clone()
        .subtract(1, 'day')
        .endOf('day')
        .valueOf();
      dispatch(updateHudDate({ from, to }));
    }
  };

  const csvExportData: DashboardCSVData[] = data?.map(datum => {
    return {
      date: moment(datum.date).format(dateFormat),
      swim: datum.types.swim,
      kick: datum.types.kick,
      totalDistance: datum.totalDistance,
      team,
      roster,
      swimmer
    };
  });

  return (
    <Container>
      <Toolbar
        type={'Dashboard'}
        view={'dayGridMonth'}
        date={moment(date).toDate()}
        handleMonth={handleMonth}
        csvExportData={csvExportData}
      />
      <Paper className={classes.calendar} component={Box}>
        <Grid container>
          <Grid item xs={12}>
            <FullCalendar
              defaultDate={date}
              ref={calendarRef}
              defaultView={'dayGridMonth'}
              fixedWeekCount={false}
              header={false}
              height={800}
              firstDay={1}
              selectable={true}
              unselectAuto={false}
              select={(arg: Parameters<NonNullable<OptionsInputBase['select']>>[0]) =>
                handleSelect(arg)
              }
              dayRender={(arg: Parameters<NonNullable<OptionsInputBase['dayRender']>>[0]) =>
                handleDayRender(arg.date, arg.el)
              }
              plugins={[dayGridPlugin, interactionPlugin]}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default memo(DashboardCalendar);
