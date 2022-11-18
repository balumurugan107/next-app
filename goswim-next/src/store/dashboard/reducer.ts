/* eslint-disable no-param-reassign */
import produce from 'immer';
import moment from 'moment';
import {
  SET_DATA_REQUEST,
  SET_DATA_RESPONSE,
  SET_DATA_REQUEST_FAILURE,
  VIDEO_REVIEW_STAT_REQUEST,
  VIDEO_REVIEW_STAT_RESPONSE,
  VIDEO_REVIEW_STAT_REQUEST_FAILURE,
  VIDEO_REVIEW_REQUEST,
  VIDEO_REVIEW_FAILURE,
  DashboardActionType,
  DashboardState
} from 'src/store/dashboard/';
import {
  BOOKING_HISTORY_FAILURE,
  BOOKING_HISTORY_REQUEST,
  BOOKING_HISTORY_RESPONSE,
  LiveLessons,
  LIVE_LESSONS_HISTORY_FAILURE,
  LIVE_LESSONS_HISTORY_REQUEST,
  LIVE_LESSONS_HISTORY_RESPONSE,
  LIVE_LESSONS_STAT_FAILURE,
  LIVE_LESSONS_STAT_REQUEST,
  LIVE_LESSONS_STAT_RESPONSE,
  SET_FILTER_VALUES,
  UPDATE_FILTER,
  VideoReview,
  VIDEO_REVIEW_RESPONSE,
  WORKOUT_HUD_DATE_UPDATE
} from 'src/store/dashboard/types';

const initialState: DashboardState = {
  workouts: {
    isSetsDataLoading: false,
    setsData: null,
    error: null,
    dateRange: {
      role: '',
      fromDate: moment().valueOf(),
      toDate: 0,
      period: '',
      periodShift: 0
    },
    hudDate: {
      from: moment()
        .clone()
        .startOf('isoWeek')
        .valueOf(),
      to: moment()
        .clone()
        .endOf('isoWeek')
        .valueOf()
    },
    activeSwimmer: null,
    activeTeam: null,
    activeRoster: null,
    activeRosterList: null,
    activeSwimmerList: null,
    availableTeams: null,
    totalRosters: null
  },
  videoReviewStat: {
    isFetching: false,
    data: null,
    error: null
  },
  videoReview: {
    videoReviewList: null,
    error: null,
    isFetching: false,
    dateRange: {
      role: '',
      fromDate: 0,
      toDate: 0,
      period: ''
    }
  },
  bookingHistory: {
    isFetching: false,
    data: null,
    error: null
  },
  liveLessonsStat: {
    isFetching: false,
    data: null,
    error: null
  }
};

export const dashboardReducer = (state = initialState, action: DashboardActionType) => {
  switch (action.type) {
    case SET_DATA_REQUEST: {
      return produce(state, draft => {
        draft.workouts.isSetsDataLoading = true;
        draft.workouts.dateRange = action.params;
      });
    }
    case SET_DATA_RESPONSE: {
      return produce(state, draft => {
        draft.workouts.isSetsDataLoading = false;
        draft.workouts.setsData = action.payload.data;
      });
    }
    case SET_DATA_REQUEST_FAILURE: {
      return produce(state, draft => {
        draft.workouts.isSetsDataLoading = false;
        draft.workouts.error = action.error;
      });
    }
    case VIDEO_REVIEW_STAT_REQUEST: {
      return produce(state, draft => {
        draft.videoReviewStat.isFetching = true;
      });
    }
    case VIDEO_REVIEW_STAT_RESPONSE: {
      return produce(state, draft => {
        draft.videoReviewStat.isFetching = false;
        draft.videoReviewStat.data = action.payload.data;
      });
    }
    case VIDEO_REVIEW_STAT_REQUEST_FAILURE: {
      return produce(state, draft => {
        draft.videoReviewStat.isFetching = false;
        draft.videoReviewStat.error = action.error;
      });
    }
    case VIDEO_REVIEW_REQUEST: {
      return produce(state, draft => {
        draft.videoReview.isFetching = true;
        draft.videoReview.dateRange = action.params;
      });
    }
    case VIDEO_REVIEW_FAILURE: {
      return produce(state, draft => {
        draft.videoReview.isFetching = false;
        draft.videoReview.error = action.error;
      });
    }
    case VIDEO_REVIEW_RESPONSE: {
      return produce(state, draft => {
        draft.videoReview.isFetching = false;
        let data;
        if (state.videoReview.dateRange.status === 'videoReview') {
          data = action.payload.data as VideoReview[];
          data.sort((f, s) => new Date(s.startDate).valueOf() - new Date(f.startDate).valueOf());
        } else {
          data = action.payload.data as LiveLessons[];
          data.sort((f, s) => new Date(s.lessonDate).valueOf() - new Date(f.lessonDate).valueOf());
        }
        draft.videoReview.videoReviewList = data;
      });
    }
    case SET_FILTER_VALUES: {
      return produce(state, draft => {
        draft.workouts.availableTeams = action.teams;
        draft.workouts.totalRosters = action.rosters;
        if (action.teams.length > 0 && action.rosters.length > 0) {
          const presentActiveTeam =
            action.teams.find(team => team.id === state.workouts.activeTeam?.id) || action.teams[0];
          const presentRoster = state.workouts.activeRoster;
          const presentSwimmer = state.workouts.activeSwimmer;
          const activeRosterList =
            action.rosters.find(it => it.teamId === presentActiveTeam?.id)?.rosterGroups ||
            action.rosters.find(it => it.teamId === action.teams[0].id)?.rosterGroups ||
            [];
          const activeRoster =
            activeRosterList.find(it => it.id === presentRoster?.id) || activeRosterList[0] || null;
          const activeSwimmerList = activeRoster.swimmers || [];
          const activeSwimmer =
            activeSwimmerList.find(it => it.id === presentSwimmer?.id) ||
            activeRoster.swimmers[0] ||
            null;
          draft.workouts.activeTeam = presentActiveTeam;
          draft.workouts.activeRosterList = activeRosterList || null;
          draft.workouts.activeRoster = activeRoster || null;
          draft.workouts.activeSwimmerList = activeSwimmerList;
          draft.workouts.activeSwimmer = activeSwimmer;
        }
      });
    }
    case UPDATE_FILTER: {
      return produce(state, draft => {
        if (action.filterType === 'Team') {
          const activeRosterList =
            state.workouts.totalRosters?.find(it => it.teamId === action.id)?.rosterGroups || [];
          const activeRoster = activeRosterList[0] || null;
          const activeSwimmerList = activeRoster?.swimmers || [];
          const activeSwimmer = activeRoster?.swimmers[0] || null;
          draft.workouts.activeTeam =
            state.workouts.availableTeams?.find(it => it.id === action.id) || null;
          draft.workouts.activeRosterList = activeRosterList;
          draft.workouts.activeRoster = activeRoster;
          draft.workouts.activeSwimmerList = activeSwimmerList;
          draft.workouts.activeSwimmer = activeSwimmer;
        } else if (action.filterType === 'Roster') {
          const activeRoster =
            state.workouts.activeRosterList?.find(it => it.id === action.id) || null;
          const activeSwimmerList = activeRoster?.swimmers || [];
          const activeSwimmer = activeRoster?.swimmers[0] || null;
          draft.workouts.activeRoster = activeRoster;
          draft.workouts.activeSwimmerList = activeSwimmerList;
          draft.workouts.activeSwimmer = activeSwimmer;
        } else {
          draft.workouts.activeSwimmer =
            state.workouts.activeSwimmerList?.find(it => it.id === action.id) || null;
        }
      });
    }
    case BOOKING_HISTORY_REQUEST: {
      return produce(state, draft => {
        draft.bookingHistory.isFetching = true;
      });
    }
    case BOOKING_HISTORY_RESPONSE: {
      return produce(state, draft => {
        draft.bookingHistory.isFetching = false;
        draft.bookingHistory.data = action.payload.data;
      });
    }
    case BOOKING_HISTORY_FAILURE: {
      return produce(state, draft => {
        draft.bookingHistory.isFetching = false;
        draft.bookingHistory.error = action.error;
      });
    }
    case LIVE_LESSONS_STAT_REQUEST: {
      return produce(state, draft => {
        draft.liveLessonsStat.isFetching = true;
      });
    }
    case LIVE_LESSONS_STAT_RESPONSE: {
      return produce(state, draft => {
        draft.liveLessonsStat.isFetching = false;
        draft.liveLessonsStat.data = action.payload.data;
      });
    }
    case LIVE_LESSONS_STAT_FAILURE: {
      return produce(state, draft => {
        draft.liveLessonsStat.error = action.error;
      });
    }
    case LIVE_LESSONS_HISTORY_REQUEST: {
      return produce(state, draft => {
        draft.bookingHistory.isFetching = true;
      });
    }
    case LIVE_LESSONS_HISTORY_RESPONSE: {
      return produce(state, draft => {
        draft.bookingHistory.isFetching = false;
        draft.bookingHistory.data = action.payload.data;
      });
    }
    case LIVE_LESSONS_HISTORY_FAILURE: {
      return produce(state, draft => {
        draft.bookingHistory.isFetching = false;
        draft.bookingHistory.error = action.error;
      });
    }

    case WORKOUT_HUD_DATE_UPDATE: {
      const { from, to } = action.payload;
      return produce(state, draft => {
        draft.workouts.hudDate.from = from;
        draft.workouts.hudDate.to = to;
      });
    }

    default: {
      return state;
    }
  }
};
