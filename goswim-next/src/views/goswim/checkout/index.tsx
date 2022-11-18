import { Card, alpha, Grid, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CheckoutPlanDetail from 'src/components/CheckoutPlanDetail';
import LoadingScreen from 'src/components/LoadingScreen';
import { getSubscriptionProducts } from 'src/store/subscriptions';
import ElementForm from '../Subscriptions/ElementForm';
const useStyles = makeStyles(theme => ({
  logo: {
    maxWidth: '250px'
  },
  planWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  fullHeightCard: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    padding: theme.spacing(2.5)
    // marginTop: theme.spacing(2)
  },
  checkoutWrapper: {
    padding: theme.spacing(3)
  },
  title: {
    fontSize: '24px',
    marginBottom: theme.spacing(2)
  },
  planName: {
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0.5)
  },
  timePeriod: {
    fontSize: '16px',
    color: theme.palette.text.primary,
    fontWeight: 400
  },
  promoCode: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 16
  },
  priceTable: {
    '& td': {
      fontSize: 16,
      '&:nth-child(1)': {
        paddingLeft: 0
      }
    },
    '& th': {
      paddingLeft: 0
    }
  },
  emailField: {
    marginBottom: theme.spacing(1.5),
    background: alpha(theme.palette.primary.main, 0.1)
  },
  emailLabel:{
    fontSize: '0.93rem'
  }
}));
export const Checkout = () => {
  const classes = useStyles();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const planId = search.split('=')[1];
  const productData = useSelector(state => state.subscription.productData);
  const selectedPlan = productData.find(product => product.id === planId);
  const userEmail = useSelector(state => state.account.user?.email)
  const setupIntentClientSecret = useSelector(
    state => state.subscription.subscriptionData?.setupIntentClientSecret
  );
  const clientSecret = useSelector(state => state.subscription.subscriptionData?.clientSecret);
  useEffect(() => {
    dispatch(getSubscriptionProducts());
    // dispatch(createSubscription(selectedPlan?.price?.id));
  }, []);
  return !(setupIntentClientSecret || clientSecret) ? (
    <LoadingScreen />
  ) : (
    <Grid container spacing={3} className={classes.checkoutWrapper}>
      <Grid item sm={6}>
        <CheckoutPlanDetail selectedPlan={selectedPlan} />
      </Grid>
      <Grid item sm={6}>
        <Card className={classes.fullHeightCard}>
          <Typography variant="h1" className={classes.title} >Pay With Card</Typography>
          <Typography className={classes.emailLabel}>Email</Typography>
          <TextField value={userEmail} variant="outlined" className={classes.emailField} fullWidth size="small" onMouseDown={(event) => {event.preventDefault();}} />
          {(setupIntentClientSecret || clientSecret) && (
            <ElementForm
              setupIntentClientSecret={setupIntentClientSecret}
              clientSecret={clientSecret}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  );
};
export default Checkout;
