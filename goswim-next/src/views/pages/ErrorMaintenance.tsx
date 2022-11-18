import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: '100vh',
    textAlign: 'center'
  },
  ImgWrapper: {
    textAlign: 'center',
    marginTop: '30px'
  },
  Img1: {
    width: '200px'
  },
  desc: {
    textAlign: 'center',
    margin: '30px auto',
    fontSize: '20px',
    color: '#626262',
    fontWeight: 500,
    maxWidth: '650px'
  },
  ImageWrapper: {
    textAlign: 'center',
    marginTop: '30px'
  },
  Img2: {
    [theme.breakpoints.down('sm')]: {
      width: '230px !important'
    },
    [theme.breakpoints.down('md')]: {
      width: '460px'
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vh - 100px)'
    }
  },
  errorMsg: {
    // width:"600px",
    fontWeight: 500,
    textAlign: 'center',
    margin: '20px auto',
    marginBottom: '10px',
    fontSize: '22px',
    color: theme.palette.primary.main,
    maxWidth: '650px'
  },
  subMsg: {
    // width:"600px",
    fontWeight: 400,
    textAlign: 'center',
    fontSize: '18px',
    color: '#626262'
  },
  btn: {
    backgroundColor: '#0082E3',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    margin: '10px 0 15px 0'
  },
  link: {
    fontSize: '16px',
    textDecoration: 'unset',
    color: theme.palette.common.white,
    fontWeight: 400
  },
  footerContent: {
    // width:"600px",
    fontWeight: 400,
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '14px',
    color: '#626262'
  }
}));

const ErrorMaintance = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Maintenance">
      <div className={classes.container}>
        <div>
          <div className={classes.ImgWrapper}>
            <img src="/static/images/logo.png" className={classes.Img1} />
          </div>
          <div className={classes.desc}>
            Hang in there, GoSwim is currently undergoing scheduled maintenance and is unavailable,
            we will return shortly.
          </div>
          <div className={classes.ImageWrapper}>
            <img src="/static/images/swimmer.png" className={classes.Img2} />
          </div>
          <div className={classes.errorMsg}>
            Videos & Data to Inspire, Educate, and Make You a Better Swimmer
          </div>
          <div>
            <button type="button" className={classes.btn}>
              <a href="https://blog.goswim.tv/" className={classes.link}>
                GoSwim Blog
              </a>
            </button>
          </div>
          <div className={classes.footerContent}>
            All content displayed on this website is copyright ©2022 by Go Swim Productions, LLC.
            All rights reserved.
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ErrorMaintance;
