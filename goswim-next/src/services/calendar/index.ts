/* eslint-disable no-useless-constructor */
import { httpClientInstance } from 'src/core/HttpClient';
import {
  NotesData,
  OverviewGetQueryParams,
  ScheduleOverviewData
} from 'src/store/calendar/scheduleOverview';
import { HTTPResponse } from 'src/types';
import { defaultErrorMessage, defaultOptions } from 'src/constants';
import SnackbarUtils from 'src/helpers/snackbar';
import { ScheduleListData } from 'src/store/calendar/scheduleList/types';

export default class ScheduleOverviewService {
  private static instance: ScheduleOverviewService;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ScheduleOverviewService();
    return this.instance;
  }

  getScheduleOverview = async (params: OverviewGetQueryParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<ScheduleOverviewData>>(
        '/api/v1/schedule/overview',
        params
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getScheduleList = async (team_id: string | undefined, from: number, to: number) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<ScheduleListData[]>>(
        '/api/v1/goswim/schedule/list',
        { team_id, from, to }
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateNotes = async (notes: NotesData) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<NotesData>>(
        'api/v1/schedule/overview/swimmer/notes',
        notes
      );
      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export const ScheduleOverviewInstance = ScheduleOverviewService.getInstance();
