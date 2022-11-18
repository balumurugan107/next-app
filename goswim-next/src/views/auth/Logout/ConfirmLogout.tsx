import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { logout } from 'src/store/account';

type PropsFunction = (event: any | null) => void;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialogTitle-root': {
      minWidth: '247px',
      height: '50px'
    }
  },
  title: {
    fontSize: '0.875rem'
  },
  titleHead: {
    fontSize: '1rem',
    fontWeight: 500
  },
  deleteBtn: {
    color: theme.palette.common.white
  }
}));
const ConfirmLogout = (props: {
  open: boolean;
  close: PropsFunction;
  setAnchorEl?: PropsFunction;
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleCancel = () => {
    props.close('');
    if (props?.setAnchorEl) props.setAnchorEl(null);
  };

  function deleteCookies() {
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++)
      document.cookie = allCookies[i] + '=;expires=' + new Date(0).toUTCString();
  }

  const handleLogout = () => {
    Router.push(`/users/sign_in`)
    // setAnchorEl(null);
    dispatch(logout());
    deleteCookies();
  };

  return (
    <Dialog
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      className={classes.root}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography className={classes.titleHead}>Log Out</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.title}>
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLogout}
          color="primary"
          size="small"
          className={classes.deleteBtn}
        >
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLogout;
