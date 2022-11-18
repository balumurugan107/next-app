import moment from 'moment-timezone';
import {
  BookingHistory,
  LiveLessons,
  SetData,
  SetDataRequestParams,
  VideoReview,
  VideoReviewStat,
  // RecentlyAddedLessons,
  // JustAddedLessons,
  // lessonData,
  VideoReviewStatRequestParams
} from 'src/store/dashboard';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';

// import { httpClientGoSwimInstance } from 'src/core/HttpClientGoSwim';

import {
  DashboardResult,
  GetVideoListRequestData,
  GetVideoListResponseData,
  IDashboardWeeklyThemes
} from 'src/store/newdashboard';

export default class DashboardService {
  private static instance: DashboardService;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DashboardService();
    }
    return this.instance;
  }

  getSetData = async (params: SetDataRequestParams) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<SetData[]>>(
        'api/v1/swimmer_workout_output/dashboard',
        params
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getJustAddedLesson = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<DashboardResult>>(
        `va/v1/goswim/lessons/justAdded`
      );
      return response.data.data.results;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  //api call for added lessons
  getRecentlyWatchedLessons = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(`api/v1/goswim/recents`);

      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getDashboardWeeklyThemes = async (scheduled_on: number, timeZone?: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IDashboardWeeklyThemes[]>>(
        `api/v1/weeklyTheme/dashboard/theme?tz=${timeZone}&scheduled_on=${scheduled_on}`
      );
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateRecentlyWatchedLessons = async () => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<DashboardResult>>(
        `v1/goswim/updateRecents/:playerId`
      );
      return response.data.data.results;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getVideoReviewStat = async (params: VideoReviewStatRequestParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<VideoReviewStat[]>>(
        `api/v1/schedule/reviews/coach/${params.status}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getVideoReviewData = async (params: SetDataRequestParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<VideoReview[]>>(
        `api/v1/schedule/reviews/editor/videoReviewService/?fromDate=${params.fromDate}&toDate=${params.toDate}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getVideoBookingHistory = async (params: SetDataRequestParams) => {
    try {
      const today = moment()
        .startOf('day')
        .valueOf();
      const response = await httpClientInstance.get<HTTPResponse<BookingHistory[]>>(
        `api/v1/expert-booking/coach/bookedHistory/?fromDate=${params.fromDate}&toDate=${
          params.toDate
        }&status=${params.status || ''}&date=${today}`
      );
      return response.data;
      // return [
      //   {
      //     _id: '5ef995aaf8d76a5bcb75b3b7',
      //     service_name: 'Stroke Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-07-01',
      //         booked_count: 2
      //       }
      //     ]
      //   },
      //   {
      //     _id: '5ef44c76c2cf4d380fb29581',
      //     service_name: 'Turnaround Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-06-25',
      //         booked_count: 2
      //       }
      //     ]
      //   },
      //   {
      //     _id: '5ef9962ef8d76a5bcb75b3b8',
      //     service_name: 'Turnaround Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-07-01',
      //         booked_count: 4
      //       }
      //     ]
      //   },
      //   {
      //     _id: '5ef4390762ec0833dde7f9d6',
      //     service_name: 'Full Video Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-06-30',
      //         booked_count: 2
      //       },
      //       {
      //         booking_date: '2020-06-25',
      //         booked_count: 4
      //       }
      //     ]
      //   },
      //   {
      //     _id: '5ef4395c62ec0833dde7f9d7',
      //     service_name: 'Turnaround Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-06-25',
      //         booked_count: 2
      //       }
      //     ]
      //   },
      //   {
      //     _id: '5ef44c60c2cf4d380fb29580',
      //     service_name: 'Stroke Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-06-25',
      //         booked_count: 4
      //       }
      //     ]
      //   },
      //   {
      //     _id: '5ef44c8ac2cf4d380fb29582',
      //     service_name: 'Full Video Analysis',
      //     history: [
      //       {
      //         booking_date: '2020-06-25',
      //         booked_count: 2
      //       }
      //     ]
      //   }
      // ];
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getLiveLessonsStats = async (params: VideoReviewStatRequestParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<VideoReviewStat[]>>(
        `api/v1/schedule/lessons/coach/${params.status}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getLiveLessonsHistory = async (params: SetDataRequestParams) => {
    try {
      const today = moment()
        .startOf('day')
        .valueOf();
      const response = await httpClientInstance.get<HTTPResponse<BookingHistory[]>>(
        `api/v1/expert-booking/coach/bookedHistory/lesson/?fromDate=${params.fromDate}&toDate=${
          params.toDate
        }&status=${params.status || ''}&date=${today}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getVideosList = async (params?: GetVideoListRequestData) => {
    let orderList = '';
    let stateList = '';
    let assignmentList = '';
    let page = '';
    let limit = '';
    if (params?.filterData?.length) {
      params?.filterData?.map(filter => {
        if (filter.title === 'Assignment')
          assignmentList +=
            params?.page && params?.limit
              ? `&assignment=${filter.key === '1' ? true : false}`
              : `?assignment=${filter.key === '1' ? true : false}`;
        else if (filter.title === 'Order') orderList = `&order=${filter.key}`;
        else if (filter.title === 'State') stateList += `&state[]=${filter.key}`;
      });
    }
    if (params?.page) page = `?page=${params?.page}`;
    if (params?.limit) limit = `&limit=${params?.limit}`;
    try {
      const response = await httpClientInstance.get<HTTPResponse<GetVideoListResponseData>>(
        `/api/v1/goswim/videos/list${page}${limit}${assignmentList}${orderList}${stateList}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getLiveLessonsData = async (params: SetDataRequestParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<LiveLessons[]>>(
        `/api/v1/schedule/lessons/?fromDate=${params.fromDate}&toDate=${params.toDate}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const dashboardServiceInstance = DashboardService.getInstance();
