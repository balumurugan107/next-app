/* eslint-disable no-unused-expressions */
import React from 'react';
import { IconButton, colors } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import wbSunnyIcon from '@mui/icons-material/WbSunny';
import brightnessIcon from '@mui/icons-material/Brightness3';
import { ThemeVariant } from 'src/constants';
import TooltipComponent from 'src/components/Tooltip';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/store/account';
import { useRouter } from 'next/router';
import { setSettings } from 'src/store/settings';
const useStyles = makeStyles(theme => ({
  themeIcon: {
    color: colors.common.white,
    transform: 'rotate(140deg)',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    [theme.breakpoints.down('sm')]: { width: '28px', height: '28px' }
  },
  iconButton: {
    width: 45,
    height: 45,
    margin: '0 10px',
    [theme.breakpoints.down('sm')]: { margin: 0 }
  },
  homeIcon: {
    fontSize: ''
  }
}));

const Settings = () => {
  const classes = useStyles();
  const router = useRouter();
  const URL = router.pathname;
  const settings = useSelector(state => state.settings);
  const { isSubscribed } = useSelector(state => state.account);
  const dispatch = useDispatch();
  const isLiteMode = settings.variant === ThemeVariant.LITE;
  const title =
    URL.toString().split('/')[1] === 'plans'
      ? 'Back To Home'
      : isLiteMode
        ? 'Dark Mode'
        : 'Lite Mode';
  const variant = isLiteMode ? ThemeVariant.DARK : ThemeVariant.LITE;
  const Icon =
    isLiteMode ? brightnessIcon : wbSunnyIcon;

  const handleUiModeClick = () => {
    // saveSettings({ ...settings, variant });
    dispatch(setSettings({
      ...settings,
      variant
    }));
  }

  const handleHomeClick = () => {
    dispatch(logout());
    router.push('/');
  };

  return <>
    {URL.toString().split('/')[1] === 'plans' && !isSubscribed ? (
      <TooltipComponent {...{ title }}>
        <IconButton
          className={classes.iconButton}
          color="inherit"
          onClick={handleHomeClick}
          size="large">
          <HomeOutlinedIcon className={classes.homeIcon} />
        </IconButton>
      </TooltipComponent>
    ) : (
      <TooltipComponent {...{ title }}>
        <IconButton
          className={classes.iconButton}
          color="inherit"
          onClick={handleUiModeClick}
          size="large">
          <Icon className={classes.themeIcon} />
        </IconButton>
      </TooltipComponent>
    )}
  </>;
};
export default Settings;
