import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';

import StackGrid from 'src/components/StackGrid';
import ServiceCardComponent from 'src/components/ServiceCardComponent';
import FilterHeader from 'src/views/management/Services/MainView/FilterHeader';
import Editor from 'src/views/management/Services/MainView/LiveLessons/LiveLessonEditor';
import {
  getLesson,
  LessonServiceDocument,
  LessonServicePayload,
  saveLesson,
  updateLesson
} from 'src/store/management/lessons';
import { ServiceCard } from 'src/components/ServiceCardComponent';
import { defaultInitialValues, InitialValues, ScheduleObject } from './FormModel';
import { EditorType } from 'src/store/management/service';
import Dialog from 'src/components/DialogAlert';
import { DialogContent } from 'src/views/calendar/MainView';
import { DialogType, ToggleButton } from 'src/constants';
import { deleteLessonServices, LessonServiceIds } from 'src/store/management/lessons';
import applyFilters from 'src/views/management/Services/MainView/ApplyFilters';
import { ComponentProps } from 'src/types';
import { getTeamHeirarchy } from 'src/store/management/team';

const useStyles = makeStyles(theme => ({
  progressBox: {
    height: 10,
    width: '100% !important',
    [theme.breakpoints.down('sm')]: { width: '100% !important', float: 'right' }
  }
}));

const LiveLessons: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const { lessonData, isLessonServiceLoading, searchQuery, settings } = useSelector(
    state => ({
      lessonData: state.lesson.lessonData,
      isLessonServiceLoading: state.lesson.isLoading,
      searchQuery: state.service.searchQuery,
      settings: state.account.settings
    }),
    _.isEqual
  );
  const [initialValues, setInitialValues] = useState<InitialValues | null>(null);
  const [type, setType] = useState<EditorType>('new');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonIds, setLessonIds] = useState<LessonServiceIds | null>(null);
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);
  const history = useHistory<LessonServiceDocument | null>();

  const filteredLiveLessons =
    lessonData &&
    applyFilters(lessonData, searchQuery, [
      'name',
      'description',
      'rosterGroup',
      'teamName',
      'schedule',
      'liveSchedule'
    ]);

  useEffect(() => {
    dispatch(getTeamHeirarchy());
  }, [dispatch]);

  const dispatchGetLessons = useCallback(
    isCompleted =>
      dispatch(getLesson(isCompleted ? ToggleButton.COMPLETED : ToggleButton.UPCOMING)),
    [] //eslint-disable-line
  );

  const dispatchUpdateLesson = useCallback((lesson: ServiceCard) => {
    setShowEditor(true);
    const initialValues = handleInitialValues(lesson);
    setInitialValues(initialValues);
    setType('edit');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!showEditor) {
      dispatchGetLessons(isCompleted);
      setInitialValues(null);
    }
  }, [isCompleted, dispatchGetLessons, showEditor, setInitialValues]);

  useEffect(
    () => {
      const data = history.location.state;
      if (data && data.slots) {
        const lessonData: ServiceCard = {
          ...data,
          liveSchedule: data.liveSchedule,
          title: data.name,
          price: data.cost,
          teamId: data.team,
          roster: data.rosterGroup,
          schedule: data.schedule,
          startDate: moment(data.lessonDate).format(settings.dateFormat),
          slotsData: data.slots?.map(slot => {
            return {
              startTime: moment(slot.startTime),
              endTime: moment(slot.endTime),
              booked: slot.booked,
              scheduleLessonId: slot.scheduleLessonId
            };
          }),
          slots: ''
        };
        dispatchUpdateLesson(lessonData);
        history.replace({
          state: null
        });
      }
    }, // eslint-disable-next-line
    [history, dispatchUpdateLesson]
  );

  const handleInitialValues = (lesson: ServiceCard) => {
    const initialValues: InitialValues = {
      liveSchedule: liveScheduleEdit(lesson.liveSchedule),
      schedule: '',
      name: lesson.title ? lesson.title : '',
      cost: lesson.price ? +lesson.price : 0,
      lessonDate: lesson.startDate ? moment(lesson.startDate, settings.dateFormat) : moment(),
      slots: lesson.slotsData ? lesson.slotsData : [],
      description: (lesson.description && lesson.description) || '',
      team: lesson.teamId ? lesson.teamId : '',
      roster: lesson.roster ? (lesson.roster as string[]) : [],
      serviceId: lesson.serviceId,
      removedSlots: []
    };
    return initialValues;
  };

  const liveScheduleEdit = (liveSchedules: ScheduleObject[]) => {
    if (liveSchedules) {
      defaultInitialValues?.liveSchedule?.map(lesson => {
        const filteredItems = liveSchedules?.filter(item => lesson.title === item.title);
        if (filteredItems.length > 0) {
          const selectedItem = filteredItems[0];
          lesson.cost = selectedItem.cost;
          lesson.selected = true;
        }
      });
    }
    return defaultInitialValues.liveSchedule;
  };
  const dispatchCloneLesson = (lesson: ServiceCard) => {
    setShowEditor(true);
    const initialValues = handleInitialValues(lesson);
    setInitialValues(initialValues);
    setType('clone');
  };

  const onEditorSubmit = async (values: InitialValues) => {
    try {
      var scheduleArray = _.filter(values.liveSchedule, function(schedule) {
        return schedule.selected === true;
      });
      values.liveSchedule = scheduleArray;

      const { slots, ...rest } = values;
      const reqObj: LessonServicePayload[] = slots?.map(slot => ({
        ...slot,
        ...rest,
        lessonDate: rest.lessonDate.valueOf(),
        startTime: moment(
          [
            moment(rest.lessonDate.valueOf()).format(settings.dateFormat),
            moment(slot.startTime.valueOf()).format('hh:mm a')
          ].join(' '),
          `${settings.dateFormat} hh:mm a`
        ).valueOf(),
        endTime: moment(
          [
            moment(rest.lessonDate.valueOf()).format(settings.dateFormat),
            moment(slot.endTime.valueOf()).format('hh:mm a')
          ].join(' '),
          `${settings.dateFormat} hh:mm a`
        ).valueOf()
      }));

      switch (type) {
        case 'new':
          await dispatch(saveLesson(reqObj));
          break;

        case 'edit':
          await dispatch(updateLesson(reqObj));
          break;

        case 'clone':
          await dispatch(saveLesson(reqObj));
          break;

        default:
          break;
      }
      setShowEditor(false);
    } catch (error:any) {
      console.error(error);
    }
  };

  const handleDialog = (ids: LessonServiceIds, content: DialogContent) => {
    setLessonIds(ids);
    setIsModalOpen(true);
    setDialogContent(content);
  };

  const liveLesson = (lesson: LessonServiceDocument) => {
    return (
      <ServiceCardComponent
        key={uuidv4()}
        {...{
          liveSchedule: lesson.liveSchedule,
          schedule: '',
          title: lesson.name,
          price: lesson.cost,
          team: lesson.teamName,
          teamId: lesson.team,
          roster: lesson.rosterGroup,
          description: lesson.description,
          serviceId: lesson.serviceId,
          startDate: moment(lesson.lessonDate).format(settings.dateFormat),
          totalSlots: lesson.slots.length,
          bookedSlots: lesson.slots?.filter(slot => slot.booked).length,
          slotsData: lesson.slots?.map(slot => {
            return {
              startTime: moment(slot.startTime),
              endTime: moment(slot.endTime),
              booked: slot.booked,
              scheduleLessonId: slot.scheduleLessonId
            };
          }),
          onEdit: dispatchUpdateLesson,
          onClone: dispatchCloneLesson,
          onDelete: handleDialog
        }}
      />
    );
  };

  return (
    <>
      {!showEditor && (
        <FilterHeader
          isLesson
          iscompleted={isCompleted}
          isSet={false}
          handleAddNew={() => {
            setShowEditor(true);
            setType('new');
          }}
          handleCompletedSwitch={value => {
            setCompleted(value);
          }}
          searchPlaceholder="Search Live Lessons"
        />
      )}
      <Grid container>
        {isLessonServiceLoading && !showEditor ? (
          <Box className={classes.progressBox}>
            <LinearProgress />
          </Box>
        ) : (
          (!showEditor && (
            <>
              {filteredLiveLessons.length ? (
                <StackGrid>{filteredLiveLessons?.map(lesson => liveLesson(lesson))}</StackGrid>
              ) : (
                !isLessonServiceLoading && (
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      {isCompleted ? (
                        <Typography>No Completed Live Lessons found</Typography>
                      ) : (
                        <Typography>No Upcoming Live Lessons found</Typography>
                      )}
                    </Box>
                  </Grid>
                )
              )}
            </>
          )) || (
            <Editor
              handleClose={() => {
                setShowEditor(false);
                setInitialValues(null);
              }}
              type={type}
              initialValues={initialValues}
              onEditorSubmit={onEditorSubmit}
            />
          )
        )}
        {isModalOpen && dialogContent && lessonIds && (
          <Dialog<LessonServiceIds>
            type={DialogType.CONFIRMATION}
            title={dialogContent.title}
            values={lessonIds}
            open={isModalOpen}
            handleCloseDialog={() => setIsModalOpen(false)}
            handleYes={async ids => {
              setIsModalOpen(false);
              await dispatch(deleteLessonServices(ids));
              await dispatchGetLessons(isCompleted);
              setDialogContent(null);
              setLessonIds(null);
            }}
            handleNo={() => {
              setIsModalOpen(false);
              setDialogContent(null);
              setLessonIds(null);
            }}
          >
            <Typography>{dialogContent.description} </Typography>
          </Dialog>
        )}
      </Grid>
    </>
  );
};

export default LiveLessons;
