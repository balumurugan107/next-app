import React from 'react';
import { Card, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { currency_symbols } from 'src/constants';
import { IGetSubscriptionProducts } from 'src/store/subscriptions/types';

const useStyles = makeStyles(theme => ({
    fullHeightCard: {
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
        padding: theme.spacing(2.5)
        // marginTop: theme.spacing(2)
      },
      title: {
        fontSize: '24px',
        marginBottom: theme.spacing(2)
      },
      planName: {
        fontSize: '20px',
        fontWeight: 500,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5)
      },
      timePeriod: {
        fontSize: '14px',
        color: theme.palette.text.secondary
      },
      promoCode: {
        color: theme.palette.primary.main,
        fontWeight: 600,
      }
}));
const CheckoutPlanDetail = (props : {selectedPlan : IGetSubscriptionProducts | undefined}) => {
  const classes = useStyles();
  return (
        <Card className={classes.fullHeightCard}>
          <Typography variant="h1" className={classes.title}>
            Plan Details
          </Typography>
          <Typography variant="h4" className={classes.planName}>
            Subscribe to Goswim Pro
          </Typography>
          <Typography variant="h1">
          {props?.selectedPlan?.price?.currency ? currency_symbols[props?.selectedPlan?.price?.currency] : ''}{props?.selectedPlan?.price?.price}
            <span className={classes.timePeriod}>/{props?.selectedPlan?.price?.interval}</span>
          </Typography>

          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell variant="head">SubTotal</TableCell>
                <TableCell>{props?.selectedPlan?.price?.currency ? currency_symbols[props?.selectedPlan?.price?.currency] : ''}{props?.selectedPlan?.price?.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.promoCode}>Add Promotion Code</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Total Due Today</TableCell>
                <TableCell>{props?.selectedPlan?.price?.currency ? currency_symbols[props?.selectedPlan?.price?.currency] : ''}{props?.selectedPlan?.price?.price} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        )
};

export default CheckoutPlanDetail;
