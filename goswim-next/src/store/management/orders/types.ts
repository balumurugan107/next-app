import { HTTPResponse } from 'src/types';

export interface BookingState {
  isLoading: boolean;
  error: Error | null;
  bookingData: BookingDocument[] | null;
  bookingsData: BookingsDocument[] | null;
  ordersDetailsViewOption: OrdersDetailsViewOption;
  time: string;
  ratings: number;
  service_type: ServiceType;
}
export type filterType = 'upcoming' | 'completed';
export type ServiceType = 'Review' | 'Lesson';
export interface BookingParams {
  filter: filterType;
  service_type: ServiceType;
}
export interface BookingDocument {
  member_id: string;
  service_name: string;
  service_datetime_utc_timestamp: string;
  service_cost: number;
  name: string;
  email: string;
  team: string;
  profile_picture: string;
  rosterGroup: string[];
  swimmer_rating: number;
}

export interface BookingsDocument {
  _id: string;
  expert_name: string;
  expert_id: string;
  currency: string;
  price: number;
  environment: string;
  store: string;
  services: ServicesDocument[];
  payment_status: string;
  payment_intent_id: string;
  __v: string | number;
  created_at: number;
  customer_id: number;
  status: string;
}

export interface ServicesDocument {
  service_name: string;
  service_id: string;
  _id: string;
  videos: videosDocument[];
  price_usd: number;
  status: string;
  team_id: number;
  team_name: string;
}

export interface videosDocument {
  _id: string;
  lv_guid_id: string;
  status: string;
  created_at: number;
}
export interface RatingParams {
  ratings: number;
  bookingIds: string[];
}

/* Get Booking List */
export const GET_BOOKING_LIST_REQUEST = '@orders/get-booking-list-request';
export const GET_BOOKING_LIST_SUCCESS = '@orders/get-booking-list-success';
export const GET_BOOKING_LIST_FAILURE = '@orders/get-booking-list-failure';

export const GET_BOOKINGS_LIST_REQUEST = '@orders/get-bookings-list-request';
export const GET_BOOKINGS_LIST_SUCCESS = '@orders/get-bookings-list-success';
export const GET_BOOKINGS_LIST_FAILURE = '@orders/get-bookings-list-failure';
export interface GetBookingListRequest {
  type: typeof GET_BOOKING_LIST_REQUEST;
}
export interface GetBookingListSuccess {
  type: typeof GET_BOOKING_LIST_SUCCESS;
  payload: HTTPResponse<BookingDocument[]>;
}
export interface GetBookingListFailure {
  type: typeof GET_BOOKING_LIST_FAILURE;
  error: Error;
}

export type GetBookingListActionTypes =
  | GetBookingsListRequest
  | GetBookingsListSuccess
  | GetBookingsListFailure;

export interface GetBookingsListRequest {
  type: typeof GET_BOOKINGS_LIST_REQUEST;
}
export interface GetBookingsListSuccess {
  type: typeof GET_BOOKINGS_LIST_SUCCESS;
  payload: HTTPResponse<BookingsDocument[]>;
}
export interface GetBookingsListFailure {
  type: typeof GET_BOOKINGS_LIST_FAILURE;
  error: Error;
}

export type GetBookingsListActionTypes =
  | GetBookingListRequest
  | GetBookingListSuccess
  | GetBookingListFailure;
/**
 * update swimmer booking ratings
 */
export const UPDATE_SWIMMER_BOOKING_RATING_REQUEST =
  '@orders/update-swimmer-booking-rating-request';
export const UPDATE_SWIMMER_BOOKING_RATING_SUCCESS =
  '@orders/update-swimmer-booking-rating-success';
export const UPDATE_SWIMMER_BOOKING_RATING_FAILURE =
  '@orders/update-swimmer-booking-rating-failure';
export interface UpdateSwimmerBookingRatingRequest {
  type: typeof UPDATE_SWIMMER_BOOKING_RATING_REQUEST;
}
export interface UpdateSwimmerBookingRatingSuccess {
  type: typeof UPDATE_SWIMMER_BOOKING_RATING_SUCCESS;
  payload: HTTPResponse<BookingDocument>;
}
export interface UpdateSwimmerBookingRatingFailure {
  type: typeof UPDATE_SWIMMER_BOOKING_RATING_FAILURE;
  error: Error;
}
export type UpdateSwimmerBookingratingActionTypes =
  | UpdateSwimmerBookingRatingRequest
  | UpdateSwimmerBookingRatingSuccess
  | UpdateSwimmerBookingRatingFailure;

export const CURRENT_TIME_UPDATE = '@orders/current-time-update';
export const CURRENT_SERVICE_TYPE_UPDATE = '@orders/current-service-type-update';
export interface UpdateCurrentTime {
  type: typeof CURRENT_TIME_UPDATE;
  payload: string;
}
export interface UpdateCurrentServiceType {
  type: typeof CURRENT_SERVICE_TYPE_UPDATE;
  payload: ServiceType;
}
export type UpdateTypes = UpdateCurrentTime | UpdateCurrentServiceType;
export interface OrdersDetailsViewOption {
  page: number;
  limit: number;
  query: string;
}
export const SET_ORDERS_DETAILS_VIEW_OPTION = '@orders/set-orders-details-view-option';

export interface SetOrdersDetailsViewOption {
  type: typeof SET_ORDERS_DETAILS_VIEW_OPTION;
  payload: OrdersDetailsViewOption;
}
export type BookingActionType =
  | GetBookingListActionTypes
  | GetBookingsListActionTypes
  | UpdateSwimmerBookingratingActionTypes
  | UpdateTypes
  | SetOrdersDetailsViewOption;
