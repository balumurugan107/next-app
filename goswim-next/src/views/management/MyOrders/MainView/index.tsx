import React from 'react';
import { Container, Box, Slide, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import { ComponentProps } from 'src/types';
import Results from 'src/views/management/MyOrders/MainView/Results';

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
    minHeight: 'calc(100vh - 336px)'
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  }
}));

const OrdersView: React.FC<ComponentProps> = () => {
  const classes = useStyles();

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title="Bookings">
        <Container>
          {/* <Header /> */}
          <Typography variant="h1" className={classes.title}>
            Bookings
          </Typography>
          <Box mt={3}>
            <Results />
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default OrdersView;
