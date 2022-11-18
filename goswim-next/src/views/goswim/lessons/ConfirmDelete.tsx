import React from 'react';

import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { deleteVideo } from 'src/store/goswim/admin/video';
import { deleteScheduleLesson } from 'src/store/management/goswim/lessons/details/actions';

type PropsFunction = (event: any | null) => void;

const useStyles = makeStyles(theme => ({
  deleteVideo: {
    color: theme.palette.primary.dark
  },
  root: {
    '& .MuiDialogTitle-root': {
      minWidth: '247px',
      height: '50px'
    }
  },
  title: {
    fontSize: '16px'
  },
  deleteBtn: {
    color: theme.palette.common.white
  }
}));
const ConfirmDelete = (props: { open: boolean; close: PropsFunction; id: string | undefined; handleModal:PropsFunction  }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCancel = () => {
    props.close('');
  };
  const deleteOption = () => {
    const lessonId = props.id;
    if(lessonId) dispatch(deleteScheduleLesson(lessonId));
      props.close(true);
  };
  return (
    <Dialog
      maxWidth="xs"
      //onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      className={classes.root}
      //{...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography className={classes.title}>Do you want to delete this scheduled lesson?</Typography>
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={deleteOption}
          color="primary"
          className={classes.deleteBtn}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
