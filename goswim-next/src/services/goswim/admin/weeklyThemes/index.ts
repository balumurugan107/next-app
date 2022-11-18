import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';
import {
  ITodayWeeklyThemes,
  IValue,
  IWeeklyThemesByIdResponse,
  IWeeklyThemesResponse,
  PreviousWeeklyThemes
} from 'src/store/goswim/admin/weeklyThemes';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

export default class AdminWeeklyThemesService {
  private static instance: AdminWeeklyThemesService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AdminWeeklyThemesService();
    return this.instance;
  }

  /* GET WEEKLY THEMES */

  getWeeklyThemes = async (scheduled_on?: number, tz?: string) => {
    let scheduledOn = '';
    let timezone = '';
    if (scheduled_on) {
      scheduledOn = `scheduled_on=${scheduled_on}`;
    } else scheduledOn = '';
    if (tz) {
      timezone = `tz=${tz}`;
    } else timezone = '';
    let hasParam = scheduledOn || timezone;
    try {
      const response = await httpClientInstance.get<HTTPResponse<IWeeklyThemesResponse[]>>(
        `/api/v1/weeklyTheme${hasParam && '?'}${scheduledOn}${timezone}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getTodayWeeklyThemes = async (scheduled_on?: number, tz?: string) => {
    let scheduledOn = '';
    let timezone = '';
    if (scheduled_on) {
      scheduledOn = `scheduled_on=${scheduled_on}`;
    } else scheduledOn = '';
    if (tz) {
      timezone = `tz=${tz}`;
    } else timezone = '';
    try {
      const response = await httpClientInstance.get<HTTPResponse<ITodayWeeklyThemes[]>>(
        `/api/v1/weeklyTheme/today/lesson?${scheduledOn}&${timezone}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getWeeklyThemesById = async (id: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IWeeklyThemesByIdResponse[]>>(
        `/api/v1/weeklyTheme/${id}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  createWeeklyTheme = async (values: IValue) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<IValue>>(
        '/api/v1/weeklyTheme/',
        values
      );
      SnackbarUtils.success(response?.data?.message || 'Weekly theme Created successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  editWeeklyTheme = async (values: IValue, _id: string) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<IValue>>(
        `/api/v1/weeklyTheme/?_id=${_id}`,
        values
      );
      SnackbarUtils.success(response?.data?.message || 'Weekly theme Edited successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteWeeklyTheme = async (_id: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse>(
        `/api/v1/weeklyTheme/?_id=${_id}`
      );
      SnackbarUtils.success(response?.data?.message || 'Weekly theme Deleted successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getPreviousWeeklyThemes = async (scheduled_on?: number, tz?: string) => {
    let scheduledOn = '';
    let timezone = '';
    if (scheduled_on) {
      scheduledOn = `scheduled_on=${scheduled_on}`;
    } else scheduledOn = '';
    if (tz) {
      timezone = `tz=${tz}`;
    } else timezone = '';
    try {
      const response = await httpClientInstance.get<HTTPResponse<PreviousWeeklyThemes[]>>(
        `/api/v1/weeklyTheme/previous/theme?${timezone}&${scheduledOn}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  /* End of uploadFile.ts */
}

export const adminWeeklyThemesServiceInstance = AdminWeeklyThemesService.getInstance();
