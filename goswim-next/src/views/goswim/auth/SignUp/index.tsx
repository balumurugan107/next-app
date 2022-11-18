import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  FormLabel,
  Radio,
  RadioGroup,
  alpha
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import LogoHolder from 'src/components/LogoHolder';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Page from 'src/components/Page';
import { GoSwimCreateAccount, signUp } from 'src/store/goswim/account';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { store, SET_USER_ID } from 'src/store';
import { logout } from 'src/store/account';
import { getMemberNoAuth } from 'src/store/management/members';
import { AccountType, AgeType, CustomerStatus, SubscriptionStatus } from 'src/constants';
import { createSubscription, getLatestInvoice } from 'src/store/subscriptions';
import LoadingScreen from 'src/components/LoadingScreen';
import snackbar from 'src/helpers/snackbar';
import SplashScreen from 'src/components/SplashScreen';
import CookieModal from 'src/components/CookieModal';
import { NextRouter, useRouter } from 'next/router';
import Link from 'src/components/Link';


const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    backgroundImage: `url(${'/static/login/login-bg.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    paddingTop: 0
  },
  card: {
    marginTop: '85px',
    marginBottom: '45px',
    background: theme.palette.common.white,
    borderTop: '#ffffff 5px solid',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    borderRadius: '16px',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
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
    marginTop: '35px'
  },
  header: {
    color: theme.palette.text.secondary,
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
  textBox: {
    margin: 0,
    width: '100%'
  },
  createAccount: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: '100%',
    borderRadius: '4px'
  },
  createButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px'
  },
  textArea: {
    margin: 0
  },
  gridRadio: {
    width: '100%',
    padding: '16px 0 8px 0',
    '@media (max-width: 960px)': {
      marginBottom: '16px'
    }
  },
  roleRadioButton: {
    width: '100%',
    border: '#ccc solid 1px',
    borderRadius: '4px',
    padding: '0px 0 0px 16px',
    '& legend': {
      fontSize: '12px',
      padding: '0 0px'
    }
  },
  subscriberTerms: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  signInTerms: {
    color: theme.palette.common.white,
    marginLeft: '5px',
    fontWeight: 600
  },
  checkBoxStyle: {
    margin: 0
  },
  notificationText: {
    color: theme.palette.text.secondary,
    marginLeft: '5px'
  },
  alreadyMember: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '25px',
    color: theme.palette.common.white
  },
  promotion_enabled: {
    color: theme.palette.text.secondary
  },
  logoWithPlan: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  planTitle: {
    fontSize: 16,
    padding: '6px 14px'
  },
  price: {
    fontSize: 16,
    color: theme.palette.primary.main,
    fontWeight: 600,
    padding: '6px 14px'
  },
  planWrapper: {
    float: 'left'
  },
  rightSec: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    background: alpha(theme.palette.primary.main, 0.1),
    '& h5': {
      fontSize: 16
    }
  },
  rightSecKey: {
    padding: '6px 14px'
  }
}));

const CreateAccount = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const storeUserID = useSelector(state => state.userID);
  const isLoading = useSelector(state => state.members.isLoading);
  const member = useSelector(state => state.members.member);
  const { isAuthenticated, isLoadingSignIn } = useSelector(state => state.account);
  const [cacheCleared, setCacheCleared] = useState(false);
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const { productData, data } = useSelector(state => state.subscription);
  const userID = router.query.userID;
  const planId = router.query.planID;
  const selectedPlan = productData.find(product => product.id === planId);

  useEffect(() => {
    if (isAuthenticated && !cacheCleared) {
      dispatch(logout());
    }
    if (!cacheCleared) {
      setCacheCleared(true);
    }
  }, [isMountedRef]);

  useEffect(() => {
    if (!isAuthenticated && cacheCleared) {
      if (isMountedRef.current && userID) {
        store.dispatch({ type: SET_USER_ID, payload: userID });
      } else if (selectedPlan === undefined) {
        router.push('/');
      }
    } else if (!isAuthenticated) {
      setCacheCleared(true);
    }
  }, [isAuthenticated, cacheCleared]);

  useEffect(() => {
    if (storeUserID) {
      dispatch(getMemberNoAuth(storeUserID, router));
    }
  }, [storeUserID]);

  useEffect(() => {
    if (member?.status === CustomerStatus.ACTIVE || (member && member?.signInCount > 0)) {
      router.push('/users/sign_in');
      snackbar.success('User already exist!! Please signin');
    } else if (
      selectedPlan === undefined &&
      (member?.role === AccountType.SWIMMER || member?.role === AccountType.COACH)
    ) {
      router.push(`/plans?userID=${member._id}`);
    }
  }, [member, isLoading]);

  const getAge = (age?: boolean | null) => {
    if (age === null || age) {
      return AgeType.AGEABOVE;
    } else {
      return AgeType.AGEBELOW;
    }
  };
  const formSubmitted = async (values: GoSwimCreateAccount) => {
    if (
      member === undefined ||
      member?.role === AccountType.SWIMMER ||
      member?.role === AccountType.COACH
    ) {
      await dispatch(signUp(values, router, true));
      if (
        data?.status === SubscriptionStatus.INCOMPLETE ||
        data?.status === SubscriptionStatus.PAST_DUE
      )
        await dispatch(getLatestInvoice());
      else await dispatch(createSubscription(selectedPlan?.price?.id));
      router.push(`/checkout?planId=${planId}`);
    } else {
      await dispatch(signUp(values, router, false));
    }
  };

  const setInitialValues = () => {
    if (member) {
      return {
        id: member?._id,
        full_name: member?.full_name ? member.full_name : '',
        email: member?.email ? member.email : '',
        confirmEmail: '',
        password: '',
        confirmpassword: '',
        terms_agreed: false,
        promotion_enabled: true,
        isAgeEligible: member.isAgeEligible,
        secondary_email: member?.secondary_email ? member.secondary_email : '',
        showEmail: member?.isAgeEligible != undefined ? false : true
      };
    } else
      return {
        full_name: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmpassword: '',
        terms_agreed: false,
        promotion_enabled: true,
        isAgeEligible: true,
        showEmail: false
      };
  };

  if (isLoadingSignIn) {
    return <SplashScreen />;
  }

  return (
    <Page className={classes.root} title="Login">
      {(!member && !planId) || isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth="xs">
          <Card className={classes.card}>
            <CardContent>
              <Avatar className={classes.onlyLogo}>
                <LogoHolder src="/static/login/goswim_new_logo.jpg" alt="Logo" />
              </Avatar>
              <Box className={classes.goSwimTextLogo}>
                <LogoHolder src="/static/login/goswim_logo_color_1.svg" alt="Logo" />
              </Box>
              {selectedPlan && (
                <Grid item xs={12} className={classes.rightSec}>
                  <Box className={classes.planWrapper}>
                    <Typography variant="h5" className={classes.rightSecKey}>
                      Selected Plan
                    </Typography>
                    <Typography variant="h5" className={classes.rightSecKey}>
                      Price
                    </Typography>
                  </Box>
                  <Box className={classes.planWrapper}>
                    <Typography variant="h3" className={classes.planTitle}>
                      {selectedPlan.name}
                    </Typography>
                    <Typography variant="body1" className={classes.price}>
                      $ {selectedPlan.price.price}
                    </Typography>
                  </Box>
                </Grid>
              )}
              <Formik<GoSwimCreateAccount>
                enableReinitialize
                validateOnMount
                initialValues={setInitialValues()}
                validationSchema={Yup.object().shape({
                  showEmail: Yup.boolean(),
                  full_name: Yup.string()
                    .trim()
                    .max(255)
                    .required('Name is required'),
                  email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                  confirmEmail: Yup.string()
                    .required('Email Confirmation is required')
                    .oneOf([Yup.ref('email')], 'Email not matched'),
                  password: Yup.string()
                    .min(6)
                    .max(255)
                    .required('Password is required'),
                  confirmpassword: Yup.string()
                    .min(6)
                    .max(255)
                    .oneOf([Yup.ref('password')], 'Password not matched')
                    .required('Confirm Password is Required'),
                  terms_agreed: Yup.boolean().oneOf([true], 'This field must be checked'),
                  secondary_email: Yup.string().when('showEmail', {
                    is: true,
                    then: Yup.string()
                      .required('Parent/Guardian email is required')
                      .email('Email Must be a valid email')
                      .max(255)
                      .test('email-match', 'Parent email must be differed from email', function () {
                        const { email } = this.parent;
                        return email !== this.parent.secondary_email;
                      })
                  })
                })}
                onSubmit={async values => {
                  formSubmitted(values);
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  touched,
                  errors,
                  values,
                  isValid
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className={classes.textArea}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            id="full_name"
                            label="Name"
                            variant="outlined"
                            name="full_name"
                            className={classes.textBox}
                            onChange={handleChange}
                            error={Boolean(touched.full_name && errors.full_name)}
                            helperText={touched.full_name && errors.full_name}
                            value={values.full_name}
                            onBlur={handleBlur}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            name="email"
                            className={classes.textBox}
                            onChange={e => {
                              if (member == null) handleChange(e);
                            }}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            value={member ? member.email : values.email}
                            onBlur={handleBlur}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="confirmEmail"
                            label="Confirm Email"
                            variant="outlined"
                            name="confirmEmail"
                            className={classes.textBox}
                            onChange={e => {
                              handleChange(e);
                            }}
                            error={Boolean(touched.email && errors.confirmEmail)}
                            helperText={touched.email && errors.confirmEmail}
                            value={values.confirmEmail}
                            onBlur={handleBlur}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="password"
                            type="password"
                            label="Password"
                            name="password"
                            variant="outlined"
                            className={classes.textBox}
                            onChange={handleChange}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            value={values.password}
                            onBlur={handleBlur}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="confirmpassword"
                            type="password"
                            label="Confirm Password"
                            name="confirmpassword"
                            variant="outlined"
                            className={classes.textBox}
                            onChange={handleChange}
                            error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                            helperText={touched.confirmpassword && errors.confirmpassword}
                            value={values.confirmpassword}
                            onBlur={handleBlur}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <Grid item xs={12} className={classes.gridRadio}>
                      <FormLabel component="legend">User Age</FormLabel>
                      <RadioGroup
                        row
                        aria-label="age"
                        name="isAgeEligible"
                        value={getAge(values.isAgeEligible)}
                        onChange={(_2, newValue) => {
                          var value = newValue;
                          setFieldValue(
                            'isAgeEligible',
                            value.toUpperCase() === `${AgeType.AGEABOVE.toUpperCase()}`
                          );
                        }}
                      >
                        <FormControlLabel
                          value={AgeType.AGEABOVE}
                          control={<Radio size="small" />}
                          label={AgeType.AGEABOVE}
                          onChange={() => (values.showEmail = false)}
                        />
                        <FormControlLabel
                          value={AgeType.AGEBELOW}
                          control={<Radio size="small" />}
                          label={AgeType.AGEBELOW}
                          onChange={() => (values.showEmail = true)}
                        />
                      </RadioGroup>
                    </Grid>
                    {!values.isAgeEligible && (
                      <>
                        {(values.showEmail = true)}
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            error={Boolean(touched.secondary_email && errors.secondary_email)}
                            fullWidth
                            helperText={touched.secondary_email && errors.secondary_email}
                            label={`Parent/Guardian Email Address`}
                            name="secondary_email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.secondary_email}
                            variant="outlined"
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <FormControl fullWidth className={classes.checkBoxStyle}>
                        <FormControlLabel
                          style={{ display: 'table' }}
                          control={
                            <>
                              <div style={{ display: 'table-cell' }}>
                                <Checkbox
                                  id="terms_agreed"
                                  onChange={event => {
                                    setFieldValue('terms_agreed', event.target.checked);
                                  }}
                                  value={values.terms_agreed}
                                />
                              </div>
                            </>
                          }
                          label={
                            <div className={classes.notificationText}>
                              I agree to the{' '}
                              <a
                                href="/terms_of_service"
                                target="_blank"
                                rel="noreferrer noopener"
                                className={classes.subscriberTerms}
                              >
                                Subscriber Terms of Service{' '}
                              </a>
                            </div>
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth className={classes.checkBoxStyle}>
                        <FormControlLabel
                          style={{ display: 'table' }}
                          control={
                            <div style={{ display: 'table-cell' }}>
                              <Checkbox
                                id="promotion_enabled"
                                checked={values.promotion_enabled}
                                onChange={event => {
                                  setFieldValue('promotion_enabled', event.target.checked);
                                }}
                              />
                            </div>
                          }
                          label={
                            <div
                              className={classes.promotion_enabled}
                              style={{ marginLeft: '4px' }}
                            >
                              I would like to receive recommended lesson email notifications.
                            </div>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <div className={classes.createButton}>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={!isValid}
                        className={classes.createAccount}
                      >
                        CREATE ACCOUNT
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              {false && (
                <div>
                  <Typography>
                    By clicking “create account” I ackowledge I am at least 13 years or older.
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
          <Typography className={classes.alreadyMember}>
            Are you a member already? Let's get you{' '}
            <span>
              <Link href={'/users/sign_in'} className={classes.signInTerms} prefetch={false}>
                Sign in
              </Link>
            </span>
          </Typography>
          <CookieModal />
        </Container>
      )}
    </Page>
  );
};

export default CreateAccount;
