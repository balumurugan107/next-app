/* eslint-disable no-useless-constructor */
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import { defaultErrorMessage, defaultOptions } from 'src/constants';
import SnackbarUtils from 'src/helpers/snackbar';
import { SubscribersData } from 'src/store/calendar/subscribers';

export default class ScheduleOverviewSubscribers {
  private static instance: ScheduleOverviewSubscribers;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ScheduleOverviewSubscribers();
    return this.instance;
  }

  getSubscribers = async (params: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<SubscribersData>>(
        `/api/v1/schedule/overview/${params}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const ScheduleOverviewSubscribersInstance = ScheduleOverviewSubscribers.getInstance();
