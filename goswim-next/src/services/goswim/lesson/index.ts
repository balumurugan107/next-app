// import { HttpClientResponse } from 'src/core/HttpClientGoSwim';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage, getLessonArgs } from 'src/constants';
import { CourseResult, LessonsResult } from 'src/store/management/goswim/lessons';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';

export default class LessonService {
  private static instance: LessonService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LessonService();
    return this.instance;
  }

  getLessons = async (lessonReqArgs: getLessonArgs) => {
    try {
      let page_id = '';
      let limit_count = '';
      let course = '';
      let searchTerm = '';
      let condition = '';
      let optionState = '';

      let userType = lessonReqArgs.isAdmin ? '/admin' : '/user';
      let basic = lessonReqArgs.isBasic ? `?isBasic=${lessonReqArgs.isBasic}` : ``;
      if (lessonReqArgs.pageID) {
        page_id = `?page=${lessonReqArgs.pageID}`;
      }
      if (lessonReqArgs.limit) {
        limit_count = `&limit=${lessonReqArgs.limit}`;
      }

      if (lessonReqArgs.course_id && lessonReqArgs.pageID) {
        course = `&courseId[]=${lessonReqArgs.course_id}`;
      } else if (lessonReqArgs.course_id) course = `?courseId[]=${lessonReqArgs.course_id}`;
      if (lessonReqArgs.state === 0 || lessonReqArgs.state) {
        optionState = `&state=${lessonReqArgs.state}`;
      }
      if (lessonReqArgs.stroke === 'all') {
        lessonReqArgs.stroke = undefined;
      }
      if (lessonReqArgs.stroke) {
        condition = `${condition}&stroke[]=${lessonReqArgs.stroke}`;
      }
      if (lessonReqArgs.expertise) {
        condition = `${condition}&expertise[]=${lessonReqArgs.expertise}`;
      }
      if (lessonReqArgs.tags) {
        condition = `${condition}&tags[]=${lessonReqArgs.tags}`;
      }
      if (lessonReqArgs.search) {
        searchTerm = `&search=${lessonReqArgs.search}`;
      } else searchTerm = '';

      const response = await httpClientInstance.get<HTTPResponse<LessonsResult>>(
        //`ios/courses.json?user_email=munesan.m@aximsoft.com&user_token=-YcXGK2fRYNiiWRVdkVf&stroke=Backstroke`
        `va/v1/goswim/lessons${userType}${basic}${page_id}${limit_count}${course}${optionState}${condition}${searchTerm}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getCourseDetails = async (course_id: string | string[]) => {
    try {
      var courseID = typeof course_id === 'string' ? course_id : course_id[0];
      const response = await httpClientInstance.get<HTTPResponse<CourseResult>>(
        `va/v1/goswim/courses/user/view/${courseID}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getFilteredDataCount = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(
        `api/v1/goswim/lessons/filter/list`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const LessonServiceInstance = LessonService.getInstance();
