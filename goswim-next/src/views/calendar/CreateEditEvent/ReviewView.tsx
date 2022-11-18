import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardHeader,
  LinearProgress,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Rating from '@mui/material/Rating';
import moment from 'moment';
import clsx from 'clsx';
import Avatar from 'src/components/Avatar';
import {
  DestructuredSubscribersData,
  CreateEditEventProps
} from 'src/views/calendar/CreateEditEvent';
import { useDispatch, useSelector } from 'react-redux';
import { updateRatings } from 'src/store/management/orders';
import CancelIcon from '@mui/icons-material/Cancel';
import TooltipComponent from 'src/components/Tooltip';
import { useCommonStyles } from 'src/styles/common';
import CoachNotes from './CoachNotes';
import { ServiceName } from 'src/constants';
export interface CreateEditView extends CreateEditEventProps {
  isLoading: boolean;
  subscribersData: DestructuredSubscribersData[];
  isRoleCoach: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'default',
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      }
    }
  },
  custIcon: {
    marginRight: 5,
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  subContent: {
    fontWeight: 400
  },
  roster: {
    marginTop: 4,
    fontWeight: 800
  },
  rating: {
    fontWeight: 800
  },
  ratingIcon: {
    marginTop: -24,
    marginLeft: 140
  },
  ratingValue: {
    marginTop: -27,
    marginLeft: 270
  },
  iconDate: {
    marginRight: 5,
    marginLeft: -5,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      float: 'left'
    }
  },
  header: {
    fontWeight: 800,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 0,
    paddingTop: 8
  },
  content: {
    padding: 24,
    paddingTop: 0
  },
  table: {
    maxHeight: 230,
    marginTop: 10
  },
  to: {
    marginRight: 6,
    marginLeft: 6
  },
  avatarImg: {
    paddingRight: 0
  },
  swimmerCell: {
    wordBreak: 'break-all',
    [theme.breakpoints.down('lg')]: { wordBreak: 'keep-all' }
  },
  bookedBy: {
    boxShadow: ' 0 0 10px 0 rgba(0,0,0,0.25), 0 3px 4px -2px rgba(0,0,0,0.25)'
  }
}));

const numberOfSubscribers = (subscribers: DestructuredSubscribersData[]) => {
  return subscribers.reduce((acc: number, curr: DestructuredSubscribersData) => {
    acc += curr.videos_count;
    return acc;
  }, 0);
};

const ReviewView: React.FC<CreateEditView> = ({
  onCancel,
  reviewEvent,
  isLoading,
  subscribersData,
  isRoleCoach,
  onDelete,
  scheduleDispatchOverview,
  onEdit
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isTouched, setTouched] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(reviewEvent?.swimmerRating || 0);
  const [hover, setHover] = React.useState(-1);
  const settings = useSelector(state => state.account.settings);
  const isCompleted = moment().valueOf() > moment(reviewEvent?.reviewDate).valueOf();
  const SubscriberData: React.SFC<{
    data: DestructuredSubscribersData;
  }> = subscriberDataProps => {
    return (
      <TableRow>
        <TableCell component="th" scope="row" className={classes.avatarImg}>
          <Avatar variant="circular" srcSet={subscriberDataProps.data.profile_picture} />
        </TableCell>
        <TableCell>
          <Box className={classes.swimmerCell}>
            <Typography variant="body1" color="textPrimary">
              {subscriberDataProps.data.full_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {subscriberDataProps.data.email}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{subscriberDataProps.data.team_name}</TableCell>
        <TableCell>
          {subscriberDataProps?.data?.roster_group &&
            subscriberDataProps.data.roster_group?.length > 0 &&
            subscriberDataProps.data.roster_group?.map((roster, index) => {
              return (
                <div key={index}>
                  {roster}
                  <br />
                </div>
              );
            })}
        </TableCell>
        <TableCell>
          {moment(subscriberDataProps.data.review_datetime_utc_timestamp).format(
            settings.dateFormat
          )}
        </TableCell>
        <TableCell>{subscriberDataProps.data.videos_count}</TableCell>
        {isRoleCoach && (
          <TableCell>
            <CoachNotes
              {...{
                swimmer_id: subscriberDataProps.data.member_id,
                service_id: subscriberDataProps.data.scheduled_review_id,
                swimmer_notes: subscriberDataProps.data.swimmer_notes,
                serviceType: ServiceName.VIDEO_REVIEW
              }}
            />
          </TableCell>
        )}
      </TableRow>
    );
  };

  useEffect(() => {
    isTouched &&
      rating &&
      reviewEvent &&
      reviewEvent?._id &&
      dispatch(updateRatings({ ratings: rating, bookingIds: [reviewEvent._id] }));
    isTouched && scheduleDispatchOverview();
    setTouched(false);
  }, [rating, isTouched]); //eslint-disable-line

  return <>
    <Card className={clsx(classes.root, commonClasses.modalBodyScroll)}>
      <CardHeader
        title={
          <Typography component="h4" variant="h4" color="primary">
            {reviewEvent?.service || ''}
          </Typography>
        }
        className={classes.header}
        action={
          <Box mt={1.25}>
            {isRoleCoach && (
              <TooltipComponent title="Edit">
                <IconButton color="secondary" onClick={onEdit} size="large">
                  <EditOutlinedIcon />
                </IconButton>
              </TooltipComponent>
            )}
            {isRoleCoach && (
              <TooltipComponent title="Delete">
                <IconButton color="secondary" onClick={onDelete} size="large">
                  <DeleteOutlinedIcon />
                </IconButton>
              </TooltipComponent>
            )}
            <TooltipComponent title="Close">
              <IconButton aria-label="clear" onClick={onCancel} size="large">
                <CancelIcon className={commonClasses.cancelColor} fontSize="large" />
              </IconButton>
            </TooltipComponent>
          </Box>
        }
      />
      <CardContent className={classes.content}>
        <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
          <Typography className={clsx(commonClasses.desc, classes.subContent)}>
            {reviewEvent?.description || ''}
          </Typography>
        </Box>
        <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
          <Typography component="span" className={classes.roster}>
            {reviewEvent?.teamName || ''}
          </Typography>
          <Typography component="span" className={commonClasses.separator} />
          <Typography component="span" className={classes.roster}>
            {(reviewEvent && reviewEvent?.rosterGroup && reviewEvent?.rosterGroup.join(', ')) ||
              ''}
          </Typography>
          <Box display="flex" alignItems="center" marginLeft="auto" mt={mobile ? 1.5 : 0}>
            <span className={commonClasses.currency}>{settings.currency}</span>
            <Box component="span">{(reviewEvent?.cost && Math.round(reviewEvent.cost)) || 0}</Box>
          </Box>
        </Box>
        <Box mt={2} display={mobile ? 'block' : 'flex'} alignItems="center">
          <Box display="flex">
            <EventNoteIcon color="secondary" className={classes.iconDate} />
            <Typography component="span" className={commonClasses.subHeader}>
              {`${
                reviewEvent?.startDate
                  ? moment(reviewEvent?.startDate).format(settings.dateFormat)
                  : ''
              }`}
              <span className={classes.to}>to</span>
              {`${
                reviewEvent?.endDate
                  ? moment(reviewEvent?.endDate).format(settings.dateFormat)
                  : ''
              }`}
            </Typography>
          </Box>
          <TooltipComponent title="Booked slots">
            <Box display="flex" alignItems="center" marginLeft="auto" mt={mobile ? 1.5 : 0}>
              <VerticalSplitIcon color="secondary" className={classes.custIcon} />
              <Box component="span">
                {`${(reviewEvent?.slots || 0) - (reviewEvent?.availableSlots || 0)} / ${
                  reviewEvent?.slots
                }`}
              </Box>
            </Box>
          </TooltipComponent>
        </Box>
        {!isRoleCoach && isCompleted && (
          <Box mt={3}>
            <Grid>
              <Grid>
                <Typography className={classes.rating}>Rate this service</Typography>
              </Grid>
              <Grid className={classes.ratingIcon}>
                <Rating
                  name="hover-feedback"
                  value={rating}
                  precision={0.5}
                  onChange={(_event, newValue) => {
                    setRating(newValue);
                    setTouched(true);
                  }}
                  onChangeActive={(_event, newHover) => {
                    setHover(newHover);
                  }}
                />
              </Grid>
              <Grid className={classes.ratingValue}>
                {rating !== null && (
                  <Typography className={classes.rating}>
                    {hover !== -1 ? hover : rating}/5
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
        {isRoleCoach && subscribersData.length > 0 && (
          <Box mt={3}>
            <Card className={classes.bookedBy}>
              <Box mt={3} ml={1}>
                <Typography component="span" className={commonClasses.subHeader}>
                  Booked by (
                  {subscribersData.length > 0 ? numberOfSubscribers(subscribersData) : 0})
                </Typography>
              </Box>
              <TableContainer className={classes.table}>
                <Table aria-label="simple table" className={classes.root} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>Swimmer Name</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell>Roster</TableCell>
                      <TableCell>Review Date</TableCell>
                      <TableCell>Videos</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subscribersData?.length > 0 &&
                      subscribersData?.map((subscriber, id) => (
                        <SubscriberData key={id} data={subscriber} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        )}
        {isRoleCoach && isLoading && (
          <Box width="100%" mt={3}>
            <LinearProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  </>;
};

export default ReviewView;
