import { HTTPResponse } from 'src/types';

export type EditorType = 'new' | 'edit' | 'clone' | 'view';

export interface ServiceEditorStatus {
  active: boolean;
  editorType?: EditorType;
  serviceType?: ServiceType;
  query?: string;
}

export interface Service {
  member_id: string;
  service_name: string;
  price_usd: number;
  description: string;
  type: ServiceType;
}

export interface ServiceState {
  isLoading: boolean;
  error: Error | null;
  reviewData: ReviewServiceDocument[] | null;
  searchQuery: string;
  serviceData: Service[];
  isServiceLoading: boolean;
}

export type ServiceType = 'videoReviews' | 'privateLessons' | 'sets';

export type ServiceDateType = 'upcoming' | 'completed' | 'all';

export type ServiceTabs = 'videoReviews' | 'sets' | 'privateLessons';

export interface ReviewServiceIds {
  serviceId: string;
  serviceReviewId: string;
}
export interface TimeStamp {
  startDate: number;
  endDate: number;
}
export interface ReviewServiceDocument extends ReviewServiceIds, ReviewService {}

export interface ReviewService {
  service: string;
  description: string;
  startDate: number; //startdate type
  endDate: number;
  cost: number;
  slots: number;
  teamName?: string;
  availableSlots?: number;
  teamId?: string;
  rosterGroup?: string[];
  _id?: string;
  swimmerRating?: number;
  type?: string;
  reviewDate?: number;
}

export const UPDATE_SERVICE_SEARCH_QUERY = '@service/update-service-search-query';
export interface UpdateServiceSearchQuery {
  type: typeof UPDATE_SERVICE_SEARCH_QUERY;
  payload: string;
}

/* Get Services  */
export const GET_SERVICES_REQUEST = '@service/get-services-request';
export const GET_SERVICES_SUCCESS = '@service/get-services-success';
export const GET_SERVICES_FAILURE = '@service/get-services-failure';

export interface GetServiceRequest {
  type: typeof GET_SERVICES_REQUEST;
}

export interface GetServiceSuccess {
  type: typeof GET_SERVICES_SUCCESS;
  payload: HTTPResponse<Service[]>;
}

export interface GetServiceFailure {
  type: typeof GET_SERVICES_FAILURE;
  error: Error;
}

export type GetServiceActionTypes = GetServiceRequest | GetServiceSuccess | GetServiceFailure;

/* Get Review Service */
export const GET_REVIEW_SERVICES_REQUEST = '@service/get-review-services-request';
export const GET_REVIEW_SERVICES_SUCCESS = '@service/get-review-services-success';
export const GET_REVIEW_SERVICES_FAILURE = '@service/get-review-services-failure';

export interface GetReviewServicesRequest {
  type: typeof GET_REVIEW_SERVICES_REQUEST;
}
export interface GetReviewServicesSuccess {
  type: typeof GET_REVIEW_SERVICES_SUCCESS;
  payload: HTTPResponse<ReviewServiceDocument[]>;
}
export interface GetReviewServicesFailure {
  type: typeof GET_REVIEW_SERVICES_FAILURE;
  error: Error;
}

export type GetServicesActionTypes =
  | GetReviewServicesRequest
  | GetReviewServicesSuccess
  | GetReviewServicesFailure;

/* Set Service Data */
export const SET_SERVICE_DATA = '@service/set-service-data';

export interface SetServiceData {
  type: typeof SET_SERVICE_DATA;
  payload: Service[];
}

/* Create Review Service */
export const CREATE_REVIEW_SERVICES_REQUEST = '@service/create-review-services-request';
export const CREATE_REVIEW_SERVICES_SUCCESS = '@service/create-review-services-success';
export const CREATE_REVIEW_SERVICES_FAILURE = '@service/create-review-services-failure';

export interface CreateReviewServicesRequest {
  type: typeof CREATE_REVIEW_SERVICES_REQUEST;
}
export interface CreateReviewServicesSuccess {
  type: typeof CREATE_REVIEW_SERVICES_SUCCESS;
  payload: HTTPResponse<ReviewServiceDocument[]>;
}
export interface CreateReviewServicesFailure {
  type: typeof CREATE_REVIEW_SERVICES_FAILURE;
  error: Error;
}

export type CreateServicesActionTypes =
  | CreateReviewServicesRequest
  | CreateReviewServicesSuccess
  | CreateReviewServicesFailure;

/* Update Review Service */
export const UPDATE_REVIEW_SERVICES_REQUEST = '@service/update-review-services-request';
export const UPDATE_REVIEW_SERVICES_SUCCESS = '@service/update-review-services-success';
export const UPDATE_REVIEW_SERVICES_FAILURE = '@service/update-review-services-failure';

export interface UpdateReviewServicesRequest {
  type: typeof UPDATE_REVIEW_SERVICES_REQUEST;
}
export interface UpdateReviewServicesSuccess {
  type: typeof UPDATE_REVIEW_SERVICES_SUCCESS;
  payload: HTTPResponse<ReviewServiceDocument[]>;
}
export interface UpdateReviewServicesFailure {
  type: typeof UPDATE_REVIEW_SERVICES_FAILURE;
  error: Error;
}

export type UpdateServicesActionTypes =
  | UpdateReviewServicesRequest
  | UpdateReviewServicesSuccess
  | UpdateReviewServicesFailure;

/* Delete Review Service */
export const DELETE_REVIEW_SERVICES_REQUEST = '@service/delete-review-services-request';
export const DELETE_REVIEW_SERVICES_SUCCESS = '@service/delete-review-services-success';
export const DELETE_REVIEW_SERVICES_FAILURE = '@service/delete-review-services-failure';

export interface DeleteReviewServicesRequest {
  type: typeof DELETE_REVIEW_SERVICES_REQUEST;
}
export interface DeleteReviewServicesSuccess {
  type: typeof DELETE_REVIEW_SERVICES_SUCCESS;
  payload: HTTPResponse<ReviewServiceIds[]>;
}
export interface DeleteReviewServicesFailure {
  type: typeof DELETE_REVIEW_SERVICES_FAILURE;
  error: Error;
}

export type DeleteServicesActionTypes =
  | DeleteReviewServicesRequest
  | DeleteReviewServicesSuccess
  | DeleteReviewServicesFailure;

export type ServiceActionType =
  | GetServicesActionTypes
  | CreateServicesActionTypes
  | UpdateServicesActionTypes
  | DeleteServicesActionTypes
  | UpdateServiceSearchQuery
  | GetServiceActionTypes
  | SetServiceData;
