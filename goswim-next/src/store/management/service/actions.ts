/* eslint-disable no-console */
import { Dispatch } from 'redux';
import { SERVICES } from 'src/constants';
import { ReviewServiceInstance } from 'src/services/service';
import {
  GET_REVIEW_SERVICES_SUCCESS,
  GET_REVIEW_SERVICES_FAILURE,
  GET_REVIEW_SERVICES_REQUEST,
  CREATE_REVIEW_SERVICES_REQUEST,
  CREATE_REVIEW_SERVICES_SUCCESS,
  CREATE_REVIEW_SERVICES_FAILURE,
  DELETE_REVIEW_SERVICES_REQUEST,
  DELETE_REVIEW_SERVICES_SUCCESS,
  DELETE_REVIEW_SERVICES_FAILURE,
  GetReviewServicesRequest,
  GetReviewServicesSuccess,
  GetReviewServicesFailure,
  ReviewService,
  CreateReviewServicesRequest,
  CreateReviewServicesSuccess,
  CreateReviewServicesFailure,
  DeleteReviewServicesRequest,
  DeleteReviewServicesSuccess,
  DeleteReviewServicesFailure,
  ReviewServiceIds,
  UpdateReviewServicesRequest,
  UpdateReviewServicesSuccess,
  UpdateReviewServicesFailure,
  UPDATE_REVIEW_SERVICES_REQUEST,
  UPDATE_REVIEW_SERVICES_SUCCESS,
  UPDATE_REVIEW_SERVICES_FAILURE,
  ReviewServiceDocument,
  ServiceDateType,
  TimeStamp,
  UPDATE_SERVICE_SEARCH_QUERY,
  GetServiceRequest,
  GET_SERVICES_REQUEST,
  GetServiceSuccess,
  GET_SERVICES_SUCCESS,
  GetServiceFailure,
  GET_SERVICES_FAILURE,
  Service,
  SET_SERVICE_DATA
} from 'src/store/management/service/types';

export const setServiceData = (payload: Service[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SET_SERVICE_DATA,
        payload
      });
    } catch (error) {
      throw error;
    }
  };
};

export const setServiceSearchQuery = (status: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UPDATE_SERVICE_SEARCH_QUERY,
        payload: status
      });
    } catch (error) {
      throw error;
    }
  };
};

export const getReviewServices = (serviceDateType: ServiceDateType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetReviewServicesRequest>({ type: GET_REVIEW_SERVICES_REQUEST });

      const response = await ReviewServiceInstance.getReviewService(serviceDateType);

      dispatch<GetReviewServicesSuccess>({
        type: GET_REVIEW_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetReviewServicesFailure>({ type: GET_REVIEW_SERVICES_FAILURE, error });
    }
  };
};

export const createReviewServices = (payload: ReviewService[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CreateReviewServicesRequest>({ type: CREATE_REVIEW_SERVICES_REQUEST });

      const response = await ReviewServiceInstance.createReviewService(payload);

      dispatch<CreateReviewServicesSuccess>({
        type: CREATE_REVIEW_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<CreateReviewServicesFailure>({ type: CREATE_REVIEW_SERVICES_FAILURE, error });
    }
  };
};

export const updateScheduledReview = (updatedTimeStamp: TimeStamp, scheduledReviewId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateReviewServicesRequest>({ type: UPDATE_REVIEW_SERVICES_REQUEST });

      const response = await ReviewServiceInstance.updateScheduledReview(
        updatedTimeStamp,
        scheduledReviewId
      );

      dispatch<UpdateReviewServicesSuccess>({
        type: UPDATE_REVIEW_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UpdateReviewServicesFailure>({ type: UPDATE_REVIEW_SERVICES_FAILURE, error });
    }
  };
};
export const updateReviewServices = (payload: ReviewServiceDocument[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateReviewServicesRequest>({ type: UPDATE_REVIEW_SERVICES_REQUEST });

      const response = await ReviewServiceInstance.updateReviewService(payload);

      dispatch<UpdateReviewServicesSuccess>({
        type: UPDATE_REVIEW_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UpdateReviewServicesFailure>({ type: UPDATE_REVIEW_SERVICES_FAILURE, error });
    }
  };
};

export const deleteReviewServices = (payload: ReviewServiceIds[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteReviewServicesRequest>({ type: DELETE_REVIEW_SERVICES_REQUEST });

      const response = await ReviewServiceInstance.deleteReviewService(payload);

      dispatch<DeleteReviewServicesSuccess>({
        type: DELETE_REVIEW_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<DeleteReviewServicesFailure>({ type: DELETE_REVIEW_SERVICES_FAILURE, error });
    }
  };
};

export const getServices = (type: SERVICES) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetServiceRequest>({ type: GET_SERVICES_REQUEST });

      const response = await ReviewServiceInstance.getAllServices(type);

      dispatch<GetServiceSuccess>({
        type: GET_SERVICES_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<GetServiceFailure>({ type: GET_SERVICES_FAILURE, error });
    }
  };
};
