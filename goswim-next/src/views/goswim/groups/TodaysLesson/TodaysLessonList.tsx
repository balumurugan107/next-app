import { Card, CardActionArea } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomThumbnail } from 'src/constants/common';

const useStyles = makeStyles(theme => ({
  upcomingCard: {
    // width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: 10,
    padding: 0,
    boxShadow: '0px 0px'
  },
  lessonForToday: {
    marginBottom: theme.spacing(1)
  },
  noSpace: {
    margin: 0,
    padding: 0
  },
  cardMedia: {
    width: '100%',
    borderRadius: 4,
    maxHeight: '68px',
    maxWidth: '120px',
    [theme.breakpoints.down('lg')]: {
      height: 'auto'
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto'
    },
    [theme.breakpoints.up('lg')]: {
      height: 'auto'
    },
    [theme.breakpoints.up('xl')]: {
      height: 'auto'
    }
  },
  lessonsCardDiv: {
    //   background:'red'
  }
}));

const TodaysLessonList = (props: any) => {
  const lesson = props.lesson;
  const activeLesson = props.currentLesson;
  const classes = useStyles();
  const [activeId, setActiveId] = useState(lesson[0]._id);

  return (
    <div>
      <Carousel
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 2,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 3,
            partialVisibilityGutter: 30
          }
        }}
      >
        {lesson &&
          lesson?.map((upcomingLesson: any) => (
            <div className={classes.lessonsCardDiv} key={upcomingLesson._id}>
              <Card className={classes.upcomingCard}>
                <CardActionArea
                  className={classes.noSpace}
                  // component={RouterLink}
                  // to={`/app/lessons/${upcomingLesson._id}`}
                  onClick={() => {
                    activeLesson(upcomingLesson);
                    setActiveId(upcomingLesson._id);
                  }}
                >
                  <div>
                    <>
                      {/* <img src="/static/images/swim.jpg" alt="swim" /> */}
                      <img
                        src={upcomingLesson.thumbnailUrl}
                        alt=""
                        className={classes.cardMedia}
                        style={{
                          border: activeId === upcomingLesson._id ? '2px solid red' : 'none'
                        }}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = CustomThumbnail;
                        }}
                      />
                    </>
                  </div>
                </CardActionArea>
              </Card>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default TodaysLessonList;
