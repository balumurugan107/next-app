import { AxiosError } from 'axios';
import { HTTPResponse } from 'src/types';
import LiveLessons from 'src/views/management/Services/MainView/LiveLessons';
import { Slot } from 'src/views/management/Services/MainView/LiveLessons/FormModel';

export interface lessonData {
  id: string;
}
// Data primitive types
export interface SetData {
  _id: string;
  swimmer_id: string;
  swimmer_name: string;
  scheduled_datetime: number;
  scheduled_workouts_id: string;
  set_distance_yard: number;
  set_time_seconds: number;
  roster_group: string[];
  sets_team_id: string;
  team_name: string;
  action_name?: string;
  stroke_name?: string;
  equipment_name?: string;
  intensity_name?: string;
}

export interface WorkoutsState {
  isSetsDataLoading: boolean;
  setsData: SetData[] | null;
  error: AxiosError | null;
  dateRange: SetDataRequestParams;
  activeSwimmer: WorkoutFilter | null;
  activeTeam: WorkoutFilter | null;
  activeRoster: RosterGroupSwimmers | null;
  activeRosterList: RosterGroupSwimmers[] | null;
  activeSwimmerList: WorkoutFilter[] | null;
  availableTeams: WorkoutFilter[] | null;
  totalRosters: RosterFilter[] | null;
  hudDate: HUDParams;
}

export interface VideoReviewStatState {
  isFetching: boolean;
  data: VideoReviewStat[] | null;
  error: AxiosError | null;
}

export interface LiveLessonsStatState {
  isFetching: boolean;
  data: VideoReviewStat[] | null;
  error: AxiosError | null;
}

export interface VideoReviewState {
  videoReviewList: VideoReview[] | LiveLessons[] | null;
  isFetching: boolean;
  error: AxiosError | null;
  dateRange: SetDataRequestParams;
}

export interface BookingHistoryState {
  isFetching: boolean;
  data: BookingHistory[] | null;
  error: AxiosError | null;
}

export interface DashboardState {
  workouts: WorkoutsState;
  videoReviewStat: VideoReviewStatState;
  videoReview: VideoReviewState;
  bookingHistory: BookingHistoryState;
  liveLessonsStat: LiveLessonsStatState;
}

export interface VideoReviewStat {
  _id: string;
  roster_group: string[];
  member_id: string;
  service_id: string;
  start_date_utc_timestamp: number;
  end_date_utc_timestamp: number;
  created_slots_count: number;
  available_slots_count: number;
  team_name: string;
  booked_slots_count: string;
  percentage_available: string;
  review_name: string;
  cost_collected: number;
}

export interface VideoReview {
  serviceId: string;
  serviceReviewId: string;
  service: string;
  description: string;
  startDate: number;
  endDate: number;
  cost: number;
  slots: number;
  availableSlots: number;
  rosterGroup: string[];
  teamName: string;
  teamId: string;
}

export interface LiveLessons {
  lessonDate: number;
  serviceId: string;
  name: string;
  description: string;
  cost: number;
  rosterGroup: string[];
  teamName: string;
  team: string;
  scheduleLessonId: string;
  slots: Slot[];
}

export interface BookingHistory {
  _id: string;
  service_name: string;
  history: {
    booking_date: string;
    booked_count: number;
  }[];
}

// Params types for Actions
export interface SetDataRequestParams {
  fromDate: number;
  toDate: number;
  role?: string;
  period?: string;
  periodShift?: number;
  status?: string;
}

export interface RecentlyAddedLessons {
  lessonName: string;
}

export interface JustAddedLessons {
  lessonName: string;
}
export interface VideoReviewStatRequestParams {
  status: string;
}

export interface WorkoutFilter {
  id: string;
  name: string;
}

export interface RosterGroupSwimmers {
  id: string;
  name: string;
  swimmers: WorkoutFilter[];
}

export interface RosterFilter {
  teamId: string;
  rosterGroups: RosterGroupSwimmers[];
}

export interface HUDParams {
  from: number;
  to: number;
}

// actionTypes
export const SET_DATA_REQUEST = '@dashboard/set-data-request';
export const SET_DATA_RESPONSE = '@dashboard/set-data-response';
export const SET_DATA_REQUEST_FAILURE = '@dashboard/set-data-request-failure';
export const VIDEO_REVIEW_STAT_REQUEST = '@dashboard/video_review_stat_request';
export const VIDEO_REVIEW_STAT_RESPONSE = '@dashboard/video_review_stat_response';
export const VIDEO_REVIEW_STAT_REQUEST_FAILURE = '@dashboard/video_review_stat_request_failure';
export const VIDEO_REVIEW_REQUEST = '@dashboard/video_review_request';
export const VIDEO_REVIEW_FAILURE = '@dashboard/video_review_failure';
export const VIDEO_REVIEW_RESPONSE = '@dashboard/video_review_response';
export const SET_FILTER_VALUES = '@dashboard/set_filter_values';
export const UPDATE_FILTER = '@dashboard/update_filter';
export const BOOKING_HISTORY_REQUEST = '@dashboard/booking_history_request';
export const BOOKING_HISTORY_RESPONSE = '@dashboard/booking_history_response';
export const BOOKING_HISTORY_FAILURE = '@dashboard/booking_history_failure';
export const LIVE_LESSONS_STAT_REQUEST = '@dashboard/live_lessons_stat_request';
export const LIVE_LESSONS_STAT_RESPONSE = '@dashboard/live_lessons_stat_response';
export const LIVE_LESSONS_STAT_FAILURE = '@dashboard/live_lessons_stat_failure';
export const LIVE_LESSONS_HISTORY_REQUEST = '@dashboard/live_lessons_history_request';
export const LIVE_LESSONS_HISTORY_RESPONSE = '@dashboard/live_lessons_history_response';
export const LIVE_LESSONS_HISTORY_FAILURE = '@dashboard/live_lessons_history_failure';
export const WORKOUT_HUD_DATE_UPDATE = '@dashboard/workout_hud_date_update';
export const WORKOUT_HUD_DATE_UPDATE_FAILURE = '@dashboard/workout_hud_date_update_failure';

// types used for actions
export interface SetDataRequest {
  type: typeof SET_DATA_REQUEST;
  params: SetDataRequestParams;
}

export interface SetDataResponse {
  type: typeof SET_DATA_RESPONSE;
  payload: HTTPResponse<SetData[]>;
}

export interface SetDataRequestFailure {
  type: typeof SET_DATA_REQUEST_FAILURE;
  error: AxiosError;
}

export interface UpdateWorkoutHUDDateFailure {
  type: typeof WORKOUT_HUD_DATE_UPDATE_FAILURE;
  error: AxiosError;
}

export interface UpdateWorkoutHUDDate {
  type: typeof WORKOUT_HUD_DATE_UPDATE;
  payload: HUDParams;
}

export interface VideoReviewStatRequest {
  type: typeof VIDEO_REVIEW_STAT_REQUEST;
  params: VideoReviewStatRequestParams;
}

export interface VideoReviewStatRequestFailure {
  type: typeof VIDEO_REVIEW_STAT_REQUEST_FAILURE;
  error: AxiosError;
}

export interface VideoReviewStatResponse {
  type: typeof VIDEO_REVIEW_STAT_RESPONSE;
  payload: HTTPResponse<VideoReviewStat[]>;
}

export interface VideoReviewRequest {
  type: typeof VIDEO_REVIEW_REQUEST;
  params: SetDataRequestParams;
}

export interface VideoReviewFailure {
  type: typeof VIDEO_REVIEW_FAILURE;
  error: AxiosError;
}

export interface VideoReviewResponse {
  type: typeof VIDEO_REVIEW_RESPONSE;
  payload: HTTPResponse<VideoReview[] | LiveLessons[]>;
}

export interface SetFilterValues {
  type: typeof SET_FILTER_VALUES;
  teams: WorkoutFilter[];
  rosters: RosterFilter[];
}

export interface UpdateFilter {
  type: typeof UPDATE_FILTER;
  filterType: string;
  id: string;
}

export interface BookingHistoryRequest {
  type: typeof BOOKING_HISTORY_REQUEST;
  params: SetDataRequestParams;
}

export interface BookingHistoryRequestFailure {
  type: typeof BOOKING_HISTORY_FAILURE;
  error: AxiosError;
}

export interface BookingHistoryResponse {
  type: typeof BOOKING_HISTORY_RESPONSE;
  payload: HTTPResponse<BookingHistory[]>;
}

export interface LiveLessonsStatRequest {
  type: typeof LIVE_LESSONS_STAT_REQUEST;
  params: VideoReviewStatRequestParams;
}

export interface LiveLessonsStatResponse {
  type: typeof LIVE_LESSONS_STAT_RESPONSE;
  payload: HTTPResponse<VideoReviewStat[]>;
}

export interface LiveLessonsStatFailure {
  type: typeof LIVE_LESSONS_STAT_FAILURE;
  error: AxiosError;
}

export interface LiveLessonsHistoryRequest {
  type: typeof LIVE_LESSONS_HISTORY_REQUEST;
  params: SetDataRequestParams;
}

export interface LiveLessonsHistoryResponse {
  type: typeof LIVE_LESSONS_HISTORY_RESPONSE;
  payload: HTTPResponse<BookingHistory[]>;
}

export interface LiveLessonsHistoryFailure {
  type: typeof LIVE_LESSONS_HISTORY_FAILURE;
  error: AxiosError;
}

export type DashboardActionType =
  | SetDataRequest
  | SetDataResponse
  | SetDataRequestFailure
  | VideoReviewStatRequest
  | VideoReviewStatResponse
  | VideoReviewStatRequestFailure
  | VideoReviewRequest
  | VideoReviewFailure
  | VideoReviewResponse
  | SetFilterValues
  | UpdateFilter
  | BookingHistoryRequest
  | BookingHistoryResponse
  | BookingHistoryRequestFailure
  | LiveLessonsStatRequest
  | LiveLessonsStatResponse
  | LiveLessonsStatFailure
  | LiveLessonsHistoryRequest
  | LiveLessonsHistoryResponse
  | LiveLessonsHistoryFailure
  | UpdateWorkoutHUDDate;
