import React, { useState } from 'react';
import { Grid, InputLabel, Box, Container, SvgIcon, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  loadStripe,
  StripeCardElement,
  StripeCardElementChangeEvent,
  Stripe
} from '@stripe/stripe-js';
import { Elements, useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

import config from 'src/config';
import { ComponentProps } from 'src/types';

import LoadingButton from 'src/components/LoadingButton';
import PaymentIcon from '@mui/icons-material/Payment';

const stripePromise = loadStripe(config.stripe.key as string);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#777',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  },
  hidePostalCode: true
};

const useStyles = makeStyles(theme => ({
  cardContiner: {
    width: '100%',
    padding: theme.spacing(2),
    borderColor: theme.palette.secondary.main,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: theme.spacing(0.5),
    margin: '16px 0'
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  cardPaymentTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: '20px'
  },
  loadingButton: {
    float: 'right',
    maxHeight: '35px'
  },
  formContainer: {
    padding: 0
  },
  buttonText: { fontWeight: 500, color: theme.palette.common.white }
}));

interface SubmitProps {
  card: StripeCardElement;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  stripe: Stripe | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CheckoutProps {
  handleSubmit: (submitProps: SubmitProps) => void;
}

const PaymentForm: React.FC<CheckoutProps & ComponentProps> = ({ handleSubmit }) => {
  const classes = useStyles();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const elements = useElements();
  const stripe = useStripe();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(undefined);
    }
  };

  // Handle form submission.
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const card = elements?.getElement(CardElement) as StripeCardElement;
    setLoading(true);
    handleSubmit({
      card,
      setError,
      stripe,
      setLoading
    });
  };

  return (
    <Box>
      <Container  className={classes.formContainer}>
        <form onSubmit={handleFormSubmit}>
          <Grid item md={12} xs={12}>
            <Box className={classes.cardContiner}>
              <InputLabel htmlFor="card-element" className={classes.cardPaymentTitle}>
                Credit or Debit card
              </InputLabel>
              <CardElement
                id="card-element"
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
              />
              <Typography>{error}</Typography>
            </Box>
            </Grid>
            <Grid item md={12} xs={12}>
            <LoadingButton
              color="secondary"
              type="submit"
              variant="contained"
              isLoading={loading}
              isValid={!error}
              className={classes.loadingButton}
              progressSize={20}
            >
              <Button className={classes.buttonText}>
                <SvgIcon fontSize="small" className={classes.actionIcon}>
                  <PaymentIcon className={classes.buttonText} />
                </SvgIcon>
                SUBMIT
              </Button>
            </LoadingButton>
            </Grid>
        </form>
      </Container>
    </Box>
  );
};

const ElementWrapper: React.FC<CheckoutProps & ComponentProps> = ({ handleSubmit }) => (
  // <Elements stripe={stripePromise} options={clientSecret}>
    <Elements stripe={stripePromise} >
    <PaymentForm handleSubmit={handleSubmit} />
  </Elements>
);

export default ElementWrapper;
