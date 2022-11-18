import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { LessonServiceDocument } from 'src/store/management/goswim/lessons';
// import { Link as RouterLink } from 'react-router-dom';

import { CustomThumbnail } from 'src/constants/common';
import { Card, Tooltip, Typography } from '@mui/material';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: `${theme.palette.background.paper} !important`,
      margin: 0,
      padding: 0,
      boxShadow: '0px 0px !important',
      backgroundImage: 'none'
    },

    cardMedia: {
      width: '35%',
      borderRadius: 4,
      maxWidth: '90px',
      maxHeight: '60px'
    },

    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0
    },

    divRelative: {
      position: 'relative'
    },

    contentArea: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      '&:last-child': {
        paddingBottom: 0
      }
    },

    typography: {
      boxSizing: 'border-box',
      // whiteSpace: 'nowrap',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordWrap: 'normal',
      margin: '8px !important',
      color: theme.palette.text.primary,

      [theme.breakpoints.down('sm')]: {
        maxWidth: '55vw'
      }
    }
  })
);

const LessonCardSmall = (props: { lesson: LessonServiceDocument }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.flexContainer}>
        {/* <img src="/static/images/swim.jpg" alt="swim" /> */}

        <img
          src={props.lesson.thumbnailUrl}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = CustomThumbnail;
          }}
          className={classes.cardMedia}
        />
       
        <div className={classes.contentArea}>
          <Tooltip title={props?.lesson?.name}>
            <Typography gutterBottom variant="body1" component="h2" className={classes.typography}>
              {props.lesson.name}
            </Typography>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default LessonCardSmall;
