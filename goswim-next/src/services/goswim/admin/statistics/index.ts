// import { httpClientGoSwimInstance } from 'src/core/HttpClientGoSwim';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import { statisticsArgs, statisticsData } from 'src/store/goswim/admin/statistics';

export default class StatisticsService {
  private static instance: StatisticsService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new StatisticsService();
    return this.instance;
  }
  getStatistics = async (args: statisticsArgs) => {
    try {
      let page = '';
      let pageLimit = '';
      let start_date = '';
      let end_date = '';
      let tz = '';

      if (args.page) {
        page = `?page=${args.page}`;
      } else {
        page = '';
      }
      if (args.limit) {
        pageLimit = `&limit=${args.limit}`;
      } else {
        pageLimit = '';
      }

      if (args.start_date) {
        start_date = `&start_date=${args.start_date}`;
      }

      if (args.end_date) {
        tz = `&tz=${args.tz}`;
      }

      if (args.tz) {
        end_date = `&end_date=${args.end_date}`;
      }

      const response = await httpClientInstance.get<HTTPResponse<statisticsData>>(
        //`ios/courses.json?user_email=munesan.m@aximsoft.com&user_token=-YcXGK2fRYNiiWRVdkVf&stroke=Backstroke`
        `/api/v1/statistics${page}${pageLimit}${start_date}${end_date}${tz}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const StatisticsServiceInstance = StatisticsService.getInstance();
