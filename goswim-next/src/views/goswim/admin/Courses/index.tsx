import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Container,
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
  TableBody
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Edit, Eye } from 'react-feather';
import { getCourse, removeAllCourses } from 'src/store/management/courses';
import { Pagination, Skeleton } from '@mui/material';
import { getLessonFilterData } from 'src/store/management/lessons';
import { removeAllLessons } from 'src/store/management/goswim/lessons';
import { removeAdminCoursesFromState } from 'src/store/goswim/admin/course/actions';
import Page from 'src/components/Page';
import { useRouter } from 'next/router';
export interface filterList {
  title: string;
  listitems: string[];
}

const useStyles = makeStyles(theme => ({
  viewbutton: {
    float: 'right',
    width: 150,
    height: 35,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  childOne: {
    width: '80%',
    fontWeight: 1200,
    '&:nth-last-child(1)': {
      minWidth: 100
    }
  },
  PageTitle: {
    fontSize: '1.25rem !important',
    color: theme.palette.text.primary,
    fontWeight: 500,
    width: '100%',
    margin: '0',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1)
    }
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },

  filterCard: {
    padding: 16,
    width: 'auto',
    minWidth: '200px',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  filterTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginBottom: theme.spacing(1)
  },
  filtertext: {
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
      display: 'block',
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
  },
  titleText: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5)
  },
  // pagination: {
  //   '& MuiPaginationItem-root': {
  //     marginBottom: theme.spacing(4)
  //   },
  //   '& button': {
  //     marginBottom: theme.spacing(1)
  //   }
  // },
  container: {
    overflow: 'hidden',
    marginBottom: theme.spacing(4)
  },
  fullWidth: {
    width: '100%'
  },
  IconButton: {
    padding: 0,
    marginRight: theme.spacing(2)
  },
  filterListItem: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 2,
    color: theme.palette.text.secondary,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.secondary
    }
  },
  filterListItemSelected: {
    fontSize: '0.875rem',
    lineHeight: 2,
    color: theme.palette.text.primary,
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.secondary
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
      color: '#fff'
    },
    '& .MuiTableHead-root': {
      color: theme.palette.text.secondary
    }
  },
  tableHead: {
    color: `${theme.palette.common.white} !important`,
    width: '80%',
    fontWeight: 1200,
    '&:nth-last-child(1)': {
      minWidth: 100
    }
  },
  rowStyling: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.info.main
    },
    '&:hover': {
      backgroundColor: `${theme.palette.info.main} !important`
    }
  },
  filterCardModal: {
    height: 'calc(100vh - 340px)',
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
  }
}));

const Courses: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useRouter();
  const courseData = useSelector(state => state.courses.courseData);
  const isCourseCreated = useSelector(state => state.adminCourse.courseCreated);
  const PER_PAGE = 10;
  const count = Math.ceil(courseData.totalCount / PER_PAGE);
  const [page, setPage] = React.useState(1);
  const [adminFilter, setAdminFilter] = useState<number | null>(null);
  const [filterModalOpen, setFilterModalOpen] = React.useState(false);
  let initialRender = true;

  const courseReq : CourseListReq ={
    isAdmin: true,
    pageID: page,
    limit: PER_PAGE,
    stroke: null,
    expertise: null,
    search: null,
    adminFilter: adminFilter
  } 

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };
  const sampleObject = [
    {
      value: 'All',
      key: 0
    },
    {
      value: 'Alphabetical',
      key: 1
    },
    {
      value: 'Recently Published',
      key: 2
    },
    {
      value: 'Unpublished',
      key: 3
    }
  ];

  useEffect(() => {
    dispatch(removeAdminCoursesFromState());
    dispatch(removeAllLessons());
    if (initialRender === true) {
      dispatch(removeAllCourses());
      initialRender = false;
    }
    dispatch(getCourse(courseReq));
  }, [page, adminFilter, isCourseCreated]);

  const handleReset = () => {
    setPage(1);
    setAdminFilter(null);
  };

  const handleNewDialogOpenClick = () => {
    history.push('/app/admin/courses/create');
    dispatch(getLessonFilterData('Lesson'));
  };

  return (
    <>
      <Page title="Admin-Course">
        <Container className={classes.container}>
          <div>
            <Box>
              <div className={classes.titleContent}>
                <Typography variant="h1" className={classes.PageTitle}>
                  Courses
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleNewDialogOpenClick()}
                    className={classes.viewbutton}
                    size="small"
                  >
                    NEW COURSE
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
              <Grid container spacing={2}>
                <Grid item lg={9} md={8} sm={12} className={classes.fullWidth}>
                  <Card className={classes.fullHeightCard}>
                    <Table>
                      <TableHead className={classes.table}>
                        <TableRow>
                          <TableCell className={classes.tableHead}>Name</TableCell>
                          <TableCell className={classes.tableHead}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <>
                          {courseData?.results?.length > 0 &&
                            courseData.results?.map(course => {
                              return (
                                <TableRow key={course._id} className={classes.rowStyling}>
                                  <TableCell className={classes.childOne}>{course.name}</TableCell>
                                  <TableCell className={classes.childOne}>
                                    <IconButton
                                      onClick={() =>
                                        history.push(`/app/admin/courses/edit/${course._id}`)
                                      }
                                      className={classes.IconButton}
                                    >
                                      <SvgIcon fontSize="small">
                                        <Edit />
                                      </SvgIcon>
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        history.push(`/app/admin/courses/view/${course._id}`)
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
                            })}
                          {!courseData?.results?.length && (
                            <TableRow>
                              <TableCell colSpan={2}>
                                {[...Array(10)].map((_: any, i) => (
                                  <Skeleton height={80} key={i} animation="wave" />
                                ))}
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Pagination
                              // className={classes.pagination}
                              count={count}
                              variant="outlined"
                              shape="rounded"
                              boundaryCount={1}
                              size="small"
                              page={page}
                              onChange={(_, page) => {
                                window.scrollTo(0, 0);
                                setPage(page);
                              }}
                            />
                          </TableCell>
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
                      {adminFilter !== null && (
                        <Button
                          className={classes.resetBtn}
                          variant="outlined"
                          onClick={handleReset}
                        >
                          RESET
                        </Button>
                      )}
                    </div>
                    <div className={classes.filtertext}>
                      {sampleObject?.map((item, index) => (
                        <Typography
                          onClick={() => {
                            setAdminFilter(item.key);
                            setPage(1);
                          }}
                          key={index}
                          className={
                            index === adminFilter
                              ? classes.filterListItemSelected
                              : classes.filterListItem
                          }
                        >
                          {item.value}
                        </Typography>
                      ))}
                    </div>
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
                  {adminFilter !== null ? (
                    <Button className={classes.resetBtn} variant="outlined" onClick={handleReset}>
                      RESET
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                {sampleObject?.map((item, index) => (
                  <Typography
                    onClick={() => {
                      setAdminFilter(item.key);
                      setPage(1);
                    }}
                    className={
                      index === adminFilter
                        ? classes.filterListItemSelected
                        : classes.filterListItem
                    }
                    key={index}
                  >
                    {item.value}
                  </Typography>
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

export default Courses;
