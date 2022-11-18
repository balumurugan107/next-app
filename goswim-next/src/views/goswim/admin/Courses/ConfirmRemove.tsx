import React from 'react';

import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeLessonFromCourse } from 'src/store/goswim/admin/lesson/actions';

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
const ConfirmRemove = (props: {
  open: boolean;
  close: PropsFunction;
  id: any;
  courseId: string | undefined;
  setConfirmDelete: PropsFunction;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {id,courseId} = props;
  const handleCancel = () => {
    props.close('');
  };

  const deleteOption = () => {
      if(courseId && id) dispatch(removeLessonFromCourse(id, courseId));
        props.setConfirmDelete(false);
  };
  return (
    <Dialog
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      className={classes.root}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography className={classes.title}>Remove this course?</Typography>
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={deleteOption}
          className={classes.deleteBtn}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmRemove;
