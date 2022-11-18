import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';
import {
  CreateCourseType,
  GetCourseByIdType,
  GetCourseType,
  IAllCourse,
  IUpdateLessonPosReq
} from 'src/store/goswim/admin/course';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

export default class AdminCourseService {
  private static instance: AdminCourseService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AdminCourseService();
    return this.instance;
  }

  createNewCourse = async (data: CreateCourseType) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>('/api/v1/goswim/courses/', data);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateExistingCourse = async (data: CreateCourseType) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse>(
        `/api/v1/goswim/courses?_id=${data._id}`,
        data
      );
      SnackbarUtils.success(response.data.message || 'Course updated!!', defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getCourseData = async (video: GetCourseType) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<CreateCourseType[]>>(
        `/api/v1/goswim/courses`,
        video
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getCourseById = async (id: string | null) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<GetCourseByIdType>>(
        `/api/v1/goswim/courses/admin/view/${id}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  deleteCourse = async (courseId: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse>(
        `api/v1/goswim/courses/?_id=${courseId}`
      );
      SnackbarUtils.success(
        response.data.message || 'Course Deleted Successfully!!',
        defaultOptions
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getAllCourseData = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IAllCourse[]>>(
        `/api/v1/goswim/courses/list`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateLessonPositionInCourse = async (updatePositionReq: IUpdateLessonPosReq) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse>(
        `/api/v1/goswim/courses/update/position?position=${updatePositionReq.position}&lesson_id=${updatePositionReq.lesson_id}&course_id=${updatePositionReq.course_id}`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  /* End of uploadFile.ts */
}

export const adminCourseServiceInstance = AdminCourseService.getInstance();
