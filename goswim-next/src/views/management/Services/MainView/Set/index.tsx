import React, { useEffect, useCallback, useState } from 'react';
import {
  Grid,
  Box,
  LinearProgress, //Button
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'src/components/StackGrid';
import { ServiceTabs, ServiceEditorStatus } from 'src/store/management/service';
import { ComponentProps } from 'src/types';
import SetsSubCardComponent from 'src/views/management/Services/MainView/Set/SetsSubCardComponent';
import SWEditorContainer from 'src/views/management/Services/MainView/Set/SWEditorContainer';
import { deleteWorkout, getWorkouts } from 'src/store/workout/actions';
import _ from 'lodash';
import { Workout } from 'src/store/workout';
import { useHistory } from 'react-router-dom';
import FilterHeader from 'src/views/management/Services/MainView/FilterHeader';
import { getEnum } from 'src/store/enum';
import ConfirmationDialog from 'src/components/DialogAlert';
import { DialogContent } from 'src/views/calendar/MainView';
import applyFilters from 'src/views/management/Services/MainView/ApplyFilters';
import { CRUD, DialogType } from 'src/constants';

// import Pagination from 'src/views/management/Members/MainViewV1/Result/Pagination';
// import { setLimit, setPage } from 'src/store/management/membersv1';

const useStyles = makeStyles(theme => ({
  paper: { maxWidth: '1200px', top: '25%' },
  progressBox: {
    height: 10,
    width: '100% !important',
    [theme.breakpoints.down('sm')]: { width: '100% !important', float: 'right' }
  },
  stackRoot: {
    width: '100%'
  }
}));

enum ShowStatus {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed'
}

interface SetComponentProps {
  currenttab: ServiceTabs;
}

const Set: React.FC<ComponentProps & SetComponentProps> = ({ currenttab }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isLoading, workoutData, searchQuery } = useSelector(state => {
    return {
      isLoading: state.workout.isLoading || state.team.isLoading,
      workoutData: state.workout.data,
      searchQuery: state.service.searchQuery
    };
  }, _.isEqual);
  const [isCompleted, setCompleted] = React.useState<boolean>(false);
  const [workout, setWorkout] = useState<Workout | null>();
  const [wsEditorStatus, setWsEditorStatus] = useState<ServiceEditorStatus>({ active: false });
  const history = useHistory<Workout | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);

  // //pagination changes
  // const page = useSelector(state => state.members.page);

  // const limit = useSelector(state => state.members.limit);

  // const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
  //   dispatch(setPage(page));
  // };

  // const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   dispatch(setLimit(+event.target.value));
  // };
  const filteredWorkoutData =
    workoutData && applyFilters(workoutData, searchQuery, ['workout_name', 'workout_text', 'team']);

  const handleWsEditorStatus = (statusDetails: ServiceEditorStatus) => {
    setWsEditorStatus({
      ...statusDetails
    });
  };

  const handleDialog = (id: string, content: DialogContent) => {
    setWorkoutId(id);
    setIsModalOpen(true);
    setDialogContent(content);
  };

  const handleAddNewWorkout = () => {
    handleWsEditorStatus({
      active: true,
      serviceType: currenttab,
      editorType: 'new'
    });
  };

  const dispatchGetWorkouts = useCallback(
    isCompleted => dispatch(getWorkouts(isCompleted ? ShowStatus.COMPLETED : ShowStatus.UPCOMING)), //getworkout
    [dispatch]
  );

  const dispatchDeletWorkout = async (_id: string) => {
    try {
      await dispatch(deleteWorkout(_id));
      await dispatchGetWorkouts(isCompleted);
    } catch (error:any) {
      // Need to handle erros.
      console.info(error);
    }
  };

  const dispatchCloneWorkout = (workout: Workout) => {
    handleWsEditorStatus({
      ...wsEditorStatus,
      active: true,
      editorType: 'clone',
      query: workout.workout_text
    });
    setWorkout(workout);
  };

  const handleCompletedSwitch = (value: boolean) => setCompleted(value);

  const dispatchUpdateWorkout = useCallback(
    (workout: Workout) => {
      handleWsEditorStatus({
        ...wsEditorStatus,
        active: true,
        editorType: 'edit',
        query: workout.workout_text
      });
      setWorkout(workout);
    },
    [wsEditorStatus]
  );

  const dispatchViewWorkout = useCallback(
    (workout: Workout) => {
      handleWsEditorStatus({
        ...wsEditorStatus,
        active: true,
        editorType: 'view',
        query: workout.workout_text
      });
      setWorkout(workout);
    },
    [wsEditorStatus]
  );

  const cancelAssign = () => {
    setWorkout(null);
  };

  useEffect(() => {
    dispatchGetWorkouts(isCompleted);
  }, [isCompleted, dispatchGetWorkouts]);

  useEffect(() => {
    dispatch(getEnum());
  }, []); //eslint-disable-line

  useEffect(() => {
    const data = history.location.state;
    if (data?.editorType === 'edit') {
      dispatchUpdateWorkout(data);
      history.replace({
        state: null
      });
    } else if (data?.editorType === 'view') {
      if (data?._id) {
        dispatchViewWorkout(data);
      }
      history.replace({
        state: null
      });
    }
  }, [dispatchUpdateWorkout, dispatchViewWorkout, history]);
  return (
    <>
      {!wsEditorStatus.active && (
        <FilterHeader
          {...{
            iscompleted: isCompleted,
            isSet: true,
            isLesson: false,
            handleCompletedSwitch: handleCompletedSwitch,
            handleAddNew: handleAddNewWorkout,
            searchPlaceholder: 'Search Sets'
          }}
        />
      )}
      <Grid container>
        {wsEditorStatus.active ? (
          <SWEditorContainer
            {...{
              query: wsEditorStatus.query,
              workout,
              editortype: wsEditorStatus.editorType,
              handlewseditorstatus: handleWsEditorStatus,
              cancelAssign,
              handleClose: handleDialog,
              getWorkouts: dispatchGetWorkouts,
              isCompleted: isCompleted,
              handleCompletedSwitch: handleCompletedSwitch
            }}
          />
        ) : isLoading ? (
          <Box className={classes.progressBox}>
            <LinearProgress />
          </Box>
        ) : !filteredWorkoutData.length && !isLoading ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              {isCompleted ? (
                <Typography>No Completed Sets found</Typography>
              ) : (
                <Typography>No Upcoming Sets found</Typography>
              )}
            </Box>
          </Grid>
        ) : (
          <>
            <StackGrid>
              {filteredWorkoutData?.map(workout => (
                <SetsSubCardComponent
                  key={workout._id}
                  {...{
                    ...workout,
                    onClone: dispatchCloneWorkout,
                    onEdit: dispatchUpdateWorkout,
                    onView: dispatchViewWorkout,
                    onDelete: handleDialog,
                    isCompleted: isCompleted
                  }}
                />
              ))}
            </StackGrid>
            {/*For adding load more or pagination in the sets*/}
            {/* <Button>Load more</Button>
            <Pagination {...{ page, limit, handlePageChange, handleLimitChange }} /> */}
          </>
        )}
      </Grid>

      {isModalOpen && dialogContent && (
        <ConfirmationDialog<string>
          type={DialogType.CONFIRMATION}
          title={dialogContent.title}
          values={workoutId}
          open={isModalOpen}
          handleCloseDialog={() => setIsModalOpen(false)}
          handleYes={id => {
            if (dialogContent.title === CRUD.DELETE) {
              dispatchDeletWorkout(id);
            } else if (dialogContent.title === DialogType.CONFIRMATION) {
              handleWsEditorStatus({ active: false, editorType: 'new', query: undefined });
              cancelAssign();
            }
            setIsModalOpen(false);
            setWorkoutId('');
          }}
          handleNo={() => {
            if (dialogContent.title === CRUD.DELETE) {
              setWorkoutId('');
            }
            setIsModalOpen(false);
          }}
        >
          <Typography>{dialogContent.description}</Typography>
        </ConfirmationDialog>
      )}
    </>
  );
};

export default Set;
