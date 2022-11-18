import { apiGetFavourites } from 'pages/api/favourites';
import { apiGetLessonsFilterData } from 'pages/api/lessons';
import { Dispatch } from 'redux';
import { ToggleButton } from 'src/constants';
import { LessonServiceInstance } from 'src/services/lesson';
import {
  DeleteLessonServicesFailure,
  DeleteLessonServicesRequest,
  DeleteLessonServicesSuccess,
  DELETE_LESSON_SERVICES_FAILURE,
  DELETE_LESSON_SERVICES_REQUEST,
  DELETE_LESSON_SERVICES_SUCCESS,
  GetLessonServicesFailure,
  GetLessonServicesRequest,
  GetLessonServicesSuccess,
  GET_LESSON_SERVICES_FAILURE,
  GET_LESSON_SERVICES_REQUEST,
  GET_LESSON_SERVICES_SUCCESS,
  LessonServiceIds,
  LessonServicePayload,
  SaveLessonServicesFailure,
  SaveLessonServicesRequest,
  SaveLessonServicesSuccess,
  SAVE_LESSON_SERVICES_FAILURE,
  SAVE_LESSON_SERVICES_REQUEST,
  SAVE_LESSON_SERVICES_SUCCESS,
  UpdateLessonServicesFailure,
  UpdateLessonServicesRequest,
  UpdateLessonServicesSuccess,
  UPDATE_LESSON_SERVICES_FAILURE,
  UPDATE_LESSON_SERVICES_REQUEST,
  UPDATE_LESSON_SERVICES_SUCCESS
} from 'src/store/management/lessons/types';

export const getLessonFilterData = (tagType: string) => {
  return async (dispatch: Dispatch) => {
    apiGetLessonsFilterData(dispatch, tagType);
  };
};

export const getFavourites = () => {
  return async (dispatch: Dispatch) => {
    await apiGetFavourites(dispatch);
  };
};

export const getLesson = (type: ToggleButton) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetLessonServicesRequest>({ type: GET_LESSON_SERVICES_REQUEST });
      const response = await LessonServiceInstance.getLesson(type);
      dispatch<GetLessonServicesSuccess>({
        type: GET_LESSON_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetLessonServicesFailure>({ type: GET_LESSON_SERVICES_FAILURE, error });
    }
  };
};

export const updateLesson = (payload: LessonServicePayload[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateLessonServicesRequest>({ type: UPDATE_LESSON_SERVICES_REQUEST });

      const response = await LessonServiceInstance.updateLesson(payload);

      dispatch<UpdateLessonServicesSuccess>({
        type: UPDATE_LESSON_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UpdateLessonServicesFailure>({ type: UPDATE_LESSON_SERVICES_FAILURE, error });
    }
  };
};

export const deleteLessonServices = (payload: LessonServiceIds) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteLessonServicesRequest>({ type: DELETE_LESSON_SERVICES_REQUEST });

      await LessonServiceInstance.deleteLesson(payload);

      dispatch<DeleteLessonServicesSuccess>({
        type: DELETE_LESSON_SERVICES_SUCCESS
      });
    } catch (error) {
      dispatch<DeleteLessonServicesFailure>({ type: DELETE_LESSON_SERVICES_FAILURE, error });
    }
  };
};
export const saveLesson = (payload: LessonServicePayload[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SaveLessonServicesRequest>({ type: SAVE_LESSON_SERVICES_REQUEST, payload });

      const response = await LessonServiceInstance.saveLesson(payload);

      dispatch<SaveLessonServicesSuccess>({
        type: SAVE_LESSON_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<SaveLessonServicesFailure>({ type: SAVE_LESSON_SERVICES_FAILURE, error });
    }
  };
};
