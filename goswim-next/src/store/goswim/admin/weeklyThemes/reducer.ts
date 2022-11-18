import produce from 'immer';
import {
  AdminWeeklyThemesActionType,
  AdminWeeklyThemesState,
  CREATE_WEEKLY_THEMES_SERVICE_FAILURE,
  CREATE_WEEKLY_THEMES_SERVICE_REQUEST,
  CREATE_WEEKLY_THEMES_SERVICE_SUCCESS,
  DELETE_WEEKLY_THEMES_FAILURE,
  DELETE_WEEKLY_THEMES_REQUEST,
  DELETE_WEEKLY_THEMES_SUCCESS,
  EDIT_WEEKLY_THEMES_SERVICE_FAILURE,
  EDIT_WEEKLY_THEMES_SERVICE_REQUEST,
  EDIT_WEEKLY_THEMES_SERVICE_SUCCESS,
  GET_PREVIOUS_WEEKLY_THEMES_SERVICE_FAILURE,
  GET_PREVIOUS_WEEKLY_THEMES_SERVICE_REQUEST,
  GET_PREVIOUS_WEEKLY_THEMES_SERVICE_SUCCESS,
  GET_TODAY_WEEKLY_THEMES_SERVICE_FAILURE,
  GET_TODAY_WEEKLY_THEMES_SERVICE_REQUEST,
  GET_TODAY_WEEKLY_THEMES_SERVICE_SUCCESS,
  GET_WEEKLY_THEMES_BY_ID_SERVICE_FAILURE,
  GET_WEEKLY_THEMES_BY_ID_SERVICE_REQUEST,
  GET_WEEKLY_THEMES_BY_ID_SERVICE_SUCCESS,
  GET_WEEKLY_THEMES_SERVICE_FAILURE,
  GET_WEEKLY_THEMES_SERVICE_REQUEST,
  GET_WEEKLY_THEMES_SERVICE_SUCCESS,
  REMOVE_ADMIN_WEEKLY_THEME_STATE,
  REMOVE_ALL_WEEKLY_THEMES_LIST,
  UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_FAILURE,
  UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_REQUEST,
  UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_SUCCESS
} from './types';

export const vals = '';

const initialState: AdminWeeklyThemesState = {
  isLoading: false,
  error: null,
  weeklyThemes: [],
  todayWeeklyThemes: [],
  weeklyThemesById: null,
  thumbCustomUploaded: null,
  weeklyThemesCreated: false,
  weeklyThemesUpdated: false,
  weeklyThemesDeleted: false,
  previousWeeklyThemes: []
};

export const adminWeeklyThemesReducer = (
  state = initialState,
  action: AdminWeeklyThemesActionType
) => {
  switch (action.type) {
    case GET_WEEKLY_THEMES_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_WEEKLY_THEMES_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.weeklyThemes = action.payload;
      });
    }

    case GET_WEEKLY_THEMES_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_TODAY_WEEKLY_THEMES_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_TODAY_WEEKLY_THEMES_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.todayWeeklyThemes = action.payload;
      });
    }

    case GET_TODAY_WEEKLY_THEMES_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_PREVIOUS_WEEKLY_THEMES_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_PREVIOUS_WEEKLY_THEMES_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.previousWeeklyThemes = action.payload;
      });
    }

    case GET_PREVIOUS_WEEKLY_THEMES_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_WEEKLY_THEMES_BY_ID_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_WEEKLY_THEMES_BY_ID_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.payload.length > 0) draft.weeklyThemesById = action.payload[0];
        else draft.weeklyThemesById = null;
      });
    }

    case GET_WEEKLY_THEMES_BY_ID_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case CREATE_WEEKLY_THEMES_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.weeklyThemesCreated = false;
      });
    }

    case CREATE_WEEKLY_THEMES_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.weeklyThemesCreated = true;
      });
    }

    case CREATE_WEEKLY_THEMES_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.weeklyThemesCreated = false;
      });
    }

    case EDIT_WEEKLY_THEMES_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.weeklyThemesUpdated = false;
      });
    }

    case EDIT_WEEKLY_THEMES_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.weeklyThemesUpdated = true;
      });
    }

    case EDIT_WEEKLY_THEMES_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.thumbCustomUploaded = action.payload;
      });
    }

    case UPLOAD_WEEKLY_THUMB_CUSTOM_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case REMOVE_ADMIN_WEEKLY_THEME_STATE: {
      return produce(state, draft => {
        draft.weeklyThemesById = null;
        draft.weeklyThemesCreated = false;
        draft.weeklyThemesUpdated = false;
        draft.thumbCustomUploaded = null;
        draft.weeklyThemesDeleted = false;
      });
    }

    case DELETE_WEEKLY_THEMES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.weeklyThemesDeleted = false;
      });
    }

    case DELETE_WEEKLY_THEMES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.weeklyThemesDeleted = true;
      });
    }

    case DELETE_WEEKLY_THEMES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case REMOVE_ALL_WEEKLY_THEMES_LIST: {
      return produce(state, draft => {
        draft.weeklyThemes = [];
      });
    }

    default:
      return state;
  }
};
