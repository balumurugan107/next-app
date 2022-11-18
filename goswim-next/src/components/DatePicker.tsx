import 'date-fns';
import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { datePickerTheme } from 'src/theme/datePicker';

import { Badge, Card, TextField } from '@mui/material';
import Theme from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getScheduleList, ScheduleListData } from 'src/store/calendar/scheduleList';
import moment from 'moment';
import { ThemeProvider } from '@mui/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  CalendarPicker,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
  StaticDatePicker
} from '@mui/x-date-pickers';

declare module '@mui/styles/' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles(theme => ({
  lessonDate: {
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    borderRadius: theme.spacing(1),
    '& div': {
      '& button': {
        '& svg': {
          color: theme.palette.secondary.main
        }
      }
    },
    // '& .MuiPickersDay-dayDisabled': {
    //   backgroundColor: '#D3D3D3',
    //   color: '#ffffff',
    //   padding: '5px 10px'
    // },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: theme.palette.secondary.main
    },
    // '& .MuiPickersDay-current': {
    //   backgroundColor: '#fff',MuiPickersDay-daySelected
    //   color: '#DCE0DF'
    // },
    '& .MuiPickersBasePicker-pickerView': {
      minWidth: 'unset',
      maxWidth: 'unset'
    },
    '& .MuiPickersDay-day': {
      margin: '3px 14px'
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      margin: '0px 16px'
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
      '& p': {
        color: theme.palette.text.secondary,
        fontWeight: 800
      }
    },
    [theme.breakpoints.only('md')]: {
      '& .MuiPickersStaticWrapper-staticWrapperRoot': {
        minWidth: 'unset'
      },
      '& .MuiPickersDay-day': {
        margin: '0px 8px'
      },
      '& .MuiPickersCalendarHeader-dayLabel': {
        margin: '0px 8px'
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiPickersStaticWrapper-staticWrapperRoot': {
        minWidth: 'unset'
      },
      '& .MuiPickersDay-day': {
        margin: 3,
        width: 32,
        height: 30
      },
      '& .MuiPickersCalendarHeader-dayLabel': {
        margin: 3
      }
    }
  },
  day: {
    color: theme.palette.secondary.main
  },
  daySelected: {
    '& button': {
      color: theme.palette.secondary.main
    }
  }
}));
type PropsFunction = (event: any | null) => void;
export default function DatePicker(props: {
  date: Date | null;
  setSelectedDate: PropsFunction;
  setText?: PropsFunction;
}) {
  const scheduleList: ScheduleListData[] = useSelector(state => state.scheduleList.data);
  const { date, setSelectedDate } = props;
  let [calendarValue, setCalenderValue]: any[] = useState([]);
  const classes = useStyles();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const dispatch = useDispatch();
  const currentselectedTeam = useSelector(state => state.members.currentSelectedTeam);
  const teamSelectedVal = useSelector(state => state.members.currentSelectedTeamManagement);

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
    scheduleList?.map(list => {
      if (list.schedule_on_timestamp === date.getTime()) {
        props.setText && props.setText(list.message);
      }
    });
  };

  let calenderVal1: Date[] = [];
  useEffect(() => {
    if (isInitialRender) {
      scheduleList?.map(list => {
        setIsInitialRender(false);
        calenderVal1.push(new Date(list.schedule_on_timestamp));
      });
      setCalenderValue(calenderVal1);
    }
  }, [scheduleList]);

  // return date.getTime() === new Date('2022-04-03T00:00').getTime();

  // var today = new Date();
  // var numberOfDaysToAdd = 30;
  // var nextMonth = today.setDate(today.getDate() + numberOfDaysToAdd);

  function disableSpecificDay(date: any) {
    let defaultDate = moment(date).valueOf();
    let disabledDate = scheduleList?.filter((item: ScheduleListData) => {
      let iteratorDate = new Date(item.schedule_on_timestamp);
      if (new Date(defaultDate).toLocaleDateString() === iteratorDate.toLocaleDateString())
        return true;
      else return false;
    });
    return disabledDate && disabledDate.length > 0;
  }

  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();

  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  useEffect(() => {}, [calendarValue]);

  const handleMonthChange = (date: any) => {
    let endDateMS = moment(date)
      .clone()
      .endOf('month')
      .valueOf();
    let startDateMS = moment(date)
      .clone()
      .startOf('month')
      .valueOf();
    if (currentselectedTeam !== 'ALL' && currentselectedTeam && startDateMS && endDateMS) {
      dispatch(getScheduleList(currentselectedTeam, startDateMS, endDateMS));
    } else if (teamSelectedVal !== 'ALL' && teamSelectedVal && startDateMS && endDateMS) {
      dispatch(getScheduleList(teamSelectedVal, startDateMS, endDateMS));
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={datePickerTheme}>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Card className={classes.lessonDate}>
            <KeyboardDatePicker
              disableToolbar
              disablePast
              // maxDate={nextMonth}
              // shouldDisableDate={disableSpecificDay}
              renderDay={(day, selectedDate, dayInCurrentMonth, dayComponent) => {
                if (disableSpecificDay(day) && dayInCurrentMonth) {
                  return React.cloneElement(dayComponent, {
                    className:
                      moment(day).format('DD-MM-yyyy') === moment(selectedDate).format('DD-MM-yyyy')
                        ? classes.daySelected + ' MuiPickersDay-day MuiPickersDay-daySelected'
                        : classes.day + ' MuiPickersDay-day'
                  });
                } else if (dayInCurrentMonth) return dayComponent;
                else
                  return React.cloneElement(dayComponent, {
                    className: classes.day + ' MuiPickersDay-day MuiPickersDay-hidden'
                  });
              }}
              variant="static"
              format="dd/MMM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={date}
              onChange={it => handleDateChange(it)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              onMonthChange={date => handleMonthChange(date)}
            />
          </Card>
        </MuiPickersUtilsProvider> */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            // openTo="year"
            value={date}
            onChange={it => handleDateChange(it)}
            renderInput={params => <TextField {...params} />}
            disablePast
            onMonthChange={date => handleMonthChange(date)}
            renderDay={(
              day: moment.MomentInput,
              selectedDays: moment.MomentInput,
              pickersDayProps: PickersDayProps<string | number>
            ) => {
              if (disableSpecificDay(day)) {
                return (
                  <Badge
                    key={day?.toString()}
                    overlap="circular"
                    className={classes.daySelected + ' MuiPickersDay-day MuiPickersDay-daySelected'}
                  >
                    <PickersDay {...pickersDayProps} />
                  </Badge>
                );
              } else {
                return (
                  <Badge key={day?.toString()} overlap="circular">
                    <PickersDay {...pickersDayProps} />
                  </Badge>
                );
              }
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
