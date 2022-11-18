import { HTTPResponse, HTTPErrorResponse } from 'src/types';
import { AxiosError } from 'axios';

export interface BookingDetails {
  review_datetime_utc_timestamp: number;
  videos_count: number;
  swimmer_notes: string;
  member_id: string;
  scheduled_review_id: string;
}
export interface SummarizedDetails {
  _id: string;
  full_name: string;
  roster_group: string[];
  profile_picture: string;
  team_name: string;
  email: string;
  bookingDetails: BookingDetails[];
}

export interface SubscribersData {
  _id: string;
  summarizedDetails: SummarizedDetails[];
}
export interface SubscribersState {
  isLoading: boolean;
  error: Error | null;
  data: SubscribersData | null;
}

export const GET_SUBSCRIBERS_DATA = '@calendar/get-subscribers';
export const GET_SUBSCRIBERS_DATA_REQUEST = '@calendar/get-subscribers-request';
export const GET_SUBSCRIBERS_DATA_SUCCESS = '@calendar/get-subscribers-success';
export const GET_SUBSCRIBERS_DATA_FAILURE = '@calendar/get-subscribers-failure';

export interface GetSubscribersRequest {
  type: typeof GET_SUBSCRIBERS_DATA_REQUEST;
}
export interface GetSubscribersSuccess {
  type: typeof GET_SUBSCRIBERS_DATA_SUCCESS;
  payload: HTTPResponse<SubscribersData>;
}
export interface GetSubscribersFailure {
  type: typeof GET_SUBSCRIBERS_DATA_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetSubscribersActionTypes =
  | GetSubscribersRequest
  | GetSubscribersSuccess
  | GetSubscribersFailure;

export type SubscribersActionActionTypes = GetSubscribersActionTypes;
