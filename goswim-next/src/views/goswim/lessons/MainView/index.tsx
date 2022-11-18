import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Container,
  Slide,
  Card,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import MenuItem from '@mui/material/MenuItem';
import LessonCard from './LessonCard';
import { getLessons } from 'src/store/management/goswim/lessons/actions';
import { getLessonFilterData } from 'src/store/management/lessons';
import { setLessonSearchText } from 'src/store/management/goswim/lessons/actions';
import { useRouter } from 'next/router';
import {
  getLessonArgs,
  handleSearchExpertise,
  handleSearchStroke,
  handleSearchTag,
  TYPES
} from 'src/constants';
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
    marginBottom: theme.spacing(3),
    minHeight: '270px',
    [theme.breakpoints.down('md')]: {
      padding: 0
    }
  },
  cardText: {
    color: theme.palette.text.secondary
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
    margin: `${theme.spacing(0.5)} !important`,
    width: '100%'
  },
  applyButton: {
    marginTop: '5px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
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
    color: theme.palette.text.secondary,
    margin: '10px',
    marginTop: theme.spacing(3),
    fontSize: '1rem'
  },
  helperMessage: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '0.875rem'
  },
  grdstyle: {
    paddingTop: 0,
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      textAlign: 'start'
    }
  },
  PageTitle: {
    marginTop: `${theme.spacing(2)} !important`,
    marginBottom: `${theme.spacing(2)} !important`,
    fontSize: '1.25rem !important',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  filteroptions: {
    marginTop: `${theme.spacing(2)} !important`,
    marginBottom: theme.spacing(2)
  },
  homeLink: {
    fontSize: 16,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.25),
    color: theme.palette.text.secondary
  },
  inifinteScroll: {
    overflow: 'hidden'
  }
}));

const Lessons: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const lessons = useSelector(state => state.courseDetails);
  const filterData = useSelector(state => state.lesson.filterData[0]);

  let searchParams = new URLSearchParams(router.query);
  let stroke = searchParams.get('stroke');
  let expertise = searchParams.get('expertise');
  let search = searchParams.get('search');
  let tags: any = searchParams?.get('tags');

  const waitForFilterResponce = !(stroke || expertise || tags);

  const [cat, setCat] = useState(handleSearchStroke(filterData, stroke));
  const [exp, setExp] = useState(handleSearchExpertise(filterData, expertise));
  const [finePoint, setFinePoint] = useState(handleSearchTag(filterData, tags));
  var pageItemCount = 12;
  const { results, totalCount } = lessons.lessons;
  const [loadMore, setLoadMore] = useState(totalCount !== results?.length);
  const [clearFilter, setClearFilter] = useState<Boolean | null>(null);
  const [withoutFilter, setWithoutFilter] = useState(true);
  const [initialFetch, setInitialFetch] = useState(waitForFilterResponce);
  const clearFilterDisplayCondition =
    cat !== 'all strokes' ||
    exp !== 'all' ||
    finePoint !== 'all' ||
    (!withoutFilter && cat === 'all strokes' && exp === 'all' && finePoint === 'all');
  var currentPage: number = 1; //(lessons.length/pageItemCount)+1
  const [page, setPage] = useState(currentPage);
  const sectionType = TYPES.LESSONS;
  let lessonReqArgs: getLessonArgs = {
    isAdmin: false,
    isBasic: false,
    pageID: page,
    limit: pageItemCount,
    course_id: null,
    stroke: withoutFilter ? '' : cat,
    expertise: exp === 'all' ? '' : exp,
    tags: finePoint === 'all' ? '' : finePoint,
    search: search ? search : ''
  };
  const settings = useSelector(state => state.settings);
  useEffect(() => {
    if (
      router.pathname
        .toString()
        .split('/')
        .pop() !== 'lessons'
    ) {
      dispatch(setLessonSearchText(''));
    }
    dispatch(getLessonFilterData('Lesson'));
  }, []);

  const filter = async () => {
    if (stroke || expertise || tags) {
      setWithoutFilter(false);
      setExp(handleSearchExpertise(filterData, expertise));
      setCat(handleSearchStroke(filterData, stroke));
      setFinePoint(handleSearchTag(filterData, tags));
    }
    setInitialFetch(true);
  };

  useEffect(() => {
    if (filterData) {
      filter();
    }
    if (initialFetch) {
      setApplyFilter();
    }
  }, [filterData, initialFetch]);

  useEffect(() => {
    if (clearFilter != null && initialFetch) {
      setApplyFilter();
    }
  }, [clearFilter]);

  useEffect(() => {
    if (initialFetch) setApplyFilter();
  }, [lessons.searchText]);

  useEffect(() => {
    setLoadMore(totalCount !== results?.length);
  }, [lessons]);

  const setApplyFilter = async () => {
    const searchText = lessons.searchText ? lessons.searchText : search ? search : '';

    await dispatch(getLessons(lessonReqArgs));
    // localStorage.removeItem('PageReset');
  };

  const fetchMoreData = () => {
    var count = Math.round(lessons?.lessons?.results?.length / pageItemCount);
    if (count <= page && results?.length < totalCount) {
      setPage(page + 1);
      setClearFilter(!clearFilter);
    } else {
      setLoadMore(false);
    }
  };

  const handleChangeCat = (e: any) => {
    setCat(e.target.value);
  };
  const handleChangeExp = (e: any) => {
    setExp(e.target.value);
  };
  const handleChangeFinePoint = (e: any) => {
    setFinePoint(e.target.value);
  };

  const handleApply = () => {
    setWithoutFilter(false);
    setPage(1);
    setLoadMore(true);
    setClearFilter(!clearFilter);
    let stroke = '';
    let expertise = '';
    let tags = '';
    let type = '';
    if (cat) {
      let tempCat = cat.replaceAll(' ', '+');
      stroke = `?stroke=${tempCat}`;
    }
    if (exp && exp !== 'all') {
      let tempExp = exp.replaceAll(' ', '+');
      expertise = `&expertise=${tempExp}`;
    }

    if (finePoint && finePoint !== 'all') {
      let tempFinePoint = finePoint.replaceAll(' ', '+');
      tags = `&tags=${tempFinePoint}`;
    }
    if (sectionType) {
      type = `&type=${sectionType}`;
    }
    router.push(`/lessons${stroke}${expertise}${tags}${type}`);
  };

  const handleReset = () => {
    setPage(1);
    setLoadMore(true);
    setCat('all strokes');
    setExp('all');
    setFinePoint('all');
    setWithoutFilter(true);
    setClearFilter(!clearFilter);
    router.push(`/lessons`);
  };

  const capitalise = (str: any) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Container>
          <Box mt={1}>
            <Typography variant="h1" className={classes.PageTitle}>
              Lessons
            </Typography>
            <Typography className={classes.cardText} variant="h6" gutterBottom>
              Browse through our thousands of Lessons to gain a deeper understanding of swimming.
              Use our search bar located above or, if you’re new to the site, use the Guided View to
              help narrow down the Lessons presented to you. If you use the Guided View, you’ll also
              be able to add your Expertise Level as an additional filter.
            </Typography>
          </Box>
          <Box>
            <Card className={classes.fullHeightCard}>
              {filterData && (
                <Grid container spacing={2} className={classes.filteroptions}>
                  <Grid item md={3} xs={12} className={classes.grdstyle}>
                    <FormControl variant="outlined" className={classes.formControlOne} size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">Select Category</InputLabel>
                      <Select
                        value={cat}
                        onChange={handleChangeCat}
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
                  <Grid item md={3} xs={12} className={classes.grdstyle}>
                    <FormControl variant="outlined" className={classes.formControlOne} size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Designate Expertise
                      </InputLabel>
                      <Select
                        value={exp}
                        onChange={handleChangeExp}
                        label="Designate Expertise"
                        name="inputTwo"
                      >
                        <MenuItem value="all">All</MenuItem>
                        {filterData?.expertise?.tags?.map(expVal => (
                          <MenuItem value={expVal} key={expVal}>
                            {capitalise(expVal)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={12} className={classes.grdstyle}>
                    <FormControl variant="outlined" className={classes.formControlOne} size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Select Fine Point
                      </InputLabel>
                      <Select
                        value={finePoint}
                        onChange={handleChangeFinePoint}
                        label="Select Fine Point"
                        name="inputThree"
                      >
                        <MenuItem value="all">All</MenuItem>
                        {filterData?.tags?.tags?.map(tag => (
                          <MenuItem value={tag} key={tag}>
                            {capitalise(tag)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <div className={classes.filterButtons}>
                      {clearFilterDisplayCondition && (
                        <Button onClick={handleReset}>CLEAR FILTER</Button>
                      )}
                      <Button
                        variant="contained"
                        className={classes.applyButton}
                        onClick={handleApply}
                      >
                        Apply
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <InfiniteScroll
                  dataLength={lessons.lessons.results ? lessons.lessons.results?.length : 0}
                  className={classes.scrollBar}
                  next={fetchMoreData}
                  hasMore={loadMore}
                  loader={
                    page !== 1 && (
                      <div
                        className={classes.progressCenter}
                        style={{ display: lessons.isLoading ? 'flex' : 'none' }}
                      >
                        <CircularProgress color="secondary" disableShrink />
                      </div>
                    )
                  }
                >
                  {lessons.isLoading && page === 1 ? (
                    <div
                      className={classes.progressCenter}
                      style={{ display: lessons.isLoading ? 'flex' : 'none' }}
                    >
                      <CircularProgress color="secondary" disableShrink />
                    </div>
                  ) : (
                    <Grid container spacing={2}>
                      {lessons.lessons?.results?.length
                        ? lessons.lessons?.results?.map(lesson => {
                            return (
                              <Grid item xs={12} sm={6} md={4} key={lesson._id}>
                                <LessonCard lesson={lesson} />
                              </Grid>
                            );
                          })
                        : lessons.isLoading === false && (
                            <div className={classes.noData}>
                              <img
                                src={
                                  settings.variant === 'dark'
                                    ? '/static/images/noresults/lessons-dark.svg'
                                    : '/static/images/noresults/lessons-light.svg'
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
                          )}
                    </Grid>
                  )}
                </InfiniteScroll>
              </Grid>
            </Card>
          </Box>
        </Container>
      </Slide>
    </>
  );
};

export default Lessons;
