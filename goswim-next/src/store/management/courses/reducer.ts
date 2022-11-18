import produce from 'immer';

import {
  CourseServiceState,
  ServiceActionType,
  GET_COURSE_SERVICES_REQUEST,
  GET_COURSE_SERVICES_SUCCESS,
  GET_COURSE_SERVICES_FAILURE,
  SET_COURSE_SEARCH_TEXT,
  GET_FILTER_DATA_SUCCESS,
  GET_FILTER_DATA_FAILURE,
  REMOVE_ALL_COURSES_LIST,
  SCHEDULE_COURSE_FAILURE,
  SCHEDULE_COURSE_REQUEST,
  SCHEDULE_COURSE_SUCCESS
} from 'src/store/management/courses/types';
// import { GET_FILTER_DATA_REQUEST } from '.';

const initialState: CourseServiceState = {
  isLoading: false,
  error: null,
  searchText: '',
  courseData: {
    results: [],
    totalCount: -1,
    next: {
      limit: 0,
      page: 0
    }
  },
  courseFilterData: [],
  courseScheduled: false
};

export const courseReducer = (state = initialState, action: ServiceActionType) => {
  switch (action.type) {
    case GET_COURSE_SERVICES_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case SET_COURSE_SEARCH_TEXT: {
      return produce(state, draft => {
        draft.searchText = action.payload.text;
      });
    }

    case GET_COURSE_SERVICES_SUCCESS: {
      const results =
        action.payload && action.payload.pageNumber && action.payload.pageNumber?.toString() === '1'
          ? action.payload.results
          : [...state.courseData.results, ...action.payload.results];
      const totalCount = action.payload.totalCount;
      //  const next = action.payload.next;
      return produce(state, draft => {
        draft.courseData = {
          results: results,
          totalCount: totalCount
          //     next: next
        };
        draft.isLoading = false;
      });
    }

    case GET_COURSE_SERVICES_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.error) draft.error = action.error;
      });
    }

    case SCHEDULE_COURSE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.courseScheduled = false;
      });
    }

    case SCHEDULE_COURSE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
        draft.courseScheduled = false;
      });
    }

    case SCHEDULE_COURSE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseScheduled = true;
      });
    }

    case REMOVE_ALL_COURSES_LIST: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseData = {
          results: [],
          totalCount: -1
        };
      });
    }

    case GET_FILTER_DATA_SUCCESS: {
      return produce(state, draft => {
        draft.courseFilterData = [...draft.courseFilterData, ...action.payload];
      });
    }

    case GET_FILTER_DATA_FAILURE: {
      return produce(state, draft => {
        if (action.error) draft.error = action.error;
      });
    }

    default:
      return state;
  }
};
