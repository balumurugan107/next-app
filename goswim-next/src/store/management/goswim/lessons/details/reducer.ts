import produce from 'immer';

import {
  LessonDetailsState,
  DetailsActionType,
  GET_LESSON_DETAILS_REQUEST,
  GET_LESSON_DETAILS_SUCCESS,
  GET_LESSON_DETAILS_FAILURE,
  SCHEDULE_LESSON_REQUEST,
  SCHEDULE_LESSON_FAILURE,
  GET_TODAYS_LESSON_SUCCESS,
  GET_TODAYS_LESSON_REQUEST,
  GET_TODAYS_LESSON_FAILURE,
  DELETE_SCHEDULE_LESSON_FAILURE,
  DELETE_SCHEDULE_LESSON_REQUEST,
  DELETE_SCHEDULE_LESSON_SUCCESS,
  REMOVE_LESSON_DETAIL,
  UPDATE_SCHEDULE_LESSON_DRAG_SUCCESS,
  UPDATE_SCHEDULED_UPDATED_SUCCESS
} from 'src/store/management/goswim/lessons/details/types';
import {
  DELETE_FAVORITE_SERVICES_FAILURE,
  DELETE_FAVORITE_SERVICES_REQUEST,
  DELETE_FAVORITE_SERVICES_SUCCESS,
  GET_RELATED_LESSONS_FAILURE,
  GET_RELATED_LESSONS_REQUEST,
  GET_RELATED_LESSONS_SUCCESS,
  SAVE_FAVORITE_SERVICES_FAILURE,
  SAVE_FAVORITE_SERVICES_REQUEST,
  SAVE_FAVORITE_SERVICES_SUCCESS,
  SCHEDULE_LESSON_SUCCESS,
  UPDATE_SCHEDULE_LESSON_FAILURE,
  UPDATE_SCHEDULE_LESSON_REQUEST,
  UPDATE_SCHEDULE_LESSON_SUCCESS
} from '.';

const initialState: LessonDetailsState = {
  isLoading: false,
  lessonScheduled: false,
  lessonScheduledUpdated: false,
  isFavorite: false,
  error: null,
  lessonDetails: null,
  todaysLesson: null,
  isDeleted: false,
  isUpdateFailed: false,
  relatedLessons: {
    results: null,
    totalCount: 0,
    pageNumber: 0
  }
};

export const lessonDetailsReducer = (state = initialState, action: DetailsActionType) => {
  switch (action.type) {
    case GET_LESSON_DETAILS_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_LESSON_DETAILS_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessonDetails = action.payload;
      });
    }

    case GET_LESSON_DETAILS_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case SCHEDULE_LESSON_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.lessonScheduledUpdated = false;
      });
    }

    case SCHEDULE_LESSON_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case UPDATE_SCHEDULE_LESSON_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isUpdateFailed = false;
        draft.lessonScheduledUpdated = true;
      });
    }
    case UPDATE_SCHEDULE_LESSON_DRAG_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isUpdateFailed = false;
        draft.lessonScheduledUpdated = true;
      });
    }

    case UPDATE_SCHEDULE_LESSON_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isUpdateFailed = false;
        draft.lessonScheduledUpdated = false;
      });
    }

    case UPDATE_SCHEDULED_UPDATED_SUCCESS: {
      return produce(state, draft => {
        draft.lessonScheduledUpdated = false;
      });
    }

    case UPDATE_SCHEDULE_LESSON_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isUpdateFailed = true;
        draft.lessonScheduledUpdated = false;
        draft.error = action.error;
      });
    }

    case DELETE_SCHEDULE_LESSON_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isDeleted = true;
      });
    }

    case DELETE_SCHEDULE_LESSON_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isDeleted = false;
      });
    }

    case DELETE_SCHEDULE_LESSON_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isDeleted = false;
        draft.error = action.error;
      });
    }

    case SCHEDULE_LESSON_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessonScheduled = true;
      });
    }

    case GET_TODAYS_LESSON_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_TODAYS_LESSON_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.todaysLesson = action.payload;
      });
    }

    case GET_TODAYS_LESSON_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case SAVE_FAVORITE_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isFavorite = false;
      });
    }

    case SAVE_FAVORITE_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isFavorite = true;
        // draft.lessonDetails?._id = action.payload;
      });
    }

    case SAVE_FAVORITE_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isFavorite = false;
      });
    }

    case DELETE_FAVORITE_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isFavorite = false;
      });
    }

    case DELETE_FAVORITE_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isFavorite = false;
      });
    }

    case DELETE_FAVORITE_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
        draft.isFavorite = true;
      });
    }

    case REMOVE_LESSON_DETAIL: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessonScheduled = false;
        draft.lessonScheduledUpdated = false;
        draft.isFavorite = false;
        draft.error = null;
        draft.lessonDetails = null;
        draft.todaysLesson = null;
        draft.isDeleted = false;
      });
    }
    case GET_RELATED_LESSONS_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = false; // For related lessons loading not required.
      });
    }

    case GET_RELATED_LESSONS_SUCCESS: {
      const result =
        action.payload.pageNumber && action.payload.pageNumber === 1
          ? action.payload.results
          : action.payload.results &&
            state.relatedLessons.results && [
              ...state.relatedLessons.results,
              ...action.payload.results
            ];

      const totalCount = action.payload.totalCount;
      return produce(state, draft => {
        draft.isLoading = false;
        draft.relatedLessons = {
          results: result,
          totalCount: totalCount
        };
      });
    }

    case GET_RELATED_LESSONS_FAILURE: {
      return produce(state, draft => {
        draft.relatedLessons.results = [];
        draft.relatedLessons.totalCount = 0;
        draft.isLoading = false;
        draft.error = action.error;
      });
    }
    default:
      return state;
  }
};
