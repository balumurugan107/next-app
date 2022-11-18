import { apiGetCourses } from 'pages/api/courses';
import { Dispatch } from 'redux';
import { CourseServiceInstance } from 'src/services/courses';
import {
  GetCourseServicesFailure,
  GetCourseServicesRequest,
  GetCourseServicesSuccess,
  GET_COURSE_SERVICES_FAILURE,
  GET_COURSE_SERVICES_REQUEST,
  GET_COURSE_SERVICES_SUCCESS,
  GET_FILTER_DATA_REQUEST,
  GET_FILTER_DATA_SUCCESS,
  GET_FILTER_DATA_FAILURE,
  REMOVE_ALL_COURSES_LIST,
  RemoveAllCourses,
  GetFilterDataServicesRequest,
  GetFilterDataServicesFailure,
  setCourseSearchTextType,
  ScheduleCourseFailure,
  ScheduleCourseRequest,
  ScheduleCourseRequestObj,
  ScheduleCourseSuccess,
  SCHEDULE_COURSE_FAILURE,
  SCHEDULE_COURSE_REQUEST,
  SCHEDULE_COURSE_SUCCESS
} from 'src/store/management/courses/types';
import { CourseListReq, GetFilterDataServicesSuccess, SET_COURSE_SEARCH_TEXT } from '.';

export const getCourse = (courseReq: CourseListReq) => {
  return async (dispatch: Dispatch) => {
    apiGetCourses(dispatch, courseReq);
  };
};

export const setCourseSearchText = (text: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<setCourseSearchTextType>({
        type: SET_COURSE_SEARCH_TEXT,
        payload: { text }
      });
    } catch (error) {}
  };
};

export const scheduleCourse = (schedule: ScheduleCourseRequestObj) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ScheduleCourseRequest>({ type: SCHEDULE_COURSE_REQUEST });
      await CourseServiceInstance.scheduleCourse(schedule);
      dispatch<ScheduleCourseSuccess>({
        type: SCHEDULE_COURSE_SUCCESS
      });
    } catch (error) {
      dispatch<ScheduleCourseFailure>({ type: SCHEDULE_COURSE_FAILURE, error });
    }
  };
};
export const getFilterData = (tagType: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetFilterDataServicesRequest>({ type: GET_FILTER_DATA_REQUEST });
      const response = await CourseServiceInstance.getFilterData(tagType);

      dispatch<GetFilterDataServicesSuccess>({
        type: GET_FILTER_DATA_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetFilterDataServicesFailure>({ type: GET_FILTER_DATA_FAILURE, error });
    }
  };
};

export const removeAllCourses = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<RemoveAllCourses>({ type: REMOVE_ALL_COURSES_LIST });
    } catch (error) {}
  };
};
