import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Container,
  Slide,
  Card,
  Typography,
  Button,
  Divider,
  CircularProgress,
  CardActionArea,
  alpha
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Page from 'src/components/Page';
import { ComponentProps } from 'src/types/components';
import LessonPlayer from '../../lessons/MainView/LessonPlayer';
import LessonCardSmall from '../../lessons/MainView/LessonCardSmall';

import { getTodaysLesson } from 'src/store/management/goswim/lessons/details/actions';
import { description } from '../../../../utils/functionUtil';

import moment from 'moment';
import { getRelatedLessons } from 'src/store/management/goswim/lessons/details/actions';
import { getPreviousWeeklyThemes } from 'src/store/goswim/admin/weeklyThemes';
import TodaysLessonList from './TodaysLessonList';
import { LessonDetailsDocument } from 'src/store/management/goswim/lessons/details';
import LoadingScreen from 'src/components/LoadingScreen';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import InfiniteScroll from 'react-infinite-scroll-component';
import WeeklyThemeCard from 'src/views/goswim/groups/TodaysLesson/weeklyThemeCard';
import config from 'src/config';
import Link from 'src/components/Link';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 'calc(100vh - 340px)',
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: 16
  },
  cardText: {
    paddingTop: 8,
    textJustify: 'inter-word',
    fontSize: 14
  },
  rvHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingBottom: theme.spacing(1)
  },
  rvHeaderLeft: {
    flex: 1
  },
  rightSide: {
    display: 'block',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    '&:last-child': {
      paddingBottom: 0
    }
  },
  noLesson: {
    margin: 'auto',
    padding: 'auto'
  },
  description: {
    marginTop: 16,
    '& p': {
      marginBottom: theme.spacing(1),
      wordBreak: 'break-word',
      lineHeight: 1.7
    },
    '& ul, ol': {
      marginLeft: theme.spacing(2),
      '& li': {
        marginBottom: theme.spacing(1)
      }
    }
  },
  cardBG: {
    background: 'red'
  },
  lessonCondition: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.875rem'
  },
  relatedVideoWrapper: {
    paddingTop: '0 !important'
  },
  lessonTitle: {
    fontSize: theme.spacing(2.75),
    fontWeight: 400,
    marginBottom: theme.spacing(2)
  },
  lessonCaption: {
    display: 'block',
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1)
  },
  relatedVideoCard: {
    marginBottom: theme.spacing(2)
  },
  noSpace: {
    margin: 0,
    padding: 0
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    width: '100%'
  },
  cardGrid: {
    marginBottom: theme.spacing(1)
  },
  upcomingCard: {
    backgroundColor: theme.palette.background.paper,
    margin: 10,
    padding: 0,
    boxShadow: '0px 0px'
  },
  lessonForToday: {
    marginBottom: theme.spacing(1)
  },
  titleText: {
    paddingTop: 0,
    marginBottom: 0,
    marginLeft: 0
  },
  subGroupTitle: {
    display: 'flex',
    alignItems: 'center',
    '& h2': {
      fontSize: theme.spacing(2.5)
    }
  },
  currentDate: {
    marginLeft: theme.spacing(2)
  },
  rightSideRelated: {
    flexWrap: 'nowrap',
    maxHeight: '424px',
    overflowY: 'auto'
  },
  scrollBar: {
    width: '100%',
    height: '100%',
    overflow: 'hidden !important'
  },
  progressCenter: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  noData: {
    margin: '56px auto',
    maxWidth: '60%',
    textAlign: 'center'
  },
  noDataPic: {
    display: 'block',
    margin: 'auto',
    height: '125px'
  },
  noDataMessage: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    margin: '10px',
    marginTop: theme.spacing(3),
    fontWeight: 600
  },
  helperMessage: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    fontWeight: 400
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap'
  },
  pageTitle: {
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    marginBottom: 0,
    marginTop: theme.spacing(1.5)
  },
  previousThemeWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  messageContent: {
    padding: '10px',
    fontSize: '16px',
    background: alpha(theme.palette.primary.main, 0.1),
    letterSpacing: '1.5px',
    borderRadius: '8px',
    margin: theme.spacing(2),
    marginLeft: `0 !important`,
    [theme.breakpoints.up('lg')]: {
      margin: '8px 8px 8px 0px'
    },
    '& h4': {
      flex: 1,
      fontWeight: 500,
      fontSize: theme.spacing(2),
      lineHeight: 1.5
    },
    '& p': {
      marginBottom: 0,
      lineHeight: 1.5,
      color: theme.palette.text.primary
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  }
}));

const LessonDetail: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { todaysLesson, isLoading, relatedLessons } = useSelector(state => state.lessonDetails);
  const { results, totalCount } = relatedLessons;
  const lessonId = todaysLesson?.[0]?._id;
  const location = router.asPath.split('/');
  const scheduleId: string = location?.pop();
  const teamList = useSelector(state => state.team.teamsList);
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;
  const [currentLesson, setCurrentLesson] = useState(todaysLesson?.[0]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(totalCount !== results?.length);
  const [teamNotFound, setTeamNotFound] = useState(false);
  const pageItemCount = 15;
  const { previousWeeklyThemes } = useSelector(state => state.adminWeeklyTheme);
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const scheduled_on = moment().valueOf();
  const settings = useSelector(state => state.settings);
  useEffect(() => {
    setPage(1);
    setCurrentLesson(undefined);
  }, [scheduleId]);

  useEffect(() => {
    const teamFound = teamList?.find(team => team._id === scheduleId);
    if (teamFound) {
      setTeamNotFound(false);
      dispatch(getTodaysLesson(scheduleId, timeZone));
      if (goswimGroupId === scheduleId) {
        dispatch(getPreviousWeeklyThemes(scheduled_on, timeZone));
      }
    } //lesson details of particular lesson
    else setTeamNotFound(true);
  }, [scheduleId]); // eslint-disable-line

  const fetchMoreData = () => {
    if (results) {
      const count = results && Math.round(results!.length / pageItemCount);
      if (count! <= page && results!.length < totalCount) {
        setPage(page + 1);
      } else {
        setLoadMore(false);
      }
    }
  };

  useEffect(() => {
    if (lessonId) {
      dispatch(getRelatedLessons(todaysLesson?.[0]?._id, page, pageItemCount));
    }
  }, [lessonId, page]);

  const currentDate = moment().format('DD-MMM-yyyy');

  useEffect(() => {
    if (todaysLesson && todaysLesson.length > 0) setCurrentLesson(todaysLesson[0]);
  }, [todaysLesson]);

  const todaysLessonPlayer = (lessons: LessonDetailsDocument) => {
    if (lessons) {
      return (
        <>
          <div>
            <div className={classes.subGroupTitle}>
              {todaysLesson && todaysLesson.length > 1 ? ( //checking is today have more one lesson
                <>
                  <Typography className={classes.titleText} variant="h5" component="h3">
                    YOUR LESSONS FOR TODAY
                  </Typography>
                </>
              ) : (
                <>
                  <Typography className={classes.titleText} variant="h5" component="h3">
                    YOUR LESSON FOR TODAY
                  </Typography>
                </>
              )}
              <Typography className={classes.currentDate} variant="body2" component="span">
                {currentDate}
              </Typography>
            </div>

            {currentLesson && (
              <TodaysLessonList lesson={todaysLesson} currentLesson={setCurrentLesson} />
            )}
          </div>
          {todaysLesson && todaysLesson?.length > 1 ? (
            <>
              <Divider />
            </>
          ) : (
            <></>
          )}
          <LessonPlayer lesson={lessons} />
        </>
      );
    } else {
      return (
        <Typography component="h6" variant="h4" className={classes.lessonCondition}>
          Looks like there is nothing to watch in your group today. Remember, there is always a
          shared video in your Dashboard under the GoSwim Weekly Theme.
        </Typography>
      );
    }
  };

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title="Your Lesson For Today">
        <Container>
          <Box {...rest} mt={1}>
            <Card className={classes.fullHeightCard}>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                todaysLesson && (
                  <>
                    <Grid container spacing={2} className={classes.cardWrapper}>
                      <Grid item xs={12} sm={7} lg={7} xl={7}>
                        {currentLesson && todaysLessonPlayer(currentLesson)}

                        <Grid container spacing={2} className={classes.description}>
                          <Grid item xs={12}>
                            <Typography variant="h1" className={classes.lessonTitle}>
                              {currentLesson ? currentLesson.name : ''}
                            </Typography>
                            {currentLesson?.message?.trim().length ? (
                              <>
                                <Typography variant="caption" className={classes.lessonCaption}>
                                  {`Message from ${(currentLesson ? currentLesson.teamName : '') ||
                                    (scheduleId === goswimGroupId && 'GoSwim')}`}
                                </Typography>
                                <div className={classes.messageContent}>
                                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {description(currentLesson ? currentLesson.message : '')}
                                  </ReactMarkdown>
                                </div>
                              </>
                            ) : (
                              ''
                            )}
                            <Typography
                              className={classes.cardText}
                              variant="body1"
                              gutterBottom
                            >
                              <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                className={classes.description}
                              >
                                {description(currentLesson ? currentLesson.description : '')}
                              </ReactMarkdown>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        className={classes.rightSide}
                        container
                        item
                        xs={12}
                        sm={5}
                        lg={5}
                        xl={5}
                      >
                        <Grid item xs={12} className={classes.relatedVideoWrapper}>
                          <div className={classes.rvHeader}>
                            <div className={classes.rvHeaderLeft}>
                              <Typography className={classes.cardText} variant="body2">
                                Related Videos
                              </Typography>
                            </div>
                            <div>
                              <Link href={'/lessons'} prefetch={false}>
                                <Button
                                  color="primary"
                                  variant="text"
                                  size="small"
                                >
                                  More Videos
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Grid>
                        <div className={classes.rightSideRelated} id="scrollableDiv">
                          <InfiniteScroll
                            scrollableTarget={'scrollableDiv'}
                            dataLength={results ? results.length : 0}
                            className={classes.scrollBar}
                            next={fetchMoreData}
                            hasMore={loadMore}
                            loader={
                              <div
                                className={classes.progressCenter}
                                style={{ display: isLoading ? 'flex' : 'none' }}
                              >
                                <CircularProgress size={'small'} color="secondary" disableShrink />
                              </div>
                            }
                          >
                            {results?.map((lesson, index) => {
                              return (
                                <Grid item xs={12} key={index} className={classes.relatedVideoCard}>
                                  <Link href={`/lessons/${lesson._id}`} prefetch={false}>
                                    <CardActionArea
                                      className={classes.noSpace}
                                    >
                                      <LessonCardSmall lesson={lesson} />
                                    </CardActionArea>
                                  </Link>
                                </Grid>
                              );
                            })}
                          </InfiniteScroll>
                        </div>
                      </Grid>
                    </Grid>
                  </>
                )
              )}

              {!todaysLesson && !teamNotFound && !isLoading && (
                <>
                  <div className={classes.noData}>
                    <img
                      src={
                        settings.variant === 'dark'
                          ? '/static/images/noresults/groups-dark.svg'
                          : '/static/images/noresults/groups-light.svg'
                      }
                      alt="no groups found"
                      className={classes.noDataPic}
                    />
                    <h2 className={classes.noDataMessage}>
                      Looks like there is nothing to watch in your group today.
                    </h2>
                    <Typography className={classes.helperMessage}>
                      Remember, there is always a shared video in your Dashboard under the GoSwim
                      Weekly Theme.
                    </Typography>
                  </div>
                </>
              )}

              {teamNotFound && (
                <>
                  <div className={classes.noData}>
                    <img
                      src={
                        settings.variant === 'dark'
                          ? '/static/images/noresults/groups-dark.svg'
                          : '/static/images/noresults/groups-light.svg'
                      }
                      alt="no groups found"
                      className={classes.noDataPic}
                    />
                    <h2 className={classes.noDataMessage}>
                      Looks like You doesn't belong to this group.
                    </h2>
                    <Typography className={classes.helperMessage}>
                      Remember, there is always a shared video in your Dashboard under the GoSwim
                      Weekly Theme.
                    </Typography>
                    <Button onClick={() => router.push('/home')}>Go to Dashboard</Button>
                  </div>
                </>
              )}
            </Card>
            {scheduleId === goswimGroupId && previousWeeklyThemes?.length > 0 && (
              <>
                <Typography variant="h1" align="center" className={classes.pageTitle}>
                  Previous Weekly Themes
                </Typography>
                <Grid container spacing={2} className={classes.previousThemeWrapper}>
                  {previousWeeklyThemes?.map(WeeklyTheme => (
                    <Grid item xs={12} md={3}>
                      <WeeklyThemeCard theme={WeeklyTheme} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default LessonDetail;
