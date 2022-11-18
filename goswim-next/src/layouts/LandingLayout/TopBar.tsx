import React, { useState } from 'react';
import Link from  'src/components/Link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ComponentProps } from 'src/types/components';
import { logout } from 'src/store/account';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: `${theme.palette.background.default} !important`
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    cursor: 'pointer',
    color: `${theme.palette.text.secondary} !important`,
    textDecoration: 'none !important',
    fontWeight: `${theme.typography.fontWeightMedium} !important`,
    '& + &': {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(0)
      }
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  logoBrand: {
    maxWidth: '200px',
    cursor: 'pointer'
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      margin: '8px 16px 8px 0',
      color: `${theme.palette.text.primary} !important`,
      '&:last-child': {
        borderRight: '1px solid #ccc',
        paddingRight: theme.spacing(4)
      },
      '&:nth-child(4)': { marginRight: '16px' }
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  sidenav: {
    height: '100%',
    width: 0,
    position: 'fixed',
    zIndex: 1,
    top: 0,
    right: 0,
    backgroundColor: theme.palette.common.white,
    overflowX: 'hidden',
    transition: '0.5s',
    paddingTop: '60px',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(6)
    },
    '& a': {
      padding: '8px 8px 8px 32px',
      textDecoration: 'none',
      fontSize: '24px',
      color: theme.palette.text.primary,
      display: 'block',
      transition: '0.3s',
      '&:hover': {
        color: theme.palette.primary.main
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '18px'
      }
    }
  },

  closeBtn: {
    position: 'absolute',
    top: 0,
    right: '25px',
    fontSize: '32px !important',
    marginLeft: '50px'
  },
  hamBurger: {
    fontSize: theme.spacing(3),
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  signUpBtn: {
    background: `${theme.palette.primary.main} !important`,
    color: theme.palette.common.white,
    margin: '8px 8px 8px 24px'
  },
  linkSec: {
    display: 'flex !important',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('md')]: {
      '& svg': {
        marginRight: theme.spacing(1)
      }
    }
  }
}));

const TopBar: React.FC<ComponentProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expandMenu, setExpandMenu] = useState(false);
  const { user, isAuthenticated, isSubscribed } = useSelector(state => state.account);
  const router = useRouter();
  const backToHome = async () => {
    await dispatch(logout());
    router.push('/');
  };
  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <img
            alt="Logo"
            src={`/static/login/footer-logo.png`}
            className={classes.logoBrand}
            onClick={() => backToHome()}
          />
        </Link>
        <Box flexGrow={1} />
        <ul className={classes.menuWrapper}>
          <Link href="/features" className={classes.link}>
            FEATURES
          </Link>
          <Link href="/plans" className={classes.link}>
            PRICING
          </Link>
          <Link href="https://blog.goswim.tv/" className={classes.link}>
            BLOG
          </Link>

          {isAuthenticated && user ? (
            <Link
              className={clsx(classes.link, classes.linkSec)}
              color="textSecondary"
              href="/users/sign_in"
            >
              <ExitToAppIcon /> LOGOUT
            </Link>
          ) : (
            <>
              <Link
                className={classes.link}
                color="textSecondary"
                href="/users/sign_in"
              >
                LOGIN
              </Link>

              <Button
                variant="contained"
                className={classes.signUpBtn}
                onClick={() => router.push('/plans')}
              >
                SIGN UP
              </Button>
            </>
          )}
        </ul>
        {/* mob menu */}
        <span className={classes.hamBurger} onClick={() => setExpandMenu(true)}>
          &#9776;
        </span>
        <div
          id="mySidenav"
          className={classes.sidenav}
          style={{ width: expandMenu ? '250px' : '0' }}
        >
          <a
            className={classes.closeBtn}
            onClick={() => setExpandMenu(false)}
          >
            &times;
          </a>
          <Link
            className={classes.link}
            color="textSecondary"
            href="/Features"
            prefetch={false}
          >
            FEATURES
          </Link>
          <Link
            className={classes.link}
            color="textSecondary"
            href="/plans"
            prefetch={false}
          >
            PRICING
          </Link>
          <Link className={classes.link} href="https://blog.goswim.tv/">
            BLOG
          </Link>
          {isAuthenticated && user && !isSubscribed ? (
            <Link
              className={clsx(classes.link, classes.linkSec)}
              color="textSecondary"
              href="/users/sign_in"
            >
              <ExitToAppIcon /> LOGOUT
            </Link>
          ) : (
            <>
              <Link
                className={classes.link}
                color="textSecondary"
                href="users/sign_in"
                prefetch={false}
              >
                LOGIN
              </Link>

              <Button
                variant="contained"
                className={classes.signUpBtn}
                onClick={() => router.push('/plans')}
              >
                SIGN UP
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
