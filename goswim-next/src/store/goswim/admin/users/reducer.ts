import produce from 'immer';
import {
  AdminUsersActionType,
  AdminUsersState,
  ADMIN_RESET_USER_PASSWORD_FAILURE,
  ADMIN_RESET_USER_PASSWORD_REQUEST,
  ADMIN_RESET_USER_PASSWORD_SUCCESS,
  GET_ALL_USERS_SERVICE_FAILURE,
  GET_ALL_USERS_SERVICE_REQUEST,
  GET_ALL_USERS_SERVICE_SUCCESS,
  GET_USERS_FILTER_LIST_SERVICE_FAILURE,
  GET_USERS_FILTER_LIST_SERVICE_REQUEST,
  GET_USERS_FILTER_LIST_SERVICE_SUCCESS,
  REMOVE_ALL_USERS
} from './types';

// export const vals = '';

const initialState: AdminUsersState = {
  isLoading: false,
  error: null,
  allUsersList: null,
  filterList: [],
  totalCount: 0,
  isPasswordReseted: false
};

export const adminUsersReducer = (state = initialState, action: AdminUsersActionType) => {
  switch (action.type) {
    case GET_ALL_USERS_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_ALL_USERS_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.allUsersList = action.payload.results;
        draft.totalCount = action.payload.totalCount;
      });
    }

    case GET_ALL_USERS_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case GET_USERS_FILTER_LIST_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_USERS_FILTER_LIST_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.filterList = action.payload;
      });
    }

    case GET_USERS_FILTER_LIST_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case REMOVE_ALL_USERS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = null;
        draft.allUsersList = null;
        draft.totalCount = 0;
      });
    }

    case ADMIN_RESET_USER_PASSWORD_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isPasswordReseted = false;
      });
    }

    case ADMIN_RESET_USER_PASSWORD_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isPasswordReseted = true;
      });
    }

    case ADMIN_RESET_USER_PASSWORD_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isPasswordReseted = false;
      });
    }

    default:
      return state;
  }
};
