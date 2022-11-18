import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Container,
  CircularProgress,
  Slide,
  Card,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Button
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import CourseCard from './CourseCard';
import {
  getCourse,
  removeAllCourses,
  setCourseSearchText
} from 'src/store/management/courses/actions';
import MenuItem from '@mui/material/MenuItem';
import { handleSearchExpertise, handleSearchStroke, TYPES } from 'src/constants';
import { useRouter } from 'next/router';
import { CourseListReq } from 'src/store/management/courses';

const useStyles = makeStyles(theme => ({
  root: {
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  fullHeightCard: {
    height: '100%',
    boxShadow: 'none !important',
    background: 'transparent',
    minHeight: '270px'
  },
  cardText: {
    color: theme.palette.text.secondary
  },
  inputBox: {
    marginTop: 0,
    marginRight: 30,
    paddingRight: 10
  },
  buttonStyle: {
    backgroundColor: '#E57A17',
    color: 'white'
  },
  videoShare: {
    paddingLeft: 10
  },
  selectbox: {
    marginLeft: 10,
    width: 250
  },
  iconstyle: {
    padding: 5
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
    overflow: 'hidden !important',
    minHeight: '150px'
  },
  formControlOne: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  applyButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    marginTop: '5px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  userIcon: {
    margin: 0
  },

  divAbsolute: {
    bottom: 0,
    right: 0,
    width: '30px',
    height: '30px'
  },
  socialicons: {
    marginTop: 30
  },
  filteroptions: {
    margin: '16px 8px !important',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'end !important',
    textAlign: 'left',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'end'
    },
    [theme.breakpoints.up('md')]: {
      margin: '16px 0'
    }
  },
  listCard: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    }
  },
  filterButtons: {
    display: 'flex',
    justifyContent: 'end',
    width: '100%'
  },
  noData: {
    margin: '56px auto',
    maxWidth: '50%',
    textAlign: 'center'
  },
  noDataPic: {
    display: 'block',
    margin: 'auto',
    height: '125px'
  },
  noDataMessage: {
    margin: '10px',
    fontSize: '1rem'
  },
  helperMessage: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '0.875rem'
  },
  newclass: {
    display: 'flex',
    justifyContent: 'end'
  },
  PageTitle: {
    margin: '16px 0 !important',
    fontSize: '1.25rem !important',
    color: theme.palette.text.primary,
    fontWeight: '500 !important'
  },
  homeLink: {
    fontSize: 16,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.25),
    color: theme.palette.text.secondary
  },
  container: {
    marginBottom: theme.spacing(4)
  }
}));

const Courses: React.FC = (props: any) => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 767,
        md: 991,
        lg: 1280,
        xl: 1920
      }
    }
  });
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const router = useRouter();
  const courses = useSelector(state => state.courses);
  const filterData = useSelector(state => state.courses.courseFilterData[0]);
  const { results, totalCount } = courses.courseData;
  var pageItemCount = 12;
  var currentPage: number = 1;

  const sectionType = TYPES.COURSES;
  const [page, setPage] = useState(currentPage);
  let searchParams = new URLSearchParams(router.query);
  let stroke = searchParams.get('stroke');
  let expertise = searchParams.get('expertise');
  let search = searchParams.get('search');

  const waitForFilterResponce = !(stroke || expertise);
  const [cat, setCat] = useState(handleSearchStroke(filterData, stroke));
  const [exp, setExp] = useState(handleSearchExpertise(filterData, expertise));
  const [loadMore, setLoadMore] = useState(totalCount !== results?.length);
  const [clearFilter, setClearFilter] = useState(false);
  const [withoutFilter, setWithoutFilter] = useState(true);
  const [initialFetch, setInitialFetch] = useState(waitForFilterResponce);
  const clearFilterDisplayCondition =
    cat !== 'all strokes' ||
    exp !== 'all' ||
    (!withoutFilter && cat === 'all strokes' && exp === 'all');
  const settings = useSelector(state => state.settings);
  
  useEffect(() => {
    dispatch(removeAllCourses());
    dispatch(setCourseSearchText(''));
  }, []);

  useEffect(() => {
    setLoadMore(totalCount !== results?.length);
  }, [results]);

  useEffect(() => {
    if (initialFetch) {
      const count = Math.round(results?.length / pageItemCount);
      const isLoadmore = count <= page && results?.length < totalCount;
      setApplyFilter(isLoadmore);
    }
  }, [clearFilter]);

  useEffect(() => {
    if (initialFetch) setApplyFilter(false);
  }, [courses.searchText]);

  useEffect(() => {
    if (filterData && !initialFetch) {
      setExp(handleSearchExpertise(filterData, expertise));
      setCat(handleSearchStroke(filterData, stroke));
      if (expertise || stroke) setWithoutFilter(false);
      setInitialFetch(true);
    }
    if (initialFetch) {
      setApplyFilter(false);
    }
  }, [filterData, initialFetch]);


  useEffect(() => {
    if (cat && cat !== 'all strokes') {
      setWithoutFilter(false);
    }
    if ((stroke === cat || expertise === exp) && initialFetch) {
      setApplyFilter(false);
    }
  }, [exp, cat, withoutFilter]);

  const setApplyFilter = async (loadMore: boolean = false) => {
    if (loadMore !== true) {
      await dispatch(removeAllCourses());
    }
    const searchText = courses.searchText ? courses.searchText : search ? search : '';
    const courseReq: CourseListReq = {
      isAdmin: false,
      pageID: page,
      limit: pageItemCount,
      stroke: withoutFilter ? '' : cat,
      expertise: exp === 'all' ? '' : exp,
      search: searchText
    }
    await dispatch(getCourse(courseReq));
  };

  const fetchMoreData = () => {
    const count = Math.round(results?.length / pageItemCount);
    if (count <= page && results?.length < totalCount) {
      setPage(page + 1);
      setClearFilter(!clearFilter);
    } else {
      setLoadMore(false);
    }
  };

  const handleChangeOne = (event: any) => {
    setCat(event.target.value);
  };

  const handleChangeExpertise = (event: any) => {
    setExp(event.target.value);
  };

  const handleApplyFilter = () => {
    let stroke = '';
    let expertise = '';
    let type = '';
    if (cat) {
      let tempCat = cat.replaceAll(' ', '+');
      stroke = `?stroke=${tempCat}`;
    }
    if (exp && exp !== 'all') {
      let tempExp = exp.replaceAll(' ', '+');
      expertise = `&expertise=${tempExp}`;
    }
    if (sectionType) {
      type = `&type=${sectionType}`;
    }
    dispatch(removeAllCourses());
    setWithoutFilter(false);
    setPage(1);
    setLoadMore(true);
    setClearFilter(!clearFilter);
    router.push(`/courses${stroke}${expertise}${type}`);
  };

  const handleResetFilter = () => {
    dispatch(removeAllCourses());
    setPage(1);
    setLoadMore(true);
    setCat('all strokes');
    setExp('all');
    setClearFilter(!clearFilter);
    setWithoutFilter(true);
    router.push(`/courses`);
  };

  const capitalise = (str: any) => {
    // return str.toUpperCase();
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  const filter = () => {
    if (true) {
      return (
        <>
          <div className={classes.filteroptions}>
            {filterData && (
              <Grid container spacing={2}>
                <Grid item sm={6} md={4} xs={12}>
                  <FormControl variant="outlined" className={classes.formControlOne} size="small">
                    <InputLabel id="demo-simple-select-label" htmlFor="outlined-age-native-simple">
                      Select Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={cat}
                      onChange={handleChangeOne}
                      label="Select Category"
                      name="inputOne"
                    >
                      {filterData?.stroke?.tags?.map(catVal => (
                        <MenuItem value={catVal} key={catVal}>
                          {capitalise(catVal)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                  <FormControl variant="outlined" className={classes.formControlOne} size="small">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Designate Expertise
                    </InputLabel>
                    <Select
                      value={exp}
                      onChange={handleChangeExpertise}
                      label="Designate Expertise"
                      name="inputTwo"
                    >
                      <MenuItem value="all">All</MenuItem>
                      {filterData?.expertise?.tags?.map(expVal => (
                        <MenuItem value={expVal} key={expVal} onClick={() => setExp(expVal)}>
                          {capitalise(expVal)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                  <div className={classes.filterButtons}>
                    {clearFilterDisplayCondition && (
                      <Button onClick={handleResetFilter}>CLEAR FILTER</Button>
                    )}
                    <Button
                      variant="contained"
                      className={classes.applyButton}
                      onClick={handleApplyFilter}
                    >
                      Apply
                    </Button>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
          {/* filter options end */}
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Container className={classes.container}>
          <Box>
            <Typography variant="h1" className={classes.PageTitle}>
              Courses
            </Typography>
            <Typography className={classes.cardText} variant="h6" gutterBottom>
              Each Course contains a collection of Lessons on a single topic or featuring a specific
              swimmer. The Lessons within a Course can also be scheduled for auto-delivery to your
              in-box, so you can start to direct your own learning on a daily basis.
            </Typography>
          </Box>

          <Box>
            <Card className={classes.fullHeightCard}>
              {filter()}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InfiniteScroll
                    dataLength={results && results.length}
                    className={classes.scrollBar}
                    next={fetchMoreData}
                    hasMore={loadMore}
                    loader={
                      <div
                        className={classes.progressCenter}
                        style={{ display: courses.isLoading ? 'flex' : 'none' }}
                      >
                        <CircularProgress color="secondary" disableShrink />
                      </div>
                    }
                  >
                    <Grid container spacing={2}>
                      {results?.length
                        ? results?.map((course, index) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} key={`${course?._id}${index}`}>
                              <CourseCard course={course} />
                            </Grid>
                          );
                        })
                        : courses.isLoading === false && (
                          <div className={classes.noData}>
                            <img
                              src={
                                settings.variant === 'dark'
                                  ? '/static/images/noresults/courses-dark.svg'
                                  : '/static/images/noresults/courses-light.svg'
                              }
                              alt="no lessons found"
                              className={classes.noDataPic}
                            />
                            <h2 className={classes.noDataMessage}>
                              Sorry, No results available!
                            </h2>
                            <Typography className={classes.helperMessage}>
                              Please check the spelling or try searching something else
                            </Typography>
                          </div>
                          // <h2 className={classes.noDataMessage}>NO RESULT AVAILABLE</h2>
                        )}
                    </Grid>
                  </InfiniteScroll>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Container>
      </Slide>
    </>
  );
};

export default Courses;
