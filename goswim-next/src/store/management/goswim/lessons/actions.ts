import { apiGetLessons } from 'pages/api/lessons';
import { Dispatch } from 'redux';
import { getLessonArgs } from 'src/constants';
import { LessonServiceInstance } from 'src/services/goswim/lesson';
import {
  GetCourseDetailServiceFailure,
  GetCourseDetailServiceRequest,
  GetCourseDetailServiceSuccess,
  GET_COURSE_DETAIL_SERVICE_FAILURE,
  GET_COURSE_DETAIL_SERVICE_REQUEST,
  GET_COURSE_DETAIL_SERVICE_SUCCESS,
  RemoveALlLessons,
  REMOVE_ALL_LESSON_LIST,
  SET_LESSON_SEARCH_TEXT,
  setLessonSearchTextType
} from 'src/store/management/goswim/lessons/types';

export const getLessons = (getLessonReqArgs: getLessonArgs) => {
  return async (dispatch: Dispatch) => {
    apiGetLessons(dispatch, getLessonReqArgs);
  };
};

export const removeAllLessons = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<RemoveALlLessons>({ type: REMOVE_ALL_LESSON_LIST });
    } catch (error) {}
  };
};

export const setLessonSearchText = (text: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<setLessonSearchTextType>({
        type: SET_LESSON_SEARCH_TEXT,
        payload: { text }
      });
    } catch (error) {}
  };
};

export const getCourseDetails = (course_id: string | string[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetCourseDetailServiceRequest>({ type: GET_COURSE_DETAIL_SERVICE_REQUEST });
      const response = await LessonServiceInstance.getCourseDetails(course_id);

      dispatch<GetCourseDetailServiceSuccess>({
        type: GET_COURSE_DETAIL_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetCourseDetailServiceFailure>({ type: GET_COURSE_DETAIL_SERVICE_FAILURE, error });
    }
  };
};
export const getFilteredDataCount = (course_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetCourseDetailServiceRequest>({ type: GET_COURSE_DETAIL_SERVICE_REQUEST });
      const response = await LessonServiceInstance.getCourseDetails(course_id);

      dispatch<GetCourseDetailServiceSuccess>({
        type: GET_COURSE_DETAIL_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetCourseDetailServiceFailure>({ type: GET_COURSE_DETAIL_SERVICE_FAILURE, error });
    }
  };
};
