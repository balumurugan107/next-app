import { httpClientInstance } from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';
import { HTTPResponse } from 'src/types';
import {
  defaultOptions,
  defaultErrorMessage,
  ToggleButton,
  LessonServiceMessages
} from 'src/constants';
import {
  IFavData,
  LessonServiceDocument,
  LessonServiceIds,
  LessonServicePayload
} from 'src/store/management/lessons';

export default class LessonService {
  private static instance: LessonService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LessonService();
    return this.instance;
  }

  saveLesson = async (payload: LessonServicePayload[]) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>(
        `api/v1/schedule/lessons`,
        payload
      );
      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getLesson = async (type: ToggleButton) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<LessonServiceDocument[]>>(
        `api/v1/schedule/lessons/?type=${type}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateLesson = async (payload: LessonServicePayload[]) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<LessonServiceDocument[]>>(
        `/api/v1/schedule/lessons/`,
        payload
      );
      SnackbarUtils.success(LessonServiceMessages.UPDATE_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteLesson = async (payload: LessonServiceIds) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse<LessonServiceIds>>(
        `/api/v1/schedule/lessons/`,
        payload
      );
      SnackbarUtils.success(LessonServiceMessages.DELETE_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getFilterData = async (tagType: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(
        //`ios/courses.json?user_email=munesan.m@aximsoft.com&user_token=-YcXGK2fRYNiiWRVdkVf&stroke=Backstroke`
        `api/v1/goswim/taggings/${tagType}`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      // throw error;
    }
  };

  postFavorite = async (lesson_id: string) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>(
        `/api/v1/goswim/lessons/favourite/${lesson_id}`
      );
      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteFavorite = async (lesson_id: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse>(
        `/api/v1/goswim/lessons/favourite/${lesson_id}`
        // payload
      );
      SnackbarUtils.success(response.data.message, defaultOptions);

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getFavourites = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IFavData>>(
        `api/v1/goswim/lessons/favourites`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const LessonServiceInstance = LessonService.getInstance();
