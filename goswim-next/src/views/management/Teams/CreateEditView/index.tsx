import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Slide, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import useGetTeam from 'src/hooks/useGetTeam';
import Form, { FormType } from 'src/views/management/Teams/CreateEditView/Form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface RouteParams {
  type: FormType;
  teamId?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.text.primary
  },
  inviteButton: {
    color: theme.palette.common.white,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  buttonText: { fontWeight: 500 },
  titleWithBtn: {
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  Editmodal: {
    '& .MuiDialog-paper': {
      margin: '0px !important'
    },
    '@media (max-width: 600px)': {
      '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100%)',
        borderRadius: '0'
      }
    },
    borderRadius: 15,
    minHeight: 'calc(100% - 200px)',
    width: '100%'
  }
}));
export const CreateView = () => {
  const classes = useStyles();
  const { type, teamId } = useRouter().query;
  const team = useGetTeam(teamId || '');
  const isInfoView = type === 'view';
  const title = isInfoView ? 'Team Details' : 'Edit Group';
  const pageTitle = type === 'create' ? 'Team Create' : isInfoView ? 'Team Details' : 'Team Edit';

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title={pageTitle}>
        <Container>
          {
            <Box className={classes.titleWithBtn}>
              <Typography variant="h3" className={classes.pageTitle}>
                Groups
              </Typography>
              <Box>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.inviteButton}
                  // component={RouterLink}
                  href="/train"
                  startIcon={<ArrowBackIcon />}
                >
                  <Typography component="span" className={classes.buttonText}>
                    Back
                  </Typography>
                </Button>
              </Box>
            </Box>
          }
          <Form type={type} {...((type === 'edit' || isInfoView) && { team, title, isInfoView })} />
        </Container>
      </Page>
    </Slide>
  );
};

export default CreateView;
