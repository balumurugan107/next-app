import { httpClientInstance, HttpClientResponse } from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import { IGetSubscriptionProducts, ISubscription } from 'src/store/subscriptions';
import { HTTPResponse } from 'src/types';
import { ISubscriptionDetail } from 'src/store/account';

interface NewSubscriptionRequest {
  subscription: any;
  app_id: string;
}

export default class RevenueCatService {
  private static instance: RevenueCatService;

  private constructor() {
    this.newSubscriber = this.newSubscriber.bind(this);
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new RevenueCatService();
    return this.instance;
  }

  public newSubscriber = (newSubscription: NewSubscriptionRequest) => {
    return httpClientInstance.post('/api/v1/revenuecat/newSubscription', newSubscription);
  };

  // public getSubscriptions = (customer_id: string) => {
  //   return httpClientInstance.get(`/api/v1/subscriptions/${customer_id}`);
  // };

  public getSubscriptions = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<ISubscriptionDetail>>(
        `/api/v1/subscribe/`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  public getSubscriptionProducts = async () => {
    let response: HttpClientResponse<HTTPResponse<IGetSubscriptionProducts[]>>;
    try {
      response = await httpClientInstance.get<HTTPResponse<IGetSubscriptionProducts[]>>(
        `/v1/products`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  public createSubscription = async (priceId: string | undefined) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<ISubscription>>(
        `/api/v1/payment/createSubscription?priceId=${priceId}`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  public upgradeSubscription = async (priceId: string | undefined) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<ISubscription>>(
        `/api/v1/payment/upgradeSubscription?priceId=${priceId}`
      );
      SnackbarUtils.success(response?.data?.message);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  public updateCard = async () => {
    try {
      const response = await httpClientInstance.get(`api/v1/payment/billing/portal`);
      SnackbarUtils.success(response?.data?.message);
      if (response.data.data.billingPortalSessionUrl) {
        window.location.href = response.data.data.billingPortalSessionUrl;
      }
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  public savedCards = async () => {
    try {
      const response = await httpClientInstance.get(`api/v1/payment/list`);
      SnackbarUtils.success(response?.data?.message);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  public cancelSubscription = async (cancel_at_period_end: boolean) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>(
        `/api/v1/payment/cancelSubsciption?cancel_at_period_end=${cancel_at_period_end}`
      );
      SnackbarUtils.success(response?.data?.message);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  public getLatestInvoice = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(`/api/v1/payment/latestInvoice`);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const revenueCatService = RevenueCatService.getInstance();
