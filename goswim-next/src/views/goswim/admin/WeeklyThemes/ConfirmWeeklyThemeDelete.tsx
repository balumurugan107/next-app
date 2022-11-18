import React from 'react';

import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteWeeklyThemes } from 'src/store/goswim/admin/weeklyThemes/actions';

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
const ConfirmWeeklyThemeDelete = (props: {
  open: boolean;
  setConfirmDelete: PropsFunction;
  id: string;
  editModalOpen: PropsFunction;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleCancel = () => {
    props.setConfirmDelete(false);
  };

  const deleteOption = () => {
    const weeklyThemeId = props.id;
    dispatch(deleteWeeklyThemes(weeklyThemeId));
    props.setConfirmDelete(false);
    props.editModalOpen(false);
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
        <Typography className={classes.title}>Delete this Weekly Theme?</Typography>
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

export default ConfirmWeeklyThemeDelete;
