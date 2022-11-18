import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Container, Box, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Page from 'src/components/Page';
import { ComponentProps } from 'src/types/components';
import { getMember } from 'src/store/management/members';
import LoadingScreen from 'src/components/LoadingScreen';
import InfoView from 'src/views/management/Members/MemberInfoView/InfoView';
import Header from 'src/views/management/Members/MemberInfoView/Header';

interface RouteParams {
  memberId: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const Details: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { memberId } = useParams<RouteParams>();
  const { isLoading } = useSelector(state => state.members);

  useEffect(() => {
    if (memberId) {
      dispatch(getMember(memberId));
    }
  }, [memberId, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Page className={classes.root} title="Member Info">
      <Container>
        <Header />
        <Box mt={3} />
        <Divider />
        <Box mt={3}>
          <Grid className={clsx(classes.root, className)} container spacing={3} {...rest}>
            <Grid item xl={8} lg={10} md={12} xs={12}>
              <InfoView />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default Details;
