import React from 'react';

import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription } from 'src/store/subscriptions';
import LoadingButton from 'src/components/LoadingButton';

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
  },
  loadingBtn:{
      padding: 0
  }
}));
type PropsFunction = (event: boolean) => void;
const ConfirmCancel = (props: { open: boolean,setOpen: PropsFunction}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.subscription)

  const handleCancel = () => {
    props.setOpen(false);
  };
  const cancelOption = () => {
      dispatch(cancelSubscription(true))
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
        <Typography className={classes.title}>Are you sure? Do you want to cancel subscription?</Typography>
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          No
        </Button>
        <LoadingButton
              color="primary"
              type="submit"
              variant="contained"
              isLoading={isLoading}
              isValid={true}
              progressSize={20}
              onClick={cancelOption}
              className={classes.loadingBtn}
            >
              <Button className={classes.deleteBtn}>
                Yes
              </Button>
            </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmCancel;
