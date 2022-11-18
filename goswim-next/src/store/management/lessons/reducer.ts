import produce from 'immer';

import {
  LessonServiceState,
  ServiceActionType,
  GET_LESSON_SERVICES_REQUEST,
  GET_LESSON_SERVICES_SUCCESS,
  GET_LESSON_SERVICES_FAILURE,
  UPDATE_LESSON_SERVICES_REQUEST,
  UPDATE_LESSON_SERVICES_SUCCESS,
  UPDATE_LESSON_SERVICES_FAILURE,
  DELETE_LESSON_SERVICES_FAILURE,
  DELETE_LESSON_SERVICES_REQUEST,
  DELETE_LESSON_SERVICES_SUCCESS,
  SAVE_LESSON_SERVICES_REQUEST,
  SAVE_LESSON_SERVICES_SUCCESS,
  SAVE_LESSON_SERVICES_FAILURE,
  GET_LESSON_FILTER_DATA_REQUEST,
  GET_LESSON_FILTER_DATA_SUCCESS,
  GET_LESSON_FILTER_DATA_FAILURE
} from 'src/store/management/lessons/types';
import { GET_FAVOURITES_FAILURE, GET_FAVOURITES_REQUEST, GET_FAVOURITES_SUCCESS } from '.';

const initialState: LessonServiceState = {
  isLoading: false,
  error: null,
  lessonData: [],
  filterData: [],
  favouriteDetails: {
    results: [],
    totalCount: 0
  }
};

export const lessonReducer = (state = initialState, action: ServiceActionType) => {
  switch (action.type) {
    case GET_LESSON_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_LESSON_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessonData = action.payload.data;
      });
    }

    case GET_LESSON_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case UPDATE_LESSON_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPDATE_LESSON_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_LESSON_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case DELETE_LESSON_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.error = null;
      });
    }

    case DELETE_LESSON_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = null;
      });
    }

    case DELETE_LESSON_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case SAVE_LESSON_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case SAVE_LESSON_SERVICES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case SAVE_LESSON_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case GET_LESSON_FILTER_DATA_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_LESSON_FILTER_DATA_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.filterData = [...draft.filterData, ...action.payload];
      });
    }

    case GET_LESSON_FILTER_DATA_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.error) draft.error = action.error;
      });
    }

    case GET_FAVOURITES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_FAVOURITES_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.favouriteDetails = action.payload;
        //   const results = [...state.favouriteDetails.results, ...action.payload.results];
        // const totalCount = action.payload.totalCount;

        // return produce(state, draft => {
        //   draft.favouriteDetails = {
        //     results: results,
        //     totalCount: totalCount
        //   };
        // });
      });
    }

    case GET_FAVOURITES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    default:
      return state;
  }
};
