import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Card, CardContent, Typography, Grid, Slide, alpha } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import StoreBadge from 'src/components/StoreBadge';
import { CustomerStatus, getSubscribedProduct, TrailDuration } from 'src/constants';
import { ComponentProps } from 'src/types';
import { revenueCatService } from 'src/services/revenueCat';
import {
  getSubscriptionProducts,
  IGetSubscriptionProducts,
  setSubscriptions as setStoreSubscriptions
} from 'src/store/subscriptions';
import { activateRoutes } from 'src/store/account';
import SubscriptionCard from 'src/components/SubscriptionCard';
import { getMemberNoAuth } from 'src/store/management/members';
import LoadingScreen from 'src/components/LoadingScreen';
import { useRouter } from 'next/router';
import Link from 'src/components/Link';

const useStyles = makeStyles(theme => ({
  root: {
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      },
      '.MuiTableCell-root': { borderBottom: 'none' }
    }
  },

  container: {
    marginBottom: theme.spacing(4)
  },

  marginTop: {
    marginTop: theme.spacing(1)
  },

  centeredCard: {
    marginTop: theme.spacing(2),
    margin: 'auto',
    padding: 0
  },
  fullHeightCard: {
    height: '100%',
    background: theme.palette.background.default,
    margin: 'auto',
    minHeight: '440px'
  },
  onlyLogo: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: 32,
    height: 64,
    width: 64,
    boxShadow: '0 10px 8px -1px rgba(0, 0, 0, 0.1)'
  },
  goSwimTextLogo: {
    height: '40px',
    marginTop: '35px'
  },

  centeredButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    margin: 'auto',
    maxWidth: 150
  },
  logOut: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    margin: 'auto',
    maxWidth: 150,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },

  header: {
    color: '#546E7A',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
    }
  },
  createAccount: {
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: '10px'
  },

  textArea: {
    margin: 0
  },
  signInTerms: {
    color: theme.palette.primary.main,
    marginLeft: '5px'
  },

  notificationText: {
    marginLeft: '5px'
  },
  alreadyMember: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
    color: 'white'
  },
  checkBoxStyle: {
    margin: 0
  },
  password: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  remember: {
    color: '#546E7A',
    marginTop: '6px'
  },
  forgotPassword: {
    color: theme.palette.primary.main,
    marginTop: '16px'
  },
  signIn: {
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: '10px'
  },
  signInButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px'
  },
  slideCard: {
    padding: '0'
  },
  subInrTxt: {
    fontWeight: 600,
    color: theme.palette.secondary.main
  },
  subscription: {
    textAlign: 'center',
    '& img': {
      width: '20%'
    }
  },
  buttonText: { fontWeight: 500, color: theme.palette.common.white },
  subscripTrailTxt: {
    fontWeight: 500,
    textAlign: 'left'
  },
  logoContactConatiner: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  emptyDiv: {
    padding: '0px 9rem',
    '@media (max-width: 1093px)': {
      display: 'none'
    }
  },
  contactSupport: {
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    alignSelf: 'center',
    '& a': {
      color: theme.palette.primary.main
    },
    '@media (max-width: 1093px)': {
      alignSelf: 'center',
      marginTop: '2rem'
    }
  },
  background: {
    background: 'red'
  },
  backgroundGreen: {
    background: 'green'
  },
  paperHeader: {
    display: 'inline-block'
  },
  subscriptionCard: {
    justifyContent: 'space-between'
  },
  cardContainer: {
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(3),
    '& .MuiGrid-spacing-xs-10': {
      margin: 0
    }
  },
  toggleButtonGrp: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: theme.spacing(8),
    maxHeight: theme.spacing(5)
  },
  togglebtn: {
    marginLeft: theme.spacing(1)
  },
  toggleGrp: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    minWidth: '175px'
  },
  selected: {
    '&&': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white
    }
  },
  titleCentered: {
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      fontSize: '26px !important'
    }
  },

  subscribeBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    float: 'right',
    maxHeight: '35px',
    [theme.breakpoints.down('md')]: {
      minWidth: '180px'
    }
  },
  submitContent: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '46px 88px'
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    float: 'left',
    marginBottom: '16px'
  },
  headerWrapper: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    borderRight: '15px solid transparent !important',
    borderLeft: '15px solid transparent !important'
  },
  headerSplash: {
    padding: '100px 0',
    background: theme.palette.background.light,

    borderTop: `1px solid ${theme.palette.action.focus}`,
    borderBottom: `1px solid ${theme.palette.action.focus}`,

    textAlign: 'center'
  },
  headerTop: {
    marginBottom: '10px',
    fontSize: '30px',
    lineHeight: 1.4
  },
  headerMiddle: {
    width: '75%',
    margin: '20px auto',
    fontSize: '18px',
    lineHeight: 1.5
  },
  userToast: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 0,
    padding: '15px',
    background: alpha(theme.palette.text.primary, 0.1),
    textTransform: 'uppercase',
    fontSize: '15px',
    letterSpacing: '1.5px'
  },
  goswimBrandLogo: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  msgDiv: {
    margin: '30px 46px',
    padding: '10px',
    background: theme.palette.background.light,
    borderRadius: '6px'
  }
}));

const Subscriptions: React.FC<ComponentProps> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const settings = useSelector(state => state.settings);
  const [selected, setSelected] = useState<IGetSubscriptionProducts>();
  const [card, setCard] = useState<boolean>(false);
  const {
    user,
    member,
    deviceType,
    trial,
    productData,
    subscriptionDetail,
    clientSecret,
    setupIntentClientSecret,
    isSubscribed,
    isAuthenticated,
    isSubscriptionUpgraded,
    isLoading
  } = useSelector(state => {
    const { user } = state.account;
    const { member } = state.members;
    const isSubscribed = state.account.isSubscribed || false;
    const isAuthenticated = state.account.isAuthenticated || false;
    const deviceType = user?.login_device_type || '';
    const trial = user?.trail_period || '';
    const productData = state.subscription.productData;
    const clientSecret = state.subscription.subscriptionData?.clientSecret;
    const setupIntentClientSecret = state.subscription.subscriptionData?.setupIntentClientSecret;
    const subscriptionDetail = state.subscription.data;
    const { isSubscriptionUpgraded, isLoading } = state.subscription;
    return {
      user,
      member,
      isSubscribed,
      isAuthenticated,
      deviceType,
      trial,
      productData,
      clientSecret,
      subscriptionDetail,
      isSubscriptionUpgraded,
      isLoading,
      setupIntentClientSecret
    };
  });
  const subscribedPlan = getSubscribedProduct(productData, subscriptionDetail?.product_id);
  const userID = router.query.userID;

  const scrollToForm = () => {
    const element = document.getElementById('form');
    element?.scrollIntoView();
  };
  useEffect(() => {
    if (card) scrollToForm();
  }, [card]);

  useEffect(() => {
    dispatch(getSubscriptionProducts());
    if (userID && userID.length > 0) {
      dispatch(getMemberNoAuth(userID, router));
    }
  }, []);

  useMemo(() => {
    if (!isLoading && (clientSecret || setupIntentClientSecret)) {
    } else if (isSubscriptionUpgraded) {
      router.push('/home');
    } else if (isSubscriptionUpgraded) {
      router.push('/home');
    }
  }, [isSubscriptionUpgraded, isLoading, clientSecret, setupIntentClientSecret]);

  useEffect(() => {
    if (
      (isSubscribed && props?.location?.state !== 'upgrade' && !user?.isGoswimFreeUser) ||
      isSubscriptionUpgraded
    )
      router.push('/home');
  }, [isSubscribed, isSubscriptionUpgraded]);

  const retrySubscriptions = async () => {
    try {
      const { data } = await revenueCatService.getSubscriptions();
      if (data.status === 'active') {
        dispatch(setStoreSubscriptions(data));
        dispatch(activateRoutes());
        return;
      }
      retrySubscriptions();
    } catch (error: any) {
      console.error(error);
    }
  };

  const SubscriptionForm = () => {
    return (
      <>
        <Box m="10px 0">
          <Grid container className={classes.cardContainer}>
            <>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                productData?.map((SubscriptionType, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (
                        !(
                          (subscriptionDetail?.status === CustomerStatus.ACTIVE ||
                            subscriptionDetail?.status === CustomerStatus.TRAILING) &&
                          subscribedPlan &&
                          SubscriptionType.price.price <= subscribedPlan?.price?.price
                        )
                      ) {
                        setSelected(SubscriptionType);
                      }
                    }}
                  >
                    <SubscriptionCard
                      SubscriptionType={SubscriptionType}
                      setCard={setCard}
                      scrollToForm={scrollToForm}
                      pageType={props?.location?.state}
                      selected={selected}
                      card={card}
                    />
                  </div>
                ))
              )}
            </>
            {(trial === TrailDuration.SEVEN_DAYS || trial === TrailDuration.THIRTY_DAYS) && (
              <Grid xs={12} item>
                <Typography className={classes.subscripTrailTxt}>
                  You are eligible for a free trial. Your card will not be charged for the first{' '}
                  <span className={classes.subInrTxt}>{trial}</span> of this subscription. Next
                  billing on
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </>
    );
  };

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <div className={classes.root}>
          {isAuthenticated && user && !isSubscribed && (
            <div className={classes.userToast}>
              Hi {user?.full_name}. Welcome back! Please subscribe to any of below plans
            </div>
          )}

          {!isAuthenticated &&
            !user &&
            !isSubscribed &&
            userID &&
            userID.length > 0 &&
            member &&
            member._id &&
            member._id === userID && (
              <div className={classes.userToast}>
                Hi {member?.full_name}. Welcome! Please subscribe to any of below plans
              </div>
            )}
          <Container className={classes.container}>
            <div className={classes.centeredCard}>
              <Card className={classes.fullHeightCard}>
                <section className={classes.headerSplash}>
                  <div className={classes.headerWrapper}>
                    <>
                      <Typography className={classes.headerTop}>
                        SELECT THE PLAN THAT BEST SUITS YOUR NEEDS
                      </Typography>
                      <Typography className={classes.headerMiddle}>
                        Enjoy unlimited access to all GoSwim content (Athlete Plan), or get
                        unlimited access and the ability to share content with members of a Training
                        Group (Coach Plan).
                      </Typography>
                      <Typography className={classes.headerMiddle}>
                        Whatever plan you chose, you will increase your knowledge and potential as a
                        swimmer or coach.
                      </Typography>
                    </>
                  </div>
                </section>
                <CardContent className={classes.slideCard}>
                  {SubscriptionForm()}
                  {isSubscribed && !user?.isGoswimFreeUser && (
                    <div className={classes.msgDiv}>
                      *By clicking upgrade plan will directly process payment through previous
                      payment details
                    </div>
                  )}
                  {!!isSubscribed && !user?.isGoswimFreeUser && (
                    <>
                      <div>
                        <div />
                        <Box textAlign="center" className={classes.footer}>
                          {false && (
                            <Box>
                              <img
                                src={`/static/login/goswim_logo_${settings.variant === 'dark' ? 'white' : 'color_1'
                                  }.svg`}
                                height={44}
                                alt="GoSwim"
                                className={classes.goswimBrandLogo}
                              />
                            </Box>
                          )}
                          <StoreBadge height={40} {...{ deviceType }} />
                        </Box>
                        <Typography component="p" align="center" className={classes.contactSupport}>
                          To cancel subscription <Link href="/billing" prefetch={false} passHref>Click Here</Link>
                        </Typography>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </Container>
        </div>
      </Slide>
    </>
  );
};

export default Subscriptions;
