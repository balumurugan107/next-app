// import { AxiosError } from 'axios';
// import { HTTPResponse } from 'src/types';
// import LiveLessons from 'src/views/management/Services/MainView/LiveLessons';
// import { Slot } from 'src/views/management/Services/MainView/LiveLessons/FormModel';
export interface DashboardNewServiceState {
  isLoading: boolean;
  error: Error | null;
  recentlyAddedData: DashboardServiceDocument[];
  justAddedData: DashboardServiceDocument[];
  dashboardWeeklyThemes: IDashboardWeeklyThemes[];
  videoList: GetVideoListResponseData;
}

export interface DashboardServiceDocument {
  _id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  //lessons: string;
  created: string;
}

export interface DashboardResult {
  results: DashboardServiceDocument[];
}
export interface GetLessonNameServiceRequest {
  type: typeof GET_LESSON_NAME_SERVICE_REQUEST;
}
export interface GetLessonNameServiceSuccess {
  type: typeof GET_LESSON_NAME_SERVICE_SUCCESS;
  payload: DashboardServiceDocument[];
}
export interface GetLessonNameServiceFailure {
  type: typeof GET_LESSON_NAME_SERVICE_FAILURE;
  error: Error;
}

export interface GetRecentDataServiceRequest {
  type: typeof GET_RECENT_DATA_SERVICE_REQUEST;
}
export interface GetRecentDataServiceSuccess {
  type: typeof GET_RECENT_DATA_SERVICE_SUCCESS;
  payload: DashboardServiceDocument[];
}
export interface GetRecentDataServiceFailure {
  type: typeof GET_RECENT_DATA_SERVICE_FAILURE;
  error: Error;
}

export interface GetDashboardWeeklyThemesRequest {
  type: typeof GET_DASHBOARD_WEEKLY_THEMES_REQUEST;
}
export interface GetDashboardWeeklyThemesSuccess {
  type: typeof GET_DASHBOARD_WEEKLY_THEMES_SUCCESS;
  payload: IDashboardWeeklyThemes[];
}
export interface GetDashboardWeeklyThemesFailure {
  type: typeof GET_DASHBOARD_WEEKLY_THEMES_FAILURE;
  error: Error;
}

export interface IDashboardWeeklyThemes {
  name: string;
  thumbnailUrl: string;
  videoUrl: string;
  _id: string;
  description?: string;
}

export interface GetVideosListServiceRequest {
  type: typeof GET_VIDEOS_LIST_SERVICE_REQUEST;
}
export interface GetVideosListServiceSuccess {
  type: typeof GET_VIDEOS_LIST_SERVICE_SUCCESS;
  payload: GetVideoListResponseData;
}
export interface GetVideosListServiceFailure {
  type: typeof GET_VIDEOS_LIST_SERVICE_FAILURE;
  error: Error;
}

export interface GetVideoListRequestData {
  limit?: number | undefined;
  page?: number | undefined;
  filterData?: ApiData[];
}

export interface ApiData {
  title: string;
  key: string;
}

export interface GetVideoListResponseData {
  results: VideoListResultData[];
  totalCount: number;
  next: NextVideoList;
}

export interface VideoListResultData {
  _id: string;
  video_file_name: string;
}
export interface NextVideoList {
  page: number;
  limit: number;
}

export const REMOVE_ALL_VIDEOS_LIST = '@service/remove-all-videos-list';

export interface RemoveAllVideos {
  type: typeof REMOVE_ALL_VIDEOS_LIST;
}

export const REMOVE_DASHBOARD_WEEKLY_THEMES = '@service/remove-all-dashboard-weekly-themes-list';

export interface RemoveDashboardWeeklyThemes {
  type: typeof REMOVE_DASHBOARD_WEEKLY_THEMES;
}

export const GET_LESSON_NAME_SERVICE_REQUEST = '@newdashboard/get-lesson-name-service-request';
export const GET_LESSON_NAME_SERVICE_SUCCESS = '@newdashboard/get-lesson-name-service-success';
export const GET_LESSON_NAME_SERVICE_FAILURE = '@newdashboard/get-lesson-name-service-failure';

export const GET_RECENT_DATA_SERVICE_REQUEST = '@newdashboard/get-recent-data-service-request';
export const GET_RECENT_DATA_SERVICE_SUCCESS = '@newdashboard/get-recent-data-service-success';
export const GET_RECENT_DATA_SERVICE_FAILURE = '@newdashboard/get-recent-data-service-failure';

export const GET_DASHBOARD_WEEKLY_THEMES_REQUEST =
  '@newdashboard/get-dashboard-weekly-themes-request';
export const GET_DASHBOARD_WEEKLY_THEMES_SUCCESS =
  '@newdashboard/get-dashboard-weekly-themes-success';
export const GET_DASHBOARD_WEEKLY_THEMES_FAILURE =
  '@newdashboard/get-dashboard-weekly-themes-failure';

export const GET_VIDEOS_LIST_SERVICE_REQUEST = '@newdashboard/get-videos-list-service-request';
export const GET_VIDEOS_LIST_SERVICE_SUCCESS = '@newdashboard/get-videos-list-service-success';
export const GET_VIDEOS_LIST_SERVICE_FAILURE = '@newdashboard/get-videos-list-service-failure';

export type GetDashboardServiceActionTypes =
  | GetLessonNameServiceRequest
  | GetLessonNameServiceSuccess
  | GetLessonNameServiceFailure;

//export type DashboardActionType = GetDashboardServiceActionTypes;

export type GetRecentDataActionTypes =
  | GetRecentDataServiceRequest
  | GetRecentDataServiceSuccess
  | GetRecentDataServiceFailure;

export type GetVideosListActionTypes =
  | GetVideosListServiceRequest
  | GetVideosListServiceSuccess
  | GetVideosListServiceFailure;

export type GetDashboardWeeklyThemesActionType =
  | GetDashboardWeeklyThemesRequest
  | GetDashboardWeeklyThemesSuccess
  | GetDashboardWeeklyThemesFailure;

export type removeVideoDataActionType = RemoveAllVideos;

export type removeWeeklyThemesActionType = RemoveDashboardWeeklyThemes;

export type DashboardActionType =
  | GetDashboardServiceActionTypes
  | GetRecentDataActionTypes
  | GetVideosListActionTypes
  | GetDashboardWeeklyThemesActionType
  | removeVideoDataActionType
  | removeWeeklyThemesActionType;
