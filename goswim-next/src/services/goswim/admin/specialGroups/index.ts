// import { httpClientGoSwimInstance } from 'src/core/HttpClientGoSwim';
// import SnackbarUtils from 'src/helpers/snackbar';
// import { defaultOptions, defaultErrorMessage } from 'src/constants';
// import { httpClientInstance } from 'src/core/HttpClient';
// import { HTTPResponse } from 'src/types';
// import { statisticsArgs, statisticsData } from 'src/store/goswim/admin/statistics';

export default class SpecialGroupsService {
  private static instance: SpecialGroupsService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new SpecialGroupsService();
    return this.instance;
  }
}

export const SpecialGroupsServiceInstance = SpecialGroupsService.getInstance();
