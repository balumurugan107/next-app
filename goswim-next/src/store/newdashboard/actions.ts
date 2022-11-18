import { apiGetJustAdded, apiGetRecentlyAdded } from 'pages/api/dashboard';
import { Dispatch } from 'redux';
// import { authServiceInstance } from 'src/services/account/authService';
import { dashboardServiceInstance } from 'src/services/dashboard/dashboardService';
import //RecentlyAddedLessons
'src/store/newdashboard/types';
// import { UserLogin } from 'src/types';
import {
  GetLessonNameServiceFailure,
  GetLessonNameServiceRequest,
  GetLessonNameServiceSuccess,
  GetRecentDataServiceFailure,
  GetRecentDataServiceRequest,
  GetRecentDataServiceSuccess,
  GET_LESSON_NAME_SERVICE_FAILURE,
  GET_LESSON_NAME_SERVICE_REQUEST,
  GET_LESSON_NAME_SERVICE_SUCCESS,
  GET_RECENT_DATA_SERVICE_REQUEST,
  GET_RECENT_DATA_SERVICE_SUCCESS,
  GET_RECENT_DATA_SERVICE_FAILURE,
  GetVideosListServiceRequest,
  GET_VIDEOS_LIST_SERVICE_REQUEST,
  GetVideosListServiceFailure,
  GetVideosListServiceSuccess,
  GET_VIDEOS_LIST_SERVICE_FAILURE,
  GET_VIDEOS_LIST_SERVICE_SUCCESS,
  GetVideoListRequestData,
  RemoveAllVideos,
  REMOVE_ALL_VIDEOS_LIST,
  GetDashboardWeeklyThemesFailure,
  GetDashboardWeeklyThemesRequest,
  GetDashboardWeeklyThemesSuccess,
  GET_DASHBOARD_WEEKLY_THEMES_FAILURE,
  GET_DASHBOARD_WEEKLY_THEMES_REQUEST,
  GET_DASHBOARD_WEEKLY_THEMES_SUCCESS,
  RemoveDashboardWeeklyThemes,
  REMOVE_DASHBOARD_WEEKLY_THEMES
} from '.';

export const getJustAddedLessons = () => {
  return async (dispatch: Dispatch) => {
    apiGetJustAdded(dispatch);
  };
};

export const getRecentlyAdded = () => {
  return async (dispatch: Dispatch) => {
    apiGetRecentlyAdded(dispatch);
  };
};

export const getDashboardWeeklyThemes = (timeZone: string, scheduled_on: number) => {
  return async (dispatch: Dispatch) => {
    try {
      //const payload = await authServiceInstance.loginWithToken({ ...user });

      dispatch<GetDashboardWeeklyThemesRequest>({ type: GET_DASHBOARD_WEEKLY_THEMES_REQUEST });
      const response = await dashboardServiceInstance.getDashboardWeeklyThemes(
        timeZone,
        scheduled_on
      );
      dispatch<GetDashboardWeeklyThemesSuccess>({
        type: GET_DASHBOARD_WEEKLY_THEMES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetDashboardWeeklyThemesFailure>({
        type: GET_DASHBOARD_WEEKLY_THEMES_FAILURE,
        error
      });
    }
  };
};

export const getVideosList = (params?: GetVideoListRequestData) => {
  return async (dispatch: Dispatch) => {
    try {
      //const payload = await authServiceInstance.loginWithToken({ ...user });

      dispatch<GetVideosListServiceRequest>({ type: GET_VIDEOS_LIST_SERVICE_REQUEST });
      const response = await dashboardServiceInstance.getVideosList(params);
      dispatch<GetVideosListServiceSuccess>({
        type: GET_VIDEOS_LIST_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetVideosListServiceFailure>({ type: GET_VIDEOS_LIST_SERVICE_FAILURE, error });
    }
  };
};

export const removeAllVideos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<RemoveAllVideos>({ type: REMOVE_ALL_VIDEOS_LIST });
    } catch (error) {}
  };
};

export const removeDashboardWeeklyThemes = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<RemoveDashboardWeeklyThemes>({ type: REMOVE_DASHBOARD_WEEKLY_THEMES });
    } catch (error) {}
  };
};
