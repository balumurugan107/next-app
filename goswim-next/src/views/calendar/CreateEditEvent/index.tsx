/**
 * @author Pragadeeshwaran Jayapal
 * @since 15/06/2020
 * @description created a page for Calendar and Calendar UI completed
 */
import React, { useEffect } from 'react';
import { Dialog, Slide } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import ReviewView from 'src/views/calendar/CreateEditEvent/ReviewView';
import WorkoutView from 'src/views/calendar/CreateEditEvent/WorkoutView';
import { getSubscribers, SummarizedDetails, BookingDetails } from 'src/store/calendar/subscribers';
import { ReviewServiceDocument } from 'src/store/management/service';
// import LessonView from 'src/views/calendar/CreateEditEvent/LessonView';
import { LessonOverview } from 'src/store/calendar/scheduleOverview';

export type PickedSubscribersData = Omit<SummarizedDetails, '_id' | 'bookingDetails'>;

export interface DestructuredSubscribersData extends PickedSubscribersData, BookingDetails {}

export interface CreateEditEventProps {
  onCancel(event: React.MouseEvent<HTMLElement>): void;
  scheduleDispatchOverview: () => Promise<void>;
  onDelete(event: React.MouseEvent<HTMLElement>): void;
  onEdit(event: React.MouseEvent<HTMLElement>): void;
  isRoleCoach: boolean;
  reviewEvent?: ReviewServiceDocument;
  setEvent?: string;
  open?: boolean;
  lessonEvent?: LessonOverview;
  onView?: (event: React.MouseEvent<HTMLElement>) => void;
}

const useStyles = makeStyles(theme => ({
  paper: {
    '@global': {
      '.MuiDialog-scrollPaper': {
        alignItems: 'flex-start',
        position: 'relative',
        top: '25%',
        '@media only screen  and (min-device-width: 414px)  and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape)': {
          top: 0
        },
        '@media only screen  and (min-device-width: 375px)  and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape)': {
          top: 0
        },
        '@media only screen  and (min-device-width: 375px)  and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)': {
          top: 0
        },

        [theme.breakpoints.down('sm')]: { top: 0 }
      }
    }
  }
}));

const CreateEditEvent: React.FC<CreateEditEventProps> = ({
  onCancel,
  reviewEvent,
  setEvent,
  scheduleDispatchOverview,
  onDelete,
  onEdit,
  onView,
  isRoleCoach,
  open = false,
  lessonEvent,
  ...rest
}) => {
  const dispatch = useDispatch();
  const isReview = reviewEvent?.type === 'Review';

  const { isLoading, subscribersData } = useSelector(state => {
    return {
      subscribersData: state.scheduleOverviewSubscribers.data,
      isLoading: state.scheduleOverviewSubscribers.isLoading
    };
  });
  useEffect(() => {
    reviewEvent?.serviceReviewId && dispatch(getSubscribers(reviewEvent.serviceReviewId));
  }, []); //eslint-disable-line

  const destructuredData =
    (isRoleCoach &&
      subscribersData &&
      subscribersData.summarizedDetails?.length > 0 &&
      subscribersData.summarizedDetails.reduce(
        (acc: DestructuredSubscribersData[], curr: SummarizedDetails) => {
          curr.bookingDetails.forEach(bookingDetail => {
            acc.push({
              full_name: curr.full_name,
              profile_picture: curr.profile_picture,
              team_name: curr.team_name,
              roster_group: curr.roster_group,
              email: curr.email,
              review_datetime_utc_timestamp: bookingDetail.review_datetime_utc_timestamp,
              videos_count: bookingDetail.videos_count,
              swimmer_notes: bookingDetail.swimmer_notes,
              member_id: bookingDetail.member_id,
              scheduled_review_id: bookingDetail.scheduled_review_id
            });
          });
          return acc;
        },
        []
      )) ||
    [];

  const sortedDestructedData =
    (destructuredData?.length > 0 &&
      destructuredData.sort(
        (a, b) => a.review_datetime_utc_timestamp - b.review_datetime_utc_timestamp
      )) ||
    [];

  const classes = useStyles();

  if (isReview) {
    return (
      <Dialog
        maxWidth="lg"
        fullWidth
        onClose={onCancel}
        open={open}
        {...rest}
        className={classes.paper}
        TransitionComponent={Slide}
        transitionDuration={500}
        scroll="body"
      >
        {open && (
          <ReviewView
            onCancel={onCancel}
            reviewEvent={reviewEvent}
            isLoading={isLoading}
            subscribersData={sortedDestructedData}
            isRoleCoach={isRoleCoach}
            scheduleDispatchOverview={scheduleDispatchOverview}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </Dialog>
    );
  } 
  // else if (isLesson) {
  //   else if (false) {
  //   return (
  //     <Dialog
  //       maxWidth="lg"
  //       fullWidth
  //       onClose={onCancel}
  //       className={classes.paper}
  //       open={open}
  //       {...rest}
  //       TransitionComponent={Slide}
  //       transitionDuration={500}
  //       scroll="body"
  //     >
  //       {open && (
  //         <LessonView
  //           onCancel={onCancel}
  //           lessonEvent={lessonEvent}
  //           isLoading={isLoading}
  //           isRoleCoach={isRoleCoach}
  //           scheduleDispatchOverview={scheduleDispatchOverview}
  //           onDelete={onDelete}
  //           onEdit={onEdit}
  //         />
  //       )}
  //     </Dialog>
  //   );
  // }
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      onClose={onCancel}
      className={classes.paper}
      open={open}
      {...rest}
      TransitionComponent={Slide}
      transitionDuration={500}
      scroll="body"
    >
      {open && (
        <WorkoutView
          onCancel={onCancel}
          setEvent={setEvent}
          isLoading={isLoading}
          isRoleCoach={isRoleCoach}
          scheduleDispatchOverview={scheduleDispatchOverview}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </Dialog>
  );
};

export default CreateEditEvent;
