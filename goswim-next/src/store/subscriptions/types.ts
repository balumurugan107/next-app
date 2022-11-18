import { AxiosError } from 'axios';
import { HTTPErrorResponse } from 'src/types';
import { ISubscriptionDetail } from '../account';

export interface Subscription {
  name: string;
  productKey: string;
  expires_date: string;
  purchase_date: string;
  status: string;
  trial_end?: number;
  trial_start?: number;
  _id: string;
  product_name: string;
  subscription_id: string;
  store: string;
  price: string;
  currency: string;
  renews_on: number;
  customer_id: string;
  subscription_plan?: string;
}

export interface SubscriptionState {
  data: ISubscriptionDetail | null;
  productData: IGetSubscriptionProducts[];
  subscriptionData: ISubscription | null;
  error: AxiosError<HTTPErrorResponse> | null;
  isSubscribed: boolean;
  isSubscriptionUpgraded: boolean;
  isSubscriptionMaxUpgraded: boolean;
  isSubscriptionCancelled: boolean;
  isLoading: boolean;
  savedCards: saveCard[];
}

export interface IGetSubscriptionProducts {
  id: string;
  name: string;
  price: ISubscriptionPriceDetail;
  description: string;
  priority: number;
}

export interface ISubscriptionPriceDetail {
  id: string;
  productId: string;
  billingScheme: string;
  type: string;
  currency: string;
  interval: string;
  price: number;
}

export interface ISubscription {
  subscriptionId?: string;
  clientSecret?: string;
  setupIntentClientSecret?: string;
}

export const SET_SUBSCRIPTIONS = '@subscriptions/set-subscriptions';

export interface SetSubscriptions {
  type: typeof SET_SUBSCRIPTIONS;
  payload: ISubscriptionDetail;
}
export const GET_SUBSCRIPTIONS_REQUEST = '@subscription/get-subscription-request';
export const GET_SUBSCRIPTIONS_SUCCESS = '@subscription/get-subscription-success';
export const GET_SUBSCRIPTIONS_FAILURE = '@subscription/get-subscription-failure';

export interface GetSubscriptionsRequest {
  type: typeof GET_SUBSCRIPTIONS_REQUEST;
}

export interface GetSubscriptionsSuccess {
  type: typeof GET_SUBSCRIPTIONS_SUCCESS;
  payload: ISubscriptionDetail;
}

export interface GetSubscriptionsFailure {
  type: typeof GET_SUBSCRIPTIONS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetSubscriptionActionTypes =
  | GetSubscriptionsRequest
  | GetSubscriptionsSuccess
  | GetSubscriptionsFailure;

export const SAVE_SUBSCRIPTION_DETAIL_REQUEST = '@subscription/save-subscription-request';
export const SAVE_SUBSCRIPTION_DETAIL_SUCCESS = '@subscription/save-subscription-success';
export const SAVE_SUBSCRIPTION_DETAIL_FAILURE = '@subscription/save-subscription-failure';

export interface SaveSubscriptionRequest {
  type: typeof SAVE_SUBSCRIPTION_DETAIL_REQUEST;
}

export interface SaveSubscriptionSuccess {
  type: typeof SAVE_SUBSCRIPTION_DETAIL_SUCCESS;
}

export interface SaveSubscriptionFailure {
  type: typeof SAVE_SUBSCRIPTION_DETAIL_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export interface ISaveSubscriptionReq {
  subscription_id: string;
  customer_id: string;
  product_name: string;
  price: string;
  currency: string;
  subscription_plan: string | undefined;
  store: string;
  renews_on: number;
  purchased_on: string;
}

export interface saveCard {
  id: string;
  object: string;
  billing_details: billingDetails;
  email: string;
  name: string;
  phone: number | null;
  card: cardDetail;
  created: string | number;
  customer: string;
  livemode: boolean;
  type: string;
}

export interface billingDetails {
  address: string | null;
  city: string | null;
  country: string;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface cardDetail {
  brand: string;
  checks: {
    address_line1_check: string | null;
    address_postal_code_check: string | null;
    cvc_check: string;
  };
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from: number | string | null;
  last4: string;
  networks: {
    available: string[];
    preferred: string | null;
  };
  three_d_secure_usage: {
    supported: boolean;
  };
  wallet: string | null;
}

export type SaveSubscriptionActionTypes =
  | SaveSubscriptionRequest
  | SaveSubscriptionSuccess
  | SaveSubscriptionFailure;

export const GET_SUBSCRIPTION_PRODUCT_REQUEST = '@subscription/get-subscription-product-request';
export const GET_SUBSCRIPTION_PRODUCT_SUCCESS = '@subscription/get-subscription-product-success';
export const GET_SUBSCRIPTION_PRODUCT_FAILURE = '@subscription/get-subscription-product-failure';

export interface GetSubscriptionProductsRequest {
  type: typeof GET_SUBSCRIPTION_PRODUCT_REQUEST;
}

export interface GetSubscriptionProductsSuccess {
  type: typeof GET_SUBSCRIPTION_PRODUCT_SUCCESS;
  payload: IGetSubscriptionProducts[];
}

export interface GetSubscriptionProductsFailure {
  type: typeof GET_SUBSCRIPTION_PRODUCT_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetSubscriptionProductActionTypes =
  | GetSubscriptionProductsRequest
  | GetSubscriptionProductsSuccess
  | GetSubscriptionProductsFailure;

export const CREATE_SUBSCRIPTION_REQUEST = '@subscription/create-subscription-request';
export const CREATE_SUBSCRIPTION_SUCCESS = '@subscription/create-subscription-success';
export const CREATE_SUBSCRIPTION_FAILURE = '@subscription/create-subscription-failure';

export interface CreateSubscriptionRequest {
  type: typeof CREATE_SUBSCRIPTION_REQUEST;
}

export interface CreateSubscriptionSuccess {
  type: typeof CREATE_SUBSCRIPTION_SUCCESS;
  payload: ISubscription;
}

export interface CreateSubscriptionFailure {
  type: typeof CREATE_SUBSCRIPTION_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type CreateSubscriptionActionTypes =
  | CreateSubscriptionRequest
  | CreateSubscriptionSuccess
  | CreateSubscriptionFailure;

export const UPGRADE_SUBSCRIPTION_REQUEST = '@subscription/upgrade-subscription-request';
export const UPGRADE_SUBSCRIPTION_SUCCESS = '@subscription/upgrade-subscription-success';
export const UPGRADE_SUBSCRIPTION_FAILURE = '@subscription/upgrade-subscription-failure';

export const UPDATE_CARD_REQUEST = '@subscription/update-card-request';
export const UPDATE_CARD_SUCCESS = '@subscription/update-card-success';
export const UPDATE_CARD_FAILURE = '@subscription/update-card-failure';

export const GET_SAVED_CARD_REQUEST = '@subscription/get-saved-card-request';
export const GET_SAVED_CARD_SUCCESS = '@subscription/get-saved-card-success';
export const GET_SAVED_CARD_FAILURE = '@subscription/get-saved-card-failure';

export interface UpgradeSubscriptionRequest {
  type: typeof UPGRADE_SUBSCRIPTION_REQUEST;
}

export interface UpgradeSubscriptionSuccess {
  type: typeof UPGRADE_SUBSCRIPTION_SUCCESS;
  payload?: ISubscription;
}

export interface UpgradeSubscriptionFailure {
  type: typeof UPGRADE_SUBSCRIPTION_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export interface UpdateCardRequest {
  type: typeof UPDATE_CARD_REQUEST;
}

export interface UpdateCardSuccess {
  type: typeof UPDATE_CARD_SUCCESS;
}

export interface UpdateCardFailure {
  type: typeof UPDATE_CARD_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export interface GetSavedCardRequest {
  type: typeof GET_SAVED_CARD_REQUEST;
}

export interface GetSavedCardSuccess {
  type: typeof GET_SAVED_CARD_SUCCESS;
  payload: saveCard[];
}

export interface GetSavedCardFailure {
  type: typeof GET_SAVED_CARD_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type UpgradeSubscriptionActionTypes =
  | UpgradeSubscriptionRequest
  | UpgradeSubscriptionSuccess
  | UpgradeSubscriptionFailure
  | UpdateCardRequest
  | UpdateCardSuccess
  | UpdateCardFailure;

export const CANCEL_SUBSCRIPTION_REQUEST = '@subscription/cancel-subscription-request';
export const CANCEL_SUBSCRIPTION_SUCCESS = '@subscription/cancel-subscription-success';
export const CANCEL_SUBSCRIPTION_FAILURE = '@subscription/cancel-subscription-failure';

export interface CancelSubscriptionRequest {
  type: typeof CANCEL_SUBSCRIPTION_REQUEST;
}

export interface CancelSubscriptionSuccess {
  type: typeof CANCEL_SUBSCRIPTION_SUCCESS;
}

export interface CancelSubscriptionFailure {
  type: typeof CANCEL_SUBSCRIPTION_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type CancelSubscriptionActionTypes =
  | CancelSubscriptionRequest
  | CancelSubscriptionSuccess
  | CancelSubscriptionFailure;

export const GET_LATEST_INVOICE_REQUEST = '@subscription/get-latest-invoice-request';
export const GET_LATEST_INVOICE_SUCCESS = '@subscription/get-latest-invoice-success';
export const GET_LATEST_INVOICE_FAILURE = '@subscription/get-latest-invoice-failure';

export interface GetLatestInvoiceRequest {
  type: typeof GET_LATEST_INVOICE_REQUEST;
}

export interface GetLatestInvoiceSuccess {
  type: typeof GET_LATEST_INVOICE_SUCCESS;
  payload: ISubscription;
}

export interface GetLatestInvoiceFailure {
  type: typeof GET_LATEST_INVOICE_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetLatestInvoiceActionTypes =
  | GetLatestInvoiceRequest
  | GetLatestInvoiceSuccess
  | GetLatestInvoiceFailure;

export type GetSavedCardActionTypes =
  | GetSavedCardRequest
  | GetSavedCardSuccess
  | GetSavedCardFailure;

export type SubscriptionActionTypes =
  | SetSubscriptions
  | GetSubscriptionActionTypes
  | SaveSubscriptionActionTypes
  | GetSubscriptionProductActionTypes
  | CreateSubscriptionActionTypes
  | UpgradeSubscriptionActionTypes
  | CancelSubscriptionActionTypes
  | GetLatestInvoiceActionTypes
  | GetSavedCardActionTypes;
