import { Container, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

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
  }
}));

const Features: React.FC = () => {
  const classes = useStyles();
  const { asPath } = useRouter();
  let section = asPath.split('#')[1];

  useEffect(() => {
    if (section && window) {
      document?.getElementById(section)?.scrollIntoView();
      setTimeout(() => {
        window.scrollBy(0, -70);
      }, 0);
    }
  }, [asPath]);

  return (
    <div title="Features" className={classes.root}>
      <Container>
        <Paper className={classes.featuresWrapper}>
          <Typography variant="h1" className={classes.title}>
            Features
          </Typography>
          <div id="groups">
            <Typography variant="h4" className={classes.subTitle}>
              Groups
            </Typography>
            <Typography variant="body1">
              A Training Group can be seen as “your team.” Everyone is welcome to be a member of
              the GoSwim Group, where we share videos every day, directly to your email account.
              If your home team decides they’d like to share content directly to their swimmers,
              they have the ability to set up their own Training Group, and decide what videos
              their swimmers receive on a daily basis.
            </Typography>
            <Typography variant="body1">
              With a Training Group, coaches have the ability to shape the content in their own
              image. USA Swimming has selected GoSwim as their Technical Video Partner, because we
              offer MANY different options for technique, rather than a single solution for each
              part of the stroke.
            </Typography>
          </div>
          <div id="courses">
            <Typography variant="h4" className={classes.subTitle}>
              Courses
            </Typography>
            <Typography variant="body1">
              Our Courses are a group of videos that all focus on the same subject matter. Whether
              it’s the focus on a single athlete, or the focus on a single skill, our courses
              follow a path to building on better technique while focusing on one skill, or one
              athlete at a time.
            </Typography>
            <Typography variant="body1">
              Members have the ability to self-direct these courses, with either a “binge watch,”
              where they can see all the lessons in the course at one sitting, or through our
              scheduled feature, which allows for the daily delivery of each lesson directly to
              your email account. The choice is yours.
            </Typography>
          </div>
          <div id="lessons">
            <Typography variant="h4" className={classes.subTitle}>
              Lessons
            </Typography>
            <Typography variant="body1">
              Our Lessons are the individual videos that reside inside a course. While many
              Lessons are good on their own, when shaped into a course of similar content, each
              lesson takes on new life. To see how similar lessons are used in different ways, how
              each Lesson can impact a swimmer for various strokes, or for various skills, lessons
              are good, but in a course, they’re better.
            </Typography>
            <Typography variant="body1">
              Upgraded members have the ability to watch ANY Lesson, at ANY time. Individual
              Lessons will recommend additional Lessons that will help you build upon the skill or
              discover a new aspect of the skill.
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Features;
