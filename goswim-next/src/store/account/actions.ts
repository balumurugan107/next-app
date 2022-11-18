import { authServiceInstance } from 'src/services/account/authService';
import { profileServiceInstance } from 'src/services/account/profileService';
import { FormikCommonProps } from 'src/types/components';
import { Dispatch } from 'redux';
import { UserLogin } from 'src/types';
import { UserSignUp } from 'src/types/signup';
import { persistor } from 'src/store';
import {
  UpdateUserProfile,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ACCESS_TOKEN_SUCCESS,
  LOGIN_FAILURE,
  SILENT_LOGIN,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  LOGOUT,
  UPDATE_PROFILE_STATUS,
  UPDATE_CURRENT_TAB,
  UPDATE_CURRENT_TAB_FAILURE,
  ACTIVATE_ROUTES,
  ActivateRoutes,
  DEACTIVATE_ROUTES,
  DeActivateRoutes,
  SaveSettingsFailure,
  SaveSettingsRequest,
  SaveSettingsSuccess,
  SAVE_SETTINGS_FAILURE,
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  UploadProfileImgToS3Success,
  UploadProfileImgToS3Failure,
  UploadProfileImgToS3Request,
  UPLOAD_PROFILE_IMG_TO_S3_FAILURE,
  UPLOAD_PROFILE_IMG_TO_S3_REQUEST,
  UPLOAD_PROFILE_IMG_TO_S3_SUCCESS
} from 'src/store/account/types';
import { AxiosError } from 'axios';
import { InitialValues as SettingsData } from 'src/views/pages/AccountView/Settings/FormModel';
import { IsSubscriptionExpired, IS_SUBSCRIPTION_EXPIRED } from '.';
import { UploadVideoToS3ServiceInstance } from 'src/services/goswim/admin/videos/S3UploadJs';
import { apiGetUserProfile } from 'pages/api/account';
import { NextRouter } from 'next/router';

export const login = (user: UserLogin) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: LOGIN_REQUEST });

      const payload = await authServiceInstance.loginWithToken({ ...user });
      dispatch({
        type: ACCESS_TOKEN_SUCCESS,
        payload
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error });
      throw error;
    }
  };
};

export const signUp = (user: UserSignUp, router: NextRouter) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: SIGNUP_REQUEST });
      const payload = await authServiceInstance.signUp({ ...user });
      router.push(`/users/sign_in`);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error });
      throw error;
    }
  };
};

export const setUserData = (user: any) => {
  return (dispatch: Dispatch) =>
    dispatch({
      type: SILENT_LOGIN,
      payload: {
        user
      }
    });
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    await persistor.flush();
    await persistor.purge();
    dispatch({
      type: LOGOUT
    });
  };
};

export const register = (values?: FormikCommonProps) => {
  return true;
};

export const updateProfile = (update: UpdateUserProfile) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const user = await profileServiceInstance.updateProfile(update);

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch<{ type: string; error: AxiosError }>({ type: UPDATE_PROFILE_FAILURE, error });
      throw error;
    }
  };
};

export const uploadProfileImgToS3Bucket = (file: any, memberId: string | undefined) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadProfileImgToS3Request>({ type: UPLOAD_PROFILE_IMG_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadProfileFile(file, memberId);

      dispatch<UploadProfileImgToS3Success>({
        type: UPLOAD_PROFILE_IMG_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadProfileImgToS3Failure>({ type: UPLOAD_PROFILE_IMG_TO_S3_FAILURE });
    }
  };
};

export const updateProfileStatus = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_STATUS
      });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE });
      throw error;
    }
  };
};

export const getProfile = () => {
  return async (dispatch: Dispatch) => {
    apiGetUserProfile(dispatch);
  };
};

export const updateCurrentTab = (tab: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const currentTab = tab;
      dispatch({
        type: UPDATE_CURRENT_TAB,
        payload: {
          currentTab
        }
      });
    } catch (error) {
      dispatch({ type: UPDATE_CURRENT_TAB_FAILURE });
      throw error;
    }
  };
};

export const activateRoutes = () => (dispatch: Dispatch) => {
  dispatch<ActivateRoutes>({
    type: ACTIVATE_ROUTES
  });
};

export const deactivateRoutes = () => (dispatch: Dispatch) => {
  dispatch<DeActivateRoutes>({
    type: DEACTIVATE_ROUTES
  });
};
export const isSubscriptionExpired = () => (dispatch: Dispatch) => {
  dispatch<IsSubscriptionExpired>({
    type: IS_SUBSCRIPTION_EXPIRED
  });
};

export const saveSettings = (settingsData: SettingsData) => async (dispatch: Dispatch) => {
  try {
    dispatch<SaveSettingsRequest>({ type: SAVE_SETTINGS_REQUEST });
    const payload = await profileServiceInstance.saveSettings(settingsData);
    dispatch<SaveSettingsSuccess>({
      type: SAVE_SETTINGS_SUCCESS,
      payload: {
        user: payload
      }
    });
  } catch (error) {
    dispatch<SaveSettingsFailure>({
      type: SAVE_SETTINGS_FAILURE,
      error
    });
  }
};
