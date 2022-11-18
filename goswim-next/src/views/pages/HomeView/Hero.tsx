import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Box, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/store/account';
import Fade from 'react-reveal/Fade';
const useStyles = makeStyles(theme => ({
  root: {
    background: `url('/static/images/covers/homeBg.webp')`,
    backgroundSize: 'cover',
    paddingTop: 50,
    paddingBottom: 50,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    // height: 'calc(100vh - 64px)',
    height: '500px',
    [theme.breakpoints.down('lg')]: {
      paddingTop: 20,
      paddingBottom: 20,
      height: 'inherit'
    }
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  },
  homeBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    '& > img': {
      width: '100%'
    }
  },
  title: {
    color: theme.palette.common.white,
    fontSize: '3vw !important',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: 40
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 22
    }
  },
  descWrapper:{
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
    flexDirection:"column-reverse"
  },
  desc: {
    color: theme.palette.common.white,
    maxWidth: '70%',
    textAlign: 'center',
    margin: 'auto !important',
    fontSize: '1.4vw !important',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      fontSize: '1rem'
    }
  },
  textArea: {
    margin: 0
  },
  textBox: {
    margin: 0,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(1)
    }
  },
  notificationText: {
    color: theme.palette.text.secondary,
    marginLeft: '5px'
  },
  subscriberTerms: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      display: 'inherit',
      marginBottom: theme.spacing(1)
    }
  },
  createAccount: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '10px'
  },
  createButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px'
  },
  formWrapper: {
    padding: theme.spacing(3)
  }
}));

const Hero: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const [cacheCleared, setCacheCleared] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Fade top>
                <Typography
                  variant="h1"
                  className={classes.title}
                >
                  Become A Better Swimmer
                </Typography>
              </Fade>
              <Fade>
                <Box mt={3} mb={3}>
                <div className={classes.descWrapper}>
                  <Typography
                    variant="body1"
                    className={classes.desc}
                  >
                    Subscribe to GoSwim and gain access to thousands of videos that will help
                    increase your swimming knowledge. Find the techniques and fine points that will
                    help you individualize your stroke for better performance.
                  </Typography>
                  </div>
                </Box>
                <Box>
                <div className={classes.descWrapper}>
                  <Typography
                    variant="body1"
                    className={classes.desc}
                  >
                    The more you know, the faster you’ll go
                  </Typography>
                  </div>
                </Box>
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hero;
