import { Dispatch } from 'redux';
import { UploadVideoToS3ServiceInstance } from 'src/services/goswim/admin/videos/S3UploadJs';
import { adminWeeklyThemesServiceInstance } from 'src/services/goswim/admin/weeklyThemes';
import {
  CreateWeeklyThemesServiceRequest,
  CreateWeeklyThemesServiceSuccess,
  CREATE_WEEKLY_THEMES_SERVICE_REQUEST,
  CREATE_WEEKLY_THEMES_SERVICE_SUCCESS,
  DeleteWeeklyThemesFailure,
  DeleteWeeklyThemesRequest,
  DeleteWeeklyThemesSuccess,
  DELETE_WEEKLY_THEMES_FAILURE,
  DELETE_WEEKLY_THEMES_REQUEST,
  DELETE_WEEKLY_THEMES_SUCCESS,
  EditWeeklyThemesServiceFailure,
  EditWeeklyThemesServiceRequest,
  EditWeeklyThemesServiceSuccess,
  EDIT_WEEKLY_THEMES_SERVICE_FAILURE,
  EDIT_WEEKLY_THEMES_SERVICE_REQUEST,
  EDIT_WEEKLY_THEMES_SERVICE_SUCCESS,
  GetPreviousWeeklyThemesServiceFailure,
  GetPreviousWeeklyThemesServiceRequest,
  GetPreviousWeeklyThemesServiceSuccess,
  GetTodayWeeklyThemesServiceFailure,
  GetTodayWeeklyThemesServiceRequest,
  GetTodayWeeklyThemesServiceSuccess,
  GetWeeklyThemesByIdServiceFailure,
  GetWeeklyThemesByIdServiceRequest,
  GetWeeklyThemesByIdServiceSuccess,
  GetWeeklyThemesServiceFailure,
  GetWeeklyThemesServiceRequest,
  GetWeeklyThemesServiceSuccess,
  GET_PREVIOUS_WEEKLY_THEMES_SERVICE_FAILURE,
  GET_PREVIOUS_WEEKLY_THEMES_SERVICE_REQUEST,
  GET_PREVIOUS_WEEKLY_THEMES_SERVICE_SUCCESS,
  GET_TODAY_WEEKLY_THEMES_SERVICE_FAILURE,
  GET_TODAY_WEEKLY_THEMES_SERVICE_REQUEST,
  GET_TODAY_WEEKLY_THEMES_SERVICE_SUCCESS,
  GET_WEEKLY_THEMES_BY_ID_SERVICE_FAILURE,
  GET_WEEKLY_THEMES_BY_ID_SERVICE_REQUEST,
  GET_WEEKLY_THEMES_BY_ID_SERVICE_SUCCESS,
  GET_WEEKLY_THEMES_SERVICE_FAILURE,
  GET_WEEKLY_THEMES_SERVICE_REQUEST,
  GET_WEEKLY_THEMES_SERVICE_SUCCESS,
  IValue,
  RemoveAdminWeeklyThemeState,
  RemoveAllWeeklyThemes,
  REMOVE_ADMIN_WEEKLY_THEME_STATE,
  REMOVE_ALL_WEEKLY_THEMES_LIST,
  UploadWeeklyThumbCustomToS3Failure,
  UploadWeeklyThumbCustomToS3Request,
  UploadWeeklyThumbCustomToS3Success,
  UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_FAILURE,
  UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_REQUEST,
  UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_SUCCESS
} from './types';

export const getWeeklyThemes = (scheduled_on?: number, tz?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetWeeklyThemesServiceRequest>({ type: GET_WEEKLY_THEMES_SERVICE_REQUEST });
      const response = await adminWeeklyThemesServiceInstance.getWeeklyThemes(scheduled_on, tz);

      dispatch<GetWeeklyThemesServiceSuccess>({
        type: GET_WEEKLY_THEMES_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetWeeklyThemesServiceFailure>({ type: GET_WEEKLY_THEMES_SERVICE_FAILURE });
    }
  };
};

export const getTodayWeeklyThemes = (scheduled_on?: number, tz?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetTodayWeeklyThemesServiceRequest>({
        type: GET_TODAY_WEEKLY_THEMES_SERVICE_REQUEST
      });
      const response = await adminWeeklyThemesServiceInstance.getTodayWeeklyThemes(
        scheduled_on,
        tz
      );

      dispatch<GetTodayWeeklyThemesServiceSuccess>({
        type: GET_TODAY_WEEKLY_THEMES_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetTodayWeeklyThemesServiceFailure>({
        type: GET_TODAY_WEEKLY_THEMES_SERVICE_FAILURE
      });
    }
  };
};

export const getWeeklyThemesById = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetWeeklyThemesByIdServiceRequest>({
        type: GET_WEEKLY_THEMES_BY_ID_SERVICE_REQUEST
      });
      const response = await adminWeeklyThemesServiceInstance.getWeeklyThemesById(id);

      dispatch<GetWeeklyThemesByIdServiceSuccess>({
        type: GET_WEEKLY_THEMES_BY_ID_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetWeeklyThemesByIdServiceFailure>({
        type: GET_WEEKLY_THEMES_BY_ID_SERVICE_FAILURE
      });
    }
  };
};

export const createWeeklyThemes = (values: IValue) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CreateWeeklyThemesServiceRequest>({ type: CREATE_WEEKLY_THEMES_SERVICE_REQUEST });
      await adminWeeklyThemesServiceInstance.createWeeklyTheme(values);

      dispatch<CreateWeeklyThemesServiceSuccess>({
        type: CREATE_WEEKLY_THEMES_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<GetWeeklyThemesServiceFailure>({ type: GET_WEEKLY_THEMES_SERVICE_FAILURE });
    }
  };
};

export const editWeeklyThemes = (values: IValue, _id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<EditWeeklyThemesServiceRequest>({ type: EDIT_WEEKLY_THEMES_SERVICE_REQUEST });
      await adminWeeklyThemesServiceInstance.editWeeklyTheme(values, _id);

      dispatch<EditWeeklyThemesServiceSuccess>({
        type: EDIT_WEEKLY_THEMES_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<EditWeeklyThemesServiceFailure>({ type: EDIT_WEEKLY_THEMES_SERVICE_FAILURE });
    }
  };
};

export const deleteWeeklyThemes = (_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteWeeklyThemesRequest>({ type: DELETE_WEEKLY_THEMES_REQUEST });

      await adminWeeklyThemesServiceInstance.deleteWeeklyTheme(_id);

      dispatch<DeleteWeeklyThemesSuccess>({
        type: DELETE_WEEKLY_THEMES_SUCCESS
      });
    } catch (error) {
      dispatch<DeleteWeeklyThemesFailure>({ type: DELETE_WEEKLY_THEMES_FAILURE });
    }
  };
};

export const uploadWeeklyThemesThumbCustomToS3Bucket = (
  file: File,
  millis: string,
  innerFolder: string | null
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadWeeklyThumbCustomToS3Request>({
        type: UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_REQUEST
      });
      const response = await UploadVideoToS3ServiceInstance.uploadFile(
        file,
        millis,
        innerFolder,
        true
      );

      dispatch<UploadWeeklyThumbCustomToS3Success>({
        type: UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadWeeklyThumbCustomToS3Failure>({
        type: UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_FAILURE
      });
    }
  };
};

export const removeAdminWeeklyThemeFromState = () => {
  return async (dispatch: Dispatch) => {
    dispatch<RemoveAdminWeeklyThemeState>({ type: REMOVE_ADMIN_WEEKLY_THEME_STATE });
  };
};

export const removeAllWeeklyThemes = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<RemoveAllWeeklyThemes>({ type: REMOVE_ALL_WEEKLY_THEMES_LIST });
    } catch (error) {}
  };
};

export const getPreviousWeeklyThemes = (scheduled_on?: number, tz?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetPreviousWeeklyThemesServiceRequest>({
        type: GET_PREVIOUS_WEEKLY_THEMES_SERVICE_REQUEST
      });
      const response = await adminWeeklyThemesServiceInstance.getPreviousWeeklyThemes(
        scheduled_on,
        tz
      );

      dispatch<GetPreviousWeeklyThemesServiceSuccess>({
        type: GET_PREVIOUS_WEEKLY_THEMES_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetPreviousWeeklyThemesServiceFailure>({
        type: GET_PREVIOUS_WEEKLY_THEMES_SERVICE_FAILURE
      });
    }
  };
};
