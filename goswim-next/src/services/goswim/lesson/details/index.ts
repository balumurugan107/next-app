// import { httpClientGoSwimInstance } from 'src/core/HttpClientGoSwim';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import {
  IRelatedLessonsRes,
  LessonDetailsDocument,
  ScheduleRequestObj,
  UpdateScheduleRequestObj
} from 'src/store/management/goswim/lessons/details';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';

export default class LessonDetailsService {
  private static instance: LessonDetailsService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LessonDetailsService();
    return this.instance;
  }

  getLessonDetails = async (lessonID: string) => {
    //
    try {
      var id = lessonID ? lessonID : 200;

      const response = await httpClientInstance.get<HTTPResponse<LessonDetailsDocument>>(
        `va/v1/goswim/lessons/user/view/${id}`
      );
      return response.data.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  postLessonDetails = async (lessonID: string) => {
    try {
      var id = lessonID ? lessonID : 200;

      const response = await httpClientInstance.post<HTTPResponse>(
        `api/v1/goswim/updateRecents/${id}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  scheduleLesson = async (schedule: ScheduleRequestObj) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>(
        `api/v1/goswim/schedule/lesson`,
        schedule
      );
      SnackbarUtils.success(
        response.data.message ? response.data.message : 'Lesson Scheduled Successfully!!'
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateScheduleLesson = async (schedule: UpdateScheduleRequestObj) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse>(
        `api/v1/goswim/schedule/lesson/${schedule?._id}`,
        schedule
      );
      SnackbarUtils.success(
        response.data.message ? response.data.message : 'Lesson Schedule updated Successfully!!'
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteScheduleLesson = async (lesson_id: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse>(
        `api/v1/goswim/schedule/lesson/${lesson_id}`
      );
      SnackbarUtils.success(
        response.data.message ? response.data.message : 'Lesson Schedule deleted Successfully!!'
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getTodaysLesson = async (group_id: string, timeZone: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<LessonDetailsDocument[]>>(
        `api/v1/goswim/schedule/today?team_id=${group_id}&tz=${timeZone}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getRelatedLessons = async (lessonId: string, page?: number, limit?: number) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IRelatedLessonsRes>>(
        `va/v1/goswim/lessons/related?_id=${lessonId}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      // SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const LessonDetailsInstance = LessonDetailsService.getInstance();
