import React from 'react';
import { Container, Box, LinearProgress, Slide } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import { useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import Header from './Header';
import Form from './Form';

// import { getMember } from 'src/store/management/members';

// interface RouteParams {
//   type: FormType;
//   memberId?: string;
// }

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  mt: {
    marginTop: 24
  }
}));

export const CreateView: React.FC = () => {
  const classes = useStyles();
  const location: any = useLocation().pathname.split('/');
  const type = location[5];
  const { isLoading } = useSelector(state => {
    return {
      isLoading: state.members.isLoading
    };
  });
  // const group: Group = {
  //   email: 'alabama@gmail.com',
  //   payment_status: 'completed',
  //   total_amount: 120,
  //   total_coaches: 10,
  //   total_members: 40,
  //   group_name: 'Alabama',
  //   group_status: 'active',
  //   plan_duration: moment()
  //     .endOf('day')
  //     .valueOf()
  // };

  const group = useSelector(state => state.specialGroups.groups?.[0]);
  const pageTitle = type === 'create' ? 'Create Specail Group' : ' Edit Special Group';

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Slide direction="right" in mountOnEnter unmountOnExit>
          <Page className={classes.root} title={pageTitle}>
            <Container>
              <Header />
              {isLoading && (
                <Box width="100%" mt={3}>
                  <LinearProgress />
                </Box>
              )}
              {!isLoading && <Form {...(type === 'edit' && { group, pageTitle })} />}
            </Container>
          </Page>
        </Slide>
      )}
    </>
  );
};

export default CreateView;
