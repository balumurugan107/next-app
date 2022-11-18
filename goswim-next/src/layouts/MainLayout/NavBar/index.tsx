/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { appThemes, AccountType, hideRoutesSwimmer } from 'src/constants';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListSubheader,
  Typography,
  Button,
  Grid,
  alpha,
  Toolbar
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

//import coursesIconnew from ''

import { ApplicationState } from 'src/store';
import { updateCurrentTab, UserProfile } from 'src/store/account';
import Avatar from 'src/components/Avatar';
import NavItem from 'src/layouts/MainLayout/NavBar/NavItem';
import { ComponentProps, IconProps } from 'src/types/components';
import DashboardIcon from 'src/layouts/NavigationIcons/DashboardIcon';
import CoursesIcon from 'src/layouts/NavigationIcons/CoursesIcon';
import LessonsIcon from 'src/layouts/NavigationIcons/LessonsIcon';
import LogoutIcon from 'src/layouts/NavigationIcons/LogoutIcon';
import TeamIcon from 'src/layouts/NavigationIcons/TeamIcon';
import MemberIcon from 'src/layouts/NavigationIcons/MemberIcon';
import ScheduleIcon from 'src/layouts/NavigationIcons/ScheduleIcon';
import ServiceIcon from 'src/layouts/NavigationIcons/ServiceIcon';
import BookingIcon from 'src/layouts/NavigationIcons/BookingIcon';
import { getTeamsList, TeamHeirarchyDocument } from 'src/store/management/team';
import config from 'src/config';
import ProfileIcon from 'src/layouts/NavigationIcons/ProfileIcon';
import FavoriteIcon from 'src/layouts/NavigationIcons/FavoriteIcon';
import PlaysIcon from 'src/layouts/NavigationIcons/PlaysIcon';
import BillingIcon from 'src/layouts/NavigationIcons/BillingIcon';
import ConfirmLogout from 'src/views/auth/Logout/ConfirmLogout';
import ThemeOfTheWeekIcon from 'src/layouts/NavigationIcons/ThemeOfTheWeekIcon';
import { useRouter } from 'next/router';
import Link from 'src/components/Link';
interface NavBarProps {
  onMobileClose?: () => void;
  openMobile?: boolean;
}
interface NavConfig {
  subheader: string;
  isTabActive: boolean;
  items: NavConfigItem[];
}
interface NavConfigFilter {
  subheader: string;
  itemTitle: string[];
}
interface NavConfigItem {
  title: string;
  icon?: React.FC<ComponentProps & IconProps> | undefined;
  isTabActive: boolean;
  href?: string;
  imgsrc?: string;
  onClick?: Function;
}
interface ChildRoutes {
  pathname: string;
  disabledRoutes: string[];
  item: NavItems;
  acc: JSX.Element[];
  user: UserProfile | null;
  depth: number;
  teams: TeamHeirarchyDocument[];
  isHeirarchyLoading: boolean;
}
interface NavItems {
  onClick: Function | undefined;
  title: string;
  icon: React.FC<ComponentProps & IconProps>;
  info: React.FC<ComponentProps & IconProps>;
  href: string;
  items: NavConfigItem[];
  imgsrc: string;
}
interface RenderNavItems {
  pathname: string;
  disabledRoutes: string[];
  items: NavConfigItem[];
  user: UserProfile | null;
  depth: number;
  teams: TeamHeirarchyDocument[];
  isHeirarchyLoading: boolean;
}

export const applyFilterToNavConfig = (
  navConfig: NavConfig[],
  filter: NavConfigFilter[],
  hideRoutesNavigation: string[]
) => {
  if (!hideRoutesNavigation) {
    hideRoutesNavigation = hideRoutesSwimmer;
  }
  if (hideRoutesNavigation) {
    navConfig?.map(value => {
      value.items = value.items?.filter(
        item => (item.href && hideRoutesNavigation.indexOf(item.href) <= -1) || item.onClick
      );
    });
  }

  const updatedNavConfig = navConfig.reduce<NavConfig[]>((acc, curr) => {
    if (!curr.isTabActive) return acc;
    const matchingFilter = filter.find(datum => datum.subheader === curr.subheader);
    if (matchingFilter) {
      const items = curr.items?.filter(
        datum => !matchingFilter.itemTitle.includes(datum.title) && datum.isTabActive
      );
      acc = [...acc, { ...curr, items }];
    }
    return acc;
  }, []);

  return updatedNavConfig;
};

const getThemeBasedProps = (theme: any) => {
  switch (theme.name) {
    case appThemes.heatWave.lite:
    case appThemes.vividSkyBlue.lite:
    case appThemes.sunglow.lite:
    case appThemes.bleuDeFrance.lite:
    case appThemes.paoloVeronese.lite:
    case appThemes.turquoise.lite:
    case appThemes.paradisePink.lite:
    case appThemes.cyanProcess.lite:
    case appThemes.sapphireBlue.lite:
    case appThemes.maxBluePurple.lite:
    case appThemes.fandango.lite:
    case appThemes.amethyst.lite:
    case appThemes.blue.lite:
      return {
        backgroundColor: 'rgba(255, 255, 255)'
      };

    case appThemes.heatWave.dark:
    case appThemes.vividSkyBlue.dark:
    case appThemes.sunglow.dark:
    case appThemes.bleuDeFrance.dark:
    case appThemes.paoloVeronese.dark:
    case appThemes.turquoise.dark:
    case appThemes.paradisePink.dark:
    case appThemes.cyanProcess.dark:
    case appThemes.sapphireBlue.dark:
    case appThemes.maxBluePurple.dark:
    case appThemes.fandango.dark:
    case appThemes.amethyst.dark:
    case appThemes.blue.dark:
      return {
        backgroundColor: 'rgba(40, 44, 52)'
      };

    default:
      return {};
  }
};

const useStyles = makeStyles(theme => ({
  '@global': {
    '.MuiTooltip-arrow': {
      color: theme.palette.background.paper
    }
  },
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    // height: 'calc(100% - 64px)',
    ...getThemeBasedProps(theme)
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  avatarDeskTop: {
    cursor: 'pointer',
    width: 35,
    height: 35
  },
  avatarPicture: {
    marginTop: theme.spacing(8)
  },
  logoSidebar: {
    '@media (max-width: 1024px)': {
      backgroundColor: theme.palette.primary.main
    }
  },

  listDeskTop: {
    '&:nth-last-child(2)': {
      display: 'none'
    },
    '&:last-child hr': {
      display: 'none'
    },
    [theme.breakpoints.down('lg')]: {
      '&:nth-last-child(2)': {
        display: 'block'
      }
    }
  },
  listContainer: {
    width: '100% !important',
    '& a': {
      color: theme.palette.text.primary,
      '& svg': {
        color: theme.palette.text.primary
      }
    },
    '& ul:nth-child(2)': {
      paddingTop: 0
    },
    '& listDeskTop': {
      display: 'none'
    }
  },
  listDivider: {
    marginTop: 8
  },
  listBox: {
    padding: '0 4px'
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px 0 rgba(0,0,0,.2)',
    maxWidth: 220,
    fontSize: 10
  },
  navItems: {
    '& a': {
      color: '#546E7A', //color changes
      '& a:hover': {
        color: theme.palette.primary.main
      }
    },
    '& ul:nth-child(3)': {
      '& ul': {
        '& a': {
          color: theme.palette.text.primary,
          '&:hover svg': {
            color: theme.palette.primary.main
          },
          '&:hover': {
            color: theme.palette.primary.main,
            fill: theme.palette.primary.main
          }
        }
      }
    },
    '& ul:nth-child(2)': {
      '& ul': {
        '& a': {
          color: theme.palette.text.primary,
          '&:hover svg': {
            color: theme.palette.primary.main
          },
          '&:hover': {
            color: theme.palette.primary.main //hover is set here
          }
        }
      }
    },
    '& ul:nth-child(1)': {
      '& ul': {
        '& a': {
          color: theme.palette.text.primary,
          '&:hover svg': {
            color: theme.palette.primary.main
          },
          '&:hover': {
            color: theme.palette.primary.main
          }
        }
      }
    }
  },
  addGrp: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  tutorials: {
    justifyContent: 'center'
  },
  navButtons: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.5),
    '&.active': {
      color: theme.palette.secondary.main
    },
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  listelement: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    minWidth: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&.active': {
      color: theme.palette.secondary.main
    }
  },
  logOut: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '18px'
  },
  active: {
    background: alpha(theme.palette.primary.main, 0.12),
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.secondary.main
    },
    '& svg': {
      fill: theme.palette.secondary.main
    }
  },
  buttonLeaf: {
    display: 'flex',
    color: theme.palette.text.secondary,
    padding: '8px',
    justifyContent: 'center',
    textTransform: 'none',
    marginRight: '4px',
    letterSpacing: 0,
    width: '100%',
    minWidth: 170, //width of the area to the right of the icon
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover span span': {
      color: theme.palette.primary.main
    },
    '&:hover svg': {
      transform: 'scale(1.2)',
      color: theme.palette.secondary.main
    },
    '&:hover': {
      fill: theme.palette.secondary.main
    },
    '&.depth-0.$active': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    '&.active': {
      color: theme.palette.secondary.main
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 5,
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&:disabled': {
      color: theme.palette.text.disabled
    }
  },
  info: {
    marginTop: theme.spacing(1)
  },

  title: {
    marginRight: 'auto',
    marginLeft: '10px',
    color: theme.palette.text.primary,
    fontSize: '16px',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  navSubscribeButtons: {
    color: '#fff !important',
    width: '80%',
    margin: '8px'
  },
  subscribeBtnWrap: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  navLink: {
    textDecoration: 'none',
    width: '100%'
  }
}));     
const drawerWidth = 210;

const NavBar: React.FC<NavBarProps> = ({ openMobile, onMobileClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const {
    user,
    disabledRoutes,
    hideRoutesNavigation,
    isHeirarchyLoading,
    teamsList,
    subscription
  } = useSelector((state: ApplicationState) => ({
    user: state.account.user || null,
    lastUpdatedPictureTimestamp: state.account.lastUpdatedPictureTimestamp,
    disabledRoutes: state.account.disabledRoutes,
    hideRoutesNavigation: state.account.hideRoutesNavigation,
    isHeirarchyLoading: state.team.isLoading,
    teamsList: state.team.teamsList,
    subscription: state.subscription.data
  }));
  const [openConfirmLogOut, setConfirmLogOut] = React.useState(false);

  const handleChange = () => {
    dispatch(updateCurrentTab('general'));
  };

  useEffect(() => {
    dispatch(getTeamsList());
  }, []);

  const renderNavItems = ({
    items,
    pathname,
    disabledRoutes,
    user,
    teams,
    isHeirarchyLoading,
    ...rest
  }: RenderNavItems) => (
    <List sx={{ py: 1 }} disablePadding>
      {items.reduce(
        (acc: any, item: any) =>
          reduceChildRoutes({
            acc,
            item,
            pathname,
            disabledRoutes,
            user,
            teams,
            isHeirarchyLoading,
            ...rest
          }),
        []
      )}
    </List>
  );

  const reduceChildRoutes = ({
    acc,
    pathname,
    item,
    disabledRoutes,
    user,
    depth = 0,
    teams,
    isHeirarchyLoading
  }: ChildRoutes) => {
    const key = item.title + depth;
    const goswimGroupId = config.goswimGroupAPI.groupId;
    const filteredTeam = teams?.filter(team => team._id !== goswimGroupId);

    if (item.items) {
      const open = matchPath(pathname, {
        path: item.href,
        exact: false
      });
      acc.push(
        <NavItem
          depth={depth}
          icon={item.icon}
          imgsrc={item.imgsrc}
          key={key}
          info={item.info}
          open={Boolean(open)}
          title={
            item?.title === 'MEMBERS' && filteredTeam?.length > 0 ? item?.title : 'ADD MEMBERS'
          }
          disabled={false}
        >
          {renderNavItems({
            depth: depth + 1,
            pathname,
            items: item.items,
            disabledRoutes: disabledRoutes,
            user: user,
            teams: teamsList,
            isHeirarchyLoading: isHeirarchyLoading
          })}
        </NavItem>
      );
    } else {
       if (
        item?.title === 'MEMBERS' &&
        filteredTeam?.length > 0 &&
        (user?.role === AccountType.COACH || user?.role === AccountType.ADMIN)
      ) {
        acc.push(
          <NavItem
            depth={depth}
            href={item.href}
            icon={item.icon}
            imgsrc={item.imgsrc}
            key={key}
            info={item.info}
            title={
              isHeirarchyLoading && item?.title === 'MEMBERS'
                ? item?.title
                : (item?.title === 'MEMBERS' && filteredTeam.length > 0) || item.title !== 'MEMBERS'
                ? item?.title
                : 'ADD MEMBERS'
            }
            disabled={false}
          />
        );
      } else if (item.title === 'SERVICES' || item.title === 'BOOKINGS') {
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local')
          acc.push(
            <NavItem
              depth={depth}
              onClick={item.onClick}
              icon={item.icon}
              imgsrc={item.imgsrc}
              key={key}
              info={item.info}
              title={item?.title}
              disabled={false}
            />
          );
      }  else
        acc.push(
          <NavItem
            depth={depth}
            href={item.href}
            icon={item.icon}
            imgsrc={item.imgsrc}
            key={key}
            info={item.info}
            title={item?.title}
            disabled={false}
          />
        );
    }
    return acc;
  };

  const filters: NavConfigFilter[] = [
    {
      subheader: 'HOME',
      itemTitle: []
    },
    {
      subheader: 'MANAGEMENT',
      itemTitle: []
    },
    {
      subheader: 'TUTORIALS',
      itemTitle: []
    },
    {
      subheader: 'OTHERS',
      itemTitle: []
    }
  ];

  const tutorialID = config.goswimTutorial.tutorialId;

  const navConfig: NavConfig[] = [
    {
      subheader: 'HOME',
      isTabActive: true,
      items: [
        {
          title: 'DASHBOARD',
          icon: DashboardIcon,
          isTabActive: true,
          href: '/home'
        },
        {
          title: 'COURSES',
          icon: CoursesIcon,
          isTabActive: true,
          href: '/courses'
        },
        {
          title: 'LESSONS',
          icon: LessonsIcon,
          isTabActive: true,
          href: '/lessons'
        },
        {
          title: 'WEEKLY THEME',
          icon: ThemeOfTheWeekIcon,
          isTabActive: true,
          href: '/themeoftheweek'
        }
      ]
    },
    {
      subheader: 'MANAGEMENT',
      isTabActive: true,
      items: [
        {
          title: 'GROUPS',
          icon: TeamIcon,
          isTabActive: true,
          href: '/train'
        },
        {
          title: 'CALENDAR',
          icon: ScheduleIcon,
          isTabActive: true,
          href: '/calendar'
        },
        {
          title: 'MEMBERS',
          icon: MemberIcon,
          isTabActive: true,
          href: '/members'
        },
        {
          title: 'SERVICES',
          icon: ServiceIcon,
          isTabActive: true,
          href: '/app/management/services'
        },
        {
          title: 'BOOKINGS',
          icon: BookingIcon,
          isTabActive: true,
          href: '/app/management/orders'
        }
      ]
    },
    {
      subheader: 'OTHERS',
      isTabActive: true,
      items: [
        {
          title: 'PROFILE',
          icon: ProfileIcon,
          isTabActive: true,
          href: '/account'
        },
        {
          title: 'FAVORITES',
          icon: FavoriteIcon,
          isTabActive: true,
          href: '/favorites'
        },
        {
          title: 'PLAYS',
          icon: PlaysIcon,
          isTabActive: true,
          href: '/plays'
        },
        {
          title: 'BILLING',
          icon: BillingIcon,
          isTabActive: true,
          href: '/billing'
        },
        {
          title: 'LOG OUT',
          icon: LogoutIcon,
          isTabActive: true,
          onClick: () => {
            setConfirmLogOut(true);
          }
        }
      ]
    }
  ];

  const finalNavConfig = applyFilterToNavConfig(navConfig, filters, hideRoutesNavigation);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [pathname]); //eslint-disable-line

  const profileInformation =
    (user?.profile_picture_url &&
      user?.profile_picture_url !== 'undefined' &&
      (user?.profile_picture_url as string)) ||
    ``;

  const content = (
    <Box height="100%" display="flex" flexDirection="column" className={classes.listBox}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
          <Box p={2} className={classes.avatarPicture}>
            <Box display="flex" justifyContent="center">
              <Link onClick={handleChange} href="/app/account">
                <Avatar className={classes.avatar} srcSet={`${profileInformation}`} />
              </Link>
            </Box>
            <Box mt={2} textAlign="center">
              <Link onClick={handleChange} href="/account" color="textPrimary">
                {`${user?.full_name || 'Hello Aspirer'}`}
              </Link>
              <Typography variant="body2" color="textSecondary" />
            </Box>
          </Box>
          <Divider />
          <Box p={2} className={classes.navItems}>
            {finalNavConfig?.map(
              (config, index) =>
                config.subheader && (
                  <List
                    key={index}
                    subheader={
                      <ListSubheader disableGutters disableSticky>
                        {config.subheader}
                      </ListSubheader>
                    }
                  >
                    {renderNavItems({
                      items: config.items,
                      pathname: pathname,
                      disabledRoutes,
                      user: user,
                      depth: 0,
                      teams: teamsList,
                      isHeirarchyLoading: isHeirarchyLoading
                    })}
                  </List>
                )
            )}
            <Grid container className={classes.tutorials}>
              <Grid item>
                <Link href="/courses"  prefetch={false} className={classes.navLink}>
                  <Button className={classes.navButtons}>TUTORIALS</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="mailto:admin@goswim.tv"  className={classes.navLink}>
                  <Button className={classes.navButtons}>SUPPORT</Button>
                </Link>
              </Grid>
            </Grid>
            {(user?.role === AccountType.SWIMMER || user?.role === AccountType.COACH) &&
              (user?.isGoswimFreeUser || subscription === undefined) && (
                <Grid className={classes.subscribeBtnWrap}>
                  <Link href="/plans" prefetch={false}>
                    <Button
                      className={classes.navSubscribeButtons}
                      variant="contained"
                      size="small"
                      fullWidth
                    >
                      SUBSCRIBE
                    </Button>
                  </Link>
                </Grid>
              )}

            <ConfirmLogout open={openConfirmLogOut} close={() => setConfirmLogOut(false)} />
          </Box>
        </Box>
        <Box sx={{ display: { lg: 'block', xs: 'none' } }}>
          <Divider />
          <Box className={classes.listContainer}>
            {finalNavConfig?.map(
              (config, index) =>
                config.subheader && (
                  <List key={index} className={classes.listDeskTop} disablePadding>
                    {renderNavItems({
                      items: config.items,
                      pathname: pathname,
                      disabledRoutes,
                      user: user,
                      depth: 0,
                      teams: teamsList,
                      isHeirarchyLoading: isHeirarchyLoading
                    })}
                    <Divider className={classes.listDivider} />
                  </List>
                )
            )}
            <Grid container className={classes.tutorials}>
              <Grid item>
                <Link href={`/courses/${tutorialID}`} prefetch={false} className={classes.navLink}>
                  <Button className={classes.navButtons}>TUTORIALS</Button>
                </Link>
              </Grid>
              <Grid item>
                <Button href="mailto:admin@goswim.tv" className={classes.navButtons}>
                  SUPPORT
                </Button>
              </Grid>
              {(user?.role === AccountType.SWIMMER || user?.role === AccountType.COACH) &&
                (user?.isGoswimFreeUser || subscription === undefined) && (
                  <Grid container className={classes.subscribeBtnWrap}>
                    <Link href="/plans" prefetch={false} >
                      <Button
                        className={classes.navSubscribeButtons}
                        variant="contained"
                        size="small"
                        fullWidth
                      >
                        SUBSCRIBE
                      </Button>
                    </Link>
                  </Grid>
                )}
            </Grid>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );
  return (
    <>
      <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Box>
      <Box sx={{ display: { lg: 'block', xs: 'none' } }}>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
          }}
        >
          <Toolbar />
          {content}
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
