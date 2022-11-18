import React, { useEffect } from 'react';
import { Container, Box, LinearProgress, Slide } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import Page from 'src/components/Page';
import Header from 'src/views/management/Members/CreateEditView/Header';
import Form from 'src/views/management/Members/CreateEditView/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getMember } from 'src/store/management/members';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3)
  },
  mt: {
    marginTop: 24
  }
}));

export const CreateView: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const location: any = router.asPath.split('/');
  const { userId }: any = router.query;
  const type = location[location.length - 2];
  const dispatch = useDispatch();

  const { memberData, isLoading } = useSelector(state => {
    return {
      memberData: state.members?.member,
      isLoading: state.members.isLoading
    };
  });
  const isInfoView = type === 'view';
  const member = memberData;
  const title = isInfoView ? 'Member Details' : 'Edit Member';
  const pageTitle =
    type === 'create' ? 'Member Create' : isInfoView ? 'Member Details' : 'Member Edit';

  useEffect(() => {
    if (userId) dispatch(getMember(userId));
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Slide direction="right" in mountOnEnter unmountOnExit>
          <Page className={classes.root} title={pageTitle}>
            <Container>
              <Header />
              {isInfoView && isLoading && (
                <Box width="100%" mt={3}>
                  <LinearProgress />
                </Box>
              )}
              {!isLoading && (
                <Form type={type} {...(type === 'edit' && { member, title, isInfoView })} />
              )}
            </Container>
          </Page>
        </Slide>
      )}
    </>
  );
};

export default CreateView;
