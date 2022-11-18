/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  SubscribersActionActionTypes,
  SubscribersState,
  GET_SUBSCRIBERS_DATA_REQUEST,
  GET_SUBSCRIBERS_DATA_SUCCESS,
  GET_SUBSCRIBERS_DATA_FAILURE
} from 'src/store/calendar/subscribers/types';

const initialState: SubscribersState = {
  isLoading: false,
  error: null,
  data: null
};

export const subscribersReducer = (state = initialState, action: SubscribersActionActionTypes) => {
  switch (action.type) {
    case GET_SUBSCRIBERS_DATA_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.data = null;
      });
    }
    case GET_SUBSCRIBERS_DATA_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.data = action.payload.data;
      });
    }
    case GET_SUBSCRIBERS_DATA_FAILURE: {
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
