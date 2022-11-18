import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import LessonCardSmall from '../../goswim/lessons/MainView/LessonCardSmall';

import { LessonServiceDocument } from 'src/store/management/goswim/lessons';
import { createStyles } from '@mui/styles';
import { CardActionArea } from '@mui/material';

const useStyles = makeStyles(theme =>
  createStyles({
    lessoncard: {
      display: 'flex',
      width: '100%',
      // marginTop: 10,
      // marginLeft: 5
      padding: '10px 16px',
      alignItems: 'center',
      minHeight: '84px',
      borderBottom: `1px solid ${theme.palette.action.disabledBackground}`,
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    },
    left: {
      flex: 1
    },
    right: {
      width: '20%',
      textAlign: 'right'
    },
    titleSec: {},
    noSpace: {
      margin: 0,
      padding: 0
    },
  })
);

const DashboardLessonCard = (props: { lesson: LessonServiceDocument }) => {
  const classes = useStyles();

  return (
    <CardActionArea
      className={classes.noSpace}
      href={`/app/lessons/${props.lesson._id}`}
    >
      <div className={classes.lessoncard}>
        <div className={classes.left}>
          <LessonCardSmall lesson={props.lesson} />
        </div>
      </div>
    </CardActionArea>
  );
};

export default DashboardLessonCard;
