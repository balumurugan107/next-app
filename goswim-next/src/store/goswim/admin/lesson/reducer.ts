import produce from 'immer';
import {
  AdminLessonActionType,
  AdminLessonState,
  CREATE_LESSON_SERVICE_FAILURE,
  CREATE_LESSON_SERVICE_REQUEST,
  CREATE_LESSON_SERVICE_SUCCESS,
  DELETE_LESSON_SERVICE_FAILURE,
  DELETE_LESSON_SERVICE_REQUEST,
  DELETE_LESSON_SERVICE_SUCCESS,
  GET_ALL_LESSON_SERVICE_FAILURE,
  GET_ALL_LESSON_SERVICE_REQUEST,
  GET_ALL_LESSON_SERVICE_SUCCESS,
  GET_FILTERED_LESSON_COUNT_SERVICE_FAILURE,
  GET_FILTERED_LESSON_COUNT_SERVICE_REQUEST,
  GET_FILTERED_LESSON_COUNT_SERVICE_SUCCESS,
  GET_LESSON_BY_ID_SERVICE_FAILURE,
  GET_LESSON_BY_ID_SERVICE_REQUEST,
  GET_LESSON_BY_ID_SERVICE_SUCCESS,
  REMOVE_LESSON_FROM_COURSE_FAILURE,
  REMOVE_LESSON_FROM_COURSE_REQUEST,
  REMOVE_LESSON_FROM_COURSE_SUCCESS,
  REMOVE_LESSON_STATE,
  UPDATE_LESSON_SERVICE_FAILURE,
  UPDATE_LESSON_SERVICE_REQUEST,
  UPDATE_LESSON_SERVICE_SUCCESS
} from './types';

export const vals = '';

const initialState: AdminLessonState = {
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  isLessonRemovedFromCourse: false,
  error: null,
  lessonById: null,
  allLessonList: [],
  filteredData: []
};

export const adminLessonReducer = (state = initialState, action: AdminLessonActionType) => {
  switch (action.type) {
    case CREATE_LESSON_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isCreated = false;
      });
    }

    case CREATE_LESSON_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isCreated = true;
      });
    }

    case CREATE_LESSON_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isCreated = false;
      });
    }

    case GET_LESSON_BY_ID_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_LESSON_BY_ID_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessonById = action.payload;
      });
    }

    case GET_LESSON_BY_ID_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_ALL_LESSON_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_ALL_LESSON_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.allLessonList = action.payload;
      });
    }

    case GET_ALL_LESSON_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_LESSON_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isUpdated = false;
      });
    }

    case UPDATE_LESSON_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isUpdated = true;
      });
    }

    case UPDATE_LESSON_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case DELETE_LESSON_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isDeleted = false;
      });
    }

    case DELETE_LESSON_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isDeleted = true;
      });
    }

    case DELETE_LESSON_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case REMOVE_LESSON_STATE: {
      return produce(state, draft => {
        draft.isCreated = false;
        draft.isUpdated = false;
        draft.isDeleted = false;
        draft.error = null;
        draft.lessonById = null;
      });
    }
    case GET_FILTERED_LESSON_COUNT_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_FILTERED_LESSON_COUNT_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.filteredData = action.payload;
      });
    }

    case GET_FILTERED_LESSON_COUNT_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case REMOVE_LESSON_FROM_COURSE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isLessonRemovedFromCourse = false;
      });
    }

    case REMOVE_LESSON_FROM_COURSE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isLessonRemovedFromCourse = true;
      });
    }

    case REMOVE_LESSON_FROM_COURSE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
        draft.isLessonRemovedFromCourse = false;
      });
    }

    default:
      return state;
  }
};
