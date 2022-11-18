import React from 'react';
import clsx from 'clsx';
import { Box, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(0),
    minHeight: '320px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      paddingTop: 20,
      paddingBottom: 20,
      minHeight: 'initial'
    },
    '& dt': {
      marginTop: theme.spacing(2)
    }
  },
  title: {
    color: theme.palette.text.primary
    // fontSize: '24px'
  },
  desc: {
    color: theme.palette.text.primary
  },
  mobileBnr: {
    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
      width: '100%'
    }
  },
  playStoreIcon: {
    height: theme.spacing(5),
    marginLeft: theme.spacing(2)
  },
  imgWrapper: {
    cursor: 'pointer'
  }
}));

const FAQS: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Box>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h1" className={classes.title}>
                COACHES CAN SHARE VIDEOS WITH THEIR SWIMMERS EVERY DAY.
              </Typography>
              <Box mt={3} mb={3}>
                <Typography variant="body1" className={classes.desc}>
                  The Coach can shape the technique education to their athletes and seasonal plan.
                </Typography>
              </Box>
              <Box mt={3} mb={3}>
                <Typography variant="body1" className={classes.desc}>
                  When the coach shares technique videos with the athletes BEFORE practice, the
                  coach can spend less time explaining a skill, and more time practicing that skill.
                </Typography>
              </Box>
              <Box mt={3} mb={3}>
                <Typography variant="body1" className={classes.desc}>
                  Check out all the features below in more detail.
                </Typography>
              </Box>
              <span
                onClick={() =>
                  window.open(
                    'https://apps.apple.com/us/app/goswim-learn-better-technique/id1482151723',
                    '_blank'
                  )
                }
                className={classes.imgWrapper}
              >
                <img src="/static/images/app-store-btn-white.svg" alt="apple-store" />
              </span>
              <span
                onClick={() =>
                  window.open(
                    'https://play.google.com/store/apps/details?id=tv.goswim.development',
                    '_blank'
                  )
                }
                className={classes.imgWrapper}
              >
                <img src="/static/images/playstore.png" alt="" className={classes.playStoreIcon} />
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src="/static/images/home-app-hero-with-blur-new.png"
                alt=""
                className={classes.mobileBnr}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default FAQS;
