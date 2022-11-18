import { Container, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from 'src/store/account';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 28,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary
  },
  subTitle: {
    fontSize: 22,
    margin: '16px 0',
    color: theme.palette.primary.main
  },
  featuresWrapper: {
    margin: '24px 0',
    padding: theme.spacing(3),
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    '& p': {
      margin: '16px 0',
      color: theme.palette.text.secondary
    }
  },
  create: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}));
const Subscription: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { asPath } = useRouter();
  const section = asPath.split('#')[1];
  useEffect(() => {
    if (section) {
      setTimeout(() => {
        document?.getElementById(section)?.scrollIntoView();
        window.scrollBy(0, -70);
      }, 0);
    }
  }, [asPath]);

  const handleLink = () => {
    dispatch(logout());
    setTimeout(() => {
      history.push('/plans');
    }, 800);
  };

  // state?.target?.scrollIntoView();
  return (
    <>
      <Container>
        <Paper className={classes.featuresWrapper}>
          <Typography variant="h1" className={classes.title}>
            Subscription
          </Typography>
          <div id="athlete">
            <Typography variant="h4" className={classes.subTitle}>
              Athlete
            </Typography>
            <Typography variant="body1">
              The Athlete Subscription allows full access to all GoSwim content. See any video, any
              time. Select any course for auto-delivery, or just browse through our entire system.
              Athletes can also receive daily videos from as many Training Groups as they’d like,
              whether it be your home team, your swim teacher, GoSwim, or your tri-group.{' '}
              <span className={classes.create} onClick={handleLink}>
                {' '}
                Click here to create your Athlete Account{' '}
              </span>
            </Typography>
            <Typography variant="body1">
              This plan is specifically designed for mobile-device users, providing faster playback
              while using less mobile data.
            </Typography>
          </div>
          <div id="coach">
            <Typography variant="h4" className={classes.subTitle}>
              Coach
            </Typography>
            <Typography variant="body1">
              The Coach plan allows any coach to invite up to 100 athletes into a Training Group and
              to share a video of their choosing… every day. The Coach can shape the technique
              education to their athletes by selecting videos that best represent their coaching
              philosophy. When the coach shares technique videos with the athletes BEFORE practice,
              the coach then can spend less time explaining a skill, and more time practicing that
              skill. Education that takes place outside of pool time makes pool time more effective.
            </Typography>
            <Typography variant="body1">
              The Coach plan also allows for use of the GoSwim Deckshots feature. Deckshots allows
              the coach to film the swimmers, and quickly upload that video into GoSwim. The video
              is immediately shared with the swimmer for post-practice review (the swimmers will
              have it before they leave the pool). The videos are stored in the GoSwim system, for
              immediate recall by any swimmer, at any time, as long as they have wifi or cell
              service. No need to store thousands of videos on your device.{' '}
              <span className={classes.create} onClick={handleLink}>
                Click here to create your Coach Account
              </span>
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  );
};
export default Subscription;
