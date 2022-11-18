// get all statistics
export const GET_STATISTICS_SERVICE_REQUEST = '@service/get-statistics-service-request';
export const GET_STATISTICS_SERVICE_SUCCESS = '@service/get-statistics-service-success';
export const GET_STATISTICS_SERVICE_FAILURE = '@service/get-statistics-service-failure';

export interface GetStatisticsServiceRequest {
  type: typeof GET_STATISTICS_SERVICE_REQUEST;
}
export interface GetStatisticsServiceSuccess {
  type: typeof GET_STATISTICS_SERVICE_SUCCESS;
  payload: statisticsData;
}
export interface statisticsData {
  results: statistics[];
  totalCount: number;
  action: string;
  coursesTotalViewCount: number;
  from: string;
  to: string;
  liability: number;
  revenue: number;
}
export interface GetStatisticsServiceFailure {
  type: typeof GET_STATISTICS_SERVICE_FAILURE;
}

export interface StatisticsState {
  isLoading: boolean;
  error?: string | null;
  statisticsList: statistics[];
  totalCount: number;
  action: string;
  coursesTotalViewCount: number;
  from: string;
  to: string;
  liability: number;
  revenue: number;
}

export interface statistics {
  percentOfViews: number;
  attributeRevenue: number;
  splitRevenue: number;
  name: string;
  split: number;
  courseViewCount: number;
}
export interface statisticsList {
  next: pageCount;
  results: statistics[];
  totalCount: number;
}

export interface pageCount {
  page: number;
  limit: number;
}
export interface statisticsArgs {
  page?: number;
  limit?: number;
  start_date: number;
  end_date: number;
  tz: string;
}

export const REMOVE_STATISTIC_STATE = '@service/remove-all-statistic-state';

export interface RemoveAllStatisticState {
  type: typeof REMOVE_STATISTIC_STATE;
}

export type StatisticsActionTypes =
  | GetStatisticsServiceRequest
  | GetStatisticsServiceSuccess
  | GetStatisticsServiceFailure
  | RemoveAllStatisticState;

export type StatisticsActionType = StatisticsActionTypes;
