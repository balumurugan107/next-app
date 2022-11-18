/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_SCHEDULE_LIST_REQUEST,
  GET_SCHEDULE_LIST_SUCCESS,
  GET_SCHEDULE_LIST_FAILURE,
  ScheduleListState,
  GetScheduleListTypes
} from 'src/store/calendar/scheduleList/types';

const initialState: ScheduleListState = {
  isLoading: false,
  error: null,
  data: []
};

export const scheduleListReducer = (state = initialState, action: GetScheduleListTypes) => {
  switch (action.type) {
    case GET_SCHEDULE_LIST_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case GET_SCHEDULE_LIST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.data = action.payload.data;
      });
    }
    case GET_SCHEDULE_LIST_FAILURE: {
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
