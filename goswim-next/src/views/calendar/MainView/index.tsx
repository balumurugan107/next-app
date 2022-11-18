import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ComponentProps } from 'src/types/components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReactDOM from 'react-dom';
import {
  Container,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
  Slide,
  Typography,
  LinearProgress
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import { EventApi, View, Duration } from '@fullcalendar/core';
import { CalanderEvent } from 'src/types';
import {
  getScheduleOverview,
  LessonOverview,
  ScheduleLessonService,
  ScheduleOverviewData,
  updateOverViewItem
} from 'src/store/calendar/scheduleOverview';
import {
  ReviewServiceDocument,
  updateScheduledReview,
  ReviewServiceIds,
  deleteReviewServices
} from 'src/store/management/service';
import Toolbar from 'src/views/calendar/MainView/Toolbar';
import { AccountType, DialogType } from 'src/constants';
import { WorkoutOverviewDocument } from 'src/store/workout';
import TooltipComponent from 'src/components/Tooltip';
import { deleteWorkout } from 'src/store/workout/actions';
import Dialog from 'src/components/DialogAlert';
import {
  deleteLessonServices,
  LessonServiceDocument,
  LessonServiceIds
} from 'src/store/management/lessons';
import { OptionsInputBase } from '@fullcalendar/core/types/input-types';
import ScheduleLesson, { GetScheduleProps } from 'src/views/goswim/lessons/ScheduleLesson';
import { updateScheduleLesson } from 'src/store/management/goswim/lessons/details/actions';
import config from 'src/config';
import { UpdateScheduleRequestObj } from 'src/store/management/goswim/lessons/details';
import { Dialog as MuiDialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getTeamHeirarchy } from 'src/store/management/team';
import { setMembersDropDownSelectedTeamCalendar } from 'src/store/management/members/actions';
import { useRouter } from 'next/router';

export interface EventRender {
  el: HTMLElement;
  event: EventApi;
  view: View;
}

export interface Arg extends EventRender {
  jsEvent: MouseEvent;
}

export interface EventDragStart extends EventRender {
  event: EventApi;
  el: HTMLElement;
  jsEvent: MouseEvent;
  view: View;
}
export interface EventDropArg extends EventRender {
  oldEvent: EventApi;
  event: EventApi;
  delta: Duration;
  revert: () => void;
  jsEvent: Event;
}
export interface EventRenderProps extends EventRender {
  isMirror: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export interface EventResizeArg extends EventRender {
  startDelta: Duration;
  endDelta: Duration;
  prevEvent: EventApi;
  revert: () => void;
  jsEvent: Event;
}

export interface DialogContent {
  title: string;
  description: string;
  type?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    fontFamily: 'Roboto'
  },
  titleh1: {
    fontSize: '18px',
    color: theme.palette.primary.main
  },
  calendar: {
    position: 'relative',
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(3)
    },
    '& .fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content, .fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td': {
      borderColor: theme.palette.divider
    },
    backgroundColor: 'unset',
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider
    },
    '& .fc-unthemed td.fc-today': {
      backgroundColor: theme.palette.background.light
    },
    '& .fc-head': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-body': {
      backgroundColor:
        theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(40, 44, 52, 0.75)'
    },
    '& .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc-list-item-time': {
      ...theme.typography.body2,
      display: 'none'
    },
    '& .fc-list-item-title': {
      ...theme.typography.body1
    },
    '& .fc-list-heading-main': {
      ...theme.typography.h4,
      color: theme.palette.primary.main,
      padding: theme.spacing(1)
    },
    '& .fc-list-heading-alt': {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1)
    },
    '& .fc th': {
      borderColor: theme.palette.divider,
      cursor: 'default'
    },
    '& .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.675rem'
      }
    },
    '& .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-highlight': {
      backgroundColor: theme.palette.mode === 'light' ? '#cccccc' : '#666666'
    },
    '& .fc-day.fc-widget-content.fc-disabled-day': {
      opacity: 0
    },
    '& .fc-event': {
      /** Call this class for Set writer container  */
      borderColor: theme.palette.secondary.main,
      backgroundColor: 'transparent',
      borderWidth: 2,
      border: '2px, solid',
      opacity: 0.9,
      '& .fc-time': {
        display: 'none',
        ...theme.typography.h6,
        color: 'inherit'
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: theme.palette.text.primary
      }
    },
    '& .fc-vr-event': {
      /** Call this class for Video Review container  */
      borderColor: '#3C9CEA',
      backgroundColor: 'transparent',
      borderWidth: 2,
      border: '2px, solid',
      opacity: 0.9
    },
    '& .fc-live-event': {
      /** Call this class for Live lesson container  */
      borderColor: '#A03CEA',
      backgroundColor: 'transparent',
      borderWidth: 2,
      border: '2px, solid',
      opacity: 0.9
    },
    '& .fc-list-empty': {
      ...theme.typography.subtitle1
    },
    '& .fc-list-item': {
      '&:hover': {
        '& td': {
          backgroundColor: `${theme.palette.action.hover} !important`,
          cursor: 'pointer'
        }
      }
    },
    '& .fc-unthemed': {
      '& .fc-list-heading': {
        '& td': {
          backgroundColor: theme.palette.background.default
        }
      },
      '& .fc-event-container': {
        '& a': {
          transition: 'all ease 0.25s',
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'all ease 0.25s',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
            zIndex: 999,
            backgroundColor: '#ffffff',
            '& span': {
              color: '#333333'
            }
          }
        }
      }
    },
    '& .fc-list-view': {
      borderColor: 'rgba(255,255,255,0.12) !important',
      minHeight: 'calc(100vh - 60px)'
    },
    '& .fc-unthemed ': {
      '& .fc-list-empty': {
        backgroundColor: 'unset !important'
      }
    },
    '& .fc-unthemed .fc-popover .fc-header': {
      backgroundColor: theme.palette.background.dark
    },
    '& .fc-unthemed .fc-content': {
      cursor: 'pointer',
      padding: '3px'
    },
    '& .fc-day-number ': {
      cursor: 'default'
    },
    '& .fc-scroller': {
      overflow: 'unset !important',
      height: 'unset !important'
    },
    '& .fc-ltr .fc-h-event.fc-not-start': {
      marginLeft: 'unset',
      borderLeftWidth: 2,
      paddingLeft: 0,
      borderRadius: 3
    },
    '& .fc-ltr .fc-h-event.fc-not-end': {
      marginRight: 'unset',
      borderRightWidth: 2,
      paddingRight: 0,
      borderRadius: 3
    },
    '& .fc-past.fc-day.fc-widget-content.fc-past': {
      background: theme.palette.background.dark
    },
    '& .fc-toolbar.fc-header-toolbar': {
      position: 'absolute',
      top: -36,
      zIndex: 10,
      fontSize: '11px'
    },
    '& .fc-toolbar h2': {
      fontSize: '20px',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      fontWeight: 500,
      [theme.breakpoints.down('md')]: {
        fontSize: '16px'
      }
    },
    '& .fc-view.fc-listWeek-view.fc-list-view.fc-widget-content': {
      marginTop: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(3)
      }
    }
  },
  tagContent: {
    height: 18,
    color: '#3C9CEA'
  },
  vrIcon: {
    /** tagContent STATIC color for Video Review  */
    height: 18,
    color: '#3C9CEA'
  },
  lvIcon: {
    /** STATIC color for Live Lessons  */
    height: 18,
    color: '#A03CEA'
  },
  setIcon: {
    /**DYNAMIC color for Sets  */
    height: 25,
    width: 25,
    color: theme.palette.primary.main
  },
  titleText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    color: theme.palette.text.secondary
  },
  PageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  cardText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)
    // fontSize: "0.875rem"
  },
  infoIcon: {
    fontSize: 100,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  },
  modalDesc: {
    textAlign: 'center'
  },
  modalTitle: {
    '& h2': {
      fontSize: '1.25rem'
    }
  }
}));

/** @todo need to check the allday props to fix one day lag  */
const calendarEventHandler = (
  reviewData: ScheduleOverviewData | null,
  isEditable: boolean
): CalanderEvent[] => {
  const destructor = (reviewData: ScheduleOverviewData | null) => {
    if (reviewData) {
      if (reviewData.reviews && reviewData.reviews.length) {
        return [
          ...reviewData.reviews,
          ...reviewData.workouts,
          ...filteredLessons(reviewData.lessons)
        ];
      }
      return [...filteredLessons(reviewData.lessons)];
      // ...reviewData.workouts,
    }
  };
  const goswimGroupId = config.goswimGroupAPI.groupId;

  const filteredLessons = (lessons: LessonOverview[]) => {
    return lessons?.filter(lesson => lesson.team_id !== goswimGroupId && lesson.name);
  };

  const reviewServiceData: any = (reviewData && destructor(reviewData)) || [];

  return (
    (reviewServiceData &&
      reviewServiceData?.length > 0 &&
      reviewServiceData?.map((data: any) => {
        if (data?.type === 'Sets') {
          const workoutData: WorkoutOverviewDocument = data;
          return {
            id: workoutData._id,
            start: moment(workoutData.scheduled_datetime).format(),
            end: moment(workoutData.scheduled_datetime)
              .add(1, 'days')
              .format(),
            allDay: true,
            title: workoutData.workout_name,
            description: workoutData.workout_text,
            editable: false,
            type: 'Sets'
          };
        } else if (data?.type === 'Review') {
          const reviewData: ReviewServiceDocument = data;
          const isBooked = reviewData.availableSlots !== reviewData.slots;
          return {
            id: reviewData.serviceReviewId,
            start: moment(reviewData.startDate).format(),
            end: moment(reviewData.endDate)
              .add(1, 'days')
              .format(),
            allDay: true,
            title: reviewData.service,
            description: reviewData.description,
            editable: isEditable ? !isBooked : false,
            type: 'Review'
          };
        } else if (data?.type === 'Lesson') {
          const lessonData: ScheduleLessonService = data;
          const startDate = moment(
            moment(lessonData.schedule_on_timestamp).format('DD-MM-yyyy'),
            'DD-MM-yyyy'
          );
          return {
            title: lessonData.name,
            lessonId: lessonData.lesson_id,
            id: lessonData._id,
            team_id: lessonData.team_id,
            thumbnailUrl: lessonData.thumbnail,
            editable: true,
            type: 'Lesson',
            start: startDate.format(),
            end: startDate.add(1, 'days').format()
          };
        } else {
          const lessonData: LessonServiceDocument = data;
          return {
            title: lessonData.name,
            description: lessonData.description,
            editable: false,
            type: 'Lesson',
            allDay: true,
            start: moment(lessonData.lessonDate).format(),
            end: moment(lessonData.lessonDate)
              .add(1, 'days')
              .format(),
            serviceId: lessonData.serviceId,
            slots: lessonData.slots
          };
        }
      })) ||
    []
  );
};

// Check Mobile view

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return width <= 960;
};

const CalendarView: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dropId, setDropID] = useState('');
  const {
    reviewData,
    role,
    settings,
    selectedTeam,
    isLoading,
    isDeleted,
    isUpdateFailed,
    currentSelectedTeamManagement,
    lessonScheduledUpdated
  } = useSelector(state => {
    return {
      reviewData: state.scheduleOverview.data,
      role: state.account.user?.role,
      settings: state.account.settings,
      selectedTeam: state.members.currentSelectedTeam,
      isLoading: state.scheduleOverview.isLoading,
      isDeleted: state.lessonDetails.isDeleted,
      isUpdateFailed: state.lessonDetails.isUpdateFailed,
      currentSelectedTeamManagement: state.members.currentSelectedTeamManagement,
      lessonScheduledUpdated: state.lessonDetails.lessonScheduledUpdated
    };
  });
  const timeZone = useSelector(state => state.account.settings.timeZone);
  const isEditable =
    (role === AccountType.COACH || role === AccountType.ADMIN) && !isLoading ? true : false;
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  const [date, setDate] = useState(moment().toDate());
  let today = moment();
  const dateRange = { start: moment(today).format('YYYY-MM-DD') };
  const [month, setMonth] = useState(date);
  const [view, setView] = useState<string>(useCheckMobileScreen() ? 'listWeek' : 'dayGridMonth');
  const [isDeleteEditModalOpen, setIsDeleteEditModalOpen] = useState(false);
  const [isInformationDialogOpen, setIsInformationDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);
  let detectScreen = useCheckMobileScreen();
  const calendarRef = useRef<FullCalendar>(null);
  const selectedReviewEventeRef = useRef<ReviewServiceDocument | null>();
  const selectedSetEventeRef = useRef<WorkoutOverviewDocument | null>();
  const [lessonIds, setLessonIds] = useState<LessonServiceIds | null>(null);
  const [reviewIds, setReviewIds] = useState<ReviewServiceIds[] | null>(null);
  const [workoutId, setWorkoutId] = useState<string | null>(null);
  let [lesson, setLesson] = useState<ScheduleLessonService | null>(null);
  const [scheduledLesson, setScheduledLesson] = useState<any>({});
  const [lessonExist, setLessonExist] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const review = useMemo(() => {
    return calendarEventHandler(reviewData, isEditable);
  }, [reviewData, isEditable]);

  const dispatchGetScheduleOverview = async (isDragged?: boolean) => {
    try {
      const startDate = moment(month)
        .startOf('month')
        .valueOf();
      const endDate = moment(month)
        .endOf('month')
        .valueOf();
        dispatch(
          getScheduleOverview({
            startDate,
            endDate,
            role: true,
            teamId: selectedTeam === 'ALL' ? '' : selectedTeam,
            isDragged: isDragged
          })
        ); // old - role: isEditable
    } catch (ex) {
      throw ex;
    }
  };

  useEffect(() => {
    if (view) {
      dispatchGetScheduleOverview();
      setInitialRender(false);
      setDropID('');
    }
  }, [month, dispatch, selectedTeam, view]); //eslint-disable-line

  useEffect(() => {
    if ((isUpdateFailed || isDeleted) && !initialRender) {
      dispatchGetScheduleOverview(true);
      setDropID('');
    }
  }, [isUpdateFailed, isDeleted]);

  useEffect(() => {
    if (currentSelectedTeamManagement && lessonScheduledUpdated) {
      dispatchGetScheduleOverview();
    }
  }, [currentSelectedTeamManagement]);

  useEffect(() => {
    dispatch(getTeamHeirarchy());
  }, []);

  useEffect(() => {
    if (detectScreen) {
      setView('listWeek');
    } else {
      setView('dayGridMonth');
    }
  }, [mobileDevice]);

  const closeExistingModal = () => {
    setLessonExist(false);
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      const selectedDate = calendarApi.getDate();
      const selectedMonth = moment(selectedDate)
        .startOf('month')
        .format('M');
      setDate(selectedDate);

      if (
        selectedMonth !==
        moment(month)
          .startOf('month')
          .format('M')
      ) {
        setMonth(selectedDate);
      }
    }
  };

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
      const selectedDate = calendarApi.getDate();
      const selectedMonth = moment(selectedDate)
        .startOf('month')
        .format('M');
      setDate(selectedDate);
      if (
        selectedMonth !==
        moment(month)
          .startOf('month')
          .format('M')
      ) {
        setMonth(selectedDate);
      }
    }
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      const selectedDate = calendarApi.getDate();
      const selectedMonth = moment(selectedDate)
        .startOf('month')
        .format('M');
      setDate(selectedDate);
      if (
        selectedMonth !==
        moment(month)
          .startOf('month')
          .format('M')
      ) {
        setMonth(selectedDate);
      }
    }
  };

  const handleEventSelect = (arg: Arg) => {
    let scheduleDate = moment(arg.event.start).valueOf();
    let scheduleDateEnd = moment(arg.event.end).valueOf();

    let todayInMilliSec = moment(today)
      .startOf('day')
      .valueOf();
    if (role === AccountType.SWIMMER) {
      router.push(`/lessons/${arg.event.extendedProps.lessonId}`);
    } else if (scheduleDate && scheduleDate < todayInMilliSec) {
      return false;
    } else {
      if (arg.event.extendedProps.type === 'Review') {
        const event =
          reviewData?.reviews && reviewData?.reviews.find(e => e.serviceReviewId === arg.event.id);
        event?.serviceReviewId &&
          event?.serviceId &&
          setReviewIds([
            {
              serviceReviewId: event!.serviceReviewId,
              serviceId: event!.serviceId
            }
          ]);
        selectedReviewEventeRef.current = event;
      } else if (arg.event.extendedProps.type === 'Sets') {
        const event =
          reviewData?.workouts && reviewData?.workouts.find(e => e._id === arg.event.id);
        const id = event?._id || null;
        setWorkoutId(id);
        selectedSetEventeRef.current = event;
      } else {
        const event =
          reviewData?.lessons &&
          reviewData?.lessons.find(lesson => {
            if (
              lesson.lesson_id === arg.event.extendedProps.lessonId &&
              lesson.team_id === arg.event.extendedProps.team_id &&
              lesson.schedule_on_timestamp >= scheduleDate &&
              lesson.schedule_on_timestamp < scheduleDateEnd // end date should not be <= because calender gives the end date as next date midnight 00 AM
            )
              return true;
          });
        if (event && event.team_id) {
          dispatch(
            setMembersDropDownSelectedTeamCalendar({
              arrayOfSelectedTeams: [event!.team_id!],
              selectedTeam: event.team_id!
            })
          );
          setLesson(event);
          setOpen(true);
        }
      }
    }
  };

  const handleEventResize = (arg: EventResizeArg) => {
    dispatch(
      updateScheduledReview(
        {
          startDate: moment(arg.event.start, settings.dateFormat)
            .startOf('day')
            .valueOf(),
          endDate: moment(arg.event.end, settings.dateFormat)
            .subtract(1, 'd')
            .endOf('day')
            .valueOf()
        },
        arg.event.id
      )
    );
    dispatchGetScheduleOverview();
  };
  const handleEventDrop = (arg: EventDropArg) => {
    let timeStamp = arg.event.start?.getTime();
    let teamId = arg.event._def.extendedProps.team_id;
    let lessonId = arg.event._def.extendedProps.lessonId;
    let findExistingSchedule = reviewData?.lessons?.filter(
      lesson =>
        lesson.schedule_on_timestamp === timeStamp &&
        lesson.team_id === teamId &&
        lesson.lesson_id === lessonId
    );
    let scheduleReq: UpdateScheduleRequestObj = {
      lesson_id: arg.event._def.extendedProps.lessonId,
      _id: arg.event._def.publicId,
      schedule_on_timestamp: arg.event.start?.getTime(),
      team_id: arg.event._def.extendedProps.team_id,
      tz: timeZone,
      isDragged: true
    };
    setDropID(arg.event._def.publicId);
    if (findExistingSchedule && findExistingSchedule?.length > 0) {
      setScheduledLesson(findExistingSchedule?.[0]);
      setLessonExist(true);
      arg.revert();
    } else {
      dispatch(updateOverViewItem(scheduleReq));
      dispatch(updateScheduleLesson(scheduleReq));
    }
  };

  const handleModalClose = () => {
    setLessonIds(null);
    setWorkoutId(null);
    setReviewIds(null);
    lesson = null;
    selectedSetEventeRef.current = null;
    selectedReviewEventeRef.current = null;
  };
  //Changes

  const dialogJsx = () => {
    let confirmationJsx: JSX.Element | null = null;
    switch (dialogContent?.type) {
      case 'Review': {
        if (reviewIds && reviewIds.length) {
          confirmationJsx = (
            <Dialog<ReviewServiceIds[]>
              type={DialogType.CONFIRMATION}
              title={dialogContent.title}
              values={reviewIds}
              open={isDeleteEditModalOpen}
              handleCloseDialog={() => setIsDeleteEditModalOpen(false)}
              handleYes={async ids => {
                setIsDeleteEditModalOpen(false);
                handleModalClose();
                await dispatch(deleteReviewServices(ids));
                dispatchGetScheduleOverview();
                setDialogContent(null);
              }}
              handleNo={() => {
                setIsDeleteEditModalOpen(false);
                setDialogContent(null);
              }}
            >
              <Typography>{dialogContent.description} </Typography>
            </Dialog>
          );
        }
        break;
      }
      case 'Lesson': {
        if (lessonIds) {
          confirmationJsx = (
            <Dialog<LessonServiceIds>
              type={DialogType.CONFIRMATION}
              title={dialogContent.title}
              values={lessonIds}
              open={isDeleteEditModalOpen}
              handleCloseDialog={() => setIsDeleteEditModalOpen(false)}
              handleYes={async ids => {
                setIsDeleteEditModalOpen(false);
                handleModalClose();
                await dispatch(deleteLessonServices(ids));
                dispatchGetScheduleOverview();
                setDialogContent(null);
              }}
              handleNo={() => {
                setIsDeleteEditModalOpen(false);
                setDialogContent(null);
              }}
            >
              <Typography>{dialogContent.description} </Typography>
            </Dialog>
          );
        }
        break;
      }
      case 'Set': {
        if (workoutId) {
          confirmationJsx = (
            <Dialog<string>
              type={DialogType.CONFIRMATION}
              title={dialogContent.title}
              values={workoutId}
              open={isDeleteEditModalOpen}
              handleCloseDialog={() => setIsDeleteEditModalOpen(false)}
              handleYes={async ids => {
                setIsDeleteEditModalOpen(false);
                handleModalClose();
                await dispatch(deleteWorkout(ids as string));
                dispatchGetScheduleOverview();
                setDialogContent(null);
              }}
              handleNo={() => {
                setIsDeleteEditModalOpen(false);
                setDialogContent(null);
              }}
            >
              <Typography>{dialogContent.description} </Typography>
            </Dialog>
          );
        }
        break;
      }

      default:
        break;
    }
    return confirmationJsx;
  };

  const handleEventRender = (
    event: EventApi,
    el: HTMLElement,
    calendarView: View,
    isEventRender: boolean
  ) => {
    const isSets = event?.extendedProps?.type === 'Sets';
    const isReview = event?.extendedProps?.type === 'Review';
    const EventIcon = isSets
      ? PlaylistPlayIcon
      : isReview
        ? VideoLibraryOutlinedIcon
        : PlayCircleOutlineIcon;
    const eventTitle = isSets ? 'Workout' : isReview ? 'Video Review' : 'Lesson';
    const eventClass = isSets ? 'setIcon' : isReview ? 'vrIcon' : 'lvIcon';
    const className = `cldr-event-type-${isSets ? 'set' : isReview ? 'vr' : 'lv'}`;
    el.classList.add(className);
    if (calendarView.type !== 'listWeek') {
      const content = (isEventRender && (
        <TooltipComponent title={eventTitle}>
          <Box display="flex" alignItems="center" id="external-events">
            <Box
              component="span"
              className={classes.titleText}
              fontWeight={500}
              color="textSecondary"
            >
              {event.title}
            </Box>
          </Box>
        </TooltipComponent>
      )) || (
          <Box display="flex" alignItems="center" id="external-events">
            <EventIcon className={classes.tagContent} />
            <Box component="span" className={classes.titleText} fontWeight={500}>
              {event.title}
            </Box>
          </Box>
        );
      ReactDOM.render(content, el.querySelector('.fc-title'));
    } else {
      const content = <EventIcon className={classes[eventClass]} />;
      ReactDOM.render(content, el.querySelector('[class*=-marker]'));
    }
    return el;
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const getScheduleProps = () => {
    const prop: GetScheduleProps = {
      lessonID: lesson?.lesson_id,
      lessonData: lesson,
      openDialog: open,
      lessonTitle: lesson?.name,
      addEditToggle: 'Edit'
    };
    return prop;
  };

  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Container>
        <Box>
          <Typography variant="h1" className={classes.PageTitle}>
            Calendar
          </Typography>
          <Typography className={classes.cardText} variant="h6" gutterBottom>
            This summary page shows all videos shared by your coach and GoSwim
          </Typography>
        </Box>
        <Toolbar
          date={date}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
          view={view}
          type={'calendar'}
        />
        {true ? (
          <Paper className={classes.calendar} component={Box}>
            {isLoading && <LinearProgress />}
            <FullCalendar
              allDayMaintainDuration
              defaultDate={date}
              defaultView={view}
              editable={isEditable}
              droppable={false}
              plugins={
                isEditable
                  ? [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, timelinePlugin]
                  : [dayGridPlugin, timeGridPlugin, listPlugin, timelinePlugin]
              }
              ref={calendarRef}
              weekends
              events={review}
              noEventsMessage={'No data found'}
              header={
                view === 'listWeek'
                  ? {
                    left: 'title',
                    center: '',
                    right: ''
                  }
                  : false
              }
              eventLimit={3}
              height={900}
              eventRender={(arg: Parameters<NonNullable<OptionsInputBase['eventRender']>>[0]) => {
                if (!lesson && !open && dropId === '') {
                  handleEventRender(arg.event, arg.el, arg.view, true);
                } else if (!lesson && !open && dropId === arg.event._def.publicId) {
                  handleEventRender(arg.event, arg.el, arg.view, true);
                }
              }}
              eventDestroy={(arg: Parameters<NonNullable<OptionsInputBase['eventDestroy']>>[0]) => {
                if (!lesson && !open && dropId === '') {
                  handleEventRender(arg.event, arg.el, arg.view, true);
                } else if (!lesson && !open && dropId === arg.event._def.publicId) {
                  handleEventRender(arg.event, arg.el, arg.view, true);
                }
              }}
              eventResizableFromStart
              eventResize={handleEventResize}
              eventClick={handleEventSelect}
              eventDrop={handleEventDrop}
              eventConstraint={dateRange}
            />
          </Paper>
        ) : (
          <Paper className={classes.calendar} component={Box}>
            <LinearProgress />
          </Paper>
        )}
        {isInformationDialogOpen && dialogContent && (
          <Dialog
            type={DialogType.INFORMATION}
            open={isInformationDialogOpen}
            title={dialogContent.title}
            handleCloseDialog={() => {
              setIsInformationDialogOpen(false);
              setDialogContent(null);
            }}
            handleCloseInformation={() => {
              setIsInformationDialogOpen(false);
              setDialogContent(null);
            }}
          >
            <Typography>{dialogContent.description}</Typography>
          </Dialog>
        )}
        {isDeleteEditModalOpen && dialogContent && dialogJsx()}
        {<ScheduleLesson data={getScheduleProps()} closeClicked={handleClickClose} />}
        <MuiDialog open={lessonExist} onClose={closeExistingModal}>
          <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
            Lesson Already Exist
          </DialogTitle>
          <DialogContent className={classes.modalDesc}>
            <InfoOutlinedIcon className={classes.infoIcon} />
            <DialogContentText id="alert-dialog-description">
              <p>
                Lesson <b>{scheduledLesson?.name}</b> is already schduled on{' '}
                {moment(scheduledLesson?.schedule_on_timestamp).format('DD/MM/YYYY')}.
              </p>
            </DialogContentText>
          </DialogContent>
        </MuiDialog>
      </Container>
    </Slide>
  );
};

export default CalendarView;
