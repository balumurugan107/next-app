/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_OVERVIEW_DATA_REQUEST,
  GET_OVERVIEW_DATA_DRAG_REQUEST,
  GET_OVERVIEW_DATA_SUCCESS,
  GET_OVERVIEW_DATA_FAILURE,
  GetScheduleOverviewTypes,
  ScheduleOverviewState,
  UPDATE_OVERVIEW_DATA,
  ScheduleOverviewData
} from 'src/store/calendar/scheduleOverview';

const initialState: ScheduleOverviewState = {
  isLoading: false,
  error: null,
  data: null
};

export const scheduleOverviewReducer = (state = initialState, action: GetScheduleOverviewTypes) => {
  switch (action.type) {
    case GET_OVERVIEW_DATA_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case GET_OVERVIEW_DATA_DRAG_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case GET_OVERVIEW_DATA_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.data = action.payload.data;
      });
    }

    case UPDATE_OVERVIEW_DATA: {
      return produce(state, draft => {
        draft.isLoading = false;
        const lessons = state.data?.lessons?.map(lesson => {
          if (lesson._id === action.payload._id) {
            return {
              ...lesson,
              schedule_on_timestamp: action.payload.schedule_on_timestamp
                ? action.payload.schedule_on_timestamp
                : lesson.schedule_on_timestamp
            };
          }
          return lesson;
        });
        const data: ScheduleOverviewData = {
          reviews: [],
          lessons: lessons ? lessons : [],
          workouts: []
        };
        draft.data = data;
      });
    }

    case GET_OVERVIEW_DATA_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    default: {
      return state;
    }
  }
};
