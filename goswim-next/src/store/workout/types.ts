import { AxiosError } from 'axios';
import { HTTPResponse, HTTPErrorResponse } from 'src/types';
import { SwimmerTag } from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';
import { EditorType } from 'src/store/management/service';

export interface WorkoutState {
  isLoading: boolean;
  data: Workout[];
  error: AxiosError<HTTPErrorResponse> | null;
  swimmers: SwimmerTag[];
  key: string;
}
export interface Workout {
  _id: string;
  workout_name: string;
  workout_text: string;
  workout_created_by: string;
  workout_created_datetime: number;
  sets_roster_group: string[];
  assigned_datetime: number;
  scheduled_datetime: number;
  scheduled_workout_id?: string;
  team: string;
  type: string;
  assigned?: number;
  completed?: number;
  editorType?: EditorType;
}
export interface WorkoutSummarizedDetails {
  _id: string;
  full_name: string;
  roster_group: string[];
  profile_picture_url: string;
  teams: string;
  email: string;
  execution_status: string;
  swimmer_notes: string;
}

export interface Swimmer {
  _id: string;
  full_name: string;
}

export interface SwimmerParams {
  teamId: string;
  roster: string[];
}
export interface AttendanceData {
  scheduled_workouts_id: string;
  swimmer_ids: string[];
}
export interface WorkoutOverviewDocument extends Workout {
  members?: WorkoutSummarizedDetails[];
}

export const GET_WORKOUTS = '@workout/get-workouts';
export const GET_WORKOUTS_REQUEST = '@workout/get-workouts-request';
export const GET_WORKOUTS_SUCCESS = '@workout/get-workouts-success';
export const GET_WORKOUTS_FAILURE = '@workout/get-workouts-failure';

export const CREATE_WORKOUT = '@workouts/create-workout';
export const CREATE_WORKOUT_REQUEST = '@workout/create-workout-request';
export const CREATE_WORKOUT_SUCCESS = '@workout/create-workout-success';
export const CREATE_WORKOUT_FAILURE = '@workout/create-workout-failure';

export const DELETE_WORkOUT = '@workouts/delete-workout';
export const DELETE_WORKOUT_REQUEST = '@workout/delete-workout-request';
export const DELETE_WORKOUT_SUCCESS = '@workout/delete-workout-success';
export const DELETE_WORKOUT_FAILURE = '@workout/delete-workout-failure';

export const UPDATE_WORKOUT = '@workouts/update-workout';
export const UPDATE_WORKOUT_REQUEST = '@workout/update-workout-request';
export const UPDATE_WORKOUT_SUCCESS = '@workout/update-workout-success';
export const UPDATE_WORKOUT_FAILURE = '@workout/update-workout-failure';

export interface CreateWorkoutRequest<T = any> {
  type: typeof CREATE_WORKOUT_REQUEST;
  payload: T;
}

export interface CreateWorkoutSuccess {
  type: typeof CREATE_WORKOUT_SUCCESS;
  payload: any;
}

export interface CreateWorkoutFailure {
  type: typeof CREATE_WORKOUT_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export interface GetWorkoutsRequest {
  type: typeof GET_WORKOUTS_REQUEST;
}

export interface GetWorkoutsSuccess {
  type: typeof GET_WORKOUTS_SUCCESS;
  payload: HTTPResponse<Workout[]>;
}

export interface GetWorkoutsFailure {
  type: typeof GET_WORKOUTS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export interface DeleteWorkoutRequest {
  type: typeof DELETE_WORKOUT_REQUEST;
}

export interface DeleteWorkoutSuccess {
  type: typeof DELETE_WORKOUT_SUCCESS;
}

export interface DeleteWorkoutFailure {
  type: typeof DELETE_WORKOUT_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export interface UpdateWorkoutRequest<T = any> {
  type: typeof UPDATE_WORKOUT_REQUEST;
  payload: T;
}
export interface UpdateWorkoutSuccess {
  type: typeof UPDATE_WORKOUT_SUCCESS;
  payload: any;
}
export interface UpdateWorkoutFailure {
  type: typeof UPDATE_WORKOUT_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export const MARK_ATTENDANCE_REQUEST = '@workout/mark-attendance-request';
export const MARK_ATTENDANCE_SUCCESS = '@workout/mark-attendance-success';
export const MARK_ATTENDANCE_FAILURE = '@workout/mark-attendance-failure';

export interface MarkAttendanceRequest {
  type: typeof MARK_ATTENDANCE_REQUEST;
}

export interface MarkAttendanceSuccess {
  type: typeof MARK_ATTENDANCE_SUCCESS;
}

export interface MarkAttendanceFailure {
  type: typeof MARK_ATTENDANCE_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export const GET_SWIMMERS = '@workout/get-swimmers';
export const GET_SWIMMERS_REQUEST = '@workout/get-swimmers-request';
export const GET_SWIMMERS_SUCCESS = '@workout/get-swimmers-success';
export const GET_SWIMMERS_FAILURE = '@workout/get-swimmers-failure';

export interface GetSwimmersRequest {
  type: typeof GET_SWIMMERS_REQUEST;
}

export interface GetSwimmersSuccess {
  type: typeof GET_SWIMMERS_SUCCESS;
  payload: HTTPResponse<Swimmer[]>;
}

export interface GetSwimmersFailure {
  type: typeof GET_SWIMMERS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetWorkoutsActionTypes = GetWorkoutsRequest | GetWorkoutsSuccess | GetWorkoutsFailure;
export type CreateWorkoutActionTypes =
  | CreateWorkoutRequest
  | CreateWorkoutSuccess
  | CreateWorkoutFailure;
export type DeleteWorkoutActionTypes =
  | DeleteWorkoutRequest
  | DeleteWorkoutSuccess
  | DeleteWorkoutFailure;
export type UpdateWorkoutActionTypes =
  | UpdateWorkoutRequest
  | UpdateWorkoutSuccess
  | UpdateWorkoutFailure;

export type MarkAttendanceActionTypes =
  | MarkAttendanceRequest
  | MarkAttendanceSuccess
  | MarkAttendanceFailure;

export type GetSwimmersActionTypes = GetSwimmersRequest | GetSwimmersSuccess | GetSwimmersFailure;

export type WorkoutActionTypes =
  | GetWorkoutsActionTypes
  | MarkAttendanceActionTypes
  | CreateWorkoutActionTypes
  | DeleteWorkoutActionTypes
  | UpdateWorkoutActionTypes
  | GetSwimmersActionTypes;
