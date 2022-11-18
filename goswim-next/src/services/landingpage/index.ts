import { httpClientInstance } from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';
import { HTTPResponse } from 'src/types';
import { defaultOptions, defaultErrorMessage } from 'src/constants';

export default class LandingPageService {
  private static instance: LandingPageService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LandingPageService();
    return this.instance;
  }

  getLandingPageVideos = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(`/v1/goswim/landing`);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const LandingPageServiceInstance = LandingPageService.getInstance();
