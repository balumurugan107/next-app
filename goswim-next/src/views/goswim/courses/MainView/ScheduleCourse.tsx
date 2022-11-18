import React, { useEffect, useMemo, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
  LinearProgress,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

// import Slide from '@mui/material/Slide';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import DatePicker from 'src/components/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { capitlizeFirst } from 'src/utils/functionUtil';
import _ from 'lodash';
import { scheduleCourse, ScheduleCourseRequestObj } from 'src/store/management/courses';
import moment from 'moment';
import { setMembersDropDownSelectedTeamCalendar } from 'src/store/management/members';
import { sortTeam } from 'src/utils/sortTeam';
import { getScheduleList } from 'src/store/calendar/scheduleList';
import config from 'src/config';
import { AccountType } from 'src/constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1
  },
  spacingStart: {
    // padding: '24px',
    paddingRight: '0px',
    height: '100%'
  },
  spacingEnd: {
    padding: '16px',
    height: '100%',
    paddingTop: '8px',
    '& .MuiBox-root-168': {
      marginTop: 0
    },
    '& .MuiFormLabel-root': {
      marginBottom: theme.spacing(1)
    }
  },
  card: {
    height: '100%'
  },
  linearprogress: {
    marginTop: 16
  },
  editor: {
    '& .ql-root': {
      height: '100%'
    },

    '& .ql-editor': {
      height: '100%'
    }
  },
  paper: {
    minWidth: '65%',
    minHeight: '80%',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      minHeight: '100%'
    }
  },
  scheduleWrapper: { width: '100%', float: 'left', padding: theme.spacing(2) },
  groupSelector: {
    width: '33.33%',
    marginBottom: theme.spacing(2)
  },
  courseTitle: {
    fontSize: '24px',
    marginLeft: '24px',
    marginTop: '24px'
  }
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

type PropsFunction = (event: boolean) => void;

export default function ScheduleCourse(props: {
  courseID: string;
  openDialog: boolean;
  closeClicked: PropsFunction;
  courseTitle: string | undefined;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(props.openDialog);
  const [state, setState] = React.useState({
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    overwrite: true
  });
  const currentselectedTeam = useSelector(
    state => state.members.currentSelectedTeamManagement,
    _.isEqual
  );
  const teamData = useSelector(state => state.team.teamsList);
  const filteredTeamData =
    teamData && teamData.filter(team => team._id !== config.goswimGroupAPI.groupId);
  const teamValue = useSelector(state => state.members.currentSelectedTeam, _.isEqual);
  const teamSelectedVal = useSelector(state => state.members.currentSelectedTeamManagement);
  var today = new Date();
  const todayMS = today.setHours(0, 0, 0, 0);
  var numberOfDaysToAdd = 30;
  var nextMonth = today.setDate(today.getDate() + numberOfDaysToAdd);
  const [group, setGroup] = useState('');
  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday, overwrite } = state;
  const error =
    [sunday, monday, tuesday, wednesday, thursday, friday, saturday].filter(v => v).length === 0;
  const teams = useMemo(() => teamData && sortTeam(teamData), [teamData]);
  const { isLoading, courseScheduled } = useSelector(state => state.courses);
  // const userRole = useSelector(state => state.account.user.role);
  const userRole = AccountType.ADMIN;
  const groupList = useSelector(state => state.team.teamsList);
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;
  const teamList = useSelector(state => state.members.currentSelectedTeams, _.isEqual);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialRender, setInitialRender] = useState(true);
  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };
  useEffect(() => {
    setOpen(props.openDialog);
  }, [props.openDialog]);

  useEffect(() => {
    if (courseScheduled) {
      props.closeClicked(true);
    }
  }, [courseScheduled]);

  useEffect(() => {
    if (filteredTeamData.length > 0) {
      if (initialRender) {
        if (teamValue === 'ALL') setGroup(filteredTeamData?.[0]?._id);
        else setGroup(teamValue);
        setInitialRender(false);
      } else setGroup(teamSelectedVal);
    }
  }, [teamSelectedVal, teamValue]);

  const handleSaveClicked = () => {
    if (currentselectedTeam) {
      let selectedDays: number[] = [];
      if (sunday) {
        selectedDays.push(0);
      }
      if (monday) {
        selectedDays.push(1);
      }
      if (tuesday) {
        selectedDays.push(2);
      }
      if (wednesday) {
        selectedDays.push(3);
      }
      if (thursday) {
        selectedDays.push(4);
      }
      if (friday) {
        selectedDays.push(5);
      }
      if (saturday) {
        selectedDays.push(6);
      }
      let convertedSelectedDate = new Date(selectedDate);

      let scheduleReq: ScheduleCourseRequestObj = {
        tz: timeZone,
        overwrite: overwrite,
        days_of_week: selectedDays,
        course_id: props.courseID,
        schedule_on_timestamp: convertedSelectedDate.getTime(),
        team_id: teamSelectedVal
          ? teamSelectedVal
          : userRole === AccountType.ADMIN && groupList.length === 1
          ? config.goswimGroupAPI.groupId
          : teamValue === 'ALL'
          ? teamList[0]
          : teamValue
      };
      dispatch(scheduleCourse(scheduleReq));
    }
  };
  const handleClose = () => {
    props.closeClicked(true);
  };

  useEffect(() => {
    if (teamValue === 'ALL' && open) {
      dispatch(
        setMembersDropDownSelectedTeamCalendar({
          arrayOfSelectedTeams: [filteredTeamData[0]?._id],
          selectedTeam: filteredTeamData[0]?._id
        })
      );
    } else if (open) {
      dispatch(
        setMembersDropDownSelectedTeamCalendar({
          arrayOfSelectedTeams: [teamValue],
          selectedTeam: teamValue
        })
      );
    }
  }, [open]);

  useEffect(() => {
    if (initialRender && open && teamValue !== 'ALL' && teamValue) {
      dispatch(getScheduleList(teamValue, todayMS, nextMonth));
    } else if (open && teamSelectedVal !== 'ALL' && teamSelectedVal) {
      dispatch(getScheduleList(teamSelectedVal, todayMS, nextMonth));
    }
  }, [open, teamSelectedVal]);

  const handleChangeTeam = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event.target.value;
      if (value === 'ALL') {
        dispatch(
          setMembersDropDownSelectedTeamCalendar({
            arrayOfSelectedTeams: teams?.map(team => team?._id),
            selectedTeam: value
          })
        );
      } else {
        dispatch(
          setMembersDropDownSelectedTeamCalendar({
            arrayOfSelectedTeams: [value],
            selectedTeam: value
          })
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div>
      <Dialog classes={{ paper: classes.paper }} open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              size="large"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
              Schedule Course
            </Typography>
            {!isLoading && (
              <Button autoFocus color="inherit" onClick={handleSaveClicked}>
                save
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {isLoading && <LinearProgress className={classes.linearprogress} />}
        <Typography className={classes.courseTitle}>{props.courseTitle}</Typography>
        {!isLoading && (
          <div className={classes.scheduleWrapper}>
            <Grid item xs={12} md={4}>
              {(filteredTeamData?.length || userRole === AccountType.ADMIN) && (
                <FormControl variant="outlined" className={classes.groupSelector} size="small">
                  <InputLabel id="group">Group</InputLabel>
                  <Select
                    labelId="group"
                    id="selectGroup"
                    value={group ?? filteredTeamData?.[0]?._id}
                    onChange={(e: any) => handleChangeTeam(e)}
                    label="Group"
                  >
                    {userRole === AccountType.ADMIN
                      ? teamData?.map((teamData, index) => (
                          <MenuItem value={teamData?._id} key={index}>
                            {teamData.name}
                          </MenuItem>
                        ))
                      : filteredTeamData?.map((teamData, index) => (
                          <MenuItem value={teamData?._id} key={index}>
                            {teamData.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <div className={classes.spacingStart}>
                  <DatePicker
                    date={selectedDate}
                    setSelectedDate={date => {
                      handleDateChange(date);
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <div className={classes.spacingEnd}>
                  <Box mt={2} display="flex">
                    <FormControl component="fieldset" variant="standard" required error={error}>
                      <FormLabel component="legend">
                        Select the days of the week to schedule lessons
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox checked={sunday} onChange={handleDaysChange} name="sunday" />
                          }
                          label={capitlizeFirst('sunday')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={monday} onChange={handleDaysChange} name="monday" />
                          }
                          label={capitlizeFirst('monday')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={tuesday}
                              onChange={handleDaysChange}
                              name="tuesday"
                            />
                          }
                          label={capitlizeFirst('tuesday')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={wednesday}
                              onChange={handleDaysChange}
                              name="wednesday"
                            />
                          }
                          label={capitlizeFirst('wednesday')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={thursday}
                              onChange={handleDaysChange}
                              name="thursday"
                            />
                          }
                          label={capitlizeFirst('thursday')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={friday} onChange={handleDaysChange} name="friday" />
                          }
                          label={capitlizeFirst('friday')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={saturday}
                              onChange={handleDaysChange}
                              name="saturday"
                            />
                          }
                          label={capitlizeFirst('saturday')}
                        />
                      </FormGroup>
                      {/* <FormHelperText>You must select a day of week</FormHelperText> */}
                    </FormControl>
                  </Box>
                </div>
              </Grid>
            </Grid>

            <Typography variant="h5" className={classes.title}>
              Overwrite previously scheduled lessons?
            </Typography>
            <FormControlLabel
              className={classes.title}
              control={
                <Checkbox checked={overwrite} onChange={handleDaysChange} name="overwrite" />
              }
              label="Yes, overwrite lessons"
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
