import { HTTPResponse, HTTPErrorResponse } from 'src/types';
import { AxiosError } from 'axios';
import { ReviewServiceDocument } from 'src/store/management/service';
import { WorkoutOverviewDocument } from 'src/store/workout';
import { ServiceName } from 'src/constants';
import { UpdateScheduleRequestObj } from 'src/store/management/goswim/lessons/details/types';

export interface ScheduleOverviewData {
  reviews: ReviewServiceDocument[];
  lessons: LessonOverview[];
  workouts: WorkoutOverviewDocument[];
}
export interface ScheduleOverviewState {
  isLoading: boolean;
  error: Error | null;
  data: ScheduleOverviewData | null;
}

export interface OverviewGetQueryParams {
  startDate: number;
  endDate: number;
  role: boolean;
  teamId: string;
  isDragged?: boolean;
}

export interface NotesData {
  service_id: string;
  swimmer_id: string;
  serviceType: ServiceName;
  lesson_date?: number;
  swimmer_notes?: string;
}
export interface LessonOverview extends ScheduleLessonService {
  type: string;
  bookingIds?: string[];
  bookedSlotTime?: number[];
  swimmerRating?: number;
}

export interface ScheduleLessonService {
  lesson_id: string;
  name: string;
  schedule_on_timestamp: number;
  message: string;
  thumbnail: string;
  team_id?: string | undefined;
  type: string;
  _id: string;
}

export const GET_OVERVIEW_DATA = '@calendar/get-video-reviews';
export const GET_OVERVIEW_DATA_REQUEST = '@calendar/get-video-reviews-request';
export const GET_OVERVIEW_DATA_DRAG_REQUEST = '@calendar/get-video-reviews-drag-request';
export const GET_OVERVIEW_DATA_SUCCESS = '@calendar/get-video-reviews-success';
export const GET_OVERVIEW_DATA_FAILURE = '@calendar/get-video-reviews-failure';
export const UPDATE_OVERVIEW_DATA = '@calendar/update-video-reviews';

export interface UpdateOverviewData {
  type: typeof UPDATE_OVERVIEW_DATA;
  payload: UpdateScheduleRequestObj;
}
export interface GetOverviewReviewsRequest {
  type: typeof GET_OVERVIEW_DATA_REQUEST;
}
export interface GetOverviewReviewsDragRequest {
  type: typeof GET_OVERVIEW_DATA_DRAG_REQUEST;
}
export interface GetOverviewReviewsSuccess {
  type: typeof GET_OVERVIEW_DATA_SUCCESS;
  payload: HTTPResponse<ScheduleOverviewData>;
}
export interface GetOverviewReviewsFailure {
  type: typeof GET_OVERVIEW_DATA_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetScheduleOverviewTypes =
  | UpdateOverviewData
  | GetOverviewReviewsRequest
  | GetOverviewReviewsSuccess
  | GetOverviewReviewsFailure
  | GetOverviewReviewsDragRequest;

export const UPDATE_NOTES_REQUEST = '@workout/update-notes-request';
export const UPDATE_NOTES_SUCCESS = '@workout/update-notes-success';
export const UPDATE_NOTES_FAILURE = '@workout/update-notes-failure';
export interface UpdateNotesRequest {
  type: typeof UPDATE_NOTES_REQUEST;
}
export interface UpdateNotesSuccess {
  type: typeof UPDATE_NOTES_SUCCESS;
}
export interface UpdateNotesFailure {
  type: typeof UPDATE_NOTES_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type UpdateNotesActionTypes = UpdateNotesRequest | UpdateNotesSuccess | UpdateNotesFailure;

export type ScheduleOverviewActionTypes = GetScheduleOverviewTypes | UpdateNotesActionTypes;
