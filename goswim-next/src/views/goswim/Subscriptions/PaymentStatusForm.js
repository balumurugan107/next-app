import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentStatus from './PaymentStatus';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

function PaymentStatusForm(props) {
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: props.clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentStatus />
    </Elements>
  );
}

export default PaymentStatusForm;
