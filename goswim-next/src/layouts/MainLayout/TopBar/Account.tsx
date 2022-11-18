import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, ButtonBase, Menu, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { logout, updateCurrentTab } from 'src/store/account';
import { ApplicationState } from 'src/store';
import Avatar from 'src/components/Avatar';
import { useRouter } from 'next/router';
import Link from 'src/components/Link';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

const Account: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);

  const { user } = useSelector((state: ApplicationState) => ({
    user: state.account.user || null,
    lastUpdatedPictureTimestamp: state.account.lastUpdatedPictureTimestamp
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(updateCurrentTab('general'));
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push('/users/sign_in');
    } catch (error: any) {
      handleClose();
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  const profilePicUrlValue = user?.profile_picture_url || ``;
  const profilePicUrl = (typeof profilePicUrlValue === 'string' && profilePicUrlValue) || '';

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        {...{ ref }}
      >
        <Avatar className={classes.avatar} srcSet={`${profilePicUrl}`} />
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <Link href={'/account/settings'} prefetch={false}>
          <MenuItem onClick={handleClose}>
            Account
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Account;
