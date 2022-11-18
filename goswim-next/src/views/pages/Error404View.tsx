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
    marginTop: '30px',
    fontSize: '20px',
    color: '#626262',
    fontWeight: 500
  },
  ImageWrapper: {
    textAlign: 'center',
    marginTop: '40px'
  },
  Img2: {
    [theme.breakpoints.down('sm')]: {
      width: '230px !important'
    },
    [theme.breakpoints.down('md')]: {
      width: '460px'
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vh - 116px)'
    }
  },
  errorMsg: {
    // width:"600px",
    fontWeight: 500,
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '24px',
    color: theme.palette.primary.main
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
    margin: '15px 0'
  },
  link: {
    fontSize: '16px',
    textDecoration: 'unset',
    color: theme.palette.common.white,
    fontWeight: 400
  }
}));

const Error404View = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404: Not found">
      <div className={classes.container}>
        <div>
          <div className={classes.ImgWrapper}>
            <img src="/static/images/logo.png" className={classes.Img1} />
          </div>
          <div className={classes.desc}>We are unable to find the page you are looking for.</div>
          <div className={classes.ImageWrapper}>
            <img src="/static/images/swimmer-error.png" className={classes.Img2} />
          </div>
          <div className={classes.errorMsg}>404 ERROR</div>
          <div className={classes.subMsg}>Please check the url or return to home page.</div>
          <div>
            <button type="button" className={classes.btn}>
              <a href="/" className={classes.link}>
                Back to Home
              </a>
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Error404View;
