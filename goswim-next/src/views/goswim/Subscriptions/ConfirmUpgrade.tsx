import React from 'react';

import { Button, DialogActions, DialogContent, DialogTitle, Typography, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IGetSubscriptionProducts, upgradeSubscription } from 'src/store/subscriptions';
import LoadingButton from 'src/components/LoadingButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  deleteVideo: {
    color: theme.palette.primary.dark
  },
  root: {
    '& .MuiDialogTitle-root': {
      minWidth: '247px',
      height: '60px'
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
const ConfirmUpgrade = (props: { open: boolean,setOpen: PropsFunction, subscription: IGetSubscriptionProducts}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.subscription)

  const handleCancel = () => {
    props.setOpen(false);
  };
  const upgradePlan = () => {
    dispatch(upgradeSubscription(props.subscription.price.id));
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
     <Typography className={classes.title} variant='h3'>Upgrade Confirmation</Typography>
     </DialogTitle>
     <DialogContent id="confirmation-dialog-content">
        <Typography className={classes.title}>Do you want to upgrade your plan to {props.subscription.name}?</Typography>
    </DialogContent>
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
              onClick={upgradePlan}
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

export default ConfirmUpgrade;
