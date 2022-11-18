import React from 'react';
import clsx from 'clsx';
import { Box, Container, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
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
  },
  reverseContainer: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse'
    }
  }
}));

const CTA: React.FC<ComponentProps> = ({ className, onPlay, ...rest }) => {
  const classes = useStyles();
  const { result } = useSelector(state => state.landingPage);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Box>
          <Grid container spacing={3} alignItems="center" className={classes.reverseContainer}>
            <Grid item xs={12} sm={6}>
              <Fade left>
                <video
                  controls
                  src={result[1]}
                  poster="/static/images/thumbnail3.webp"
                  className={`${classes.videoPlayer} landing-videos`}
                  onPlay={() => onPlay(2)}
                />
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Fade right>
                <Typography variant="h1" className={classes.title}>
                  KEEP LEARNING DAILY WITH OUR AUTO-DELIVERY FEATURE.
                </Typography>
                <Box mt={3} mb={3}>
                  <Typography variant="body1" className={classes.desc}>
                  We at GoSwim, believe that learning never stops. We share videos everyday, 
                  following weekly themes to help you learn a skill better.
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="body1" className={classes.desc}>
                  Combine this with your ability to easily search through over 3,000 
                  technique videos to find just the right video for you.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default CTA;
