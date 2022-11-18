import produce from 'immer';

import {
  CourseDetailServiceState,
  ServiceActionType,
  GET_COURSE_DETAIL_SERVICE_FAILURE,
  GET_COURSE_DETAIL_SERVICE_REQUEST,
  GET_COURSE_DETAIL_SERVICE_SUCCESS,
  GET_LESSON_LIST_SERVICE_FAILURE,
  GET_LESSON_LIST_SERVICE_REQUEST,
  GET_LESSON_LIST_SERVICE_SUCCESS,
  REMOVE_ALL_LESSON_LIST,
  SET_LESSON_SEARCH_TEXT,
  GET_LESSON_WEEKLYTHEME_SERVICE_SUCCESS
} from 'src/store/management/goswim/lessons/types';

const initialState: CourseDetailServiceState = {
  isLoading: false,
  error: null,
  courseDetails: null,
  searchText: null,
  lessons: {
    results: [],
    adminResults: [],
    totalCount: -1
  },
  lessonWeeklyTheme: [],
  lessonWeeklyThemeCount: 0
};

export const lessonsReducer = (state = initialState, action: ServiceActionType) => {
  switch (action.type) {
    case GET_COURSE_DETAIL_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_COURSE_DETAIL_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.courseDetails = action.payload;
      });
    }

    case GET_COURSE_DETAIL_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    case GET_LESSON_LIST_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_LESSON_LIST_SERVICE_SUCCESS: {
      const results =
        action.payload && action.payload.pageNumber && action.payload.pageNumber === '1'
          ? action.payload.results
          : [...state.lessons.results, ...action.payload.results];

      const totalCount = action.payload.totalCount;
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessons = {
          results: results,
          adminResults: action.payload.results,
          totalCount: totalCount
        };
      });
    }
    case GET_LESSON_WEEKLYTHEME_SERVICE_SUCCESS: {
      // const totalCount = action.payload.totalCount;
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lessonWeeklyTheme = action.payload.results;
        draft.lessonWeeklyThemeCount = action.payload.totalCount;
      });
    }

    case REMOVE_ALL_LESSON_LIST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.lessons.results = [];
        draft.lessons.adminResults = [];
      });
    }

    case SET_LESSON_SEARCH_TEXT: {
      return produce(state, draft => {
        draft.searchText = action.payload.text;
      });
    }

    case GET_LESSON_LIST_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.error) {
          draft.error = action.error;
        }
      });
    }
    default:
      return state;
  }
};
