import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';

interface StoreBadgeProps extends ButtonProps {
  deviceType: string;
  height: number;
}

const useStyle = makeStyles(() => ({
  storeBadge: {
    marginTop: 12,
    '&:hover': {
      background: 'none'
    }
  }
}));

enum BadgeImageURL {
  IOS_BLACK = '/static/images/store/app-store-btn-black.svg',
  IOS_WHITE = '/static/images/store/app-store-btn-white.svg',
  MAC_BLACK = '/static/images/store/mac-app-store-btn-black.svg',
  MAC_WHITE = '/static/images/store/mac-app-store-btn-white.svg',
  ANDROID_BLACK = '/static/images/store/google-play-badge.svg',
  ANDROID_WHITE = '/static/images/store/google-play-badge-white.svg'
}

enum BadgeLinks {
  IOS = 'https://apps.apple.com/us/app/goswim-learn-better-technique/id1482151723',
  MAC = 'https://apps.apple.com/us/app/goswim-learn-better-technique/id1482151723', 
  ANDROID = 'https://play.google.com/store/apps/details?id=tv.goswim.development'
}

const StoreBadge: React.FC<StoreBadgeProps> = ({ deviceType, className, height }) => {
  const classes = useStyle();
  const settings = useSelector(state => state.settings);

  switch (deviceType) {
    // case 'IOS':
    case 'Testing':
      return (
        <span>
          <Button
            className={classes.storeBadge}
            component="a"
            href={BadgeLinks.IOS}
            target="_blank"
            disableFocusRipple
            disableRipple
          >
            <img
              className={className}
              src={settings.variant === 'dark' ? BadgeImageURL.IOS_BLACK : BadgeImageURL.IOS_WHITE}
              alt="ios_link"
              height={height}
            />
          </Button>
          <Button
            className={classes.storeBadge}
            component="a"
            href={BadgeLinks.MAC}
            target="_blank"
            disableFocusRipple
            disableRipple
          >
            <img
              className={className}
              src={settings.variant === 'dark' ? BadgeImageURL.MAC_BLACK : BadgeImageURL.MAC_WHITE}
              alt="mac_link"
              height={height}
            />
          </Button>
        </span>
      );

    default:
      return (
        <span>
          <Button
            className={classes.storeBadge}
            component="a"
            href={BadgeLinks.IOS}
            target="_blank"
            disableFocusRipple
            disableRipple
          >
            <img
              className={className}
              src={settings.variant === 'dark' ? BadgeImageURL.IOS_BLACK : BadgeImageURL.IOS_WHITE}
              alt="ios_link"
              height={height}
            />
          </Button>
          <Button
          className={classes.storeBadge}
          component="a"
          href={BadgeLinks.ANDROID}
          target="_blank"
          disableFocusRipple
          disableRipple
        >
          <img
            className={className}
            src={
              settings.variant === 'dark'
                ? BadgeImageURL.ANDROID_BLACK
                : BadgeImageURL.ANDROID_WHITE
            }
            alt="android_link"
            height={height}
          />
        </Button>
        </span>
        
      );
  }
};

export default StoreBadge;
