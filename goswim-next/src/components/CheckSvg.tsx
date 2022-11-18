import React from 'react';
import { Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  checkmark: {
    fontSize: '30px !important',
    width: 30,
    height: 30,
    borderRadius: '50%',
    display: 'block',
    strokeWidth: 4,
    stroke: '#ffffff',
    boxShadow: 'inset 0px 0px 0px #333333',
    animation: 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both'
  },

  checkmarkCheck: {
    stroke: theme.palette.background.dark,
    strokeLinecap: 'round',
    strokeDasharray: 1000,
    strokeDashoffset: 0,
    animationDuration: '4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 1,
    animationName: '$tick'
  },
  '@keyframes tick': {
    '0%': {
      strokeDashoffset: 1000
    },
    '100%': {
      strokeDashoffset: 0
    }
  }
}));

const SaveButton = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      component="span"
      width={20}
      height={20}
    >
      <svg
        width={22}
        height={20}
        viewBox="13 17 25 25"
        className={classes.checkmark}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={classes.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </Box>
  );
};
export default SaveButton;
