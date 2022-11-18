import React from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const useStyles = makeStyles(theme => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: '16px',
    borderBottom: '1px solid #e1e1e1'
  },

  dialogTitle: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600
  },
  dialogContent: {
    padding: '10px 16px !important',
    overflow: 'hidden'
  },
  warningIcon: {
    color: theme.palette.text.secondary,
    width: '100%',
    fontSize: '100px'
  }
}));

type PropsFunction = (event: any | null) => void;
const RenewSubscription = (props: {
  open: boolean;
  setOpen: PropsFunction;
  // addEditToggle: string;
  // weeklyThemeId: string;
}) => {
  const classes = useStyles();
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div className={classes.top}>
          <Typography variant="h1" id="form-dialog-title" className={classes.dialogTitle}>
            Renew Subscription
          </Typography>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ErrorOutlineIcon fontSize="large" className={classes.warningIcon} />
            Your Subscription was expired, Please Renew the Subscription to Continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RenewSubscription;
