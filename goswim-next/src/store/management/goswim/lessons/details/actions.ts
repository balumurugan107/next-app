import {
  apiGetLessonDetails,
  apiGetRelatedLessons,
  apiRemoveLessonDetail
} from 'pages/api/lessonDetail';
import { Dispatch } from 'redux';
import { LessonDetailsInstance } from 'src/services/goswim/lesson/details';
import { LessonServiceInstance } from 'src/services/lesson';
import {
  ScheduleRequestObj,
  ScheduleLessonRequest,
  ScheduleLessonFailure,
  ScheduleLessonSuccess,
  GetLessonDetailssFailure,
  GetLessonDetailssRequest,
  GetLessonDetailssSuccess,
  PostLessonDetailsFailure,
  GET_LESSON_DETAILS_FAILURE,
  GET_LESSON_DETAILS_REQUEST,
  GET_LESSON_DETAILS_SUCCESS,
  POST_LESSON_DETAILS_FAILURE,
  SCHEDULE_LESSON_REQUEST,
  SCHEDULE_LESSON_SUCCESS,
  SCHEDULE_LESSON_FAILURE,
  DeleteScheduleLessonFailure,
  DeleteScheduleLessonRequest,
  DeleteScheduleLessonSuccess,
  DELETE_SCHEDULE_LESSON_FAILURE,
  DELETE_SCHEDULE_LESSON_REQUEST,
  DELETE_SCHEDULE_LESSON_SUCCESS,
  SaveFavoriteServicesFailure,
  SaveFavoriteServicesRequest,
  SaveFavoriteServicesSuccess,
  SAVE_FAVORITE_SERVICES_FAILURE,
  SAVE_FAVORITE_SERVICES_REQUEST,
  SAVE_FAVORITE_SERVICES_SUCCESS,
  DeleteFavoriteFailure,
  DeleteFavoriteRequest,
  DeleteFavoriteSuccess,
  DELETE_FAVORITE_SERVICES_FAILURE,
  DELETE_FAVORITE_SERVICES_REQUEST,
  DELETE_FAVORITE_SERVICES_SUCCESS,
  RemoveLessonDetail,
  REMOVE_LESSON_DETAIL,
  UpdateScheduleLessonDragSuccess,
  UPDATE_SCHEDULE_LESSON_DRAG_SUCCESS,
  UpdateScheduledUpdatedSuccess,
  UPDATE_SCHEDULED_UPDATED_SUCCESS
} from 'src/store/management/goswim/lessons//details/types';
import {
  GetRelatedLessonsFailure,
  GetRelatedLessonsRequest,
  GetRelatedLessonsSuccess,
  GetTodaysLessonFailure,
  GetTodaysLessonRequest,
  GetTodaysLessonSuccess,
  GET_RELATED_LESSONS_FAILURE,
  GET_RELATED_LESSONS_REQUEST,
  GET_RELATED_LESSONS_SUCCESS,
  GET_TODAYS_LESSON_FAILURE,
  GET_TODAYS_LESSON_REQUEST,
  GET_TODAYS_LESSON_SUCCESS,
  UpdateScheduleLessonFailure,
  UpdateScheduleLessonRequest,
  UpdateScheduleLessonSuccess,
  UpdateScheduleRequestObj,
  UPDATE_SCHEDULE_LESSON_FAILURE,
  UPDATE_SCHEDULE_LESSON_REQUEST,
  UPDATE_SCHEDULE_LESSON_SUCCESS
} from '.';

export const getLessonDetails = (lesson_id: any) => {
  return async (dispatch: Dispatch) => {
    await apiGetLessonDetails(dispatch, lesson_id);
  };
};

export const removeLessonDetail = () => {
  return async (dispatch: Dispatch) => {
    await apiRemoveLessonDetail(dispatch);
  };
};
export const getRelatedLessons = (lesson_id: string, page?: number, limit?: number) => {
  return async (dispatch: Dispatch) => {
    await apiGetRelatedLessons(dispatch, lesson_id, page, limit);
  };
};
export const getTodaysLesson = (
  group_id: string,
  timeZone: string,
  isFavoriteClicked?: boolean
) => {
  return async (dispatch: Dispatch) => {
    try {
      if (!isFavoriteClicked) dispatch<GetTodaysLessonRequest>({ type: GET_TODAYS_LESSON_REQUEST });
      const response = await LessonDetailsInstance.getTodaysLesson(group_id, timeZone);
      if (response.data.length > 0) {
        dispatch<GetTodaysLessonSuccess>({
          type: GET_TODAYS_LESSON_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch<GetTodaysLessonSuccess>({
          type: GET_TODAYS_LESSON_SUCCESS,
          payload: null
        });
      }
    } catch (error) {
      dispatch<GetTodaysLessonFailure>({ type: GET_TODAYS_LESSON_FAILURE, error });
    }
  };
};

export const postLesson = (lesson_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await LessonDetailsInstance.postLessonDetails(lesson_id);
    } catch (error) {
      dispatch<PostLessonDetailsFailure>({ type: POST_LESSON_DETAILS_FAILURE, error });
    }
  };
};

export const scheduleLesson = (schedule: ScheduleRequestObj) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ScheduleLessonRequest>({ type: SCHEDULE_LESSON_REQUEST });
      const response = await LessonDetailsInstance.scheduleLesson(schedule);
      dispatch<ScheduleLessonSuccess>({
        type: SCHEDULE_LESSON_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<ScheduleLessonFailure>({ type: SCHEDULE_LESSON_FAILURE, error });
    }
  };
};

export const updateScheduleLesson = (schedule: UpdateScheduleRequestObj) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateScheduleLessonRequest>({ type: UPDATE_SCHEDULE_LESSON_REQUEST });

      await LessonDetailsInstance.updateScheduleLesson(schedule);
      if (schedule.isDragged) {
        dispatch<UpdateScheduleLessonDragSuccess>({
          type: UPDATE_SCHEDULE_LESSON_DRAG_SUCCESS
        });
      } else {
        dispatch<UpdateScheduleLessonSuccess>({
          type: UPDATE_SCHEDULE_LESSON_SUCCESS
        });
      }
    } catch (error) {
      dispatch<UpdateScheduleLessonFailure>({ type: UPDATE_SCHEDULE_LESSON_FAILURE, error });
    }
  };
};

export const deleteScheduleLesson = (lesson_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteScheduleLessonRequest>({ type: DELETE_SCHEDULE_LESSON_REQUEST });
      await LessonDetailsInstance.deleteScheduleLesson(lesson_id);
      dispatch<DeleteScheduleLessonSuccess>({
        type: DELETE_SCHEDULE_LESSON_SUCCESS
      });
    } catch (error) {
      dispatch<DeleteScheduleLessonFailure>({ type: DELETE_SCHEDULE_LESSON_FAILURE, error });
    }
  };
};

export const postFavorite = (lesson_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SaveFavoriteServicesRequest>({ type: SAVE_FAVORITE_SERVICES_REQUEST });

      await LessonServiceInstance.postFavorite(lesson_id);

      dispatch<SaveFavoriteServicesSuccess>({
        type: SAVE_FAVORITE_SERVICES_SUCCESS
      });
    } catch (error) {
      dispatch<SaveFavoriteServicesFailure>({ type: SAVE_FAVORITE_SERVICES_FAILURE, error });
    }
  };
};

export const deleteFavorite = (lesson_id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteFavoriteRequest>({ type: DELETE_FAVORITE_SERVICES_REQUEST });
      await LessonServiceInstance.deleteFavorite(lesson_id);
      dispatch<DeleteFavoriteSuccess>({
        type: DELETE_FAVORITE_SERVICES_SUCCESS
      });
    } catch (error) {
      dispatch<DeleteFavoriteFailure>({ type: DELETE_FAVORITE_SERVICES_FAILURE, error });
    }
  };
};

export const setFavourite = (favorite: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      if (favorite) {
        dispatch<SaveFavoriteServicesSuccess>({
          type: SAVE_FAVORITE_SERVICES_SUCCESS
        });
      } else {
        dispatch<DeleteFavoriteSuccess>({
          type: DELETE_FAVORITE_SERVICES_SUCCESS
        });
      }
    } catch (error) {
      dispatch<DeleteFavoriteFailure>({ type: DELETE_FAVORITE_SERVICES_FAILURE, error });
    }
  };
};
export const updateScheduleUpdated = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateScheduledUpdatedSuccess>({
        type: UPDATE_SCHEDULED_UPDATED_SUCCESS
      });
    } catch (error) {
      console.error(error);
    }
  };
};
