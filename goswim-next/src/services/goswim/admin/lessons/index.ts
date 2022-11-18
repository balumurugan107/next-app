import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';
import { IAllLesson, ILesson, ILessonByIdResponse } from 'src/store/goswim/admin/lesson/types';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

export default class AdminLessonService {
  private static instance: AdminLessonService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AdminLessonService();
    return this.instance;
  }

  /* CREATE LESSON */

  createNewLesson = async (lesson: ILesson) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<ILesson>>(
        '/api/v1/goswim/lessons/',
        lesson
      );

      SnackbarUtils.success(response?.data?.message || 'Lesson Created successfully!!');

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  /* GET LESSON BY ID */

  getLessonById = async (lessonId: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<ILessonByIdResponse>>(
        `/api/v1/goswim/lessons/admin/view/${lessonId}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateLesson = async (lessonId: string, lesson: ILesson) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<ILesson>>(
        `/api/v1/goswim/lessons/?_id=${lessonId}`,
        lesson
      );
      SnackbarUtils.success(response?.data?.message || 'Lesson Updated successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getAllLesson = async (category: string, expertise: string) => {
    let stroke = '';
    let expert = '';
    if (category) {
      stroke = `?stroke[]=${category}`;
    }
    if (expertise) {
      expert = `&expertise[]=${expertise}`;
    }
    try {
      const response = await httpClientInstance.get<HTTPResponse<IAllLesson[]>>(
        `api/v1/goswim/lessons/user${stroke}${expert}&isBasic=true`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteLesson = async (_id: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse>(
        `/api/v1/goswim/lessons/?_id=${_id}`
      );
      SnackbarUtils.success(response?.data?.message || 'Lesson Deleted successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getFilteredLessonCount = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(
        '/api/v1/goswim/lessons/filter/list'
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  removeLessonFromCourse = async (lessonId: string, courseId: string) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse>(
        `/api/v1/goswim/lessons/remove/course?_id=${lessonId}&course_id=${courseId}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  /* End of uploadFile.ts */
}

export const adminLessonServiceInstance = AdminLessonService.getInstance();
