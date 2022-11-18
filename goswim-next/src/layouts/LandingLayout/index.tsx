import React, { useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import TopBar from 'src/layouts/LandingLayout/TopBar';
import { useDispatch } from 'react-redux';
import { getLandingPageVideos } from 'src/store/management/landingpage';
import CookieModal from 'src/components/CookieModal';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    width: '100%'
    // overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  },
  cookieWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    maxWidth: 350,
    background: theme.palette.common.white,
    margin: '0 0 8px 8px',
    borderRadius: 16,
    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
    transition: 'all ease 1s',
    transform: 'translateY(100%)',
    opacity: 0,
    '& .MuiDialogTitle-root': {
      fontSize: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiDialogActions-root': {
        justifyContent: 'flex-start'
      }
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2)
    },
    '& button': {
      width: '100%'
    }
  },
  show: {
    transform: 'translate(0, 0)',
    opacity: 1
  },
  desc: {
    paddingBottom: 0,
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));

const Layout: React.FC = ({ children }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingPageVideos());
  }, []);

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
      <CookieModal />
    </div>
  );
};

export default Layout;
