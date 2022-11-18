import React, { useEffect, useState } from 'react';
import {
  Container,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  alpha
} from '@mui/material';

import Page from 'src/components/Page';
import moment from 'moment';
import {
  AccountType,
  currency_symbols,
  getMaxPriceProduct,
  Status,
  StoreType
} from 'src/constants';
import { useDispatch, useSelector } from 'react-redux';
import Label from 'src/components/Label';
import {
  // getSavedCards,
  getSubscriptions,
  IGetSubscriptionProducts,
  updateCard
} from 'src/store/subscriptions';
import ConfirmCancel from './ConfirmCancel';
import makeStyles from '@mui/styles/makeStyles';
import LoadingScreen from 'src/components/LoadingScreen';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },
  container: {
    marginBottom: theme.spacing(1)
  },
  PageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  upgradeBtn: {
    maxHeight: '35px',
    marginTop: '10px',
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  tableContainer: {
    minHeight: '50vh',
    marginBottom: theme.spacing(3)
  },
  cancelSubscription: {
    marginLeft: theme.spacing(1),
    maxHeight: '35px',
    marginTop: '10px'
  },
  tableRowHead: {
    '& .MuiTableCell-root': {
      padding: '12px 16px'
    },
    '& th': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    '& .MuiCheckbox-root': {
      color: theme.palette.common.white
    }
  },
  paymentMethodNote: {
    background: alpha(theme.palette.primary.main, 0.1),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(0.75),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    '& p': {
      fontSize: theme.spacing(2),
      fontWeight: 500,
      color: theme.palette.text.secondary
    },
    '& span': {
      textDecoration: 'underline',
      marginLeft: theme.spacing(1),
      cursor: 'pointer'
    }
  }
}));

const Billing: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useRouter();
  let autoRenewal = useSelector(state => state.subscription.data?.autoRenewal);
  const subscriptionDetail = useSelector(state => state.subscription.data);
  const savedCards = useSelector(state => state.subscription.savedCards);
  const user = useSelector(state => state.account.user);
  const { productData, isSubscriptionCancelled, isLoading } = useSelector(
    state => state.subscription
  );
  const maxPricedProduct: IGetSubscriptionProducts | null = getMaxPriceProduct(productData);
  const [open, setOpen] = useState(false);

  enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    INCOMPLETE = 'incomplete',
    INCOMPLETE_EXPIRED = 'incomplete_expired',
    PAST_DUE = 'past_due',
    TRAILING = 'trialing',
    UNPAID = 'unpaid',
    CREATED = 'Created',
    PAID = 'paid'
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return (
          <TableCell align="right">
            <Label color="success">{Status.ACTIVE}</Label>
          </TableCell>
        );

      case SubscriptionStatus.TRAILING:
        return (
          <TableCell align="right">
            <Label color="success">{Status.TRAILING}</Label>
          </TableCell>
        );

      case SubscriptionStatus.INCOMPLETE:
        return (
          <TableCell align="right">
            <Label color="warning">{Status.INCOMPLETE}</Label>
          </TableCell>
        );

      default:
        return (
          <TableCell align="right">
            <Label color="error">{Status.INACTIVE}</Label>
          </TableCell>
        );
    }
  };

  function capitalizeFirstLetter(string: string | undefined) {
    return string && string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  useEffect(() => {
    dispatch(getSubscriptions());
    // dispatch(getSavedCards());
  }, []);

  const handleCancel = () => {
    setOpen(true);
  };

  const getBillingPrice = () => {
    if (subscriptionDetail) {
      const currency =
        subscriptionDetail.store === StoreType.Stripe
          ? subscriptionDetail.currency
            ? currency_symbols[subscriptionDetail?.currency]
            : ''
          : subscriptionDetail.currency
          ? subscriptionDetail.currency
          : '';
      const subscribedProduct = productData?.find(
        product => product.id === subscriptionDetail?.product_id
      );
      if (subscribedProduct) {
        return `${currency} ${subscribedProduct.price.price} `;
      } else {
        return `${currency} ${subscriptionDetail.price} `;
      }
    }
    return '0.0';
  };

  useEffect(() => {
    if (isSubscriptionCancelled) setOpen(false);
  }, [isSubscriptionCancelled]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Page className={classes.root} title="Billing">
          <Container className={classes.container}>
            <Box mt={1} className={classes.pageHeader}>
              <Typography variant="h1" className={classes.PageTitle}>
                Billing
              </Typography>
              {!(autoRenewal !== undefined && autoRenewal !== null && autoRenewal === false) &&
                (user?.role === AccountType.SWIMMER || user?.role === AccountType.COACH) &&
                subscriptionDetail?.store === StoreType.Stripe && (
                  <div>
                    {/* <Button
                      variant="contained"
                      size="small"
                      className={classes.upgradeBtn}
                      onClick={() => history.push({ pathname: `/app/plans`, state: 'upgrade' })}
                    >
                      Update Card
                    </Button> */}
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.cancelSubscription}
                      onClick={handleCancel}
                    >
                      Cancel Subscription
                    </Button>
                    {maxPricedProduct?.id !== subscriptionDetail?.product_id && (
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.upgradeBtn}
                        onClick={() => history.push({ pathname: `/app/plans`})}
                      >
                        Upgrade
                      </Button>
                    )}
                  </div>
                )}
            </Box>

            {/* {isLoading && <LinearProgress />} */}
            {!(autoRenewal !== undefined && autoRenewal !== null && autoRenewal === false) && (
              <Box className={classes.paymentMethodNote}>
                <Typography>
                  For payment method and invoice related details
                  <span onClick={() => dispatch(updateCard())}>Click here</span>
                </Typography>
              </Box>
            )}

            <TableContainer className={classes.tableContainer} component={Paper}>
              <Table aria-label="simple table">
                <TableHead className={classes.tableRowHead}>
                  <TableRow>
                    <TableCell>Subscription</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell align="right">Purchased on</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Auto renews on</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={subscriptionDetail?._id}>
                    <TableCell component="th" scope="row">
                      {subscriptionDetail?.product_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {capitalizeFirstLetter(subscriptionDetail?.subscription_plan)}
                    </TableCell>
                    <TableCell align="right">
                      {subscriptionDetail?.purchased_on &&
                        moment(subscriptionDetail?.purchased_on).format('DD-MM-yyyy')}
                    </TableCell>
                    <TableCell align="right">{getBillingPrice()}</TableCell>
                    {subscriptionDetail?.status && getStatusLabel(subscriptionDetail.status)}
                    <TableCell align="right">
                      {subscriptionDetail?.renews_on &&
                        moment(subscriptionDetail.renews_on).format('DD-MM-yyyy')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Page>
      </Slide>
      <ConfirmCancel open={open} setOpen={setOpen} />
    </>
  );
};

export default Billing;
