import React, { useState } from 'react';
import { TextareaAutosize, Box, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { useCommonStyles } from 'src/styles/common';
import { NotesData, updateNotes } from 'src/store/calendar/scheduleOverview';
import { ServiceName } from 'src/constants';
import { getLessonBookingList } from 'src/store/calendar/lesson';
import { getSubscribers } from 'src/store/calendar/subscribers';

export interface CoachProps extends NotesData {
  dispatchOverview?: () => Promise<void>;
  roster?: string[];
  teamId?: string;
}
const useStyles = makeStyles(theme => ({
  resize: {
    resize: 'vertical',
    paddingLeft: 4,
    paddingTop: 4,
    paddingRight: 50,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: 'unset'
    },
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(224, 224, 224, 1)',
    fontFamily: 'Roboto',
    '&:focus': {
      outline: 'none',
      border: '1px solid rgba(0,0,0,0.5)'
    }
  }
}));
const CoachNotes = React.memo<CoachProps>(
  ({
    dispatchOverview,
    swimmer_notes,
    teamId,
    roster,
    swimmer_id,
    service_id,
    serviceType,
    lesson_date
  }) => {
    const commonClasses = useCommonStyles();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [notes, setNotes] = useState<string>(swimmer_notes || '');
    const [focus, setFocus] = useState<boolean>(false);
    const handleNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFocus(true);
      setNotes(event.target.value);
    };

    const handleUpdateNotes = () => {
      dispatch(
        updateNotes({
          swimmer_id,
          service_id,
          swimmer_notes: notes,
          serviceType,
          lesson_date
        })
      );
      switch (serviceType) {
        case ServiceName.WORKOUTS:
          dispatchOverview && dispatchOverview();
          break;

        case ServiceName.LIVE_LESSONS:
          teamId &&
            roster &&
            dispatch(
              getLessonBookingList({
                teamId,
                serviceId: service_id,
                roster,
                lessonDate: lesson_date
              })
            );
          break;

        case ServiceName.VIDEO_REVIEW:
          dispatch(getSubscribers(service_id));
          break;

        default:
          break;
      }
    };

    return (
      <Box position="relative">
        <TextareaAutosize
          aria-label="Add notes"
          minRows={2}
          value={notes}
          className={classes.resize}
          onChange={handleNotes}
        />
        {focus && (
          <Box position="absolute" top="0" right="8px">
            <IconButton
              className={clsx(commonClasses.colorSuccess, commonClasses.notesIcons)}
              onClick={handleUpdateNotes}
              size="large">
              <DoneIcon />
            </IconButton>
            <IconButton
              className={clsx(commonClasses.colorError, commonClasses.notesIcons)}
              onClick={() => {
                setNotes('');
              }}
              size="large">
              <ClearIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  }
);

export default CoachNotes;
