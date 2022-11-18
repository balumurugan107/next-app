import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Link from 'src/components/Link';
const useStyles = makeStyles(theme => ({
  cookieWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    maxWidth: 350,
    background: theme.palette.background.paper,
    margin: '0 0 8px 8px',
    borderRadius: 16,
    boxShadow: theme.shadows[4],
    transition: 'transform ease 1s',
    transform: 'translateY(100%)',
    opacity: 0,
    zIndex: 2000,
    '& .MuiDialogTitle-root': {
      fontSize: theme.spacing(2),
      color: theme.palette.text.primary
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiDialogActions-root': {
        justifyContent: 'flex-start'
      }
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2)
    },
    '& button': {
      width: '100%',
      color: theme.palette.common.white
    }
  },
  show: {
    transform: 'translate(0, 0)',
    opacity: 1
  },
  desc: {
    paddingBottom: 0,
    '& p': {
      color: theme.palette.text.primary
    },
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));
const CookieModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    window.localStorage.setItem('goswim-cookie', JSON.stringify(true));
    setOpen(false);
  };
useEffect(() => {
  const accepted = window.localStorage.getItem('goswim-cookie')
  setOpen(!accepted? true : false)
}, [])
  return (
    <Box className={open ? `${classes.cookieWrapper} ${classes.show}` : classes.cookieWrapper}>
      <DialogTitle>THIS WEBSITE USES COOKIES</DialogTitle>
      <DialogContent className={classes.desc}>
        <DialogContentText>
          GoSwim uses cookies on its websites to personalize content and to analyze our traffic.
          By clicking to allow cookies below, you are consenting to use of cookies as described
          in our <Link href="/cookie_policy"> Cookie Policy</Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {false && (
          <Button variant="outlined" onClick={handleClose}>
            Customize
          </Button>
        )}
        <Button variant="contained" onClick={handleClose}>
          Accept
        </Button>
      </DialogActions>
    </Box>
  );
};
export default CookieModal;
