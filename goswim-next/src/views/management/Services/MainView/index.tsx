import { Box, Card, Container, Slide, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Page from 'src/components/Page';
import { getTeamHeirarchy } from 'src/store/management/team';
import { ComponentProps } from 'src/types';
import Schedule from 'src/views/management/Services/MainView/VideoReviews';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '8px',
    cursor: 'default',
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      }
    },
    paddingBottom: theme.spacing(3)
  },
  ph: {
    padding: '0px 20px 20px',
    [theme.breakpoints.down('sm')]: { padding: '0px 8px 8px' }
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  scheduleCard: {
    marginBottom: '24px',
    marginTop: '24px'
  },
  card: {
    minHeight: '65vh'
  }
}));

const ServiceView: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamHeirarchy());
  }, []);

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title="Services">
        <Container>
          <Typography variant="h1" className={classes.title}>
            Services
          </Typography>
          <Box mt={3}>
            <Card className={classes.card}>
              <Container>
                <Schedule className={classes.scheduleCard} />
              </Container>
            </Card>
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default ServiceView;
