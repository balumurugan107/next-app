/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  ServiceState,
  ServiceActionType,
  GET_REVIEW_SERVICES_REQUEST,
  GET_REVIEW_SERVICES_SUCCESS,
  GET_REVIEW_SERVICES_FAILURE,
  CREATE_REVIEW_SERVICES_REQUEST,
  CREATE_REVIEW_SERVICES_SUCCESS,
  CREATE_REVIEW_SERVICES_FAILURE,
  DELETE_REVIEW_SERVICES_REQUEST,
  DELETE_REVIEW_SERVICES_SUCCESS,
  DELETE_REVIEW_SERVICES_FAILURE,
  UPDATE_REVIEW_SERVICES_REQUEST,
  UPDATE_REVIEW_SERVICES_SUCCESS,
  UPDATE_REVIEW_SERVICES_FAILURE,
  UPDATE_SERVICE_SEARCH_QUERY,
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  SET_SERVICE_DATA
} from 'src/store/management/service/types';

const initialState: ServiceState = {
  isLoading: false,
  error: null,
  reviewData: null,
  searchQuery: '',
  serviceData: [],
  isServiceLoading: false
};

export const serviceReducer = (state = initialState, action: ServiceActionType) => {
  switch (action.type) {
    case UPDATE_SERVICE_SEARCH_QUERY: {
      return produce(state, draft => {
        draft.searchQuery = action.payload;
      });
    }
    case GET_REVIEW_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_REVIEW_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.reviewData = action.payload.data;
      });
    }

    case GET_REVIEW_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case CREATE_REVIEW_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case CREATE_REVIEW_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case CREATE_REVIEW_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case UPDATE_REVIEW_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPDATE_REVIEW_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_REVIEW_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case DELETE_REVIEW_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case DELETE_REVIEW_SERVICES_SUCCESS: {
      return produce(state, draft => {
        const mappedPayloadIds = action.payload.data?.map(
          datum => `${datum.serviceId}-${datum.serviceReviewId}`
        );
        draft.isLoading = false;
        if (state.reviewData) {
          draft.reviewData = state.reviewData?.filter(
            datum => !mappedPayloadIds?.includes(`${datum.serviceId}-${datum.serviceReviewId}`)
          );
        }
      });
    }

    case DELETE_REVIEW_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case GET_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isServiceLoading = true;
        draft.serviceData = [];
      });
    }

    case GET_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.serviceData = action.payload.data;
        draft.isServiceLoading = false;
      });
    }

    case GET_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isServiceLoading = false;
        draft.error = action.error;
      });
    }

    case SET_SERVICE_DATA: {
      return produce(state, draft => {
        draft.serviceData = action.payload;
      });
    }

    default: {
      return state;
    }
  }
};
