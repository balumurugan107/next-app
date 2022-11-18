import { Button, CardMedia, Tooltip, Card, Typography, alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Lock as LockIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AccountType, CustomThumbnail, defaultOptions } from 'src/constants';
import snackbar from 'src/helpers/snackbar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  deleteFavorite,
  getTodaysLesson,
  LessonDetailsDocument,
  postFavorite,
  postLesson,
  setFavourite
} from 'src/store/management/goswim/lessons/details';
import ScheduleLesson, { GetScheduleProps } from '../ScheduleLesson';
import config from 'src/config';
import { setMembersDropDownSelectedTeamCalendar } from 'src/store/management/members/actions';
import AddGroupDialog from 'src/views/management/Teams/CreateEditView/GroupModal';
import moment from 'moment';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      margin: 0,
      padding: 0,
      boxShadow: '0px 0px'
    },

    cardMedia: {
      backgroundColor: 'blue',
      width: '100%',
      [theme.breakpoints.down('lg')]: {
        margin: 0,
        padding: 0
      },
      [theme.breakpoints.up('md')]: {
        margin: 0,
        padding: 0
      },
      [theme.breakpoints.up('lg')]: {
        margin: 0,
        padding: 0
      },
      [theme.breakpoints.up('xl')]: {
        margin: 0,
        padding: 0
      }
    },

    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(2)
      }
    },

    divRelative: {
      position: 'relative',
      width: '100%',
      float: 'left'
    },
    favoriteWrapper: {
      width: 35,
      height: 35,
      zIndex: 1,
      backgroundColor: `${theme.palette.common.white} !important`,
      borderRadius: '50%',
      position: 'absolute',
      top: 10,
      right: 10,
      '& .favorite': {
        MozAppearance: 'initial',
        WebkitAppearance: 'initial',
        transform: 'translate3D(-70%, -55%, 0)',
        left: '50%',
        top: '50%',
        position: 'absolute',
        zIndex: 100,
        cursor: 'pointer',
        '&:before, &:after': {
          content: '""',
          cursor: 'pointer',
          backgroundImage: `url(${'/static/images/favoriteGrey.svg'})`,
          backgroundSize: 'cover',
          height: '20px',
          width: '20px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3D(-70%, -55%, 0)'
        },
        '&:after': {
          backgroundImage: `url(${'/static/images/favorite.svg'}) !important`,
          opacity: 0
        },
        '&:checked': {
          '&:before': {
            backgroundImage: `url(${'/static/images/favorite.svg'}) !important`
          }
        }
      },
      '& .favorite.with-anim': {
        '&:checked': {
          '&:before': {
            backgroundImage: `url(${'/static/images/favorite.svg'}) !important`
          },
          ' &:after': {
            transition: 'all 800ms ease-in',
            transform: 'translate3D(-50%, -200%, 0) !important',
            animation: '$ascend 800ms ease-in-out'
          }
        }
      }
    },
    '@keyframes ascend': {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    },
    cardText: {
      paddingTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      float: 'left',
      fontSize: 16,
      flex: 1,
      [theme.breakpoints.down('md')]: {
        marginBottom: 8
      }
    },
    subtitle: {
      display: 'block',
      color: theme.palette.text.secondary
    },
    divRelativeIframe: {
      display: 'block',
      width: '100%',
      height: 'auto',
      margin: 0,
      padding: 0
    },
    divRelativeIframeThumb: {
      display: 'block',
      width: '100%',
      height: 'auto',
      margin: 0,
      padding: 0,
      opacity: 0.5
    },
    noSpace: {
      margin: 0,
      padding: 0
    },

    buttonStyleTwo: {
      color: theme.palette.primary.main
    },
    lockedContent: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: '#000',
      opacity: 0.5,
      position: 'absolute',
      top: 0,
      alignItems: 'center'
    },
    subGroupTitle: {
      display: 'flex',
      alignItems: 'center',
      '& h2': {
        fontSize: theme.spacing(2.5)
      }
    },
    currentDate: {
      marginLeft: theme.spacing(2)
    },
    upcomingCard: {
      backgroundColor: theme.palette.background.paper,
      margin: 10,
      padding: 0,
      boxShadow: '0px 0px'
    },
    editIcon: {
      margin: '0 8px',
      color: alpha(theme.palette.secondary.main, 0.9)
    },
    scheduleWrapper: {
      float: 'right',
      '& button:nth-child(1)': {
        marginRight: theme.spacing(1),
        background: theme.palette.primary.main,
        color: theme.palette.common.white
      },
      [theme.breakpoints.down('sm')]: {
        float: 'left',
        '& button': {
          marginBottom: theme.spacing(1)
        }
      }
    }
  })
);

const LessonPlayer = (props: { lesson: LessonDetailsDocument; type?: string }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const groupId = pathname.split('/').pop();
  const subGroupURL = '/train';
  const isAutoPlay = useSelector(state => state.account.settings.autoplay_video);
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const dispatch = useDispatch();
  const { isSubscribed, user } = useSelector(state => state.account);
  const _id = props?.lesson?._id;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const userType = useSelector(state => state?.account?.user?.role);
  const URL = router.asPath;
  const onMediaFallback = (event: any) => (event.target.src = CustomThumbnail);
  const [failedToLoad, setFailedToload] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [enableScheduleLesson, setEnableScheduleLesson] = useState(false);
  const currentSelectedTeam = useSelector(state => state.members.currentSelectedTeam);
  const { teamsList } = useSelector(state => ({
    teamsList: state.team.teamsList || []
  }));
  const filteredGroupList = 
    teamsList && teamsList.filter(team => team._id !== config.goswimGroupAPI.groupId);
  const favRef: any = useRef(null);
  const subscriptionData = useSelector(state => state.subscription.productData);
  const price = subscriptionData.find(product => product.priority === 1);
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;

  const handleClickOpen = () => {
    if (teamsList?.length <= 1 && userType !== AccountType.ADMIN) {
      setShowAddGroupDialog(true);
      snackbar.success('Please create a group before schedule lesson!!', defaultOptions);
    } else {
      if (currentSelectedTeam === 'ALL') {
        dispatch(
          setMembersDropDownSelectedTeamCalendar({
            arrayOfSelectedTeams: [filteredGroupList[0]?._id],
            selectedTeam: filteredGroupList[0]?._id
          })
        );
      }
      setOpen(true);
    }
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFailedToload(false);
    dispatch(setFavourite(props.lesson.favourite));
  }, [groupId, tryAgain]);

  useEffect(() => {
    setIsFavorite(props.lesson.favourite);
  }, [props.lesson.favourite, props.lesson.videoUrl]);

  const handlePlay = () => {
    if (_id) dispatch(postLesson(`${_id}`));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      handleFavoriteAdd();
      favRef?.current?.classList.add('with-anim');
    } else {
      handleFavoriteDelete();
      favRef?.current?.classList.remove('with-anim');
    }
    if (groupId) dispatch(getTodaysLesson(groupId, timeZone, true));
  };
  const handleFavoriteAdd = () => {
    if (props.lesson._id) dispatch(postFavorite(props.lesson._id));
  };
  const handleFavoriteDelete = () => {
    if (props.lesson._id) dispatch(deleteFavorite(props.lesson._id));
  };

  const getScheduleProps = () => {
    const prop: GetScheduleProps = {
      lessonID: `${_id}`,
      openDialog: open,
      lessonTitle: props?.lesson?.name,
      addEditToggle: 'Add'
    };
    return prop;
  };
  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.header}>
          {pathname.includes(subGroupURL) ? (
            <></>
          ) 
          : (
            <>
              <Typography className={classes.cardText} variant="h4" component="h3">
                {props?.lesson?.name}
              </Typography>
              {false && props?.lesson?.subtitle ? (
                <Typography className={classes.subtitle} variant="body1" component="h3">
                  {props?.lesson?.subtitle}
                </Typography>
              ) : (
                ''
              )}
            </>
          )}
          { URL.split('/')[0] !== 'train' && (
            <div className={classes.scheduleWrapper}>
              {userType === AccountType.ADMIN && (
                <Button
                  variant="contained"
                  onClick={() => router.push(`/app/admin/lessons/${props?.lesson?._id}/edit`)}
                  color="primary"
                  size="small"
                  startIcon={<EditOutlinedIcon />}
                >
                  Edit
                </Button>
              )}
              {enableScheduleLesson &&
                (userType === AccountType.ADMIN || userType === AccountType.COACH) &&
                !failedToLoad && (
                  <>
                    <Button
                      variant="outlined"
                      className={classes.buttonStyleTwo}
                      onClick={handleClickOpen}
                      size="small"
                    >
                      SCHEDULE LESSON
                    </Button>
                  </>
                )}
            </div>
          )}
        </div>

        {(!isSubscribed &&
          (userType === AccountType.SWIMMER || userType === AccountType.COACH) &&
          !props?.lesson?.tags?.find(tag => tag === 'tutorial') &&
          URL.split('/')[0] !== 'train') ||
        (user?.isGoswimFreeUser && !props.lesson.videoUrl) ? (
          <div className={classes.divRelative}>
            <CardMedia
              className={classes.divRelativeIframeThumb}
              component="img"
              alt={props.lesson.name}
              image={props.lesson.thumbnailUrl ?? CustomThumbnail}
              title={props.lesson.name}
              onError={onMediaFallback}
            />
            <div className={classes.lockedContent}>
              <LockIcon size={48} color="#fff" />
              <h4 style={{ color: '#fff', margin: '8px' }}>Upgrade to watch</h4>
              <Button
                variant="outlined"
                onClick={() => router.push('/plans')}
                style={{ color: '#fff', background: '#a6a9ab47' }}
                size="small"
              >
                UPGRADE NOW FOR ONLY ${price?.price.price}
              </Button>
            </div>
          </div>
        ) : (
          <div className={classes.divRelative}>
            {enableScheduleLesson && (
              <Tooltip
                title={isFavorite ? 'Remove from Favorite' : 'Add to favorite'}
                enterDelay={3000}
              >
                <>
                  <div className={classes.favoriteWrapper}>
                    <input
                      type="checkbox"
                      checked={isFavorite ? true : false}
                      onChange={() => {
                        handleFavorite();
                      }}
                      className="favorite"
                      ref={favRef}
                    />
                  </div>
                </>
              </Tooltip>
            )}
            <video
              className={classes.divRelativeIframe}
              id="myVideo"
              controls
              src={props?.lesson?.videoUrl}
              autoPlay={isAutoPlay ? true : false}
              onPlay={handlePlay}
              onError={_e => {
                setFailedToload(true);
              }}
              onLoadedData={() => setEnableScheduleLesson(true)}
            ></video>

            {failedToLoad && (
              <div className={classes.lockedContent}>
                <AlertTriangle size={48} color="#fff" />
                <h4 style={{ color: '#fff' }}>Failed to load</h4>
                <Button
                  variant="outlined"
                  style={{ color: '#fff' }}
                  onClick={() => setTryAgain(!tryAgain)}
                  size="small"
                >
                  Try again later
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
      {showAddGroupDialog && (
        <AddGroupDialog
          type="create"
          openDialog={showAddGroupDialog}
          closeDialog={() => setShowAddGroupDialog(false)}
        />
      )}
      {user?._id && <ScheduleLesson data={getScheduleProps()} closeClicked={handleClickClose} />}
    </div>
  );
};

export default LessonPlayer;
