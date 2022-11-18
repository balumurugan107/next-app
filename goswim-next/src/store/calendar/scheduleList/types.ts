import { HTTPResponse, HTTPErrorResponse } from 'src/types';
import { AxiosError } from 'axios';

export interface ScheduleListState {
  isLoading: boolean;
  error: Error | null;
  data: ScheduleListData[];
}

export const GET_SCHEDULE_LIST_REQUEST = '@calendar/get-schedule-list-request';
export const GET_SCHEDULE_LIST_SUCCESS = '@calendar/get-schedule-list-success';
export const GET_SCHEDULE_LIST_FAILURE = '@calendar/get-schedule-list-failure';

export interface GetScheduleListRequest {
  type: typeof GET_SCHEDULE_LIST_REQUEST;
}
export interface GetScheduleListSuccess {
  type: typeof GET_SCHEDULE_LIST_SUCCESS;
  payload: HTTPResponse<ScheduleListData[]>;
}
export interface GetScheduleListFailure {
  type: typeof GET_SCHEDULE_LIST_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export interface ScheduleListData {
  _id: string;
  lesson_id: string;
  lesson_name: string;
  message: string;
  schedule_on_timestamp: number;
}

export interface ScheduleGetQueryParams {
  team_id: string;
  from: number;
  to: number;
}

export type GetScheduleListTypes =
  | GetScheduleListRequest
  | GetScheduleListSuccess
  | GetScheduleListFailure;
