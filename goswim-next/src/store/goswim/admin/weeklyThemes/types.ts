export interface AdminWeeklyThemesState {
  isLoading: boolean;
  error: null;
  weeklyThemes: IWeeklyThemesResponse[];
  todayWeeklyThemes: ITodayWeeklyThemes[];
  weeklyThemesById: IWeeklyThemesByIdResponse | null;
  thumbCustomUploaded: S3Response | null;
  weeklyThemesCreated: boolean;
  weeklyThemesUpdated: boolean;
  weeklyThemesDeleted: boolean;
  previousWeeklyThemes: PreviousWeeklyThemes[];
}

export interface IWeeklyThemesByIdResponse {
  _id: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  created: number;
  updated: number;
  weeklyThemeLessonAssignments: IWeeklyThemesLessonData[];
  thumbnailUrl: string;
  thumbnail_name: string;
  thumbnail_uid: string;
}

export interface IWeeklyThemesLessonData {
  lesson_id: string;
  _id: string;
  scheduled_on_timestamp: number;
  lesson: IWeeklyLessonData;
  updated: number;
}

interface IWeeklyLessonData {
  _id: string;
  name: string;
  description: string;
  favorites_count: number;
  subtitle: string | null;
  publish_at: string;
  position: number;
  created: string;
  updated: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export const REMOVE_ADMIN_WEEKLY_THEME_STATE = '@service/remove-weekly-theme-state';

export interface RemoveAdminWeeklyThemeState {
  type: typeof REMOVE_ADMIN_WEEKLY_THEME_STATE;
}

/* GET WEEKLY THEMES */

export const GET_WEEKLY_THEMES_SERVICE_REQUEST = '@service/get-weeklythemes-service-request';
export const GET_WEEKLY_THEMES_SERVICE_SUCCESS = '@service/get-weeklythemes-service-success';
export const GET_WEEKLY_THEMES_SERVICE_FAILURE = '@service/get-weeklythemes-service-failure';

export interface GetWeeklyThemesServiceRequest {
  type: typeof GET_WEEKLY_THEMES_SERVICE_REQUEST;
}
export interface GetWeeklyThemesServiceSuccess {
  type: typeof GET_WEEKLY_THEMES_SERVICE_SUCCESS;
  payload: IWeeklyThemesResponse[];
}

export interface GetWeeklyThemesServiceFailure {
  type: typeof GET_WEEKLY_THEMES_SERVICE_FAILURE;
}

export interface ILessonData {
  UI_ID: number;
  lesson_id: string;
  name: string | null;
  scheduled_on_timestamp: number;
}

export interface IValue {
  title: string;
  description: string;
  thumbnail_uid: string;
  thumbnail_name: string;
  tz: string;
  lessons: ILessonData[];
}

export interface IWeeklyThemesResponse {
  _id: string;
  title: string;
  description: string;
  start_date: null;
  end_date: null;
  created: string;
  updated: string;
}

export type WeeklyThemesActionType =
  | GetWeeklyThemesServiceRequest
  | GetWeeklyThemesServiceSuccess
  | GetWeeklyThemesServiceFailure;

/* GET TODAY WEEKLY THEMES */

export const GET_TODAY_WEEKLY_THEMES_SERVICE_REQUEST =
  '@service/get-today-weeklythemes-service-request';
export const GET_TODAY_WEEKLY_THEMES_SERVICE_SUCCESS =
  '@service/get-today-weeklythemes-service-success';
export const GET_TODAY_WEEKLY_THEMES_SERVICE_FAILURE = '@service/get-today-weeklythemes-failure';

export const GET_PREVIOUS_WEEKLY_THEMES_SERVICE_REQUEST =
  '@service/get-previous-weeklythemes-service-request';
export const GET_PREVIOUS_WEEKLY_THEMES_SERVICE_SUCCESS =
  '@service/get-previous-weeklythemes-service-success';
export const GET_PREVIOUS_WEEKLY_THEMES_SERVICE_FAILURE =
  '@service/get-previous-weeklythemes-failure';

export interface GetTodayWeeklyThemesServiceRequest {
  type: typeof GET_TODAY_WEEKLY_THEMES_SERVICE_REQUEST;
}
export interface GetTodayWeeklyThemesServiceSuccess {
  type: typeof GET_TODAY_WEEKLY_THEMES_SERVICE_SUCCESS;
  payload: ITodayWeeklyThemes[];
}

export interface GetPreviousWeeklyThemesServiceFailure {
  type: typeof GET_PREVIOUS_WEEKLY_THEMES_SERVICE_FAILURE;
}

export interface GetPreviousWeeklyThemesServiceRequest {
  type: typeof GET_PREVIOUS_WEEKLY_THEMES_SERVICE_REQUEST;
}
export interface GetPreviousWeeklyThemesServiceSuccess {
  type: typeof GET_PREVIOUS_WEEKLY_THEMES_SERVICE_SUCCESS;
  payload: PreviousWeeklyThemes[];
}

export interface GetTodayWeeklyThemesServiceFailure {
  type: typeof GET_TODAY_WEEKLY_THEMES_SERVICE_FAILURE;
}

export interface ITodayWeeklyThemes {
  name: string;
  thumbnailUrl: string;
  videoUrl: string;
  _id: string;
  description?: string;
}

export interface PreviousWeeklyThemes {
  _id: string;
  name: string;
  description: string;
  tutorial: boolean;
  watched: boolean;
  scheduled_on_timestamp: number;
  thumbnailUrl: string;
}

type TodayWeeklyThemesActionType =
  | GetTodayWeeklyThemesServiceRequest
  | GetTodayWeeklyThemesServiceSuccess
  | GetTodayWeeklyThemesServiceFailure;

type PreviousWeeklyThemesActionType =
  | GetPreviousWeeklyThemesServiceRequest
  | GetPreviousWeeklyThemesServiceSuccess
  | GetPreviousWeeklyThemesServiceFailure;
/* GET WEEKLY THEMES BY ID*/

export const GET_WEEKLY_THEMES_BY_ID_SERVICE_REQUEST =
  '@service/get-weeklythemes-by-id-service-request';
export const GET_WEEKLY_THEMES_BY_ID_SERVICE_SUCCESS =
  '@service/get-weeklythemes-by-id-service-success';
export const GET_WEEKLY_THEMES_BY_ID_SERVICE_FAILURE = '@service/get-weeklythemes-by-id-failure';

export interface GetWeeklyThemesByIdServiceRequest {
  type: typeof GET_WEEKLY_THEMES_BY_ID_SERVICE_REQUEST;
}
export interface GetWeeklyThemesByIdServiceSuccess {
  type: typeof GET_WEEKLY_THEMES_BY_ID_SERVICE_SUCCESS;
  payload: IWeeklyThemesByIdResponse[];
}

export interface GetWeeklyThemesByIdServiceFailure {
  type: typeof GET_WEEKLY_THEMES_BY_ID_SERVICE_FAILURE;
}

type WeeklyThemesByIdActionTypes =
  | GetWeeklyThemesByIdServiceRequest
  | GetWeeklyThemesByIdServiceSuccess
  | GetWeeklyThemesByIdServiceFailure;

/*Create WeeklyTheme*/
export const CREATE_WEEKLY_THEMES_SERVICE_REQUEST = '@service/create-weeklythemes-service-request';
export const CREATE_WEEKLY_THEMES_SERVICE_SUCCESS = '@service/create-weeklythemes-service-success';
export const CREATE_WEEKLY_THEMES_SERVICE_FAILURE = '@service/create-weeklythemes-service-failure';

export interface CreateWeeklyThemesServiceRequest {
  type: typeof CREATE_WEEKLY_THEMES_SERVICE_REQUEST;
}
export interface CreateWeeklyThemesServiceSuccess {
  type: typeof CREATE_WEEKLY_THEMES_SERVICE_SUCCESS;
}

export interface CreateWeeklyThemesServiceFailure {
  type: typeof CREATE_WEEKLY_THEMES_SERVICE_FAILURE;
}

export type CreateWeeklyThemesActionType =
  | CreateWeeklyThemesServiceRequest
  | CreateWeeklyThemesServiceSuccess
  | CreateWeeklyThemesServiceFailure;

/*Edit WeeklyTheme*/
export const EDIT_WEEKLY_THEMES_SERVICE_REQUEST = '@service/edit-weeklythemes-service-request';
export const EDIT_WEEKLY_THEMES_SERVICE_SUCCESS = '@service/edit-weeklythemes-service-success';
export const EDIT_WEEKLY_THEMES_SERVICE_FAILURE = '@service/edit-weeklythemes-service-failure';

export interface EditWeeklyThemesServiceRequest {
  type: typeof EDIT_WEEKLY_THEMES_SERVICE_REQUEST;
}
export interface EditWeeklyThemesServiceSuccess {
  type: typeof EDIT_WEEKLY_THEMES_SERVICE_SUCCESS;
}

export interface EditWeeklyThemesServiceFailure {
  type: typeof EDIT_WEEKLY_THEMES_SERVICE_FAILURE;
}

export type EditWeeklyThemesActionType =
  | EditWeeklyThemesServiceRequest
  | EditWeeklyThemesServiceSuccess
  | EditWeeklyThemesServiceFailure;

/* DELETE WEEKLY THEMES */
export const DELETE_WEEKLY_THEMES_REQUEST = '@service/delete-weeklythemes-service-request';
export const DELETE_WEEKLY_THEMES_SUCCESS = '@service/delete-weeklythemes-service-success';
export const DELETE_WEEKLY_THEMES_FAILURE = '@service/delete-weeklythemes-service-failure';

export interface DeleteWeeklyThemesRequest {
  type: typeof DELETE_WEEKLY_THEMES_REQUEST;
}
export interface DeleteWeeklyThemesSuccess {
  type: typeof DELETE_WEEKLY_THEMES_SUCCESS;
}

export interface DeleteWeeklyThemesFailure {
  type: typeof DELETE_WEEKLY_THEMES_FAILURE;
}

export type DeleteWeeklyThemesActionType =
  | DeleteWeeklyThemesRequest
  | DeleteWeeklyThemesSuccess
  | DeleteWeeklyThemesFailure;

/* UPLOAD CUSTOM THUMBNAIL */

export const UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_REQUEST =
  '@service/upload-weekly-thumb-custom-to-s3-request';
export const UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_SUCCESS =
  '@service/upload-weekly-thumb-custom-to-s3-success';
export const UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_FAILURE =
  '@service/upload-weekly-thumb-custom-to-s3-failure';
export interface UploadWeeklyThumbCustomToS3Request {
  type: typeof UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_REQUEST;
}

export interface UploadWeeklyThumbCustomToS3Success {
  type: typeof UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadWeeklyThumbCustomToS3Failure {
  type: typeof UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_FAILURE;
}

export interface S3Response {
  bucket: string;
  key: string;
  location: string;
}

export const REMOVE_ALL_WEEKLY_THEMES_LIST = '@service/remove-all-weekly_themes-list';

export interface RemoveAllWeeklyThemes {
  type: typeof REMOVE_ALL_WEEKLY_THEMES_LIST;
}

export type UploadWeeklyThemeThumbnailAction =
  | UploadWeeklyThumbCustomToS3Request
  | UploadWeeklyThumbCustomToS3Success
  | UploadWeeklyThumbCustomToS3Failure;

export type AdminWeeklyThemesActionType =
  | WeeklyThemesActionType
  | CreateWeeklyThemesActionType
  | UploadWeeklyThemeThumbnailAction
  | WeeklyThemesByIdActionTypes
  | EditWeeklyThemesActionType
  | RemoveAdminWeeklyThemeState
  | DeleteWeeklyThemesActionType
  | RemoveAllWeeklyThemes
  | TodayWeeklyThemesActionType
  | PreviousWeeklyThemesActionType;
