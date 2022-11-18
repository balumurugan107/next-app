/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  GetLessonBookingActionTypes,
  LessonBookingState,
  GET_LESSON_BOOKING_DATA_REQUEST,
  GET_LESSON_BOOKING_DATA_SUCCESS,
  GET_LESSON_BOOKING_DATA_FAILURE
} from 'src/store/calendar/lesson/types';

const initialState: LessonBookingState = {
  isLoading: false,
  error: null,
  data: []
};

export const lessonBookingReducer = (state = initialState, action: GetLessonBookingActionTypes) => {
  switch (action.type) {
    case GET_LESSON_BOOKING_DATA_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.data = [];
      });
    }
    case GET_LESSON_BOOKING_DATA_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.data = action.payload.data;
      });
    }
    case GET_LESSON_BOOKING_DATA_FAILURE: {
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
