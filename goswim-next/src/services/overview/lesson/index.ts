/* eslint-disable no-useless-constructor */
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import { defaultErrorMessage, defaultOptions } from 'src/constants';
import SnackbarUtils from 'src/helpers/snackbar';
import { BookingData } from 'src/store/calendar/lesson';

export default class LessonOvervieService {
  private static instance: LessonOvervieService;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LessonOvervieService();
    return this.instance;
  }

  getBookedByList = async <T>(params: T) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<BookingData[]>>(
        `/api/v1/schedule/overview/lesson/booked/`,
        params
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const LessonOvervieServiceInstance = LessonOvervieService.getInstance();
