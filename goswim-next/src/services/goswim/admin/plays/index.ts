import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

export default class AdminPlaysService {
  private static instance: AdminPlaysService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AdminPlaysService();
    return this.instance;
  }

  getDownloadRecentlyPlayed = async () => {
    try {
      const response = await httpClientInstance.get(`/api/v1/goswim/downloadPlays`, {
        responseType: 'stream'
      });
      return response;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  /* End of uploadFile.ts */
}

export const adminPlaysServiceInstance = AdminPlaysService.getInstance();
