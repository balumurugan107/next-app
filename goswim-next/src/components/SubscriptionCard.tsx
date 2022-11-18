import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Select, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CheckCircle } from 'react-feather';
import {
  createSubscription,
  getLatestInvoice,
  IGetSubscriptionProducts
} from 'src/store/subscriptions';
import { currency_symbols, getSubscribedProduct, SubscriptionStatus } from 'src/constants';
import LoadingButton from './LoadingButton';
import ConfirmUpgrade from 'src/views/goswim/Subscriptions/ConfirmUpgrade';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'column',
    minHeight: '340px',
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    borderStyle: 'solid',
    marginTop: '40px',
    backgroundSize: 'cover',
    backgroundPosition: 'center -1px',
    transform: "scale('4')",
    borderRadius: '20px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  product: {
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'column',
    minHeight: '370px',
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'relative',
    cursor: 'pointer',
    marginTop: theme.spacing(5),
    backgroundPosition: 'center -1px',
    borderRadius: '20px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    color: alpha(theme.palette.text.primary, 0.7),
    '&:normal': {
      backgroundColor: theme.palette.primary.main,
      color: alpha(theme.palette.text.primary, 0.1),
      '& $selectedBtn': {
        backgroundColor: theme.palette.common.white
      },
      '& $featureContent': {
        color: alpha(theme.palette.text.primary, 0.1)
      }
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'scale(1.07)',
      '& $featureContent': {
        color: alpha(theme.palette.text.primary, 0.9)
      }
    }
  },
  disabledMainProduct: {
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'column',
    minHeight: '370px',
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'relative',
    cursor: 'pointer',
    marginTop: theme.spacing(5),
    backgroundPosition: 'center -1px',
    borderRadius: '20px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    color: alpha(theme.palette.text.primary, 0.7),
    '&:normal': {
      backgroundColor: theme.palette.primary.main,
      color: alpha(theme.palette.text.primary, 0.1),
      '& $selectedBtn': {
        backgroundColor: theme.palette.common.white
      },
      '& $featureContent': {
        color: alpha(theme.palette.text.primary, 0.1)
      }
    }
  },
  selectedProduct: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: alpha(theme.palette.text.primary, 0.3),
    borderColor: theme.palette.primary.main,
    transform: 'scale(1.07)',
    '& $selectedBtn': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    '& $featureContent': {
      color: alpha(theme.palette.text.primary, 0.9)
    }
  },
  disabledProduct: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: alpha(theme.palette.text.primary, 0.3),
    borderColor: theme.palette.primary.main,
    opacity: '0.5',
    '& $selectedBtn': {
      color: theme.palette.primary.main
    },
    '& $featureContent': {
      color: alpha(theme.palette.text.primary, 0.9)
    }
  },
  active: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: alpha(theme.palette.text.primary, 0.3),
    borderColor: theme.palette.primary.main,
    transform: 'scale(1.07)',
    '& $selectedBtn': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    '& $featureContent': {
      color: alpha(theme.palette.text.primary, 0.9)
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  Cardtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '8px'
  },
  subscription: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingBottom: theme.spacing(1)
  },
  cardHeader: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main
  },
  cardDescription: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 0',
    alignItems: 'center',
    height: '100%',
    margin: 'auto'
  },
  listIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  listItem: {
    padding: '0',
    fontSize: 'medium'
  },
  selectedBtn: {
    borderColor: theme.palette.secondary.main,
    minWidth: '175px',
    '&.Mui-disabled': {
      color: '#000',
      opacity: 0.5,
      borderColor: theme.palette.primary.main
    }
  },
  cardContent: {
    flex: 1,
    display: 'flex'
  },
  groupHead: {
    fontSize: theme.spacing(1)
  },
  groupInput: {
    minWidth: theme.spacing(12)
  },
  groupContent: {
    padding: theme.spacing(1)
  },
  featureContent: {
    '& .MuiTypography-body1': {
      fontSize: '14px',
      fontWeight: 500,
      marginRight: '8px'
    }
  },
  checkCircle: {
    color: theme.palette.secondary.main,
    '& svg': {
      width: '16px',
      height: '16px'
    }
  },
  button: {
    margin: '8px auto 16px auto'
  },
  dropDownWrapper: {
    display: 'grid',
    padding: theme.spacing(1)
  },
  select: {
    maxHeight: '30px',
    paddingTop: '4px',
    backgroundColor: theme.palette.common.white
  },
  subscribeBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    float: 'right',
    maxHeight: '35px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '180px'
    }
  }
}));

export interface ISubscriptionDetail {
  key: string;
  name: string;
  price: string;
  validity: string;
  validity_key: string;
  features: string[];
}

type PropsFunction = (event: any | null) => void;
type ScrollFunction = () => void;

export default function SubscriptionCard(props: {
  SubscriptionType: IGetSubscriptionProducts;
  setCard: PropsFunction;
  scrollToForm: ScrollFunction;
  pageType?: string;
  selected: IGetSubscriptionProducts | undefined;
  card: boolean;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const subscription = useSelector(state => state.subscription.data);
  const { isLoading } = useSelector(state => state.subscription);
  const isGoswimFreeUser = useSelector(state => state.account.user?.isGoswimFreeUser);
  const location = router.asPath.split('/');
  const upgradeSubsRoute = location;
  const userID = router.query.userID;
  const [groupCount, setGroupCount] = useState(1);
  const subscriptionProducts = useSelector(state => state.subscription.productData);
  const subscribedPlan = getSubscribedProduct(subscriptionProducts, subscription?.product_id);
  const { isSubscribed, isAuthenticated } = useSelector(state => state.account);
  let ButtonText = isSubscribed
    ? props?.SubscriptionType.id === subscription?.product_id
      ? 'Already Subscribed!'
      : subscription &&
        subscribedPlan &&
        props.SubscriptionType.price.price > subscribedPlan?.price?.price
        ? 'Upgrade Plan'
        : 'Choose Plan'
    : 'Choose Plan';
  const symbol = props?.SubscriptionType?.price?.currency;
  const currencySymbol = currency_symbols[symbol];
  const descriptionList = props?.SubscriptionType?.description?.split(',');
  const isDisabled =
    isSubscribed &&
    subscription &&
    subscribedPlan &&
    (props?.SubscriptionType.id === subscription?.product_id ||
      props.SubscriptionType.price.price < subscribedPlan?.price?.price);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handlePlanSelect = () => {
    if (isSubscribed && !isGoswimFreeUser) {
      if (upgradeSubsRoute && props.SubscriptionType?.price?.id) setConfirmOpen(true);
    } else if (isAuthenticated) {
      if (
        subscription?.status === SubscriptionStatus.INCOMPLETE ||
        subscription?.status === SubscriptionStatus.PAST_DUE
      )
        dispatch(getLatestInvoice());
      else dispatch(createSubscription(props.SubscriptionType?.price.id));
      router.push(`/checkout?planID=${props.SubscriptionType?.id}`);
    } else if (userID && userID.length > 0) {
      router.push(`/users/sign_up?planID=${props.SubscriptionType?.id}&userID=${userID}`);
    } else {
      router.push(`/users/sign_up?planID=${props.SubscriptionType?.id}`);
    }
  };

  return (
    <Card
      className={
        isDisabled
          ? clsx(classes.disabledMainProduct, classes.disabledProduct)
          : clsx(classes.product, props.SubscriptionType === props.selected ? classes.active : null)
      }
    >
      <div className={classes.cardHeader}>
        <Typography className={classes.Cardtitle}>
          {props?.SubscriptionType?.name.toUpperCase()}
        </Typography>
        <div className={classes.subscription}>
          <div>
            <Typography component="span" display="inline" variant="h3">
              {Math.floor(props?.SubscriptionType?.price?.price * groupCount * 100) / 100}{' '}
            </Typography>
            <Typography component="span" display="inline" variant="subtitle2">
              {' '}
              {currencySymbol}/{props?.SubscriptionType?.price?.interval}
            </Typography>
          </div>
          {false && props?.SubscriptionType?.priority === 3 && (
            <div className={classes.dropDownWrapper}>
              <Typography component="span" display="inline" variant="subtitle2">
                How many groups?
              </Typography>
              <Select
                variant="outlined"
                className={classes.select}
                value={groupCount}
                onChange={(e: any) => setGroupCount(e.target.value)}
              >
                {[...Array(20)].map((_: any, i) => (
                  <MenuItem value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
            </div>
          )}
        </div>
      </div>
      <div className={classes.cardContent}>
        <List className={classes.cardDescription}>
          {descriptionList?.map((feature, i) => (
            <ListItem key={i} className={classes.listItem}>
              <ListItemIcon className={classes.listIcon} color="secondary">
                <CheckCircle className={classes.checkCircle} size={16} />
              </ListItemIcon>
              <ListItemText primary={feature.trim()} className={classes.featureContent} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.button}>
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          isValid={true}
          progressSize={20}
          disabled={isDisabled ? true : false}
          variant="outlined"
          buttonVariant
        >
          <div
            className={classes.selectedBtn}
            onClick={handlePlanSelect}
          >
            {upgradeSubsRoute
              ? ButtonText
              : (isSubscribed || isAuthenticated) && !isGoswimFreeUser
                ? 'SUBSCRIBE'
                : "LET'S GET STARTED!!"}
          </div>
        </LoadingButton>
      </div>
      <ConfirmUpgrade
        open={confirmOpen}
        setOpen={setConfirmOpen}
        subscription={props.SubscriptionType}
      />
    </Card>
  );
}
