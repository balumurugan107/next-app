import React, { useState, useEffect } from 'react';
import { Container, Box, Slide } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import Header from 'src/views/management/Members/CheckoutView/Header';
import CheckoutTable from 'src/views/management/Members/CheckoutView/CheckoutTable';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3)
  },
  tableAllign: {
    paddingTop: theme.spacing(3)
  }
}));

const CheckoutView: React.FC = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setProducts([]);
  }, []); // eslint-disable-line

  if (!products) {
    return null;
  }

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Page className={classes.root} title="Checkout">
        <Container>
          <Header />
          <Box className={classes.tableAllign}>
            <CheckoutTable />
          </Box>
        </Container>
      </Page>
    </Slide>
  );
};

export default CheckoutView;
