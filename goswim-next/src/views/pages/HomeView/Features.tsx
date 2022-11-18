import React from 'react';
import clsx from 'clsx';
import { Box, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
export interface FeaturesProps {
  className: string;
}

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
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
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

const Features: React.FC<ComponentProps> = ({ className, onPlay, ...rest }) => {
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
                  className={`${classes.videoPlayer} landing-videos`}
                  src={result[2]}
                  poster="/static/images/thumbnail1.webp"
                  onPlay={() => onPlay(0)}
                />
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Fade right>
                <Typography variant="h1" component="h1" className={classes.title}>
                  WHAT CAN MAKE YOU FASTER?
                </Typography>
                <Box mt={3} mb={3}>
                  <Typography variant="body1" className={classes.desc}>
                    Subscribe to GoSwim and gain access to thousands of videos that will help
                    increase your swimming knowledge. Find the techniques and fine points that will
                    help you individualize your stroke for better performance.
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="body1" className={classes.desc}>
                    Take the images and ideas with you to the pool.
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

export default Features;
