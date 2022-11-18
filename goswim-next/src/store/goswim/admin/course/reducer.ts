import produce from 'immer';
import {
  AdminCourseState,
  AdminCourseActionType,
  CREATE_COURSE_SERVICE_FAILURE,
  CREATE_COURSE_SERVICE_SUCCESS,
  GET_COURSE_SERVICE_SUCCESS,
  REMOVE_ADMIN_COURSE_STATE,
  UPDATE_COURSE_SERVICE_FAILURE,
  UPDATE_COURSE_SERVICE_REQUEST,
  UPDATE_COURSE_SERVICE_SUCCESS
} from '.';
import {
  GET_COURSE_BY_ID_SERVICE_FAILURE,
  GET_COURSE_BY_ID_SERVICE_SUCCESS,
  GET_COURSE_BY_ID_SERVICE_REQUEST,
  GET_ALL_COURSE_SERVICE_SUCCESS,
  GET_ALL_COURSE_SERVICE_FAILURE,
  GET_ALL_COURSE_SERVICE_REQUEST,
  DELETE_COURSE_FAILURE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  CREATE_COURSE_SERVICE_REQUEST,
  UPDATE_LESSON_POS_SUCCESS,
  UPDATE_LESSON_POS_FAILURE,
  UPDATE_LESSON_POS_REQUEST
} from './types';

export const vals = '';

const initialState: AdminCourseState = {
  isLoading: false,
  isCourseDeleted: false,
  error: null,
  courseCreated: false,
  courseUpdated: false,
  courseById: null,
  allCourseList: []
};

export const AdminCourseReducer = (state = initialState, action: AdminCourseActionType) => {
  switch (action.type) {
    case REMOVE_ADMIN_COURSE_STATE: {
      return produce(state, draft => {
        draft.courseCreated = false;
        draft.courseUpdated = false;
        draft.courseById = null;
        draft.isCourseDeleted = false;
      });
    }

    case CREATE_COURSE_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseCreated = false;
      });
    }

    case CREATE_COURSE_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseCreated = false;
      });
    }

    case CREATE_COURSE_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseCreated = true;
      });
    }

    case GET_COURSE_BY_ID_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_COURSE_BY_ID_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_COURSE_BY_ID_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isCourseDeleted = false;
        draft.courseById = action.payload;
      });
    }

    case UPDATE_COURSE_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case UPDATE_COURSE_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_COURSE_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseUpdated = true;
      });
    }

    case DELETE_COURSE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case DELETE_COURSE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isCourseDeleted = true;
      });
    }

    case DELETE_COURSE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_COURSE_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_ALL_COURSE_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_ALL_COURSE_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.allCourseList = action.payload;
        draft.isCourseDeleted = false;
      });
    }

    case GET_ALL_COURSE_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_LESSON_POS_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPDATE_LESSON_POS_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_LESSON_POS_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    default:
      return state;
  }
};
