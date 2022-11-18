import React, { useState, useRef, useEffect } from 'react';
import { alpha, Box, Toolbar, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptions } from 'src/store/subscriptions';
import NavBar from 'src/layouts/MainLayout/NavBar';
import TopBar from 'src/layouts/MainLayout/TopBar';
import UnAuthTopBar from 'src/layouts/LandingLayout/TopBar';
import PanelHeader from 'src/layouts/MainLayout/TopBar/PanelHeader';
import { AccountType } from 'src/constants';
import { Link, useHistory } from 'react-router-dom';
import Footer from './Footer';
import CookieModal from 'src/components/CookieModal';
import CancelIcon from '@mui/icons-material/Cancel';
import config from 'src/config';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  topMenu: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 210,
      width: '100%'
    }
  },
  menuBringToFront: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  bodyScrollbarStyle: {
    width: '100%',
    height: '100%'
  },
  userWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 210
    }
  },
  userWrapperUnauth: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    height: '100%'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 'calc(100vh - 254px)'
  },
  contentWithoutBg: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    position: 'relative'
  },
  bgHudContainer: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgVideo: {
    objectFit: 'cover',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    opacity: 0.2
  },
  bgDarkVideo: {
    objectFit: 'cover',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    opacity: 1
  },
  videoContainer: {
    zIndex: 1,
    background: theme.palette.background.dark
  },
  adminHeaderContainer: {
    zIndex: 10
  },
  toolBar: {
    height: '64px'
  },
  wrapper: {
    width: '100%',
    float: 'left'
  },
  childWrapper: {
    minHeight: 'calc(100vh - 106px)'
  },
  userToast: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25)
  },
  subscribeLink: {
    // textDecoration: "none",
    padding: 0,
    margin: "0 !important",
    color: "#c12f2f",
    fontWeight: 500
  },
  subscribeLinkTwo: {
    // textDecoration: "none",
    padding: 0,
    margin: "0 !important",
    color: "#638754",
    fontWeight: 500
  },
  cancel: {
    cursor: 'pointer',
    width: '5%'
  },
  toastMessage: {
    padding: "10px",
    fontSize: "16px",
    background: "#feeced",
    textAlign: "center",
    letterSpacing: "1.5px",
    color: "#c12f2f",
    borderRadius: "8px",
    margin: '8px',
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    alignItems: "center",
    [theme.breakpoints.up('lg')]: {
      margin: "8px 8px 8px 220px"
    },
    "& h4": {
      flex: 1,
      fontWeight: 500,
      fontSize: theme.spacing(2)
    },
    "& a": {
      marginLeft: theme.spacing(1)
    }
  },
  toastMessageTwo: {
    padding: "10px",
    fontSize: "16px",
    background: "#d0ffd0",
    textAlign: "center",
    letterSpacing: "1.5px",
    color: '#638754',
    borderRadius: "8px",
    margin: '8px',
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    alignItems: "center",
    [theme.breakpoints.up('lg')]: {
      margin: "8px 8px 8px 220px"
    },
    "& h4": {
      flex: 1,
      fontWeight: 500,
      fontSize: theme.spacing(2)
    },
    "& a": {
      marginLeft: theme.spacing(1)
    }
  }

}));

const Layout: React.FC = ({ children }: any) => {
  const history = useHistory();
  const classes = useStyles();
  const store = useSelector(state => state);
  const isLoading = Object.entries(store)?.map(store => store[1].isLoading);
  const isCommonLoading = isLoading.some(isLoading => isLoading);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.account.user?.role || AccountType.SWIMMER);
  const URL = history.location.pathname;
  const scrollBarRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showToast, setShowToast] = useState(true);
  const [showToastTwo, setShowToastTwo] = useState(true);

  const {
    user,
    teamPage,
    teamLimit,
    membersPage,
    membersLimit,
    ordersPage,
    ordersLimit,
    isSubscribed,
    authToken,
    role,
    subscription
  } = useSelector(state => {
    return {
      user: state.account.user,
      subscription: state.subscription.data,
      teamPage: state.team.teamsDetailsViewOption.page,
      teamLimit: state.team.teamsDetailsViewOption.limit,
      membersPage: state.members.page,
      membersLimit: state.members.limit,
      ordersPage: state.orders.ordersDetailsViewOption.page,
      ordersLimit: state.orders.ordersDetailsViewOption.limit,
      isSubscribed: state.account.isSubscribed,
      authToken: state.account.token,
      role: state.account.user?.role
    };
  });

  const chatBot: any = document.getElementById('tidio-chat');

  const goswimGroupId = config.goswimGroupAPI.groupId;

  let validity = user?.freeUserValidTill ? (user.freeUserValidTill) : config.freeValidTill.endDate ? config.freeValidTill.endDate : 1673323200000;

  let endDate = moment(+validity).format("MMMM Do, YYYY");

  useEffect(() => {
    if (authToken && isSubscribed) dispatch(getSubscriptions());
  }, []);

  useEffect(() => {
    if (scrollBarRef.current) {
      scrollBarRef.current.scrollTop = 0;
    }
  }, [history, teamPage, teamLimit, membersPage, membersLimit, ordersPage, ordersLimit]);

  useEffect(() => {
    if (chatBot && role === AccountType.ADMIN) {
      chatBot.style.display = 'none';
    }
  }, [chatBot]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
      videoRef.current.playbackRate = 0.5;
    }
  }, [settings.variant]);

  return (
    <div style={{ height: '100vh' }}>
      <CookieModal />
      <Box display="flex" flexDirection="column" style={{ height: '100vh' }}>
        <Box>
          <Toolbar className={classes.toolBar}>
            {(isSubscribed ||
              (userRole !== AccountType.SWIMMER && userRole !== AccountType.COACH)) && (
                <>
                  <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
                  {(URL.toString().split('/')[1] !== 'plans' || true) && (
                    <NavBar
                      onMobileClose={() => setMobileNavOpen(false)}
                      openMobile={isMobileNavOpen}
                    />
                  )}
                </>
              )}
            {!isSubscribed && <UnAuthTopBar />}
          </Toolbar>
        </Box>
        <Box flexGrow={1}>
          <Box display="flex" flexDirection="column" style={{ height: '100%' }}>
            <Box className={classes.adminHeaderContainer}>
              {' '}
              {true && userRole === AccountType.ADMIN && (
                <div className={classes.topMenu}>
                  <div className={classes.menuBringToFront}>
                    <PanelHeader />
                  </div>
                </div>
              )}
            </Box>
            {(userRole === AccountType.SWIMMER || userRole === AccountType.COACH) && (user?.isGoswimFreeUser || subscription === undefined) && <Box>
              {showToast && <div className={classes.userToast}>
                <div className={classes.toastMessage}>
                  <Typography variant='h4'>
                    Hi {user?.full_name}, to watch the daily free video,
                    <Link to={`train/{goswimGroupId}`} className={classes.subscribeLink}>
                      click here for the GoSwim group
                    </Link>.<br></br>
                    Please be aware we are ending free plans starting {endDate}.
                  </Typography>
                  <CancelIcon className={classes.cancel} onClick={() => setShowToast(false)} />
                </div>
              </div>}
              {showToastTwo && <div className={classes.userToast}>
                <div className={classes.toastMessageTwo}>
                  <Typography variant='h4'>
                    To become a full member to enjoy our vast library and new data app, <Link to={`/plans`} className={classes.subscribeLinkTwo}>click here for membership</Link>.
                  </Typography>
                  <CancelIcon className={classes.cancel} onClick={() => setShowToastTwo(false)} />
                </div>
              </div>
              }
            </Box>}
            <Box flexGrow={1} className={classes.videoContainer}>
              {true && (
                <div
                  className={
                    isSubscribed ||
                      (userRole !== AccountType.SWIMMER && userRole !== AccountType.COACH)
                      ? classes.userWrapper
                      : classes.userWrapperUnauth
                  }
                >
                  <div className={classes.wrapper}>
                    <div className={classes.content}>
                      <div className={classes.childWrapper}>{children}</div>
                      {!isCommonLoading && <Footer />}
                    </div>
                  </div>
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
