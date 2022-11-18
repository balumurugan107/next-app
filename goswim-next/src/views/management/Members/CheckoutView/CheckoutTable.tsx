/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Slide,
  Grid,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { Edit as EditIcon } from 'react-feather';
import { useSnackbar } from 'notistack';
import { defaultOptions } from 'src/constants/snackbar';
import { Rights, TrailDuration, trialOptions } from 'src/constants';

import { ComponentProps } from 'src/types';
import Form from 'src/components/PaymentForm';
import { paymentService } from 'src/services/payment';

import { membersServiceInstance } from 'src/services/management';

import LoadingButton from 'src/components/LoadingButton';
import TooltipComponent from 'src/components/Tooltip';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  addButton: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  inviteButton: {
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  editButton: {
    marginBottom: theme.spacing(0.5)
  },
  table: {
    tableLayout: 'fixed',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '100%',
      overflowX: 'auto'
    }
  },
  buttonText: { fontWeight: 500 }
}));

const CheckoutTable: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const router = useRouter();
  const [trial, setTrial] = React.useState<TrailDuration>(TrailDuration.SEVEN_DAYS);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState<boolean>(false);
  const usageRights = useSelector(state => state.account.user?.rights);
  const { selectedMembers, customerID, userName } = useSelector(state => {
    let customerID = '';
    let userName = '';
    const user = state.account.user;

    if (typeof user?.stripe_customer_id === 'string' && typeof user?.full_name === 'string') {
      customerID = user?.stripe_customer_id;
      userName = user?.full_name;
    }
    return {
      ...state.members,
      customerID,
      userName
    };
  });
  const [card, setCard] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (trial === TrailDuration.THIRTY_DAYS && event.target.value === TrailDuration.SEVEN_DAYS) {
      setCard(false);
    }
    setTrial(event.target.value as TrailDuration);
  };

  // We are giving free coupons for 7 days trial, so the price is 0
  const unitCost = usageRights === Rights.ADMIN || trial === TrailDuration.SEVEN_DAYS ? 0 : 2.99;
  const couponString =
    selectedMembers?.length > 1 ? 'Send Trial Invitions' : 'Send Trial Invitation';
  const totalCost =
    unitCost !== 0 ? (selectedMembers.length > 0 ? selectedMembers?.length * unitCost : '-') : '-';

  const invoice: any = {
    products: [
      {
        id: 1,
        product: 'Lanevision Services subscription',
        unitPrice: unitCost === 0 ? 'Free' : unitCost,
        quantity: selectedMembers?.length,
        total: totalCost !== '-' ? totalCost.toFixed(2) : totalCost
      }
    ],
    currency: unitCost === 0 ? '' : '$',
    totalAmount: totalCost !== '-' ? totalCost.toFixed(2) : totalCost
  };
  return (
    <>
      <Card className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Product</TableCell>
              <TableCell colSpan={2}>Trial Period</TableCell>
              <TableCell colSpan={2}>Members</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell />
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice?.products?.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell colSpan={3}>{product.product}</TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    select
                    value={trial}
                    onChange={handleChange}
                    SelectProps={{
                      MenuProps: {
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left'
                        },
                        transitionDuration: 750,
                        getContentAnchorEl: null
                      }
                    }}
                  >
                    {trialOptions?.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell colSpan={2}>
                  {product.quantity}
                  <TooltipComponent title="Edit">
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        size="medium"
                        aria-label="upload picture"
                        to="/members"
                        component={RouterLink}
                        className={classes.editButton}
                      >
                        <EditIcon size="18" />
                      </IconButton>
                    </label>
                  </TooltipComponent>
                </TableCell>
                <TableCell>
                  {invoice.currency}
                  {product.unitPrice}
                </TableCell>
                <TableCell />
                <TableCell align="center">
                  {invoice.currency}
                  {product.total}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={9} align="right">
                Total Cost
              </TableCell>
              <TableCell align="center">
                {invoice.currency}
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={10} align="right">
                <Box>
                  {unitCost === 0 ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      className={classes.inviteButton}
                      isLoading={isLoading}
                      progressSize={20}
                      isValid={true}
                      onClick={async () => {
                        try {
                          setLoading(true);
                          await membersServiceInstance.getCoupons({
                            trial,
                            members: selectedMembers,
                            userName
                          });
                          setLoading(false);
                          enqueueSnackbar('Trial Invitation sent to selected Members', {
                            ...defaultOptions,
                            variant: 'success'
                          });
                          router.push('/members');
                        } catch (ex) {
                          throw ex;
                        }
                      }}
                    >
                      <Typography component="span" className={classes.buttonText}>
                        {couponString}
                      </Typography>
                    </LoadingButton>
                  ) : (
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.inviteButton}
                      onClick={() => setCard(true)}
                    >
                      <Typography component="span" className={classes.buttonText}>
                        BUY TRIAL
                      </Typography>
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Box mt={3}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <Slide direction="left" in={card} mountOnEnter unmountOnExit>
            <Grid xl={3} lg={5} md={6} sm={6} xs={12} item>
              <CardContent>
                <Box pb={3}>
                  <Form
                    handleSubmit={async ({ card, stripe, setError, setLoading }) => {
                      try {
                        const paymentMethodReq = await stripe?.createPaymentMethod({
                          type: 'card',
                          card
                        });

                        if (paymentMethodReq?.error) {
                          setError(paymentMethodReq.error.message);
                          setLoading(false);
                          return;
                        }

                        const response = await paymentService.createPayment({
                          amount: parseInt(invoice.totalAmount, 10) * 100,
                          currency: 'usd',
                          customerID
                        });

                        const { client_secret } = response.data.data;

                        const paymentResponse = await stripe?.confirmCardPayment(client_secret, {
                          payment_method: paymentMethodReq?.paymentMethod?.id
                        });

                        if (paymentResponse?.error) {
                          setError(paymentResponse.error.message);
                          setLoading(false);
                          return;
                        }

                        await membersServiceInstance.getCoupons({
                          trial,
                          members: selectedMembers,
                          userName
                        });

                        setLoading(false);
                        setCard(false);
                        enqueueSnackbar('Trial Invitation sent to selected Members', {
                          ...defaultOptions,
                          variant: 'success'
                        });
                        router.push('/members');
                      } catch (ex) {
                        console.error(ex);
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Grid>
          </Slide>
        </Card>
      </Box>
    </>
  );
};

export default CheckoutTable;
