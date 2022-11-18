import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { logout } from 'src/store/account';
import LogoHolder from 'src/components/LogoHolder';
import TextField from '@mui/material/TextField';
import { GoSwimSignInAccount, signIn } from 'src/store/goswim/account';
import { getSubscriptionProducts } from 'src/store/subscriptions';
import SplashScreen from 'src/components/SplashScreen';
import CookieModal from 'src/components/CookieModal';
import Link from 'src/components/Link';
import { useRouter } from 'next/router';

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
    overflow: 'visible !important',
    display: 'flex',
    position: 'relative',
    borderRadius: '16px !important', //4px 4px 0px 0px

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
    backgroundColor: `${theme.palette.common.white} !important`,
    color: `${theme.palette.common.white} !important`,
    borderRadius: `4px !important`,
    position: 'absolute !important' as any,
    top: -32,
    left: 32,
    height: '64px !important',
    width: '64px !important',
    boxShadow: '0 10px 8px -1px rgba(0, 0, 0, 0.1)'
  },
  goSwimTextLogo: {
    height: '40px',
    marginTop: '35px'
  },
  header: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('md')]: {
      marginBottom: `${theme.spacing(1)} !important`,
      marginTop: `${theme.spacing(1)} !important`
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacing(2)} !important`,
      marginTop: `${theme.spacing(2)} !important`
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: `${theme.spacing(3)} !important`,
      marginTop: `${theme.spacing(2)} !important`
    }
  },
  textBox: {
    margin: '0 !important',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginBottom: `${theme.spacing(1)} !important`
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacing(2)} !important`
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: `${theme.spacing(2)} !important`
    }
  },
  createAccount: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '10px'
  },
  textArea: {
    margin: 0
  },
  signInTerms: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    fontWeight: 600
  },
  notificationText: {
    marginLeft: '5px'
  },
  alreadyMember: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '25px',
    color: theme.palette.common.white
  },
  checkBoxStyle: {
    margin: 0
  },
  password: {
    display: 'flex',
    justifyContent: 'right'
  },
  remember: {
    [theme.breakpoints.down('md')]: {
      fontSize: 16
    },
    color: theme.palette.text.secondary,
    marginTop: '6px'
  },
  forgotPassword: {
    [theme.breakpoints.down('md')]: {
      fontSize: 10
    },
    color: theme.palette.primary.main,
    marginTop: '10px',
    fontSize: '0.875rem'
  },
  signIn: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: '100%',
    borderRadius: theme.spacing(0.5),
    marginTop: '8px',
    '&:hover': {
      background: 'rgb(15, 69, 109) !important'
    }
  },
  signInButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px'
  }
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoadingSignIn } = useSelector(state => state.account);
  const router = useRouter();
  const { userCredentials } = useSelector(state => state.remember);

  const initialValues: GoSwimSignInAccount = {
    email: userCredentials?.email ? userCredentials?.email : '',
    password: userCredentials?.password ? userCredentials?.password : '',
    remember_me: userCredentials?.email ? true : false
  };

  const formSubmitted = (values: GoSwimSignInAccount) => {
    dispatch(signIn(values, router));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logout());
    }
  }, []);

  useEffect(() => {
    dispatch(getSubscriptionProducts());
  }, []);

  if (isLoadingSignIn) {
    return <SplashScreen />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Card className={classes.card}>
          <CardContent>
            <Avatar className={classes.onlyLogo}>
              <LogoHolder src="/static/login/goswim_new_logo.jpg" alt="Logo" />
            </Avatar>
            <Box className={classes.goSwimTextLogo}>
              <LogoHolder src="/static/login/goswim_logo_color_1.svg" alt="Logo" />
            </Box>
            <Typography className={classes.header}>
              Let's get you signed in so you can keep swimming
            </Typography>
            <Formik<GoSwimSignInAccount>
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .min(6)
                  .max(255)
                  .required('Password is required')
              })}
              onSubmit={async values => {
                formSubmitted(values);
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                touched,
                errors,
                values,
                isValid,
                setFieldValue
              }) => (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    className={classes.textBox}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    className={classes.textBox}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.remember_me}
                        onChange={() => setFieldValue('remember_me', !values.remember_me)}
                      />
                    }
                    label="Remember Me"
                  />
                  <div className={classes.password}>
                    <Link href={'/users/password/new'} prefetch={false} className={classes.forgotPassword}>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className={classes.signInButton}>
                    <Button
                      variant="contained"
                      disabled={!isValid}
                      type="submit"
                      className={classes.signIn}
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
        <Typography className={classes.alreadyMember}>
          Still need to create an account?
          <span>
            <Link href={'/plans'} prefetch={false} className={classes.signInTerms}>
              Sign Up Today
            </Link>
          </span>
        </Typography>
        <CookieModal />
      </Container>
    </div>
  );
};

export default SignIn;
