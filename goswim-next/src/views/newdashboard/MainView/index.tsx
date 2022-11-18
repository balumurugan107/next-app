import { Box, Button, Card, Container, Grid, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import Page from 'src/components/Page';
import config from 'src/config';
import { AccountType } from 'src/constants';
import { LessonServiceDocument } from 'src/store/management/lessons';
import {
  getJustAddedLessons,
  getRecentlyAdded,
  removeDashboardWeeklyThemes
} from 'src/store/newdashboard';
import { getSubscriptionProducts } from 'src/store/subscriptions';
import DashboardLessonCard from './DashboardLessonCard';

const useStyles = makeStyles(theme => ({
  root: {
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  sectionTitle: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    padding: '16px 0',
    lineHeight: 'initial',
    fontSize: '18px'
  },
  scheduleBtn: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    margin: '16px 0'
  },
  scheduleContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(2)
  },
  scheduleDiscription: {
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  recentlyWatched: {
    margin: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  planLink: {
    cursor: 'pointer'
  },
  lessonCard: {
    width: '100%',
    float: 'left',
    [theme.breakpoints.down('md')]: {
      '& .lessoncard': {
        display: 'block'
      }
    }
  },
  DashboardCard: {
    marginBottom: theme.spacing(2),
    minHeight: '580px'
  },
  h4: {
    fontWeight: '500 !important',
    color: theme.palette.text.primary,
    padding: 16,
    boxShadow: `inset 0px -1px 0px ${theme.palette.action.disabledBackground};`,
    lineHeight: 'initial !important',
    fontSize: '1rem !important'
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
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%) !important',
    background: theme.palette.background.paper,
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
    fontSize: 16
  },
  PageTitle: {
    margin: "16px 0 !important",
    fontSize: '1.25rem !important',
    color: `${theme.palette.text.primary} !important`,
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
    margin: '10px'
  },
  helperMessage: {
    color: theme.palette.text.secondary,
    fontWeight: 400
  }
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const lessonData = useSelector(state => {
    return state.dashboardNew.recentlyAddedData;
  });
  const isLoading = useSelector(state => state.dashboardNew.isLoading);
  const UserRole = useSelector(state => state?.account?.user?.role);
  const { teamsList } = useSelector(state => state?.team);
  const filteredTeamList = teamsList?.filter(team => team._id !== config.goswimGroupAPI.groupId);
  const subscriptionProducts = useSelector(state => state.subscription.productData);
  const recentLesssonData = useSelector(state => {
    return state.dashboardNew.justAddedData;
  });

  const getData = () => {
    dispatch(getJustAddedLessons());
    dispatch(getRecentlyAdded());
  };

  useEffect(() => {
    dispatch(removeDashboardWeeklyThemes());
    if (recentLesssonData.length == 0)
      getData();
    if (subscriptionProducts?.length === 0) dispatch(getSubscriptionProducts());
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page className={classes.root} title="Dashboard">
      <Container>
        <Box className={classes.root}>
          {UserRole === AccountType.SWIMMER && (
            <>
              {filteredTeamList.length > 0 && (
                <div className={classes.scheduleContent}>
                  <Typography variant="h4" className={classes.sectionTitle}>
                    MY SCHEDULED LESSONS
                  </Typography>
                  <p className={classes.scheduleDiscription}>
                    It appears you do not have any Courses scheduled. If you’re a free member, and
                    you’d like to learn specific skills for you,{' '}
                    <Link
                      className={classes.planLink}
                      onClick={() => router.push({ pathname: `/plans`, query: { state: 'upgrade' } }, '/plans')}
                    >
                      upgrade your account
                    </Link>{' '}
                    and then go to Courses to schedule your course, at your pace.
                  </p>
                  <Button
                    variant="contained"
                    className={classes.scheduleBtn}
                    onClick={() =>
                      router.push(`/calendar`)
                    }
                  >
                    SEE FULL SCHEDULE
                  </Button>
                </div>
              )}
            </>
          )}
          <Typography variant="h1" className={classes.PageTitle}>
            Dashboard
          </Typography>
          <Grid container spacing={2} className={classes.DashboardCard}>
            <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.fullHeightCard}>
                <Typography variant="h4" className={classes.h4}>
                  JUST ADDED
                </Typography>
                {lessonData?.map(lesson => {
                  var obj: LessonServiceDocument = {
                    ...lesson
                  };

                  return (
                    <div key={`added ${lesson._id}`} className={classes.lessonCard}>
                      <DashboardLessonCard lesson={obj as LessonServiceDocument} />
                    </div>
                  );
                })}
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.fullHeightCard}>
                <Typography variant="h4" className={classes.h4}>
                  RECENTLY WATCHED
                </Typography>
                {recentLesssonData?.length > 0 ? (
                  recentLesssonData?.map(lesson => {
                    var obj: LessonServiceDocument = {
                      ...lesson
                    };

                    return (
                      <DashboardLessonCard
                        key={`recentlty ${lesson._id}`}
                        lesson={obj as LessonServiceDocument}
                      />
                    );
                  })
                ) : (
                  <>
                    <Typography className={classes.recentlyWatched}>
                      Your recently watched videos will appear here
                    </Typography>
                  </>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
