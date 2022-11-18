import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  Card,
  CardContent,
  SvgIcon,
  Typography,
  Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/SendRounded';
import { setRosterValues, setTeamValue, TeamRosterValueKeys } from 'src/store/common';
import { ComponentProps } from 'src/types';
import DropDownSpinning from 'src/components/DropDownSpinning';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Workout } from 'src/store/workout';
import LoadingButton from 'src/components/LoadingButton';
import { EditorType } from 'src/store/management/service';
import { sortTeam } from 'src/utils/sortTeam';

interface AssignViewProps {
  handleSubmit: (workoutValue: WorkoutProps) => Promise<void>;
  handleCloseAssign(): void;
  workout?: Workout | null;
  type?: EditorType;
}

interface WorkoutProps {
  workoutName: string;
  rosterGroup: string[];
  teamId?: string;
  date: number;
}
const useStyles = makeStyles(theme => ({
  actionIcon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: { marginRight: 4 }
  },
  iconMiddle: { color: theme.palette.background.dark },
  iconFont: {
    fontWeight: 500
  },
  cardContent: {
    padding: 24
  }
}));

const AssignView: React.FC<ComponentProps & AssignViewProps> = ({
  handleSubmit,
  handleCloseAssign,
  workout,
  type,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isLoading, workoutIsLoading, teamData, persistTeam } = useSelector(
    state => {
      return {
        isLoading: state.team.isLoading,
        workoutIsLoading: state.workout.isLoading,
        teamData: state.team.heirarchyTeams,
        persistTeam: state.common.persist.teamValues,
      };
    }
  );
  const uniqueteams = useMemo(
    () => sortTeam(teamData)?.filter(team => !!team.rosterGroup.length) || null,
    [teamData]
  );

  const [rostergroup, setRosterGroup] = React.useState<string[]>(uniqueteams[0]?.rosterGroup || []);
  const [openCalendar, setOpenCalendar] = React.useState<boolean>(false);
  const [selectedrosters, setSelectedRosterGroup] = React.useState<string[]>(
    uniqueteams[0]?.rosterGroup || []
  );
  useEffect(() => {
    if (workout) {
      setRosterGroup(uniqueteams.find(team => team.name === workout.team)?.rosterGroup || []);
      setSelectedRosterGroup(workout?.sets_roster_group || []);
    } else if (persistTeam[TeamRosterValueKeys.SERVICES_SETS]){
      setRosterGroup(uniqueteams.find(team => team._id === persistTeam[TeamRosterValueKeys.SERVICES_SETS] )?.rosterGroup || []);
      setSelectedRosterGroup(uniqueteams.find(team => team._id === persistTeam[TeamRosterValueKeys.SERVICES_SETS] )?.rosterGroup || []);
    } else {
      setRosterGroup(uniqueteams[0]?.rosterGroup || []);
      setSelectedRosterGroup(uniqueteams[0]?.rosterGroup || []);
    }
  }, [workout, uniqueteams]); // eslint-disable-line

  const initialValues: WorkoutProps = useMemo(() => {
    return {
      workoutName: workout ? workout.workout_name : '',
      rosterGroup: workout ? workout.sets_roster_group : 
                  (persistTeam[TeamRosterValueKeys.SERVICES_SETS] && uniqueteams.find(team => team._id === persistTeam[TeamRosterValueKeys.SERVICES_SETS] )?.rosterGroup)
                   || [...selectedrosters],
      teamId:
        (type === 'new' && ((uniqueteams.length === 1 && uniqueteams[0]?._id )
        ||  persistTeam[TeamRosterValueKeys.SERVICES_SETS]))||
        (workout
          ? uniqueteams.find(team => team.name === workout.team)?._id
          : uniqueteams[0]?._id) ||
        '',
      date: workout
        ? workout.scheduled_datetime
        : moment()
            .startOf('day')
            .valueOf()
    };
  }, [selectedrosters, uniqueteams, workout]); // eslint-disable-line

  const isAllRosterSelected = rostergroup.length === selectedrosters.length;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  return (
    <>
      <Formik
        enableReinitialize={initialValues.teamId !== '' ? false : true}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          workoutName: Yup.string()
            .max(255),
          teamId: Yup.string()
            .max(255)
            .nullable()
            .required('Team is required'),
          rosterGroup: Yup.string()
            .nullable()
            .max(255)
            .required('Roster Group is required'),
          date: Yup.number()
            .nullable()
            .required('Date is Required')
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values, handleChange, isValid, errors, touched }) => (
          <form onSubmit={handleSubmit} {...rest}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      error={!!(touched.workoutName && errors.workoutName)}
                      size="small"
                      label="Workout Name"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.workoutName}
                      autoFocus
                      fullWidth
                      name="workoutName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} xl={6}>
                    <TextField
                      label="Team"
                      name="team"
                      size="small"
                      select
                      fullWidth
                      value={
                        isLoading
                          ? 'Loading'
                          : values.teamId
                      }
                      onChange={event => {
                        const value = event.target.value;
                        setFieldValue('teamId', value);
                        const teamId = value as string;
                        dispatch(
                          setTeamValue({
                            [TeamRosterValueKeys.SERVICES_SETS]: teamId
                          })
                        );
                        const selectedRosterGroup = uniqueteams?.filter(
                          data => data?._id === teamId
                        );
                        if (selectedRosterGroup?.[0]?.rosterGroup) {
                          setRosterGroup(selectedRosterGroup[0].rosterGroup);
                          setSelectedRosterGroup(selectedRosterGroup[0].rosterGroup);
                          setFieldValue('rosterGroup', selectedRosterGroup[0].rosterGroup);
                        }
                      }}
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
                              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                              width: 250
                            }
                          }
                        }
                      }}
                    >
                      {isLoading ? (
                        <MenuItem key="Loading" value="Loading">
                          <DropDownSpinning />
                        </MenuItem>
                      ) : (
                        uniqueteams?.map((option, index) => (
                          <MenuItem key={index} value={option?._id}>
                            {option?.name}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} xl={6}>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <InputLabel id="roster-dropdown">Roster</InputLabel>
                      <Select
                        MenuProps={{
                          autoFocus: false,
                          transitionDuration: 750,
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left'
                          },
                          getContentAnchorEl: null,
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 250
                            }
                          }
                        }}
                        labelId="roster-dropdown-select-outlined-label"
                        label="Roster"
                        id="roster-dropdown-select-outlined"
                        value={
                          isLoading
                            ? ['Loading']
                            : selectedrosters
                        }
                        onChange={event => {
                          const castedEvent = event as React.ChangeEvent<
                            HTMLElement & {
                              value: string[];
                            }
                          >;
                          const value = castedEvent?.target?.value;
                          const isSelectAllClicked =
                            castedEvent.currentTarget.getAttribute('data-value') === 'select-all';
                          const data =
                            (isSelectAllClicked && isAllRosterSelected && []) ||
                            (isSelectAllClicked && !isAllRosterSelected && [...rostergroup]) ||
                            value ||
                            [];
                          setSelectedRosterGroup(data);
                          setFieldValue('rosterGroup', data);
                          dispatch(
                            setRosterValues({
                              [TeamRosterValueKeys.SERVICES_SETS]: data
                            })
                          );
                        }}
                        renderValue={selected =>
                          isLoading ? (
                            <DropDownSpinning />
                          ) : isAllRosterSelected ? (
                            'All'
                          ) : (
                            (selected as string[]).join(', ')
                          )
                        }
                        multiple
                      >
                        {isLoading ? (
                          <MenuItem key="Loading" value="Loading">
                            <DropDownSpinning />
                          </MenuItem>
                        ) : (
                          [
                            <MenuItem key={1} value={'select-all'}>
                              <Checkbox checked={isAllRosterSelected} />
                              <ListItemText primary={'All'} />
                            </MenuItem>,
                            [...rostergroup]
                              ?.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
                              ?.map(name => (
                                <MenuItem key={name} value={name}>
                                  <Checkbox checked={selectedrosters.indexOf(name) > -1} />
                                  <ListItemText primary={name} />
                                </MenuItem>
                              ))
                          ]
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} xl={6}>
                    <KeyboardDatePicker
                      fullWidth
                      open={openCalendar}
                      error={!!(touched.date && errors.date)}
                      onOpen={() => setOpenCalendar(true)}
                      helperText={!!(touched.date && errors.date) ? 'Invalid Date' : null}
                      disableToolbar
                      variant="inline"
                      id="date-picker"
                      format="DD/MM/YYYY"
                      label="Select Date"
                      inputVariant="outlined"
                      size="small"
                      value={values.date}
                      onChange={momentObject => {
                        setFieldValue(
                          'date',
                          moment(momentObject)
                            .startOf('day')
                            .valueOf()
                        );
                        setOpenCalendar(false);
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} xl={6}>
                    <Box mt={0.4}>
                      <Button onClick={handleCloseAssign} variant="contained">
                        <Typography component="span" className={classes.iconFont}>
                          Cancel
                        </Typography>
                      </Button>
                    </Box>
                    <Box mt={-4.5} ml={14}>
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        type="submit"
                        isLoading={workoutIsLoading}
                        isValid={isValid}
                        progressSize={20}
                      >
                        <Box component="span" display="flex" justifyContent="center">
                          <SvgIcon className={classes.actionIcon}>
                            <SendIcon fontSize="large" className={classes.iconMiddle} />
                          </SvgIcon>
                          <Typography
                            component="span"
                            className={`${classes.iconMiddle} ${classes.iconFont}`}
                          >
                            Assign
                          </Typography>
                        </Box>
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AssignView;
