import React from 'react';
import clsx from 'clsx';
import { Box, Container, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 50,
    paddingBottom: 50,
    minHeight: '320px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      paddingTop: 20,
      paddingBottom: 20,
      minHeight: 'initial'
    }
  },

  title: {
    color: theme.palette.text.primary
  },
  desc: {
    color: theme.palette.text.primary
  },
  videoPlayer: {
    width: '100%'
  }
}));

const Testimonials: React.FC<ComponentProps> = ({ className, onPlay, ...rest }) => {
  const classes = useStyles();
  const { result } = useSelector(state => state.landingPage);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Box>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Fade left>
                <Typography variant="h1" className={classes.title}>
                  IMPROVE WITH DATA
                </Typography>
                <Box mt={3} mb={3}>
                  <Typography variant="body1" className={classes.desc}>
                  When you subscribe to GoSwim, you'll have access to our 
                  new app that can evaluate your swims. You'll learn important 
                  information about stroke rate, distance per stroke, swim velocity, 
                  and much more.
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="body1" className={classes.desc}>
                  We will then take that information, and recommend which videos 
                  will be the most appropriate to help you improve.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Fade right>
                <video
                  controls
                  className={`${classes.videoPlayer} landing-videos`}
                  src={result[0]}
                  poster="/static/images/thumbnail2.webp"
                  onPlay={() => onPlay(1)}
                />
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Testimonials;
