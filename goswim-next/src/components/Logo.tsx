/* eslint-disable import/extensions */
import React from 'react';
import { ComponentProps } from 'src/types/components';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LogoHolder from 'src/components/LogoHolder';

const useStyles = makeStyles(theme => ({
  logoHolder: {
    width: '200px',
    height: '40px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: { justifyContent: 'flex-start', width: '170px' }
  },
  logoBrand: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

const Logo: React.FC<ComponentProps> = props => {
  const classes = useStyles();
  return (
    <Box className={classes.logoHolder}>
      <LogoHolder
        alt="Logo"
        src={`/static/login/goswim_logo_white.svg`}
        {...props}
        className={classes.logoBrand}
      />
    </Box>
  );
};

export default Logo;
