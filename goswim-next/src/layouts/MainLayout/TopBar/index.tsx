import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  SvgIcon,
  Theme,
  colors,
  TextField,
  InputAdornment,
  Menu,
  MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AppsIcon from '@mui/icons-material/Apps';
import Logo from 'src/components/Logo';
import { AccountType, appThemes } from 'src/constants';
import { ComponentProps } from 'src/types/components';
import Settings from 'src/layouts/MainLayout/TopBar/Settings';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseSearchText } from 'src/store/management/courses/actions';
import { setLessonSearchText } from 'src/store/management/goswim/lessons/actions';
import { getProfile } from 'src/store/account';
import { ApplicationState } from 'src/store';
import Avatar from 'src/components/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ConfirmLogout from 'src/views/auth/Logout/ConfirmLogout';
import { Router, useRouter } from 'next/router';
import Link from 'src/components/Link';

const getThemeBasedProps = (theme: Theme) => {
  switch (theme) {
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
        backgroundColor: theme.palette.background.default
      };

    default:
      return {};
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...getThemeBasedProps(theme)
  },
  toolbar: {
    minHeight: 64,
    [theme.breakpoints.down('sm')]: { padding: 0 }
  },
  image: {
    height: 50,
    width: 200,
    objectFit: 'scale-down',
    [theme.breakpoints.down('sm')]: { width: 150 }
  },
  iconMiddle: { color: colors.common.white },
  searchBox: {
    [theme.breakpoints.down('sm')]: { display: 'none' }
  },
  cssLabel: {
    fontSize: '0.875rem',
    color: theme.palette.common.white
  },
  cssFocused: {
    color: 'white !important'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`
    },
    '&.MuiInputBase-root': {
      color: '#fff'
    }
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: '#fff'
    }
  },
  profileName: {
    marginRight: '5px',
    fontWeight: 600,
    fontSize: 16
  },

  profilePic: {
    width: 40,
    height: 40,
    background: '#fff',
    borderRadius: '50%',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: { display: 'none' }
  },
  mobSearch: {
    fontSize: theme.spacing(4),
    display: 'none',
    color: '#fff',
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      fontSize: theme.spacing(3.5),
      visibility: 'unset'
    }
  },
  searchField: {
    width: '100%',
    float: 'left',
    background: theme.palette.background.default,
    padding: theme.spacing(2),
    position: 'fixed',
    top: 64,
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: { display: 'flex', visibility: 'unset' },
    '& .MuiOutlinedInput-input:-webkit-autofill': {
      boxShadow: `0 0 0 100px ${theme.palette.background.default} inset`
    }
  },
  menuItem: {
    fontSize: '0.875rem'
  },
  searchIcon: {
    color: theme.palette.common.white
  }
}));

interface TopBarProps {
  onMobileNavOpen: () => void;
  router: Router;
}

const TopBar: React.FC<ComponentProps & TopBarProps> = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const router = useRouter();
  const location = router.route.split('/');
  const prevLocation: any = router.query.location;
  const dispatch = useDispatch();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSearchField, setShowSearchField] = useState(false);
  const [searchBoxContent, setSearchBoxContent] = useState('');
  const [initialRender, setInitialRender] = useState(true);
  const ref = useRef<any>(null);

  const { user, isSubscribed } = useSelector((state: ApplicationState) => ({
    user: state.account.user || null,
    lastUpdatedPictureTimestamp: state.account.lastUpdatedPictureTimestamp,
    disabledRoutes: state.account.disabledRoutes,
    hideRoutesNavigation: state.account.hideRoutesNavigation,
    subscriptionStatus: state.subscription.data?.status,
    isSubscribed: state.account.isSubscribed
  }));

  const handleSearchText = async () => {
    await dispatch(setLessonSearchText(''));
    await dispatch(setCourseSearchText(''));
  };

  const profileInformation =
    (user?.profile_picture_url &&
      user?.profile_picture_url !== 'undefined' &&
      (user?.profile_picture_url as string)) ||
    ``;

  useEffect(() => {
    if (location[location.length - 1] !== 'plans') {
      setShowSearchBox(true);
    }

    let searchKey = router.query['search'];
    if (searchKey) {
      const delayDebounceFn = setTimeout(() => {
        if (searchKey) {
          setSearchBoxContent(searchKey.toString());
        }
        clearTimeout(delayDebounceFn);
      }, 500);
    }
    if (initialRender) {
      setInitialRender(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchBoxContent]);

  const search = () => {
    if (location[location.length - 1] === 'courses') {
      localStorage.setItem('PageReset', '1');
      dispatch(setCourseSearchText(searchBoxContent));
      const userLocation = new URLSearchParams(router?.query);

      if (searchBoxContent && searchBoxContent.trim().length > 0) {
        pushUrl(userLocation, `/courses?search=${searchBoxContent}&`);
      } else {
        pushUrl(userLocation, `/courses?`);
      }
    } else if (location[location.length - 1] === 'lessons') {
      localStorage.setItem('PageReset', '1');
      dispatch(setLessonSearchText(searchBoxContent));
      const userLocation = new URLSearchParams(router?.query);

      if (searchBoxContent && searchBoxContent.trim().length > 0) {
        pushUrl(userLocation, `/lessons?search=${searchBoxContent}&`);
      } else pushUrl(userLocation, `/lessons?`);
    }
  };

  const pushUrl = (searchParams: URLSearchParams, url: string) => {
    let stroke = searchParams.get('stroke');
    let expertise = searchParams.get('expertise');
    let tags = searchParams.get('tags');
    if (stroke) {
      let tempCat = stroke.replaceAll(' ', '+');
      url = `${url}stroke=${tempCat}&`;
    }
    if (expertise && expertise !== 'all') {
      let tempExp = expertise.replaceAll(' ', '+');
      url = `${url}expertise=${tempExp}&`;
    }
    if (tags && tags !== 'all') {
      let tempTags = tags.replaceAll(' ', '+');
      url = `${url}tags=${tempTags}&`;
    }
    if (location[location.length - 1] === 'courses') {
      url = `${url}type=courses`;
    } else url = `${url}type=lessons`;
    url = url.substring(0, url.length - 1);
    router.push(url);
  };

  useEffect(() => {
    if (showSearchField) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showSearchField]);

  useEffect(() => {
    if (
      (location[location.length - 1] !== 'lessons' &&
        location[location.length - 1] !== 'courses') ||
      prevLocation?.location?.includes('courses')
    ) {
      setSearchBoxContent('');
      handleSearchText();
    } else if (
      location[location.length - 1] === 'courses' &&
      !prevLocation?.location?.includes('coursePage')
    ) {
      setSearchBoxContent('');
      handleSearchText();
    } else {
      localStorage.setItem('PageReset', '1');
      dispatch(setLessonSearchText(searchBoxContent));
      dispatch(setCourseSearchText(searchBoxContent));
    }
  }, [location[location.length - 1]]);

  useEffect(() => {
    if (isSubscribed) {
      dispatch(getProfile());
    }
  }, []);

  const AppsIconButton = () => {
    return (
      <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
        <SvgIcon>
          <AppsIcon className={classes.iconMiddle} />
        </SvgIcon>
      </IconButton>
    );
  };

  const searchBox = () => {
    const router = useRouter();
    if (showSearchBox) {
      return (
        <TextField
          className={classes.searchBox}
          id="outlined-basic"
          label={getLabel()}
          variant="outlined"
          size={'small'}
          value={searchBoxContent}
          onKeyPress={(ev: any) => {
            if (ev.key === 'Enter') {
              ev.target.blur();
              window.scrollTo(0, 0);
              setSearchBoxContent(ev.target.value);
              if (
                (location[location.length - 1] !== 'lessons' &&
                  location[location.length - 1] !== 'courses') ||
                (location[location.length - 1] !== 'courses' && location.length > 1)
              ) {
                router.push('/lessons');
              } else if (location[location.length - 1] === 'courses' && location.length > 1) {
                router.push(
                  { pathname: '/courses', query: { location: 'coursePage' } },
                  '/courses'
                );
              }
            }
          }}
          autoComplete="off"
          onChange={e => {
            window.scrollTo(0, 0);
            setSearchBoxContent(e.target.value);
            if (
              (location[location.length - 1] !== 'lessons' &&
                location[location.length - 1] !== 'courses') ||
              (location[location.length - 1] !== 'courses' && location.length > 1)
            ) {
              router.push('/lessons');
            } else if (location[location.length - 1] === 'courses' && location.length > 1) {
              router.push({ pathname: '/courses', query: { location: 'coursePage' } }, '/courses');
            }
          }}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
            },
            inputMode: 'numeric',
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            )
          }}
        />
      );
    } else {
      return null;
    }
  };

  const getLabel = () => {
    if (location[location.length - 1] === 'courses') {
      return 'Search Courses';
    } else {
      return 'Search Lessons';
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOutside = (event: any) => {
    let searchIconHandler = event.target.className?.baseVal?.includes('mobSearch');
    if (!searchIconHandler && ref.current && !ref.current.contains(event.target)) {
      setShowSearchField(false);
    }
  };

  const userRole = useSelector(state => state.account.user?.role || AccountType.ATHLETE);

  const [openConfirmLogOut, setConfirmLogOut] = React.useState(false);

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        {location[location.length - 1] !== 'plans' && (
          <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
            <AppsIconButton />
          </Box>
        )}
        <Link href="/home" prefetch={false}>
          <Logo className={classes.image} />
        </Link>
        <Box ml={2} flexGrow={1} />
        <SearchIcon
          className={classes.mobSearch}
          style={{ display: showSearchBox ? 'flex' : 'none' }}
          onClick={() => setShowSearchField(!showSearchField)}
        />
        <div
          className={classes.searchField}
          style={{ display: showSearchField ? 'block' : 'none' }}
          ref={ref}
        >
          <TextField
            fullWidth
            variant="outlined"
            id="input-with-icon-textfield"
            label={getLabel()}
            size={'small'}
            value={searchBoxContent}
            onKeyPress={(ev: any) => {
              if (ev.key === 'Enter') {
                ev.target.blur();
              }
            }}
            onChange={e => {
              setSearchBoxContent(e.target.value);
              if (
                (location[location.length - 1] !== 'lessons' &&
                  location[location.length - 1] !== 'courses') ||
                (location[location.length - 1] !== 'courses' && location.length > 1)
              ) {
                router.push('/lessons');
              } else if (location[location.length - 1] === 'courses' && location.length > 1) {
                router.push('/courses');
              }
            }}
            InputProps={{
              inputMode: 'numeric',
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>

        <TextField
          className={classes.searchBox}
          id="outlined-basic"
          label={getLabel()}
          variant="outlined"
          size={'small'}
          value={searchBoxContent}
          onKeyPress={(ev: any) => {
            if (ev.key === 'Enter') {
              ev.target.blur();
              window.scrollTo(0, 0);
              setSearchBoxContent(ev.target.value);
              if (
                (location[location.length - 1] !== 'lessons' &&
                  location[location.length - 1] !== 'courses') ||
                (location[location.length - 1] !== 'courses' && location.length > 1)
              ) {
                router.push('/lessons');
              } else if (location[location.length - 1] === 'courses' && location.length > 1) {
                router.push(
                  { pathname: '/courses', query: { location: 'coursePage' } },
                  '/courses'
                );
              }
            }
          }}
          autoComplete="off"
          onChange={e => {
            window.scrollTo(0, 0);
            setSearchBoxContent(e.target.value);
            if (
              (location[location.length - 1] !== 'lessons' &&
                location[location.length - 1] !== 'courses') ||
              (location[location.length - 1] !== 'courses' && location.length > 1)
            ) {
              router.push('/lessons');
            } else if (location[location.length - 1] === 'courses' && location.length > 1) {
              router.push({ pathname: '/courses', query: { location: 'coursePage' } }, '/courses');
            }
          }}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
            },
            inputMode: 'numeric',
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            )
          }}
        />
        <Settings />
        <Box className={classes.profile}>
          {location[1] === 'plans' && !isSubscribed ? (
            ''
          ) : (
            <>
              <div className={classes.profilePic}>
                <Avatar
                  srcSet={`${profileInformation}`}
                  aria-controls="menu-list-grow"
                  aria-haspopup="true"
                  onClick={handleClick}
                />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted={false}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    transform: 'translateX(10px) translateY(16px)'
                  }
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Link href='/account/settings' prefetch={false}>
                  <MenuItem
                    onClick={handleClose}
                    className={classes.menuItem}
                  >
                    Profile
                  </MenuItem>
                </Link>
                <Link href="/account/favorites" prefetch={false}>
                  <MenuItem onClick={handleClose} className={classes.menuItem}>
                    Favorites
                  </MenuItem>
                </Link>
                <Link href="/account/plays" prefetch={false}>
                  <MenuItem onClick={handleClose} className={classes.menuItem}>
                    Plays
                  </MenuItem>
                </Link>
                {(userRole === AccountType.SWIMMER || userRole === AccountType.COACH) &&
                  !user?.isGoswimFreeUser ? (
                  <Link href="/billing" prefetch={false}>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                      Billing
                    </MenuItem>
                  </Link>
                ) : null}
                <hr />
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    setConfirmLogOut(true);
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
        <ConfirmLogout
          open={openConfirmLogOut}
          close={() => setConfirmLogOut(false)}
          setAnchorEl={setAnchorEl}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
