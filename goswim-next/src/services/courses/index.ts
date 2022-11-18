// import { httpClientGoSwimInstance } from 'src/core/HttpClientGoSwim';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import {
  CourseListReq,
  CoursesResult,
  ScheduleCourseRequestObj
} from 'src/store/management/courses';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';

export default class CourseService {
  private static instance: CourseService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new CourseService();
    return this.instance;
  }
  scheduleCourse = async (schedule: ScheduleCourseRequestObj) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>(
        `api/v1/goswim/schedule/course`,
        schedule
      );
      SnackbarUtils.success(
        response.data.message ? response.data.message : 'Course schedule success!!',
        defaultOptions
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getCourses = async (courseReq: CourseListReq) => {
    const { pageID, limit, stroke, expertise, adminFilter, search, isAdmin } = courseReq;
    try {
      let condition = '';
      let searchTerm = '';
      let filter = '';
      let page = '';
      let pageLimit = '';
      let userType = isAdmin ? '/admin' : '/user';
      if (pageID) {
        page = `?page=${pageID}`;
      } else {
        page = '';
      }
      if (limit) {
        pageLimit = `&limit=${limit}`;
      } else {
        pageLimit = '';
      }
      if (stroke && expertise) {
        condition = `&stroke[]=${stroke}&expertise[]=${expertise}`;
      } else if (stroke) {
        condition = `&stroke[]=${stroke}`;
      } else if (expertise) {
        condition = `&expertise[]=${expertise}`;
      }
      if (search) {
        searchTerm = `&search=${search}`;
      } else if (search === null || search === undefined) {
        searchTerm = '';
      }
      if (adminFilter === 0 || adminFilter) {
        filter = `&filter=${adminFilter}`;
      } else if (adminFilter === null) {
        filter = '';
      }
      const response = await httpClientInstance.get<HTTPResponse<CoursesResult>>(
        //`ios/courses.json?user_email=munesan.m@aximsoft.com&user_token=-YcXGK2fRYNiiWRVdkVf&stroke=Backstroke`
        `va/v1/goswim/courses${userType}${page}${pageLimit}${condition}${searchTerm}${filter}`
      );
      console.log(response,"ressss!!!!")
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
        `va/v1/goswim/taggings/${tagType}`
      );
      console.log(response,"get filter data service")
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const CourseServiceInstance = CourseService.getInstance();
