import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  IconButton,
  Typography,
  Hidden,
  Dialog,
  Slide,
  MenuItem,
  Checkbox,
  ListItemText,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import clsx from 'clsx';
import SendIcon from '@mui/icons-material/SendRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import _ from 'lodash';
import moment from 'moment';
import 'moment-duration-format';
import SettingsIcon from '@mui/icons-material/Settings';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { ComponentProps, WorkoutSummary as IWorkoutSummary, KeyValue } from 'src/types';
import ConditionalWrapper from 'src/components/ConditionalWrapper';
import SWEditor from 'src/views/management/Services/MainView/Set/SetWriterEditor';
import {
  Set,
  SetProps,
  TraceItem,
  SWEWorkoutEnumProps,
  MSGPropertyValue,
  SetPropsValues,
  SetPropsEnumProperty
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';
import { ServiceEditorStatus } from 'src/store/management/service';
import { getEnum } from 'src/store/enum';
import SetSummary from 'src/views/management/Services/MainView/Set/Summary/SetSummary';
import { createWorkout, getSwimmers, updateWorkout, Workout } from 'src/store/workout';
import TooltipComponent from 'src/components/Tooltip';
import { EditorType } from 'src/store/management/service/types';
import { EnumResponse } from 'src/store/enum';
import { DialogContent } from 'src/views/calendar/MainView';
import {
  DialogBoxConfimrationText,
  DialogType,
  ITEM_HEIGHT,
  ITEM_PADDING_TOP
} from 'src/constants';
import { useCommonStyles } from 'src/styles/common';
import { sortTeam } from 'src/utils/sortTeam';
import DropDownSpinning from 'src/components/DropDownSpinning';
import { CommonKeywords } from 'src/constants';
import { setTeamValue, TeamRosterValueKeys } from 'src/store/common';
import { SuggestionSettingsView } from 'src/views/management/Services/MainView/Set/SuggestionSettingsView';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { EnumResponseDocument } from 'src/store/enum/types';

interface SWEditorContainerProps {
  query?: string;
  workout?: Workout | null;
  editortype: EditorType | undefined;
  isCompleted: boolean;
  handlewseditorstatus(statusDetails: ServiceEditorStatus): void;
  cancelAssign: () => void;
  handleClose: (id: string, content: DialogContent) => void;
  getWorkouts: (isCompleted: boolean) => void;
  handleCompletedSwitch: (value: boolean) => void;
}

export type EnumLabels = Omit<Record<keyof EnumResponseDocument, string>, 'course_enum'>;

interface WorkoutProps {
  date: number;
  rosterGroup: string[];
  teamId: string;
  workoutName: string;
}

type TimeCalc = Pick<TraceItem, 'distance' | 'multiplier' | 'time'>;

const totalDistanceAndTime = (data: TimeCalc[]) => {
  const newData = data
    ?.map<TimeCalc>(datum => ({
      ...datum,
      distance: datum.multiplier * datum.distance,
      time: datum.multiplier * datum.time
    }))
    .reduce<Pick<TimeCalc, 'distance' | 'time'>>(
      (acc, curr) => {
        if (acc.distance && acc.time) {
          acc = {
            ...acc,
            distance: acc.distance + curr.distance,
            time: acc.time + curr.time
          };
        } else {
          acc = {
            ...curr,
            distance: curr.distance,
            time: curr.time
          };
        }
        return acc;
      },
      { distance: 0, time: 0 }
    );
  return { distance: newData.distance, time: newData.time };
};

export const buildSummary = (
  data: SetProps[],
  type: keyof Omit<SetProps, keyof SetPropsValues>
) => {
  const finalData = data.reduce<
    KeyValue<Pick<SetProps & SetPropsEnumProperty, 'name' | 'interval' | 'value'>>
  >((acc, curr) => {
    const previousValue = acc[curr[type].name];
    if (previousValue) {
      acc[curr[type].name] = {
        ...previousValue,
        interval: previousValue.interval + curr.interval * curr.iteration,
        value: previousValue.value + curr.value
      };
      return acc;
    }
    if (curr[type].id)
      acc[curr[type].name] = {
        ...acc[curr[type].name],
        name: curr[type].name,
        interval: curr.interval * curr.iteration,
        value: curr.value
      };
    return acc;
  }, {});
  return { [type]: Object.values(finalData) };
};

const useStyles = makeStyles(theme => ({
  setContainer: {
    backgroundColor: 'rgba(255,255,255,.25)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#999',
    borderRadius: 4,
    outline: 'none',
    cursor: 'text',
    '& .CodeMirror-line .swe-swimmer-tag': {
      padding: '4px 8px',
      borderRadius: '50px',
      color: theme.palette.mode === 'light' ? '#333' : '#ccc',
      background: theme.palette.mode === 'light' ? '#ccc' : '#333'
    }
  },
  multipleText: {
    cursor: 'text',
    padding: 15,
    height: '350px !important',
    resize: 'none',
    width: '100%',
    fontSize: 18,
    color: theme.palette.primary.main,
    '& .CodeMirror-lines': {
      fontFamily: 'Roboto',
      [theme.breakpoints.down('sm')]: { marginTop: 44 }
    },
    '& .cm-s-material': {
      '&.CodeMirror': {
        height: '100%',
        color: '#999 !important',
        backgroundColor: 'transparent !important'
      }
    }
  },
  sendBtn: {
    position: 'absolute',
    right: 15,
    marginTop: -20
  },
  sendBtnLoading: {
    position: 'absolute',
    right: 30,
    marginTop: -5,
    pointerEvents: 'none'
  },
  closeIconButton: {
    marginTop: 10,
    [theme.breakpoints.down('sm')]: { order: 0, marginLeft: 'inherit' }
  },
  SummaryLgHolder: {
    padding: '0 15 15 15',
    bottom: 200,
    cursor: 'default'
  },
  distanceText: {
    color: '#C6AF43',
    textAlign: 'right',
    fontWeight: 500
  },
  timeText: {
    color: '#ADC743',
    textAlign: 'right',
    fontWeight: 500
  },
  strokeText: {
    color: '#BB739B'
  },
  typeText: {
    color: '#EC7969'
  },
  intensityText: {
    color: '#3C9CEA'
  },
  equipmentText: {
    color: '#A03CEA'
  },
  summaryHtext: {
    textAlign: 'left',
    fontWeight: 500
  },
  summaryValue: {
    textAlign: 'left',
    fontWeight: 500,
    '& span': {
      fontWeight: 500
    }
  },
  keyValue: {
    textAlign: 'left',
    fontWeight: 500,
    '& span': {
      fontWeight: 500,
      display: 'block'
    }
  },
  disTimecol: {
    marginBottom: 25,
    paddingRight: 30
  },
  actionIcons: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 9
  },
  setEditor: {
    position: 'relative'
  },
  mlAuto: {
    marginLeft: 'auto',
    marginTop: -11
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    flexFlow: 'row wrap',
    fontWeight: 500,
    flexDirection: 'column',
    textAlign: 'center'
  },
  disTimeContainer: {
    marginLeft: '-3px !important'
  },
  table: {
    width: '30%',
    '& .MuiTableCell-root': {
      borderBottom: 'none !important'
    }
  },
  hrText: {
    borderTop: '1px solid rgba(0, 0, 0, 0.25)',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    display: 'block',
    textAlign: 'center',
    '& legend': {
      padding: '5px 10px',
      '& span': { fontWeight: 800 }
    }
  },
  legendText: {
    fontSize: '13px',
    padding: '0px 0 0 8px'
  },
  legendHolder: {
    paddingBottom: 15,
    cursor: 'default'
  },
  assignHolder: {
    padding: '0 8px 15px 8px'
  },
  sectionHeader: {
    padding: '15px 0'
  },
  keyHeader: {
    display: 'inline-block'
  },
  iconsBtn: {
    marginLeft: 'auto'
  },
  settingIcon: {
    fill: '#9C9C9C',
    fontSize: 35,
    [theme.breakpoints.down('sm')]: { fontSize: 28 }
  },
  leftBorder: {
    borderLeft: '5px solid',
    paddingLeft: 10
  },
  swForm: { width: 'inherit' },
  margin: {
    marginTop: '0 !important'
  },
  distanceBox: { borderColor: '#C6AF43' },
  timeBox: { borderColor: '#ADC743' },
  strokeBox: { borderColor: '#BB739B' },
  free: { color: '#BB739B', fontWeight: 600, textTransform: 'capitalize' },
  typeBox: { borderColor: '#EC7969' },
  type: { color: '#EC7969', fontWeight: 600, textTransform: 'capitalize' },
  intensityBox: { borderColor: '#3C9CEA' },
  intensity: { color: '#3C9CEA', fontWeight: 600, textTransform: 'capitalize' },
  equipmentBox: { borderColor: '#A03CEA' },
  equipment: { color: '#A03CEA', fontWeight: 600, textTransform: 'capitalize' },
  summaryContainer: {
    paddingTop: 18,
    paddingBottom: 18
  },
  setCodeMirror: {
    '& .CodeMirror-selected': {
      background: 'rgba(0, 0, 0, 0.08) !important'
    },
    '& .CodeMirror-overwrite': {
      '& .CodeMirror-cursor': {
        width: 10,
        backgroundColor: '#FFCC00',
        opacity: 0.7
      }
    }
  },
  paper: { maxWidth: '1200px', top: '25%' }
}));

const enumLabels: EnumLabels = {
  stroke_enum: 'stroke',
  action_enum: 'type',
  intensity_enum: 'intensity',
  equipment_enum: 'equipment'
};

const SWEditorContainer: React.FC<ComponentProps & SWEditorContainerProps> = ({
  query,
  workout,
  handlewseditorstatus,
  editortype,
  cancelAssign,
  handleClose,
  getWorkouts,
  isCompleted,
  handleCompletedSwitch
}) => {
  const {
    enums,
    teamData,
    persistTeam,
    isTeamLoading,
    key,
    swimmers,
    enumIsFetching
  } = useSelector(
    state => ({
      enums: state.enum.data,
      enumIsFetching: state.enum.isFetching,
      isTeamLoading: state.team.isLoading,
      persistTeam: state.common.persist.teamValues,
      teamData: sortTeam(state.team.heirarchyTeams)?.filter(team => team.rosterGroup.length) || [],
      swimmers: state.workout.swimmers,
      key: state.workout.key
    }),
    _.isEqual
  );

  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const [swEditorValue, setSWEditorValue] = useState<TraceItem[]>([]);
  const [isSWEditorError, setSWEditorError] = useState<boolean>(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [workoutSummary, setworkoutSummary] = useState<Partial<IWorkoutSummary>>();
  const [summary, setSummary] = useState<null | Partial<IWorkoutSummary>>(null);
  const [msgSummaryValue, setMSGSummaryValue] = useState<null | MSGPropertyValue[]>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const settings = useSelector(state => state.account.settings);

  const swEditorInstance = useRef<null | CodeMirror.Editor>(null);
  const swEditoryQuery = useRef<string>('');

  const initialValues: WorkoutProps = useMemo(() => {
    const workoutTeam =
      (editortype === 'new' &&
        ((teamData.length === 1 && teamData[0]?._id) ||
          persistTeam[TeamRosterValueKeys.SERVICES_SETS] ||
          teamData[0]?._id)) ||
      (workout ? teamData.find(team => team.name === workout.team)?._id : teamData[0]?._id) ||
      '';
    const roster = teamData.find(team => team._id === workoutTeam)?.rosterGroup || [];
    return {
      workoutName: workout?.workout_name || '',
      date:
        workout?.scheduled_datetime ||
        moment()
          .startOf('day')
          .valueOf(),
      teamId: workoutTeam,
      rosterGroup: workout?.sets_roster_group || roster
    };
  }, [workout, teamData, editortype]); // eslint-disable-line
  const [rosterDropDown, setRosterDropDown] = useState<string[]>([]);
  const [isSugestionSettingsVisible, setSuggestionSettingsVisible] = useState<boolean>(false);
  const handleSubmit = async ({ date, rosterGroup, teamId, workoutName }: WorkoutProps) => {
    if (enums !== null) {
      const data = swEditorValue.reduce<(SetProps & Pick<Set, 'swimmers'>)[]>((acc, curr) => {
        return acc.concat(
          curr.setProps?.map(datum => {
            if (curr.swimmers) {
              return {
                ...datum,
                value: datum.value * curr.multiplier,
                swimmers: curr.swimmers
              };
            }
            return {
              ...datum,
              value: datum.value * curr.multiplier
            };
          })
        );
      }, []);
      const request = {
        workout_name: workoutName,
        scheduled_date_time: date,
        workout_text: swEditoryQuery.current,
        team: teamId,
        data: data
          ?.map(datum => {
            const returnValue: any = { ...datum };
            returnValue.distance = datum.value;
            returnValue.roster_group = rosterGroup;
            returnValue.stroke = datum.stroke.id;
            returnValue.intensity = datum.intensity.id;
            returnValue.equipment = datum.equipment.id;
            returnValue.type = datum.type.id;
            returnValue.interval = datum.interval * datum.iteration;
            delete returnValue.value;
            return returnValue;
          })
          ?.map(req => {
            Object.keys(req).forEach(key => {
              if (req[key] === '') delete req[key];
            });
            return req;
          })
      };
      if (editortype === 'new' || editortype === 'clone') {
        await dispatch(createWorkout<typeof request>(request));
      } else if (editortype === 'edit' && workout) {
        await dispatch(updateWorkout<typeof request>(request, workout._id));
      }

      // setAssign(false);
      handleCloseServiceEditor();
      handleCompletedSwitch(false);
      !isCompleted && getWorkouts(false);
    }
  };

  useEffect(() => {
    /* get enums on mount */
    dispatch(getEnum());
  }, []); // eslint-disable-line

  useEffect(() => {
    let summaryData: Partial<IWorkoutSummary> = {};
    const nonErrorValue = swEditorValue?.filter(value => !value.isError);
    const timeData = totalDistanceAndTime(
      nonErrorValue?.map(({ distance, time, multiplier }) => ({ distance, time, multiplier }))
    );
    const setProps = nonErrorValue.reduce<SetProps[]>((acc, curr) => {
      acc = [
        ...acc,
        ...curr.setProps?.map(setProp => ({
          ...setProp,
          value: curr.multiplier * setProp.value,
          interval: curr.multiplier * setProp.interval
        }))
      ];
      return acc;
    }, []);

    const stroke = buildSummary(setProps, 'stroke');
    const type = buildSummary(setProps, 'type');
    const intensities = buildSummary(setProps, 'intensity');
    const equipment = buildSummary(setProps, 'equipment');
    summaryData = {
      ...summaryData,
      ...intensities,
      ...equipment,
      ...timeData,
      ...stroke,
      ...type
    };
    setworkoutSummary(summaryData);
  }, [swEditorValue]);

  useEffect(() => {
    let summaryData: Partial<IWorkoutSummary> = {};
    const setProps = swEditorValue
      ?.filter(editorValue => editorValue.line === activeLine && !editorValue.isError)
      ?.reduce<SetProps[]>((acc, curr) => {
        return [
          ...acc,
          ...curr.setProps?.map(setProp => ({
            ...setProp,
            value: curr.multiplier * setProp.value,
            interval: curr.multiplier * setProp.interval
          }))
        ];
      }, []);

    const stroke = buildSummary(setProps, 'stroke');
    const type = buildSummary(setProps, 'type');
    const intensity = buildSummary(setProps, 'intensity');
    const equipment = buildSummary(setProps, 'equipment');
    if (activeLine !== null) {
      const editorValue = swEditorValue.find(editorValue => editorValue.line === activeLine);
      summaryData = {
        distance: (editorValue && editorValue.multiplier * editorValue.distance) || 0,
        time: (editorValue && editorValue.multiplier * editorValue.time) || 0,
        ...stroke,
        ...type,
        ...intensity,
        ...equipment
      };
      if (
        !summaryData.distance &&
        !summaryData.time &&
        !summaryData.stroke?.length &&
        !summaryData.type?.length &&
        !summaryData.intensity?.length &&
        !summaryData.equipment?.length
      ) {
        setSummary(null);
      } else {
        setSummary(summaryData);
      }
    }
  }, [swEditorValue, activeLine]); // eslint-disable-line

  useEffect(() => {
    const roster = teamData.find(team => team._id === initialValues.teamId)?.rosterGroup || [];
    setRosterDropDown(roster);
    dispatch(
      getSwimmers({
        teamId: initialValues.teamId,
        roster: (!!initialValues.rosterGroup.length && initialValues.rosterGroup) || roster
      })
    );
  }, [initialValues.teamId]); // eslint-disable-line

  const returnWorkoutEnumArray = (enumsArray?: EnumResponse[]) => {
    return (
      enumsArray?.reduce<SWEWorkoutEnumProps[]>((acc, curr) => {
        if (curr._id) {
          return acc.concat({
            id: curr._id,
            name: curr.full_name,
            shortForm: curr.short_name
          });
        }
        return acc;
      }, []) || []
    );
  };

  const handleCloseServiceEditor = () => {
    handlewseditorstatus({ active: false, editorType: 'new', query: undefined });
    cancelAssign();
  };

  const handleSugestionSettings = (state: boolean) => {
    setSuggestionSettingsVisible(state);
  };

  const WorkoutSummary = () =>
    workoutSummary?.distance && workoutSummary.time ? (
      <Grid className={classes.SummaryLgHolder} item xs={12}>
        <fieldset className={classes.hrText}>
          <legend>
            <Typography component="span">WORKOUT SUMMARY</Typography>
          </legend>
        </fieldset>

        <Grid container spacing={2} className={classes.summaryContainer}>
          <Grid className={classes.disTimeContainer} item xs={6} sm={4} md={4} lg={2} xl={2}>
            <Box className={clsx(classes.disTimecol, classes.distanceBox, classes.leftBorder)}>
              <Typography component="span" className={classes.distanceText}>
                DISTANCE
              </Typography>
              <Typography component="div" className={classes.summaryValue}>
                {workoutSummary?.distance}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
            <Box className={clsx(classes.disTimecol, classes.leftBorder, classes.timeBox)}>
              <Typography component="span" className={classes.timeText}>
                TIME
              </Typography>
              <Typography className={classes.summaryValue}>
                {workoutSummary?.time &&
                  moment.duration(workoutSummary?.time, 'seconds').format('mm:ss')}
              </Typography>
            </Box>
          </Grid>
          {workoutSummary?.stroke?.length ? (
            <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
              <Box className={clsx(classes.chipContainer, classes.leftBorder, classes.strokeBox)}>
                <Typography
                  component="span"
                  className={clsx(classes.summaryHtext, classes.strokeText)}
                >
                  STROKES
                </Typography>
                {workoutSummary?.stroke?.map((datum, index) => (
                  <Box className={classes.summaryValue} key={index}>
                    <Typography component="div" className={classes.free}>
                      {datum?.name}
                    </Typography>
                    <Typography component="span">{datum?.value}</Typography>
                    <Typography component="span">/</Typography>
                    <Typography component="span">
                      {datum?.interval &&
                        moment.duration(datum.interval, 'seconds').format('mm:ss')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          ) : null}
          {workoutSummary?.type?.length ? (
            <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
              <Box className={clsx(classes.chipContainer, classes.leftBorder, classes.typeBox)}>
                <Typography
                  component="span"
                  className={clsx(classes.summaryHtext, classes.typeText)}
                >
                  TYPES
                </Typography>
                {workoutSummary?.type?.map((datum, index) => (
                  <Box className={classes.summaryValue} key={index}>
                    <Typography component="div" className={classes.type}>
                      {datum?.name}
                    </Typography>
                    <Typography component="span">{datum?.value}</Typography>
                    <Typography component="span">/</Typography>
                    <Typography component="span">
                      {datum?.interval &&
                        moment.duration(datum.interval, 'seconds').format('mm:ss')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          ) : null}
          {workoutSummary?.intensity?.length ? (
            <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
              <Box
                className={clsx(classes.chipContainer, classes.leftBorder, classes.intensityBox)}
              >
                <Typography
                  component="span"
                  className={clsx(classes.summaryHtext, classes.intensityText)}
                >
                  INTENSITIES
                </Typography>
                {workoutSummary?.intensity?.map((datum, index) => (
                  <Box className={classes.summaryValue} key={index}>
                    <Typography component="div" className={classes.intensity}>
                      {datum?.name}
                    </Typography>
                    <Typography component="span">{datum?.value}</Typography>
                    <Typography component="span">/</Typography>
                    <Typography component="span">
                      {datum?.interval &&
                        moment.duration(datum.interval, 'seconds').format('mm:ss')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          ) : null}
          {workoutSummary?.equipment?.length ? (
            <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
              <Box
                className={clsx(classes.chipContainer, classes.leftBorder, classes.equipmentBox)}
              >
                <Typography
                  component="span"
                  className={clsx(classes.summaryHtext, classes.equipmentText)}
                >
                  EQUIPMENT
                </Typography>
                {workoutSummary?.equipment?.map((datum, index) => (
                  <Box className={classes.summaryValue} key={index}>
                    <Typography component="div" className={classes.equipment}>
                      {datum?.name}
                    </Typography>
                    <Typography component="span">{datum?.value}</Typography>
                    <Typography component="span">/</Typography>
                    <Typography component="span">
                      {datum?.interval &&
                        moment.duration(datum.interval, 'seconds').format('mm:ss')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    ) : null;

  const isButtonDisabled = !workoutSummary?.distance || !workoutSummary.time;

  return (
    <Formik<WorkoutProps>
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        // workoutName: Yup.string()
        //   .max(255)
        //   .required('Workout Name is required'),
        teamId: Yup.string()
          .max(255)
          .nullable()
          .required('Team is required'),
        rosterGroup: Yup.string()
          .nullable()
          .required('Roster Group is required'),
        date: Yup.number()
          .nullable()
          .required('Date is Required')
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={classes.swForm}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid className={classes.assignHolder} item xs={12} sm={12} md={7} lg={9} xl={9}>
                <h3 className={classes.sectionHeader}>Assign</h3>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Workout Name *"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      name="workoutName"
                      disabled={editortype === 'view'}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Group *" //Team
                      variant="outlined"
                      select
                      fullWidth
                      disabled={editortype === 'view'}
                      name="team"
                      value={isTeamLoading ? 'Loading' : values.teamId}
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
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('teamId', event.target.value);
                        const roster =
                          teamData.find(team => team._id === event.target.value)?.rosterGroup || [];
                        setFieldValue('rosterGroup', roster);
                        setRosterDropDown(roster);
                        dispatch(getSwimmers({ teamId: event.target.value, roster }));
                        dispatch(
                          setTeamValue({
                            [TeamRosterValueKeys.SERVICES_SETS]: event.target.value
                          })
                        );
                      }}
                    >
                      {isTeamLoading ? (
                        <MenuItem key="Loading" value="Loading">
                          <DropDownSpinning />
                        </MenuItem>
                      ) : (
                        teamData?.map((option, index) => (
                          <MenuItem key={index} value={option?._id}>
                            {option?.name}
                          </MenuItem>
                        ))
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Select Roster Group *"
                      variant="outlined"
                      disabled={editortype === 'view'}
                      select
                      fullWidth
                      name="roster"
                      value={isTeamLoading ? ['Loading'] : values.rosterGroup}
                      SelectProps={{
                        MenuProps: {
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
                        },
                        onChange: (
                          event: React.ChangeEvent<{ name?: string; value: unknown }>,
                          _child: React.ReactNode
                        ) => {
                          const roster = event.target.value as string[];
                          if (roster.includes(CommonKeywords.ALL)) {
                            const rosterALL =
                              rosterDropDown.length === values.rosterGroup.length
                                ? []
                                : rosterDropDown;
                            setFieldValue('rosterGroup', rosterALL);
                            dispatch(
                              getSwimmers({ teamId: initialValues.teamId, roster: rosterALL })
                            );
                          } else {
                            setFieldValue('rosterGroup', roster);
                            dispatch(getSwimmers({ teamId: initialValues.teamId, roster }));
                          }
                          return;
                        },
                        multiple: true,
                        renderValue: (_selected: unknown) => {
                          const isAllRosterSelected =
                            rosterDropDown.length === values.rosterGroup.length;
                          return isTeamLoading ? (
                            <DropDownSpinning />
                          ) : isAllRosterSelected ? (
                            'All'
                          ) : (
                            values.rosterGroup.join(', ')
                          );
                        }
                      }}
                    >
                      {isTeamLoading ? (
                        <MenuItem key="Loading" value="Loading">
                          <DropDownSpinning />
                        </MenuItem>
                      ) : (
                        [
                          <MenuItem key={CommonKeywords.ALL} value={CommonKeywords.ALL}>
                            <Checkbox
                              checked={values.rosterGroup.length === rosterDropDown.length}
                            />
                            <ListItemText primary={CommonKeywords.ALL.toUpperCase()} />
                          </MenuItem>,
                          [...rosterDropDown]
                            ?.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
                            ?.map((roster, index) => (
                              <MenuItem key={index} value={roster}>
                                <Checkbox checked={values.rosterGroup.indexOf(roster) > -1} />
                                <ListItemText primary={roster} />
                              </MenuItem>
                            ))
                        ]
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                      <Field
                        className={classes.margin}
                        component={KeyboardDatePicker}
                        disableToolbar
                        autoOk
                        fullWidth
                        label="Select Date"
                        variant="inline"
                        inputVariant="outlined"
                        format={settings.dateFormat}
                        margin="dense"
                        name="date"
                        disabled={editortype === 'view'}
                        onChange={(momentObj: MaterialUiPickersDate) => {
                          setFieldValue(
                            'date',
                            moment(momentObj)
                              .startOf('day')
                              .valueOf()
                          );
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.setEditor} xs={12} sm={12} md={7} lg={9} xl={9}>
                <Box className={`${classes.mlAuto} ${classes.actionIcons}`} mt={2}>
                  <TooltipComponent title="Close">
                    <IconButton
                      className={classes.closeIconButton}
                      onClick={() => {
                        if (
                          editortype !== 'view' &&
                          (swEditorValue.length ||
                            editortype === 'edit' ||
                            editortype === 'clone') &&
                          isEdited
                        ) {
                          const id = workout ? workout._id : '';
                          handleClose(id, {
                            title: DialogType.CONFIRMATION,
                            description: DialogBoxConfimrationText.CLOSE
                          });
                        } else {
                          handleCloseServiceEditor();
                        }
                      }}
                      size="large">
                      <CancelIcon className={commonClasses.cancelColor} fontSize="large" />
                    </IconButton>
                  </TooltipComponent>
                </Box>
                <Grid className={classes.setContainer}>
                  <Grid item xs={12}>
                    <SWEditor<ComponentProps>
                      /* key added to rerender SWE on swimmer list changes */
                      key={key}
                      query={query || ''}
                      workoutEnums={{
                        strokes: returnWorkoutEnumArray(enums?.stroke_enum),
                        intensities: returnWorkoutEnumArray(enums?.intensity_enum),
                        equipment: returnWorkoutEnumArray(enums?.equipment_enum),
                        swimTypes: returnWorkoutEnumArray(enums?.action_enum)
                      }}
                      swimmers={swimmers}
                      editorInstance={swEditorInstance}
                      onErrorStatusChange={status => setSWEditorError(status)}
                      onValueChange={value => {
                        setSWEditorValue(value);
                        if ((editortype === 'edit' || editortype === 'clone') && !isEditable) {
                          setIsEditable(true);
                        } else {
                          setIsEdited(true);
                        }
                      }}
                      onMSGValueChange={value => setMSGSummaryValue(value)}
                      onLineChange={line => setActiveLine(line)}
                      onQueryChange={query => {
                        swEditoryQuery.current = query;
                      }}
                      className={clsx(classes.multipleText, classes.setCodeMirror)}
                      readOnly={editortype === 'view'}
                    />
                    <Grid container>
                      <Grid item className={classes.legendHolder} xs={12}>
                        <Typography className={classes.legendText} component="span">
                          x - Distance multiplication @ - Time # - Select specific swimmer
                        </Typography>
                        {isSubmitting ? (
                          <CircularProgress
                            size={26}
                            className={classes.sendBtnLoading}
                            thickness={5}
                          />
                        ) : (
                          (editortype !== 'view' && (
                            <ConditionalWrapper
                              condition={!isSWEditorError}
                              wrapper={children => (
                                <TooltipComponent title="Proceed">{children}</TooltipComponent>
                              )}
                            >
                              <IconButton
                                color="secondary"
                                className={classes.sendBtn}
                                type="submit"
                                disabled={isButtonDisabled}
                                size="large">
                                <SendIcon fontSize="large" />
                              </IconButton>
                            </ConditionalWrapper>
                          )) ||
                          null
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {swEditoryQuery.current && <WorkoutSummary />}
                </Grid>
              </Grid>
              <Hidden mdDown>
                {swEditoryQuery.current && (
                  <SetSummary
                    summary={
                      summary || msgSummaryValue?.find(datum => activeLine === datum.line) || null
                    }
                  />
                )}
              </Hidden>

              <Grid item className={classes.assignHolder} xs={12} sm={12} md={7} lg={9} xl={9}>
                <h3 className={(classes.sectionHeader, classes.keyHeader)}>Keywords</h3>
                <TooltipComponent title="Settings">
                  <IconButton
                    className={classes.iconsBtn}
                    onClick={() => setSuggestionSettingsVisible(true)}
                    size="large">
                    <SettingsIcon className={classes.settingIcon} />
                  </IconButton>
                </TooltipComponent>
                <Dialog
                  maxWidth="md"
                  fullWidth
                  open={isSugestionSettingsVisible}
                  classes={{ paper: classes.paper }}
                  disableAutoFocus
                  TransitionComponent={Slide}
                  transitionDuration={500}
                  onBackdropClick={() => setSuggestionSettingsVisible(false)}
                >
                  <SuggestionSettingsView {...{ handleSugestionSettings }} />
                </Dialog>
                {enumIsFetching ? (
                  <Box mt={3}>
                    <LinearProgress />
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {(Object.keys(enumLabels) as (keyof EnumLabels)[]).map(datum => (
                      <Grid key={Math.random()} item xs={6} sm={2} md={3} lg={3} xl={3}>
                        <Box
                          className={clsx(
                            classes.disTimecol,
                            classes.leftBorder,
                            classes[
                              `${enumLabels[datum]}Box` as
                                | 'strokeBox'
                                | 'typeBox'
                                | 'intensityBox'
                                | 'equipmentBox'
                            ]
                          )}
                        >
                          <Typography
                            component="span"
                            className={clsx(
                              classes.summaryHtext,
                              classes[
                                `${enumLabels[datum]}Text` as
                                  | 'strokeText'
                                  | 'typeText'
                                  | 'intensityText'
                                  | 'equipmentText'
                              ]
                            )}
                          >
                            {enumLabels[datum].toUpperCase()}
                          </Typography>
                          <Box className={classes.keyValue}>
                            {enums?.[datum]
                              ?.filter(
                                enumDatum =>
                                  enumDatum.full_name.trim() && enumDatum.short_name.trim()
                              )
                              ?.map(enumDatum => (
                                <Typography key={Math.random()} component="span">
                                  {enumDatum.full_name} | {enumDatum.short_name}
                                </Typography>
                              ))}
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SWEditorContainer;
