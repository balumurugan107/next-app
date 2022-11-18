import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container, // Divider,
  IconButton,
  SvgIcon,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Modal,
  TableFooter,
  Pagination,
  Skeleton,
  TableBody
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Edit, Eye } from 'react-feather';
import 'react-quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLessons, removeAllLessons } from 'src/store/management/goswim/lessons';
import { getVideosList } from 'src/store/newdashboard';
import { getCourse } from 'src/store/management/courses';
import { getLessonFilterData } from 'src/store/management/lessons';
import { getFilteredLessonCount, removeAdminLessonFromState } from 'src/store/goswim/admin/lesson';
import { getAllCourse } from 'src/store/goswim/admin/course';
import { getContracts } from 'src/store/management/members';
import { useHistory } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MuiDateRangePicker } from 'src/components/MuiDateRangePicker';
import Page from 'src/components/Page';
import { useRouter } from 'next/router';

export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  viewbutton: {
    float: 'left',
    width: 150,
    height: 35,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  tableHead: {
    width: '80%',
    fontWeight: 1200,
    color: theme.palette.common.white,
    '&:nth-last-child(1)': {
      minWidth: 100
    }
  },
  tableCell: {
    width: '80%',
    padding: theme.spacing(2),
    fontWeight: 1200,
    color: theme.palette.text.primary
  },
  PageTitle: {
    fontSize: '1.25rem !important',
    color: theme.palette.text.primary,
    fontWeight: 500,
    width: '100%',
    margin: '0',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    }
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  filterCard: {
    padding: 16,
    marginLeft: 16,
    // margin: '10px',
    width: 'auto',
    minWidth: '200px',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  filterCardModal: {
    height: 'calc(100vh - 280px)',
    overflow: 'auto',
    padding: theme.spacing(2),
    margin: '140px 50px',
    width: 'auto',
    minWidth: '100px',
    backgroundColor: theme.palette.background.paper,
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  filtertext: {
    // margin: '25px',
    fontWeight: 700,
    color: theme.palette.text.primary
  },
  titleContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '16px 0',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap'
    }
  },
  filterButton: {
    display: 'none',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      float: 'right'
    },
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  filterModal: {
    '@media (max-width: 600px)': {
      display: 'block'
    }
    // transform: 'translate(-50%, -50%)',
  },
  filterTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: theme.spacing(1)
  },
  titleText: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5)
  },
  card: {
    height: '100%',
    '& .quill.makeStyles-root-94.makeStyles-editor-56': {
      height: '100%'
    }
  },
  editor: {
    '& .ql-root.ql-editor': {
      height: '100%'
    },
    '& .ql-root': {
      height: '100%'
    },

    '& .ql-editor': {
      height: '360px'
    },
    '& .ql-toolbar.ql-snow': {
      border: '1px solid #c4c4c4'
    }
  },
  dialogTitle: {
    color: theme.palette.text.primary
  },
  positionBox: {
    //margin: theme.spacing(1),
    width: '100%'
    // minWidth: 250,
  },
  pagination: {
    // margin: theme.spacing(2),
    // width: '130%',
    '& button': {
      marginBottom: theme.spacing(1)
    }
  },
  box: {
    overflow: 'hidden'
  },
  container: {
    marginBottom: theme.spacing(4)
  },
  fullWidth: {
    width: '100%'
  },
  IconButton: {
    padding: 0,
    marginRight: theme.spacing(1)
  },
  filterListItem: {
    color: theme.palette.text.secondary,
    cursor: 'pointer !important',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 2,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.secondary
    }
  },
  filterListItemSelected: {
    color: theme.palette.text.primary,
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.secondary
    }
  },
  coursesFilter: {
    padding: 16,
    marginLeft: 16,
    // margin: '10px',
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    marginBottom: 0,
    maxHeight: 380,
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resetBtn: {
    padding: 0,
    marginBottom: theme.spacing(1)
  },
  table: {
    '& .MuiTableRow-head': {
      background: theme.palette.primary.main,
      color: '#fff !important'
    },
    '& .MuiTableHead-root': {
      color: theme.palette.text.secondary
    }
  },
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  }
}));

const Lessons: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const lessonData = useSelector(state => state.courseDetails.lessons);
  const { isCreated, isUpdated, isDeleted } = useSelector(state => state.adminLesson);
  const { isLoading } = useSelector(state => state.courseDetails);
  const PER_PAGE = 10;
  const count = Math.ceil(lessonData.totalCount / PER_PAGE);
  const [page, setPage] = React.useState(1);
  const filteredData = useSelector(state => state.adminLesson.filteredData?.[0]);
  const filteredState = Object.entries(filteredData ? filteredData : '');
  const [courseId, setCourseId] = useState('');
  const [initialRender, setInitialRender] = useState(true);
  const [adminFilter, setAdminFilter] = useState<string | null>(null);
  const [filterModalOpen, setFilterModalOpen] = React.useState(false);
  const [filterOption, setFilterOption] = useState<number | undefined>(undefined);
  const stroke = null;
  const expertise = null;
  const tags = null;
  const search = null;
  let lessonReqArgs: getLessonArgs = {
    pageID: page,
    limit: PER_PAGE,
    course_id: courseId,
    isAdmin: false,
    isBasic: false,
    stroke: stroke ? stroke : null,
    expertise: expertise ? expertise : null,
    tags: tags ? tags : null,
    search: search ? search : null
  };
  const filterData = [
    {
      key: '0',
      title: 'Assignment'
    },
    {
      key: 'finished',
      title: 'State'
    }
  ];
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const courses = useSelector(state => state.courses.courseData.results);
  const resetBtnDisplayCondition =
    filterOption === undefined &&
    courseId === '' &&
    adminFilter === null &&
    selectedCourse === null;

  const handleNewLesson = () => {
    dispatch(removeAdminLessonFromState());
    router.push('/app/admin/lessons/create');
    // setOpen(true);
    dispatch(
      getVideosList({
        filterData
      })
    );
    dispatch(getAllCourse());
    dispatch(getContracts(1, 25));
    dispatch(getLessonFilterData('Lesson'));
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const sampleObject: filterList[] = [
    {
      title: 'State',
      listitems: [`All`, `Published`, `Incomplete`, `Untagged`]
    }
  ];

  useEffect(() => {
    if (initialRender === true) {
      dispatch(removeAllLessons());
      dispatch(getCourse({ isAdmin: true }));
      setInitialRender(false);
    }

    dispatch(getLessons(lessonReqArgs));
  }, [page, isCreated, isUpdated, isDeleted, courseId, filterOption]);

  useEffect(() => {
    dispatch(getFilteredLessonCount());
  }, []);
  const handleCourseId = (courseIdNew: string, index: number) => {
    const isSameCourseId = courseId === courseIdNew;
    if (courseId !== courseId) {
      dispatch(removeAllLessons());
    }
    setPage(1);
    if (isSameCourseId) {
      setCourseId('');
      setSelectedCourse(null);
    } else {
      setCourseId(courseIdNew);
      setSelectedCourse(index);
    }
    // setFilterOption(0);
  };
  const handleFilterOption = (option: number, filter: string) => {
    if (filterOption !== option) {
      dispatch(removeAllLessons());
    }
    setFilterOption(option);
    // setCourseId('');
    setAdminFilter(filter);
  };
  const handleReset = () => {
    setFilterOption(undefined);
    setCourseId('');
    setPage(1);
    setAdminFilter(null);
    setSelectedCourse(null);
  };
  return (
    <>
      <Page className={classes.root} title="Admin-Lessons">
        <Container className={classes.container}>
          <div>
            <Box className={classes.box}>
              <div className={classes.titleContent}>
                <Typography variant="h1" className={classes.PageTitle}>
                  Lessons
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    className={classes.viewbutton}
                    onClick={handleNewLesson}
                    size="small"
                  >
                    NEW LESSON
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    className={classes.filterButton}
                    onClick={() => setFilterModalOpen(true)}
                  >
                    FILTER
                  </Button>
                </div>
              </div>
              <Grid container>
                <Grid item lg={9} md={8} sm={12} className={classes.fullWidth}>
                  <Card className={classes.fullHeightCard}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <MuiDateRangePicker />
                    </LocalizationProvider>
                    <Table>
                      <TableHead className={classes.table}>
                        <TableRow>
                          <TableCell className={classes.tableHead}>Name</TableCell>
                          <TableCell className={classes.tableHead}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lessonData?.adminResults?.length > 0 && !isLoading ? (
                          lessonData.adminResults.map((lesson, i) => {
                            return (
                              <TableRow key={i} className={classes.rowStyling}>
                                <TableCell className={classes.tableCell}>{lesson.name}</TableCell>
                                <TableCell className={classes.tableCell}>
                                  <IconButton
                                    onClick={() =>
                                      router.push(`/app/admin/lessons/edit/${lesson._id}`)
                                    }
                                    className={classes.IconButton}
                                  >
                                    <SvgIcon fontSize="small">
                                      <Edit />
                                    </SvgIcon>
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      router.push(`/app/admin/lessons/view/${lesson._id}`)
                                    }
                                    className={classes.IconButton}
                                  >
                                    <SvgIcon fontSize="small">
                                      <Eye />
                                    </SvgIcon>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : !isLoading && lessonData?.adminResults?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={2} align="center" className={classes.tableCell}>
                              NO VIDEOS AVAILABLE
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2}>
                              {[...Array(10)].map((_: any, i) => (
                                <Skeleton height={80} key={i} animation="wave" />
                              ))}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Pagination
                              count={count}
                              variant="outlined"
                              shape="rounded"
                              boundaryCount={1}
                              size="small"
                              page={page}
                              onChange={(_, page) => {
                                dispatch(removeAllLessons());
                                window.scrollTo(0, 0);
                                setPage(page);
                              }}
                            />
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Card>
                </Grid>
                {/* <Box> */}
                <Grid item lg={3} md={4} sm={4}>
                  <Card className={classes.filterCard}>
                    <div className={classes.filterHeader}>
                      <Typography className={classes.filterTitle}>FILTERS</Typography>
                      {!resetBtnDisplayCondition ? (
                        <Button
                          className={classes.resetBtn}
                          variant="outlined"
                          onClick={handleReset}
                        >
                          RESET
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className={classes.filtertext}>
                      {!filteredData ? (
                        <div>
                          {sampleObject?.map((objItems, i) => (
                            <div key={i}>
                              <Skeleton height={25} width="auto" key={i} animation="wave" />
                              {objItems?.listitems?.map(listItem => (
                                <Skeleton height={25} key={listItem} animation="wave" />
                              ))}
                              <br />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <Typography className={classes.titleText}>State</Typography>
                          {filteredState &&
                            filteredState.map((Stateitem, index) => (
                              <div key={index}>
                                <Typography
                                  onClick={() => handleFilterOption(index, Stateitem[0])}
                                  className={
                                    Stateitem[0] === adminFilter
                                      ? classes.filterListItemSelected
                                      : classes.filterListItem
                                  }
                                >{`${Stateitem[0].charAt(0).toUpperCase() +
                                  Stateitem[0].slice(1)}(${Stateitem[1]})`}</Typography>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </Card>
                  <Card className={classes.coursesFilter}>
                    <Typography className={classes.titleText}>Courses</Typography>
                    {courses?.map((course, index) => (
                      <Typography
                        key={index}
                        className={
                          index === selectedCourse
                            ? classes.filterListItemSelected
                            : classes.filterListItem
                        }
                        onClick={() => handleCourseId(course._id, index)}
                      >{`${course.name}(${course.lessons_count ? course.lessons_count : 0
                        })`}</Typography>
                    ))}
                  </Card>
                </Grid>
              </Grid>
              {/* </Box> */}
            </Box>
            {/* filter modal */}
            <Modal
              open={filterModalOpen}
              onClose={handleFilterModalClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={classes.filterModal}
            >
              <Card className={classes.filterCardModal}>
                <div className={classes.filterHeader}>
                  <Typography className={classes.filterTitle}>FILTERS</Typography>
                  {!resetBtnDisplayCondition ? (
                    <Button className={classes.resetBtn} variant="outlined" onClick={handleReset}>
                      RESET
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                <div className={classes.filtertext}>
                  {filteredState &&
                    filteredState.map((Stateitem, index) => (
                      <div key={index}>
                        <Typography
                          onClick={() => handleFilterOption(index, Stateitem[0])}
                          className={
                            Stateitem[0] === adminFilter
                              ? classes.filterListItemSelected
                              : classes.filterListItem
                          }
                        >{`${Stateitem[0].charAt(0).toUpperCase() + Stateitem[0].slice(1)}(${Stateitem[1]
                          })`}</Typography>
                      </div>
                    ))}
                </div>
                <Typography className={classes.titleText}>Courses</Typography>
                {courses?.map((course, index) => (
                  <Typography
                    key={index}
                    className={
                      index === selectedCourse
                        ? classes.filterListItemSelected
                        : classes.filterListItem
                    }
                    onClick={() => setSelectedCourse(index)}
                  >{`${course.name}(${course.lessons_count})`}</Typography>
                ))}
              </Card>
            </Modal>
            {/* filter modal */}
          </div>
        </Container>
      </Page>
    </>
  );
};

export default Lessons;
