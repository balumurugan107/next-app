import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Container, Slide, Card, Typography, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import LessonCard from '../MainView/LessonCard';
import { getFavourites } from 'src/store/management/lessons';
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
    boxShadow: 'none',
    background: theme.palette.background.paper,
    padding: 16,
    marginBottom: theme.spacing(3),
    minHeight: 'calc(100vh - 160px)'
  },
  cardText: {
    color: theme.palette.text.primary,
    fontSize: 14
    // paddingTop: 8
    // paddingLeft: 15
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
    overflow: 'hidden !important'
  },
  listItemGrid: {
    margin: 0,
    width: '100%'
  },
  formControlOne: {
    margin: theme.spacing(0.5),
    width: '100%'
  },
  applyButton: {
    marginTop: '5px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  filterButtons: {
    display: 'flex',
    justifyContent: 'end',
    width: '100%'
  },
  noDataMessage: {
    margin: '10px',
    fontSize: '1rem'
  },
  grdstyle: {
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      textAlign: 'start'
    }
  },
  PageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  filteroptions: {
    marginTop: theme.spacing(2),
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
  },
  favoriteNotFound: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  noData: {
    margin: '100px auto',
    maxWidth: '50%',
    textAlign: 'center'
  },
  noDataPic: {
    display: 'block',
    margin: 'auto',
    height: '125px'
  },
  helperMessage: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '0.875rem'
  }
}));

const Favourites: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const favourites = useSelector(state => state.lesson.favouriteDetails);
  const isLoading = useSelector(state => state.lesson.isLoading);

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Container>
          <Box mt={1}>
            <Typography variant="h1" className={classes.PageTitle}>
              Favorites
            </Typography>
          </Box>

          <Box>
            <Card className={classes.fullHeightCard}>
              {isLoading && <LinearProgress />}
              <Grid container spacing={2}>
                <Grid className={classes.listItemGrid} container spacing={3}>
                  {favourites?.results?.length > 0 && !isLoading
                    ? favourites.results?.map(lesson => {
                        return (
                          <Grid item xs={12} sm={6} md={4} key={lesson._id}>
                            <LessonCard lesson={lesson} />
                          </Grid>
                        );
                      })
                    : !isLoading && (
                        <div className={classes.noData}>
                          <img
                            src={
                              settings.variant === 'dark'
                                ? '/static/images/noresults/fav-light-1.svg'
                                : '/static/images/noresults/fav-light.svg'
                            }
                            alt="no lessons found"
                            className={classes.noDataPic}
                          />
                          <h2 className={classes.noDataMessage}>Sorry, No results available!</h2>
                          <Typography className={classes.helperMessage}>
                            You haven't added any lessons to favorite.
                          </Typography>
                        </div>
                      )}
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Container>
      </Slide>
    </>
  );
};

export default Favourites;
