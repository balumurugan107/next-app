import { Toolbar, Box, AppBar } from '@mui/material';
import React, { useState } from 'react';
import NavBar from 'src/layouts/MainLayout/NavBar';
import TopBar from 'src/layouts/MainLayout/TopBar';
import makeStyles from '@mui/styles/makeStyles';
import Footer from 'src/layouts/MainLayout/Footer/index';
import { useSelector } from 'react-redux';
import PanelHeader from 'src/layouts/MainLayout/TopBar/PanelHeader';

const useStyles = makeStyles(theme => ({
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
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 'calc(100vh - 254px)',
    backgroundColor: theme.palette.background.dark
  },
  contentWithoutBg: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    position: 'relative'
  },
  wrapper: {
    width: '100%',
    float: 'left'
  },
  childWrapper: {
    minHeight: 'calc(100vh - 106px)'
  },
  toolBar: {
    height: '64px'
  },
  topMenu: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 210,
      width: '100%',
      // marginTop: theme.spacing(8)
    }
  },
  menuBringToFront: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  adminHeaderContainer: {
    zIndex: 10
  },
}));

const MainLayout = ({ children, router }: any) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const store = useSelector(state => state);
  const isLoading = Object.entries(store)?.map(store => store[1].isLoading);
  const isCommonLoading = isLoading.some(isLoading => isLoading);
  return (
    <>
      <div className="main-wrapper">
        {/* <AppBar > */}
          <Toolbar className={classes.toolBar} sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} router={router} />
          </Toolbar>
        {/* </AppBar> */}

        <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />

        <Box flexGrow={1}>
          <Box display="flex" flexDirection="column" style={{ height: '100%' }}>
            <Box className={classes.adminHeaderContainer}>
              <div className={classes.topMenu}>
                <div className={classes.menuBringToFront}>
                  <PanelHeader />
                </div>
              </div>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <div className={classes.userWrapper}>
            <div className={classes.wrapper}>
              <div className={classes.content}>
                <div className={classes.childWrapper}>{children}</div>
                {!isCommonLoading && <Footer />}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default MainLayout;
