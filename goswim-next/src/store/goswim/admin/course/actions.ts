import { Dispatch } from 'redux';
import { adminCourseServiceInstance } from 'src/services/goswim/admin/courses';
import {
  CreateCourseServiceFailure,
  CreateCourseServiceRequest,
  CreateCourseServiceSuccess,
  CreateCourseType,
  CREATE_COURSE_SERVICE_FAILURE,
  CREATE_COURSE_SERVICE_REQUEST,
  CREATE_COURSE_SERVICE_SUCCESS,
  GetCourseServiceFailure,
  GetCourseServiceSuccess,
  GetCourseType,
  GET_COURSE_SERVICE_FAILURE,
  GET_COURSE_SERVICE_REQUEST,
  GET_COURSE_SERVICE_SUCCESS,
  GetCourseByIdServiceFailure,
  GetCourseByIdServiceSuccess,
  GetCourseByIdServiceRequest,
  GET_COURSE_BY_ID_SERVICE_FAILURE,
  GET_COURSE_BY_ID_SERVICE_REQUEST,
  GET_COURSE_BY_ID_SERVICE_SUCCESS,
  RemoveAdminCourseState,
  REMOVE_ADMIN_COURSE_STATE,
  UpdateCourseServiceFailure,
  UpdateCourseServiceRequest,
  UpdateCourseServiceSuccess,
  UPDATE_COURSE_SERVICE_FAILURE,
  UPDATE_COURSE_SERVICE_REQUEST,
  UPDATE_COURSE_SERVICE_SUCCESS,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE
} from '.';
import {
  GetAllCourseServiceFailure,
  GetAllCourseServiceRequest,
  GetAllCourseServiceSuccess,
  GetCourseServiceRequest,
  GET_ALL_COURSE_SERVICE_FAILURE,
  GET_ALL_COURSE_SERVICE_REQUEST,
  GET_ALL_COURSE_SERVICE_SUCCESS,
  DeleteCourseFailure,
  DeleteCourseRequest,
  DeleteCourseSuccess,
  IUpdateLessonPosReq,
  UPDATE_LESSON_POS_FAILURE,
  UPDATE_LESSON_POS_REQUEST,
  UPDATE_LESSON_POS_SUCCESS,
  UpdateLessonPosFailure,
  UpdateLessonPosRequest,
  UpdateLessonPosSuccess
} from './types';

export const removeAdminCoursesFromState = () => {
  return async (dispatch: Dispatch) => {
    dispatch<RemoveAdminCourseState>({ type: REMOVE_ADMIN_COURSE_STATE });
  };
};

export const createNewCourse = (data: CreateCourseType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CreateCourseServiceRequest>({ type: CREATE_COURSE_SERVICE_REQUEST });
      const response = await adminCourseServiceInstance.createNewCourse(data);

      dispatch<CreateCourseServiceSuccess>({
        type: CREATE_COURSE_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<CreateCourseServiceFailure>({ type: CREATE_COURSE_SERVICE_FAILURE });
    }
  };
};

export const updateExistingCourse = (data: CreateCourseType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateCourseServiceRequest>({ type: UPDATE_COURSE_SERVICE_REQUEST });
      await adminCourseServiceInstance.updateExistingCourse(data);

      dispatch<UpdateCourseServiceSuccess>({
        type: UPDATE_COURSE_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<UpdateCourseServiceFailure>({ type: UPDATE_COURSE_SERVICE_FAILURE });
    }
  };
};

export const getCourse = (video: GetCourseType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetCourseServiceRequest>({ type: GET_COURSE_SERVICE_REQUEST });
      const response = await adminCourseServiceInstance.getCourseData(video);

      dispatch<GetCourseServiceSuccess>({
        type: GET_COURSE_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetCourseServiceFailure>({ type: GET_COURSE_SERVICE_FAILURE });
    }
  };
};
export const getCourseById = (id: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetCourseByIdServiceRequest>({ type: GET_COURSE_BY_ID_SERVICE_REQUEST });
      const response = await adminCourseServiceInstance.getCourseById(id);
      dispatch<GetCourseByIdServiceSuccess>({
        type: GET_COURSE_BY_ID_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetCourseByIdServiceFailure>({ type: GET_COURSE_BY_ID_SERVICE_FAILURE });
    }
  };
};

export const getAllCourse = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetAllCourseServiceRequest>({ type: GET_ALL_COURSE_SERVICE_REQUEST });
      const response = await adminCourseServiceInstance.getAllCourseData();

      dispatch<GetAllCourseServiceSuccess>({
        type: GET_ALL_COURSE_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetAllCourseServiceFailure>({ type: GET_ALL_COURSE_SERVICE_FAILURE });
    }
  };
};

export const deleteCourse = (courseId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteCourseRequest>({ type: DELETE_COURSE_REQUEST });

      await adminCourseServiceInstance.deleteCourse(courseId);
      dispatch<DeleteCourseSuccess>({
        type: DELETE_COURSE_SUCCESS
      });
    } catch (error) {
      dispatch<DeleteCourseFailure>({ type: DELETE_COURSE_FAILURE });
    }
  };
};

export const updateLessonPositionInCourse = (updatePositionReq: IUpdateLessonPosReq) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateLessonPosRequest>({ type: UPDATE_LESSON_POS_REQUEST });
      await adminCourseServiceInstance.updateLessonPositionInCourse(updatePositionReq);
      dispatch<UpdateLessonPosSuccess>({
        type: UPDATE_LESSON_POS_SUCCESS
      });
    } catch (error) {
      dispatch<UpdateLessonPosFailure>({ type: UPDATE_LESSON_POS_FAILURE });
    }
  };
};
