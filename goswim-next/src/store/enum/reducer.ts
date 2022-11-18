import produce from 'immer';
import {
  EnumState,
  EnumActionTypes,
  GET_ENUMS_REQUEST,
  GET_ENUMS_SUCCESS,
  GET_ENUMS_FAILURE,
  CREATE_OR_UPDATE_REQUEST,
  CREATE_OR_UPDATE_SUCCESS,
  CREATE_OR_UPDATE_FAILURE,
  DELETE_ENUMS_REQUEST,
  DELETE_ENUMS_SUCCESS,
  DELETE_ENUMS_FAILURE
} from 'src/store/enum/types';

const intialState: EnumState = {
  error: null,
  isFetching: false,
  data: null
};

export const enumReducer = (state = intialState, action: EnumActionTypes) => {
  switch (action.type) {
    case GET_ENUMS_REQUEST:
      return produce(state, draft => {
        draft.isFetching = true;
        draft.error = null;
      });

    case GET_ENUMS_SUCCESS:
      return produce(state, draft => {
        draft.isFetching = false;
        draft.error = null;
        draft.data = action.payload.data;
      });

    case GET_ENUMS_FAILURE:
      return produce(state, draft => {
        draft.isFetching = false;
        draft.error = action.error;
      });

    case CREATE_OR_UPDATE_REQUEST:
      return produce(state, draft => {
        draft.isFetching = true;
        draft.error = null;
      });

    case CREATE_OR_UPDATE_SUCCESS:
      return produce(state, draft => {
        draft.isFetching = false;
        draft.error = null;
        draft.data = action.payload.data;
      });

    case CREATE_OR_UPDATE_FAILURE:
      return produce(state, draft => {
        draft.isFetching = false;
        draft.error = action.error;
      });

    case DELETE_ENUMS_REQUEST:
      return produce(state, draft => {
        draft.isFetching = true;
        draft.error = null;
      });

    case DELETE_ENUMS_SUCCESS:
      return produce(state, draft => {
        draft.isFetching = false;
        draft.error = null;
        draft.data = action.payload.data;
      });

    case DELETE_ENUMS_FAILURE:
      return produce(state, draft => {
        draft.isFetching = false;
        draft.error = action.error;
      });

    default:
      return state;
  }
};
