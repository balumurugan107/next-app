import React from 'react';
import { Avatar, Box, Button, Container, Card, CardContent, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import Page from 'src/components/Page';
import LogoHolder from 'src/components/LogoHolder';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { forgetPassword } from 'src/store/goswim/account';
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
    position: 'absolute',
    top: -32,
    left: 32,
    height: 64,
    width: 64,
    boxShadow: '0 10px 8px -1px rgba(0, 0, 0, 0.1)'
  },
  goSwimTextLogo: {
    height: '40px',
    marginTop: '35px',
    cursor: 'default'
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
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(2)
    }
  },
  createAccount: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '10px'
  },

  signInTerms: {
    color: theme.palette.common.white,
    marginLeft: '5px',
    fontWeight: 600
  },

  alreadyMember: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
    color: theme.palette.common.white
  },

  signIn: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '10px'
  },

  resetButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px'
  }
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  interface IValue {
    email: string;
  }

  const initialValues: IValue = {
    email: ''
  };

  const formSubmitted = (values: any) => {
    dispatch(forgetPassword(values, router));
  };

  return (
    <Page className={classes.root} title="Login">
      <Container maxWidth="xs">
        <Card className={classes.card}>
          <CardContent>
            <Avatar className={classes.onlyLogo}>
              <LogoHolder src="/static/login/goswim_new_logo.jpg" alt="Logo" />
            </Avatar>
            <Box className={classes.goSwimTextLogo}>
              <LogoHolder src="/static/login/goswim_logo_color_1.svg" alt="Logo" />
            </Box>
            <Typography className={classes.header}>Forgot Password?</Typography>

            <Formik<IValue>
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
              })}
              onSubmit={async values => {
                formSubmitted(values);
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, touched, errors, values }) => (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    className={classes.textBox}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    value={values.email}
                    onBlur={handleBlur}
                    size="small"
                  />
                  <div className={classes.resetButton}>
                    <Button variant="contained" type="submit" className={classes.createAccount}>
                      Reset Password
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
        <Typography className={classes.alreadyMember}>
          Already a member?
          <span>
            <Link href={'/users/sign_in'} className={classes.signInTerms} prefetch={false}>
              Sign in now
            </Link>
          </span>
        </Typography>
        <CookieModal />
      </Container>
    </Page>
  );
};

export default ForgotPassword;
