import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Slide, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import { setSelectedTeams } from 'src/store/management/team';
import Results from 'src/views/management/Teams/MainView/Results';
import { AccountType } from 'src/constants';

const useStyles = makeStyles(theme => ({
  resultWrapper: {
    marginBottom: theme.spacing(3)
  },
  PageTitle: {
    margin: '16px 0 !important',
    fontSize: '1.25rem !important',
    color: theme.palette.text.primary,
    fontWeight: '500 !important'
  },
  cardText: {
    color: theme.palette.text.secondary,
    // fontSize: 14
  }
}));

const TeamsView: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userType = useSelector(state => state?.account?.user?.role);

  useEffect(() => () => {
    dispatch(setSelectedTeams([]));
  });

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page title="Groups">
        <Container>
          <Box>
            <Typography variant="h1" className={classes.PageTitle}>
              Groups
            </Typography>
            {userType === AccountType.ADMIN || userType === AccountType.COACH ? (
              <Typography className={classes.cardText} variant="h6" gutterBottom>
                We can create any number of training groups to add members and assign GoSwim videos
                to those members
              </Typography>
            ) : (
              <Typography className={classes.cardText} variant="body2" gutterBottom>
                Here you can see the list of groups you are in
              </Typography>
            )}
          </Box>
          {/* <Header /> */}
          <Box mt={3} className={classes.resultWrapper}>
            <Results />
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default TeamsView;
