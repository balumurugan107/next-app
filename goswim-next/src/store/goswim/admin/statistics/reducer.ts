import produce from 'immer';
import {
  GET_STATISTICS_SERVICE_FAILURE,
  GET_STATISTICS_SERVICE_REQUEST,
  GET_STATISTICS_SERVICE_SUCCESS,
  REMOVE_STATISTIC_STATE,
  StatisticsActionType,
  StatisticsState
} from './types';

// export const vals = '';

const initialState: StatisticsState = {
  isLoading: false,
  error: null,
  action: '',
  coursesTotalViewCount: 0,
  from: '',
  to: '',
  liability: 0,
  revenue: 0,
  statisticsList: [],
  totalCount: 0
};

export const statisticsReducer = (state = initialState, action: StatisticsActionType) => {
  switch (action.type) {
    case GET_STATISTICS_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.statisticsList = [];
        draft.totalCount = 0;
        draft.action = '';
        draft.coursesTotalViewCount = 0;
        draft.from = '';
        draft.to = '';
        draft.liability = 0;
        draft.revenue = 0;
      });
    }

    case GET_STATISTICS_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.statisticsList = action.payload.results;
        draft.totalCount = action.payload.totalCount;
        draft.action = action.payload.action;
        draft.coursesTotalViewCount = action.payload.coursesTotalViewCount;
        draft.from = action.payload.from;
        draft.to = action.payload.to;
        draft.liability = action.payload.liability;
        draft.revenue = action.payload.revenue;
      });
    }

    case GET_STATISTICS_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.statisticsList = [];
        draft.totalCount = 0;
        draft.action = '';
        draft.coursesTotalViewCount = 0;
        draft.from = '';
        draft.to = '';
        draft.liability = 0;
        draft.revenue = 0;
      });
    }

    case REMOVE_STATISTIC_STATE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.statisticsList = [];
        draft.totalCount = 0;
        draft.action = '';
        draft.coursesTotalViewCount = 0;
        draft.from = '';
        draft.to = '';
        draft.liability = 0;
        draft.revenue = 0;
      });
    }

    default:
      return state;
  }
};
