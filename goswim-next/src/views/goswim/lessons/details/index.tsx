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
  CircularProgress,
  CardActionArea
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { ComponentProps } from 'src/types/components';
import LessonPlayer from '../MainView/LessonPlayer';
import LessonCardSmall from '../MainView/LessonCardSmall';
import { getRelatedLessons } from 'src/store/management/goswim/lessons/details/actions';
import {
  getLessonDetails,
  removeLessonDetail
} from 'src/store/management/goswim/lessons/details/actions';
import { description } from '../../../../utils/functionUtil';
import LoadingScreen from 'src/components/LoadingScreen';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import Link from 'src/components/Link';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
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
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  cardText: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    fontSize: 14,
    fontWeight: 500
  },
  rvHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2)
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
  rightSideRelated: {
    flexWrap: 'nowrap',
    maxHeight: '424px',
    overflowY: 'auto'
  },
  description: {
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
  cardBG: {
    background: 'red'
  },
  relatedVideoCard: {
    marginBottom: theme.spacing(2)
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
  noSpace: {
    margin: 0,
    padding: 0
  }
}));

const LessonDetail: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const lesson = useSelector(state => state.lessonDetails.lessonDetails);
  const { isLoading, relatedLessons } = useSelector(state => state.lessonDetails);
  const { results, totalCount } = relatedLessons;
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(totalCount !== results?.length);
  const pageItemCount = 15;

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
    setLoadMore(totalCount !== results?.length);
  }, [results]);

  useEffect(() => {
    dispatch(removeLessonDetail());
    dispatch(getLessonDetails(query.lessonId));
  }, [query.lessonId]);

  useEffect(() => {
    if (query.lessonId && typeof query.lessonId === 'string')
      dispatch(getRelatedLessons(query.lessonId, page, pageItemCount));
  }, [query.lessonId, page]);

  const showLessonPlayer = (lessons: any) => {
    if (lessons) {
      return <LessonPlayer lesson={lessons} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Container>
        <Box {...rest} mt={1}>
          <Card className={classes.fullHeightCard}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7} md={8}>
                {showLessonPlayer(lesson)}

                {lesson?.description && (
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]} className={classes.description}>
                    {description(lesson!.description)}
                  </ReactMarkdown>
                )}
              </Grid>

              <Grid className={classes.rightSide} container item xs={12} sm={5} md={4}>
                <Grid item xs={12}>
                  <div className={classes.rvHeader}>
                    <div className={classes.rvHeaderLeft}>
                      <Typography className={classes.cardText} variant="body2">
                        Related Videos
                      </Typography>
                    </div>

                    <div>
                      <Link href={`/lessons`} prefetch={false}>
                        <Button
                          color="primary"
                          variant="text"
                          size="small">
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
                        <Grid
                          item
                          xs={12}
                          className={classes.relatedVideoCard}
                          key={`detail_${lesson._id}_${index}`}
                        >
                          <CardActionArea
                            className={classes.noSpace}
                            href={`/lessons/${lesson._id}`}
                          >
                            <LessonCardSmall lesson={lesson} />
                          </CardActionArea>
                        </Grid>
                      );
                    })}
                  </InfiniteScroll>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Slide>
  );
};

export default LessonDetail;
