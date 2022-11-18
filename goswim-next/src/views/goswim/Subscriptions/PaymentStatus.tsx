import React, { useState, useEffect, useMemo } from 'react';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import SnackbarUtils from 'src/helpers/snackbar';
import LoadingScreen from 'src/components/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from 'src/store/subscriptions';
import { defaultOptions } from 'src/constants/snackbar';

const PaymentStatus = () => {
  const stripe = useStripe();
  const history = useHistory();
  const dispatch = useDispatch();
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);
  const { isSubscribed, attempt } = useSelector(state => state.account);
  const subscriptionData = useSelector(state => state.subscription.data);
  let timer: NodeJS.Timeout;
  let [timerState, setTimerState] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "setup_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret: string | null = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret'
    );

    // Retrieve the SetupIntent
    if (!clientSecret) {
      retrySubscription();
    } else {
      stripe.retrieveSetupIntent(clientSecret).then(setupIntent => {
        // Inspect the SetupIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (setupIntent?.setupIntent?.status) {
          case 'succeeded':
            retrySubscription();
            break;

          case 'processing':
            return <LinearProgress />;
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            history.push('/plans');
            break;
        }
      });
    }
  }, [stripe]);

  const retrySubscription = () => {
    timer = setInterval(() => {
      dispatch(getSubscriptions());
    }, 1000);
    setTimerState(timer);
  };

  useMemo(() => {
    if (subscriptionData && timerState) {
      clearInterval(timerState);
    }
    if (isSubscribed) {
      history.push('/app/dashboard');
      SnackbarUtils.success("Subscription Success!! Trail activated for 7 days!!",defaultOptions);
    }
  }, [isSubscribed, attempt, subscriptionData]);

  return (
    <Elements stripe={stripePromise}>
      <LoadingScreen />
    </Elements>
  );
};

export default PaymentStatus;
