import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Card, CardContent, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'react-redux';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import LogoHolder from 'src/components/LogoHolder';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from 'src/store/goswim/account';
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
    minWidth: '365px',
    background: 'white',
    borderTop: '#ffffff 5px solid',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    borderRadius: '4px 4px 0px 0px',
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
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(3)
    }
  },
  changeMyPassword: {
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: '10px'
  },
  textArea: {
    margin: 0
  },
  signInTerms: {
    color: theme.palette.common.white,
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
  password: {},
  signIn: {
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: '10px'
  },
  resetButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px'
  }
}));

const ChangePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const [userToken, setUserToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userID: any = router.query.token;
    if (userID) setUserToken(userID);
  }, [isMountedRef]);

  interface IValue {
    password: string;
    passwordConfirmation: string;
  }

  const initialValues: IValue = {
    password: '',
    passwordConfirmation: ''
  };

  const formSubmitted = (values: IValue) => {
    dispatch(resetPassword(values.password, userToken, router));
  };

  return (
    <div className={classes.root} title="Login">
      <Container maxWidth="xs">
        <Card className={classes.card}>
          <CardContent>
            <Avatar className={classes.onlyLogo}>
              <LogoHolder src="/static/login/goswim_new_logo.jpg" alt="Logo" />
            </Avatar>
            <Box className={classes.goSwimTextLogo}>
              <LogoHolder src="/static/login/goswim_logo_color_1.svg" alt="Logo" />
            </Box>
            <Typography className={classes.header}>Change your Password?</Typography>
            <Formik<IValue>
              initialValues={initialValues}
              validationSchema={
                Yup.object().shape({
                  password: Yup.string()
                    .min(6)
                    .max(255)
                    .required('Password is required'),
                  passwordConfirmation: Yup.string()
                    .oneOf([Yup.ref('password')], 'Password not matched')
                    .required('Required')
                })}
              onSubmit={async values => {
                formSubmitted(values);
              }}
            >
              {({ handleSubmit, handleChange, touched, errors, values }) => (
                <Form onSubmit={handleSubmit}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    className={classes.textBox}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    value={values.password}
                    type="password"
                    size="small"
                  />
                  <TextField
                    id="passwordConfirmation"
                    label="Password confirmation"
                    variant="outlined"
                    name="passwordConfirmation"
                    className={classes.textBox}
                    onChange={handleChange}
                    error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                    value={values.passwordConfirmation}
                    type="password"
                    size="small"
                  />
                  <div className={classes.resetButton}>
                    <Button variant="contained" type="submit" className={classes.changeMyPassword}>
                      Change My Password
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
    </div>
  );
};

export default ChangePassword;
