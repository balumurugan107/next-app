import {
  Box,
  Button, // Card,
  CircularProgress,
  Container,
  alpha,
  Grid,
  Slide,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import { Edit as EditIcon } from 'react-feather';
// import { description } from '../../../../utils/functionUtil';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import rehypeHighlight from 'rehype-highlight';
import LoadingScreen from 'src/components/LoadingScreen';
import Page from 'src/components/Page';
import { AccountType, defaultOptions, getLessonArgs } from 'src/constants';
import snackbar from 'src/helpers/snackbar';
// import { LessonsResult } from 'src/store/management/goswim/lessons';
import {
  getCourseDetails,
  getLessons,
  removeAllLessons
} from 'src/store/management/goswim/lessons/actions';
import { ComponentProps } from 'src/types/components';
import { description } from 'src/utils/functionUtil';
import LessonCard from '../../lessons/MainView/LessonCard';
import ScheduleCourse from './ScheduleCourse';
import AddGroupDialog from 'src/views/management/Teams/CreateEditView/GroupModal';

interface RouteParams {
  course_id: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  fullHeightCard: {
    height: '100%',
    // margin: 16,
    padding: 16
  },
  cardTitle: {
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
    fontSize: '1.25rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      width: '100%'
    }
  },
  scheduleBtn: {
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0.5),
      maxHeight: theme.spacing(6)
    }
  },
  cardText: {
    marginBottom: theme.spacing(1),
    textAlign: 'justify',
    fontSize: 14
  },
  progressCenter: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  scrollBar: {
    width: '100%',
    height: '100%',
    minHeight: '290px',
    overflow: 'hidden !important'
  },

  listItemGrid: {
    width: '100%',
    marginBottom: theme.spacing(2),
    '& .MuiCardActionArea-root': {
      minHeight: 'revert'
    }
  },
  divAbsolute: {
    bottom: 0,
    right: 0,
    width: '30px',
    height: '30px'
    // ,
    // border: '3px solid #73AD21'
  },
  scourses: {
    display: 'flex',
    // justifyContent: 'flex-end',
    width: '100%',
    margin: `${theme.spacing(1)} 0`,
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none'
    // },
    '& div': {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  },
  socialicons: {
    marginTop: 30
  },
  CoursesTopSection: {
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0'
    }
  },
  videoDesc: {
    marginBottom: theme.spacing(2),
    width: '100%',
    color: theme.palette.text.secondary
  },
  titleContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    },
    '& button': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
    }
  },
  description: {
    width: '100%',
    float: 'left',
    overflow: 'hidden',
    marginTop: theme.spacing(0.5),
    '& p': {
      marginBottom: theme.spacing(1),
      color: theme.palette.text.secondary,
      lineHeight: '24px',
      wordBreak: 'break-word',
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(1)
      }
    },
    '& hr': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  },
  descriptionContent: {
    marginTop: 16,
    '& p': {
      marginBottom: theme.spacing(1),
      lineHeight: 1.7,
      wordBreak: 'break-word'
    },
    '& ul, ol': {
      marginLeft: theme.spacing(2),
      '& li': {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1)
      }
    }
  },
  readMoreBtn: {
    border: '1px solid',
    borderColor: theme.palette.text.secondary,
    padding: '4px 8px',
    borderRadius: theme.spacing(1),
    background: 'transparent',
    fontSize: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    cursor: 'pointer'
  },
  noteForViewer: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: theme.spacing(2.25)
  },
  scheduleWrapper: {
    display: 'flex',
    '& button:nth-child(1)': {
      marginRight: theme.spacing(1),
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  },
  editIcon: {
    margin: '0 8px',
    color: alpha(theme.palette.secondary.main, 0.9)
  }
}));

const CourseDetail: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const elementRef: any = useRef(null);
  const history = useRouter();
  // const teams = useSelector(state => state.team.heirarchyTeams);
  const [descriptionHeight, setDescriptionHeight] = useState<any>(0);
  // let descriptionHeight = elementRef?.current?.clientHeight;
  const { courseId } = useRouter().query;
  const dispatch = useDispatch();
  const courseDetails = useSelector(state => state.courseDetails.courseDetails);
  const lessons = useSelector(state => state.courseDetails.lessons);
  const { isLoading } = useSelector(state => state.courseDetails);
  const [loadMore, setLoadMore] = useState(lessons.totalCount !== lessons.results.length);
  var pageItemCount = 12;
  const [open, setOpen] = useState(false);
  const [callLoadMoreApi, setCallLoadMore] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
  const [page, setPage] = useState(1);
  const { teamsList } = useSelector(state => ({
    teamsList: state.team.teamsList || []
  }));
  let lessonReqArgs: getLessonArgs = {
    isAdmin: false,
    isBasic: false,
    pageID: page,
    limit: pageItemCount,
    course_id: courseId
  };

  const handleClickOpen = () => {
    if (teamsList?.length <= 1 && userType !== AccountType.ADMIN) {
      setShowAddGroupDialog(true);
      snackbar.success('Please create a group before schedule course!!', defaultOptions);
    } else {
      setOpen(true);
    }
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, [lessons]); // updated
  // useLayoutEffect(() => {
  //   setDescriptionHeight(elementRef?.current?.clientHeight);
  // });
  useEffect(() => {
    if (initialRender) {
    
      dispatch(removeAllLessons());
      if(courseId)
      dispatch(getCourseDetails(courseId));
      setInitialRender(false);
    }
    dispatch(getLessons(lessonReqArgs));
  }, [callLoadMoreApi]); // eslint-disable-line

  const fetchMoreData = () => {
    var count = lessons?.results?.length / pageItemCount;
    if (count <= page && lessons?.results?.length < lessons?.totalCount) {
      setPage(page + 1);
      setCallLoadMore(!callLoadMoreApi);
    } else {
      setLoadMore(false);
    }
  };

  useEffect(() => {
    if (!isLoading) setLoadMore(lessons?.totalCount !== lessons?.results?.length);
  }, [lessons?.results]);

  const userType = useSelector(state => state?.account?.user?.role);
  return isLoading && page == 1 ? (
    <LoadingScreen />
  ) : (
    <div>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Container>
          <Box {...rest} mt={1}>
            {/* <Card className={classes.fullHeightCard}> */}
            <Grid container>
              <Grid container className={classes.CoursesTopSection}>
                <Grid item xs={12}>
                  <div className={classes.titleContent}>
                    <Typography className={classes.cardTitle} variant="h3" component="h1">
                      {courseDetails?.name}
                    </Typography>
                    {(userType === AccountType.ADMIN || userType === AccountType.COACH) &&
                    courseDetails?.lessons_count ? (
                      <>
                        <div className={classes.scheduleWrapper}>
                          {userType === AccountType.ADMIN && (
                            <Button
                              variant="contained"
                              onClick={() => history.push(`/app/admin/courses/${courseId}/edit`)}
                              color="primary"
                              startIcon={<EditOutlinedIcon />}
                              size="small"
                            >
                              Edit
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClickOpen}
                            size="small"
                          >
                            Schedule course
                          </Button>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                  <Typography className={classes.noteForViewer}>
                    Important Note to the Viewer
                  </Typography>
                  {courseDetails?.description && (
                    <>
                      <div
                        className={classes.description}
                        style={{ maxHeight: readMore ? '100%' : '160px' }}
                        ref={elementRef}
                      >
                        <ReactMarkdown
                          rehypePlugins={[rehypeHighlight]}
                          className={classes.descriptionContent}
                        >
                          {description(courseDetails.description)}
                        </ReactMarkdown>
                      </div>
                      {descriptionHeight >= 160 && (
                        <button
                          onClick={() => setReadMore(!readMore)}
                          className={classes.readMoreBtn}
                        >
                          {readMore ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item xs={12} className={classes.scourses}>
                  <Typography className={classes.videoDesc}>
                    <strong>LESSONS:</strong> {lessons?.totalCount ? lessons?.totalCount : '0'}{' '}
                    VIDEOS
                  </Typography>
                  {/* {socialMedia(lessons)} */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <InfiniteScroll
                  // scrollableTarget="scrollTarget"
                  dataLength={lessons?.results?.length}
                  className={classes.scrollBar}
                  next={fetchMoreData}
                  hasMore={loadMore}
                  loader={
                    <div className={classes.progressCenter}>
                      <CircularProgress color="secondary" disableShrink />
                    </div>
                  }
                >
                  <Grid className={classes.listItemGrid} container spacing={2}>
                    {lessons?.results?.map((lesson, index) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                          <LessonCard lesson={lesson} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </InfiniteScroll>
              </Grid>
            </Grid>
            {/* </Card> */}
          </Box>
        </Container>
      </Slide>
      <ScheduleCourse
        courseID={`${courseId}`}
        openDialog={open}
        closeClicked={handleClickClose}
        courseTitle={courseDetails?.name}
      />
      {showAddGroupDialog && (
        <AddGroupDialog
          type="create"
          openDialog={showAddGroupDialog}
          closeDialog={() => setShowAddGroupDialog(false)}
        />
      )}
    </div>
  );
};

export default CourseDetail;
