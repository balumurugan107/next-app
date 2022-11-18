import { Dispatch } from 'redux';
import { adminLessonServiceInstance } from 'src/services/goswim/admin/lessons';
import {
  CreateLessonServiceFailure,
  CreateLessonServiceRequest,
  CreateLessonServiceSuccess,
  CREATE_LESSON_SERVICE_FAILURE,
  CREATE_LESSON_SERVICE_REQUEST,
  CREATE_LESSON_SERVICE_SUCCESS,
  deleteLessonServiceFailure,
  deleteLessonServiceRequest,
  deleteLessonServiceSuccess,
  DELETE_LESSON_SERVICE_FAILURE,
  DELETE_LESSON_SERVICE_REQUEST,
  DELETE_LESSON_SERVICE_SUCCESS,
  GetAllLessonServiceFailure,
  GetAllLessonServiceRequest,
  GetAllLessonServiceSuccess,
  GetFilteredLessonCountServiceFailure,
  GetFilteredLessonCountServiceRequest,
  GetFilteredLessonCountServiceSuccess,
  GetLessonByIdServiceFailure,
  GetLessonByIdServiceRequest,
  GetLessonByIdServiceSuccess,
  GET_ALL_LESSON_SERVICE_FAILURE,
  GET_ALL_LESSON_SERVICE_REQUEST,
  GET_ALL_LESSON_SERVICE_SUCCESS,
  GET_FILTERED_LESSON_COUNT_SERVICE_FAILURE,
  GET_FILTERED_LESSON_COUNT_SERVICE_REQUEST,
  GET_FILTERED_LESSON_COUNT_SERVICE_SUCCESS,
  GET_LESSON_BY_ID_SERVICE_FAILURE,
  GET_LESSON_BY_ID_SERVICE_REQUEST,
  GET_LESSON_BY_ID_SERVICE_SUCCESS,
  ILesson,
  RemoveLessonFromCourseFailure,
  RemoveLessonFromCourseRequest,
  RemoveLessonFromCourseSuccess,
  RemoveLessonThemeState,
  REMOVE_LESSON_FROM_COURSE_FAILURE,
  REMOVE_LESSON_FROM_COURSE_REQUEST,
  REMOVE_LESSON_FROM_COURSE_SUCCESS,
  REMOVE_LESSON_STATE,
  updateLessonServiceFailure,
  updateLessonServiceRequest,
  updateLessonServiceSuccess,
  UPDATE_LESSON_SERVICE_FAILURE,
  UPDATE_LESSON_SERVICE_REQUEST,
  UPDATE_LESSON_SERVICE_SUCCESS
} from './types';

export const createNewLesson = (lesson: ILesson) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CreateLessonServiceRequest>({ type: CREATE_LESSON_SERVICE_REQUEST });
      await adminLessonServiceInstance.createNewLesson(lesson);

      dispatch<CreateLessonServiceSuccess>({
        type: CREATE_LESSON_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<CreateLessonServiceFailure>({ type: CREATE_LESSON_SERVICE_FAILURE });
    }
  };
};

export const getLessonById = (lessonId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetLessonByIdServiceRequest>({ type: GET_LESSON_BY_ID_SERVICE_REQUEST });
      const response = await adminLessonServiceInstance.getLessonById(lessonId);

      dispatch<GetLessonByIdServiceSuccess>({
        type: GET_LESSON_BY_ID_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetLessonByIdServiceFailure>({ type: GET_LESSON_BY_ID_SERVICE_FAILURE });
    }
  };
};

export const getAllLesson = (category: string, expertise: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetAllLessonServiceRequest>({ type: GET_ALL_LESSON_SERVICE_REQUEST });
      const response = await adminLessonServiceInstance.getAllLesson(category, expertise);

      dispatch<GetAllLessonServiceSuccess>({
        type: GET_ALL_LESSON_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetAllLessonServiceFailure>({ type: GET_ALL_LESSON_SERVICE_FAILURE });
    }
  };
};

export const updateLesson = (lessonId: string, lesson: ILesson) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<updateLessonServiceRequest>({ type: UPDATE_LESSON_SERVICE_REQUEST });
      await adminLessonServiceInstance.updateLesson(lessonId, lesson);

      dispatch<updateLessonServiceSuccess>({
        type: UPDATE_LESSON_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<updateLessonServiceFailure>({ type: UPDATE_LESSON_SERVICE_FAILURE });
    }
  };
};

export const deleteLesson = (_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<deleteLessonServiceRequest>({ type: DELETE_LESSON_SERVICE_REQUEST });
      await adminLessonServiceInstance.deleteLesson(_id);

      dispatch<deleteLessonServiceSuccess>({
        type: DELETE_LESSON_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<deleteLessonServiceFailure>({ type: DELETE_LESSON_SERVICE_FAILURE });
    }
  };
};

export const removeAdminLessonFromState = () => {
  return async (dispatch: Dispatch) => {
    dispatch<RemoveLessonThemeState>({ type: REMOVE_LESSON_STATE });
  };
};
export const getFilteredLessonCount = () => {
  return async (dispatch: Dispatch) => {
    try {
      //const payload = await authServiceInstance.loginWithToken({ ...user });

      dispatch<GetFilteredLessonCountServiceRequest>({
        type: GET_FILTERED_LESSON_COUNT_SERVICE_REQUEST
      });
      const response = await adminLessonServiceInstance.getFilteredLessonCount();
      dispatch<GetFilteredLessonCountServiceSuccess>({
        type: GET_FILTERED_LESSON_COUNT_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetFilteredLessonCountServiceFailure>({
        type: GET_FILTERED_LESSON_COUNT_SERVICE_FAILURE,
        error
      });
    }
  };
};

export const removeLessonFromCourse = (lessonId: string, courseId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      //const payload = await authServiceInstance.loginWithToken({ ...user });

      dispatch<RemoveLessonFromCourseRequest>({
        type: REMOVE_LESSON_FROM_COURSE_REQUEST
      });
      await adminLessonServiceInstance.removeLessonFromCourse(lessonId, courseId);
      dispatch<RemoveLessonFromCourseSuccess>({
        type: REMOVE_LESSON_FROM_COURSE_SUCCESS
      });
    } catch (error) {
      dispatch<RemoveLessonFromCourseFailure>({
        type: REMOVE_LESSON_FROM_COURSE_FAILURE,
        error
      });
    }
  };
};
