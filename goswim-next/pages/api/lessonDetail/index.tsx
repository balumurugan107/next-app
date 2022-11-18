import { Dispatch } from 'redux';
import {
  GetLessonDetailssRequest,
  GetLessonDetailssSuccess,
  GetLessonDetailssFailure,
  GET_LESSON_DETAILS_REQUEST,
  GET_LESSON_DETAILS_SUCCESS,
  GET_LESSON_DETAILS_FAILURE,
  RemoveLessonDetail,
  REMOVE_LESSON_DETAIL,
  GetRelatedLessonsRequest,
  GET_RELATED_LESSONS_REQUEST,
  GET_RELATED_LESSONS_SUCCESS,
  GetRelatedLessonsSuccess,
  GetRelatedLessonsFailure,
  GET_RELATED_LESSONS_FAILURE
} from '../../../src/store/management/goswim/lessons/details/types';
import { LessonDetailsInstance } from '../../../src/services/goswim/lesson/details';

export const apiGetLessonDetails = async (dispatch: Dispatch, lesson_id: any) => {
  try {
    dispatch<GetLessonDetailssRequest>({ type: GET_LESSON_DETAILS_REQUEST });
    const response = await LessonDetailsInstance.getLessonDetails(lesson_id);
    dispatch<GetLessonDetailssSuccess>({
      type: GET_LESSON_DETAILS_SUCCESS,
      payload: response
    });
  } catch (error:any) {
    dispatch<GetLessonDetailssFailure>({ type: GET_LESSON_DETAILS_FAILURE, error });
  }
};

export const apiRemoveLessonDetail = async (dispatch: Dispatch) => {
  try {
    dispatch<RemoveLessonDetail>({ type: REMOVE_LESSON_DETAIL });
  } catch (error:any) {}
};

export const apiGetRelatedLessons = async (
  dispatch: Dispatch,
  lesson_id: string,
  page?: number,
  limit?: number
) => {
  try {
    dispatch<GetRelatedLessonsRequest>({ type: GET_RELATED_LESSONS_REQUEST });
    const response = await LessonDetailsInstance.getRelatedLessons(lesson_id, page, limit);
    const payload = response.data;
    payload.pageNumber = page;
    dispatch<GetRelatedLessonsSuccess>({
      type: GET_RELATED_LESSONS_SUCCESS,
      payload: response.data
    });
  } catch (error:any) {
    dispatch<GetRelatedLessonsFailure>({ type: GET_RELATED_LESSONS_FAILURE, error });
  }
};
