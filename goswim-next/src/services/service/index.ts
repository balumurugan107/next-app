/* eslint-disable no-useless-constructor */
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import {
  ReviewServiceDocument,
  ReviewService as ReviewServiceInterface,
  ReviewServiceIds,
  ServiceDateType,
  TimeStamp
} from 'src/store/management/service';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import { ServiceMessages, SERVICES } from 'src/constants/services';

export default class ReviewService {
  private static instance: ReviewService;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ReviewService();
    return this.instance;
  }

  getReviewService = async (serviceDateType: ServiceDateType) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<ReviewServiceDocument[]>>(
        'api/v1/schedule/reviews/editor/videoReviewService',
        { type: serviceDateType }
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  //create video review service
  createReviewService = async (payload: ReviewServiceInterface[]) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<ReviewServiceDocument[]>>(
        'api/v1/schedule/reviews/editor/videoReviewService',
        payload
      );
      SnackbarUtils.success(ServiceMessages.CREATE_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateScheduledReview = async (updatedTimeStamp: TimeStamp, scheduledReviewId: string) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<any>>(
        `/api/v1/schedule/reviews/${scheduledReviewId}`,
        updatedTimeStamp
      );
      SnackbarUtils.success(ServiceMessages.UPDATE_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  // video review changes
  updateReviewService = async (payload: ReviewServiceDocument[]) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<ReviewServiceDocument[]>>(
        'api/v1/schedule/reviews/editor/videoReviewService',
        payload
      );
      SnackbarUtils.success(ServiceMessages.UPDATE_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteReviewService = async (payload: ReviewServiceIds[]) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse<ReviewServiceIds[]>>(
        'api/v1/schedule/reviews/editor/videoReviewService',
        payload
      );
      SnackbarUtils.success(ServiceMessages.DELETE_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getAllServices = async (type: SERVICES) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(`api/v1/service/${type}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export const ReviewServiceInstance = ReviewService.getInstance();
