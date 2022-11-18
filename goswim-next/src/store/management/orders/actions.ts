/* eslint-disable no-console */
import { Dispatch } from 'redux';
import { OrdersInstance } from 'src/services/orders';
import {
  GetBookingListRequest,
  GET_BOOKING_LIST_REQUEST,
  GetBookingListSuccess,
  GET_BOOKING_LIST_SUCCESS,
  GetBookingListFailure,
  GET_BOOKING_LIST_FAILURE,
  BookingParams,
  CURRENT_TIME_UPDATE,
  UpdateCurrentTime,
  UpdateCurrentServiceType,
  CURRENT_SERVICE_TYPE_UPDATE,
  OrdersDetailsViewOption,
  SetOrdersDetailsViewOption,
  SET_ORDERS_DETAILS_VIEW_OPTION,
  UpdateSwimmerBookingRatingRequest,
  UPDATE_SWIMMER_BOOKING_RATING_REQUEST,
  UpdateSwimmerBookingRatingSuccess,
  UPDATE_SWIMMER_BOOKING_RATING_SUCCESS,
  UpdateSwimmerBookingRatingFailure,
  UPDATE_SWIMMER_BOOKING_RATING_FAILURE,
  RatingParams,
  ServiceType,
  GET_BOOKINGS_LIST_REQUEST,
  GET_BOOKINGS_LIST_SUCCESS,
  GetBookingsListRequest,
  GetBookingsListSuccess,
  GetBookingsListFailure,
  GET_BOOKINGS_LIST_FAILURE
} from 'src/store/management/orders/types';
import { initialODVO } from 'src/store/management/orders/reducer';

export const getExpertBookingLists = (payload: BookingParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetBookingListRequest>({ type: GET_BOOKING_LIST_REQUEST });

      const response = await OrdersInstance.getExpertBookingList(payload);

      dispatch<GetBookingListSuccess>({
        type: GET_BOOKING_LIST_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetBookingListFailure>({ type: GET_BOOKING_LIST_FAILURE, error });
    }
  };
};
export const getSwimmerBookingLists = (payload: BookingParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetBookingListRequest>({ type: GET_BOOKING_LIST_REQUEST });

      const response = await OrdersInstance.getSwimmerBookingList(payload);

      dispatch<GetBookingListSuccess>({
        type: GET_BOOKING_LIST_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetBookingListFailure>({ type: GET_BOOKING_LIST_FAILURE, error });
    }
  };
};

export const getBookingLists = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetBookingsListRequest>({ type: GET_BOOKINGS_LIST_REQUEST });

      const response = await OrdersInstance.getBookingList();

      dispatch<GetBookingsListSuccess>({
        type: GET_BOOKINGS_LIST_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetBookingsListFailure>({ type: GET_BOOKINGS_LIST_FAILURE, error });
    }
  };
};
export const updateCurrentTime = (payload: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateCurrentTime>({
        type: CURRENT_TIME_UPDATE,
        payload: payload
      });
    } catch (error) {
      dispatch<GetBookingListFailure>({ type: GET_BOOKING_LIST_FAILURE, error });
    }
  };
};
export const updateRatings = (payload: RatingParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateSwimmerBookingRatingRequest>({
        type: UPDATE_SWIMMER_BOOKING_RATING_REQUEST
      });
      const response = await OrdersInstance.updateSwimmerBookingRating(payload);
      dispatch<UpdateSwimmerBookingRatingSuccess>({
        type: UPDATE_SWIMMER_BOOKING_RATING_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UpdateSwimmerBookingRatingFailure>({
        type: UPDATE_SWIMMER_BOOKING_RATING_FAILURE,
        error
      });
    }
  };
};
export const updateCurrentServiceType = (payload: ServiceType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateCurrentServiceType>({
        type: CURRENT_SERVICE_TYPE_UPDATE,
        payload: payload
      });
    } catch (error) {
      dispatch<GetBookingListFailure>({ type: GET_BOOKING_LIST_FAILURE, error });
    }
  };
};
export const setOrdersDetailsViewOptions = (options?: OrdersDetailsViewOption) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<SetOrdersDetailsViewOption>({
      type: SET_ORDERS_DETAILS_VIEW_OPTION,
      payload: (options && { ...options }) || { ...initialODVO }
    });
  } catch (error) {
    console.error(`setOrders-->${error}`);
  }
};
