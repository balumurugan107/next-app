import { Dispatch } from 'redux';
import { StatisticsServiceInstance } from 'src/services/goswim/admin/statistics';
import {
  GetStatisticsServiceFailure,
  GetStatisticsServiceRequest,
  GetStatisticsServiceSuccess,
  GET_STATISTICS_SERVICE_FAILURE,
  GET_STATISTICS_SERVICE_REQUEST,
  GET_STATISTICS_SERVICE_SUCCESS,
  RemoveAllStatisticState,
  REMOVE_STATISTIC_STATE,
  statisticsArgs
} from './types';

export const getStatistics = (args: statisticsArgs) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetStatisticsServiceRequest>({ type: GET_STATISTICS_SERVICE_REQUEST });
      const response = await StatisticsServiceInstance.getStatistics(args);
      dispatch<GetStatisticsServiceSuccess>({
        type: GET_STATISTICS_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetStatisticsServiceFailure>({ type: GET_STATISTICS_SERVICE_FAILURE });
    }
  };
};

export const removeAllStatisticState = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<RemoveAllStatisticState>({ type: REMOVE_STATISTIC_STATE });
    } catch (error) {}
  };
};
