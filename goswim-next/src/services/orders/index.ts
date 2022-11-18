import { httpClientInstance } from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';
import { HTTPResponse } from 'src/types';
import {
  BookingParams,
  BookingDocument,
  RatingParams,
  BookingsDocument
} from 'src/store/management/orders';
export default class Orders {
  private static instance: Orders;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Orders();
    return this.instance;
  }
  getExpertBookingList = async (payload: BookingParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<BookingDocument[]>>(
        'api/v1/expert-booking/list/expert',
        payload
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getBookingList = async () => {
    const id = '62bdabee9aa50c0028d60767';
    try {
      const response = await httpClientInstance.get<HTTPResponse<BookingsDocument[]>>(
        `/api/v1/review/orders/expert/${id}`
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getSwimmerBookingList = async (payload: BookingParams) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<BookingDocument[]>>(
        'api/v1/expert-booking/list/swimmer',
        payload
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  updateSwimmerBookingRating = async (payload: RatingParams) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<BookingDocument>>(
        `api/v1/expert-booking/rating/`,
        payload
      );
      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}
export const OrdersInstance = Orders.getInstance();
