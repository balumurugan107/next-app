import { Button, LinearProgress, SvgIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PaymentIcon from '@mui/icons-material/Payment';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingButton from 'src/components/LoadingButton';
import { BASE_URL } from 'src/constants';
import { getSubscriptions } from 'src/store/subscriptions';

const useStyles = makeStyles(theme => ({
  SubmitBtn: {
    backgroundColor: theme.palette.primary.main,
    maxHeight: theme.spacing(4),
    color: theme.palette.common.white,
    margin: '8px 0'
  },
  errMsg: {
    color: 'red'
  },
  childSubmitBtn: {
    color: theme.palette.common.white
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  progressDiv: {
    padding: '130px 0'
  }
}));

const SetupCustomerCardForm = props => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [paymentElementloading, setPaymentElementloading] = useState(true);
  const history = useHistory();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    let data;
    if (props.setupIntentClientSecret) {
      setLoading(true);
      data = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${BASE_URL}/paymentStatus`
        }
      });
    } else if (props.clientSecret) {
      setLoading(true);
      data = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${BASE_URL}/paymentStatus?client_secret=true`
        }
      });
    }
    if (data.error) {
      setLoading(false);
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
    } else {
      setLoading(false);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      if (props.clientSecret && data?.paymentIntent?.status === 'succeeded') {
        setTimeout(() => {
          history.push('/app/dashboard');
          // await dispatch(getSubscriptions(data?.paymentIntent?.amount));
        }, 4000);
      } else {
        dispatch(getSubscriptions());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement onReady={() => setPaymentElementloading(false)} />
      {paymentElementloading && (
        <div className={classes.progressDiv}>
          <LinearProgress />
        </div>
      )}
      {!paymentElementloading && (
        <LoadingButton
          color="secondary"
          type="submit"
          variant="contained"
          isLoading={loading}
          isValid={true}
          progressSize={15}
          className={classes.SubmitBtn}
        >
          <Button onClick={handleSubmit} className={classes.childSubmitBtn}>
            <SvgIcon fontSize="small" className={classes.actionIcon}>
              <PaymentIcon className={classes.buttonText} />
            </SvgIcon>{' '}
            Submit
          </Button>
        </LoadingButton>
      )}
      {/* Show error message to your customers */}
    </form>
  );
};

export default SetupCustomerCardForm;
