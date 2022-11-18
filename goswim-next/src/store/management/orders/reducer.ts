/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  BookingActionType,
  GET_BOOKING_LIST_REQUEST,
  BookingState,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_LIST_FAILURE,
  CURRENT_TIME_UPDATE,
  CURRENT_SERVICE_TYPE_UPDATE,
  SET_ORDERS_DETAILS_VIEW_OPTION,
  UPDATE_SWIMMER_BOOKING_RATING_REQUEST,
  UPDATE_SWIMMER_BOOKING_RATING_SUCCESS,
  UPDATE_SWIMMER_BOOKING_RATING_FAILURE,
  GET_BOOKINGS_LIST_REQUEST,
  GET_BOOKINGS_LIST_SUCCESS,
  GET_BOOKINGS_LIST_FAILURE
} from 'src/store/management/orders/types';

export const initialODVO = {
  page: 0,
  limit: 20,
  query: ''
};
const initialState: BookingState = {
  isLoading: false,
  error: null,
  bookingData: null,
  bookingsData: null,
  time: 'upcoming',
  service_type: 'Review',
  ratings: 0,
  ordersDetailsViewOption: {
    ...initialODVO
  }
};

export const ordersReducer = (state = initialState, action: BookingActionType) => {
  switch (action.type) {
    case GET_BOOKING_LIST_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.bookingData = null;
      });
    }
    case GET_BOOKING_LIST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.bookingData = action.payload.data;
      });
    }
    case GET_BOOKING_LIST_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case GET_BOOKINGS_LIST_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.bookingsData = null;
      });
    }
    case GET_BOOKINGS_LIST_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.bookingsData = action.payload.data;
      });
    }
    case GET_BOOKINGS_LIST_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }
    case UPDATE_SWIMMER_BOOKING_RATING_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case UPDATE_SWIMMER_BOOKING_RATING_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.ratings = action.payload.data.swimmer_rating;
      });
    }
    case UPDATE_SWIMMER_BOOKING_RATING_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }
    case CURRENT_TIME_UPDATE: {
      return produce(state, draft => {
        draft.time = action.payload;
      });
    }
    case CURRENT_SERVICE_TYPE_UPDATE: {
      return produce(state, draft => {
        draft.service_type = action.payload;
      });
    }
    case SET_ORDERS_DETAILS_VIEW_OPTION: {
      return produce(state, draft => {
        draft.ordersDetailsViewOption = action.payload;
        draft.error = null;
      });
    }
    default: {
      return state;
    }
  }
};
