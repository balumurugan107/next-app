import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SetCardForm from './SetCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

function ElementForm(props) {
  const clientSecret = props.clientSecret || props.setupIntentClientSecret;
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <SetCardForm
        clientSecret={props.clientSecret}
        setupIntentClientSecret={props.setupIntentClientSecret}
      />
    </Elements>
  );
}

export default ElementForm;
