import { Box, Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import Page from 'src/components/Page';
// import weeklyThemes from 'src/services/goswim/admin/weeklyThemes';
// import { AccountType } from 'src/constants';
import { getDashboardWeeklyThemes } from 'src/store/newdashboard';
import LessonCard from '../lessons/MainView/LessonCard';

const useStyles = makeStyles(theme => ({
  root: {
    // overflow: 'scroll',
    // paddingBottom: 100,
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  scheduleContent: {
    alignItems: 'center',
    paddingBottom: theme.spacing(2)
  },
  sectionTitle: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    padding: '16px 0',
    // boxShadow: 'inset 0px -1px 0px #EEEEEE;',
    lineHeight: 'initial',
    fontSize: '18px'
  },
  scheduleDiscription: {
    color: theme.palette.text.secondary
  },
  progressCenter: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  weeklyThemeCard: {
    marginBottom: theme.spacing(1)
  },
  linearProgress: {
    marginTop: theme.spacing(2)
  },
  fullHeightCard: {
    height: '100%',
    boxShadow: 'none',
    background: theme.palette.background.paper,
    padding: 16,
    marginBottom: theme.spacing(3),
    minHeight: '270px'
  },
  cardContent: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  cardText: {
    color: theme.palette.text.secondary,
    fontSize: 14
  },
  PageTitle: {
    marginTop: `${theme.spacing(2)} !important`,
    marginBottom: `${theme.spacing(2)} !important`,
    fontSize: '1.25rem !important',
    color: theme.palette.text.primary,
    fontWeight: '500 !important'
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
  }
}));

const ThemeOfTheWeek: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { dashboardWeeklyThemes } = useSelector(state => state.dashboardNew);
  const weeklyThemes = useSelector(state => state.courseDetails);
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);

  const settings = useSelector(state => state.settings);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;
  const scheduled_on = new Date().valueOf();

  const isLoading = useSelector(state => state.dashboardNew.isLoading);
  // const getData = () => {
  //     if (AccountType.SWIMMER) {
  //         dispatch(getDashboardWeeklyThemes(timeZone, scheduled_on));
  //     }
  // }

  useEffect(() => {
    // dispatch(getDashboardWeeklyThemes(timeZone, scheduled_on));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <Box className={classes.root}>
        {dashboardWeeklyThemes?.length ? (
          <>
            <Grid container>
              <Box mt={1} mb={2}>
                <Typography variant="h1" className={classes.PageTitle}>
                  Goswim Weekly Theme
                </Typography>
                <Typography className={classes.cardText} variant="body2" gutterBottom>
                  Every week, GoSwim presents a series of videos focused on one focused skill. Dig
                  deeper into the fine points of swimming.
                </Typography>
              </Box>
              <div
                className={classes.progressCenter}
                style={{ display: weeklyThemes.isLoading ? 'flex' : 'none' }}
              >
                <CircularProgress color="secondary" disableShrink />
              </div>
              <Grid container spacing={2} className={classes.weeklyThemeCard}>
                {dashboardWeeklyThemes?.map(weeklyTheme => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={weeklyTheme._id}>
                      <LessonCard key={weeklyTheme.name} lesson={weeklyTheme} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <div className={classes.scheduleContent}>
              <Typography variant="h4" className={classes.sectionTitle}>
                GOSWIM WEEKLY THEME
              </Typography>
              <p className={classes.scheduleDiscription}>
                Every week, GoSwim presents a series of videos focused on one focused skill. Dig
                deeper into the fine points of swimming.
              </p>
            </div>
            <Card className={classes.fullHeightCard}>
              <Grid container>
                <div
                  className={classes.progressCenter}
                  style={{ display: weeklyThemes.isLoading ? 'flex' : 'none' }}
                >
                  <CircularProgress color="secondary" disableShrink />
                </div>
                <Grid container spacing={2} className={classes.weeklyThemeCard}>
                  <div className={classes.noData}>
                    <img
                      src={
                        settings.variant === 'dark'
                          ? '/static/images/noresults/weekly-themes-dark.svg'
                          : '/static/images/noresults/weekly-themes-light.svg'
                      }
                      alt="no lessons found"
                      className={classes.noDataPic}
                    />
                    <h2 className={classes.noDataMessage}>No weekly themes available</h2>
                    {/* <Typography className={classes.helperMessage}>Please check the spelling or try searching something else</Typography> */}
                  </div>
                </Grid>
              </Grid>
            </Card>
          </>
        )
        // <Card>
        // <Paper component={Box}>
        //     <LinearProgress className={classes.linearProgress}/>
        // </Paper>
        // </Card>
        // <LinearProgress />
        }
      </Box>
    </Container>
  );
};

export default ThemeOfTheWeek;
