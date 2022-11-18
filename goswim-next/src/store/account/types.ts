import { LogOut } from 'react-feather';
import { AxiosError } from 'axios';
import { HTTPResponse } from 'src/types';
import { ApplicationThemes } from '@mui/material/styles';
import { TeamDocument } from 'src/store/management/team';
import { GetSubscriptionsSuccess } from 'src/store/subscriptions';
import { Rights } from 'src/constants';
import { InitialValues as SettingsData } from 'src/views/pages/AccountView/Settings/FormModel';
import { GoSwimUserAccountTypes } from '../goswim/account';
import { S3Response } from '../goswim/admin/video/types';

export interface Team {
  _id: string;
  name: string;
  brand_logo_url: string;
  brand_theme: keyof ApplicationThemes;
}
export interface AccountState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isProfileUpdating: boolean;
  isLoadingSignIn: boolean;
  isSignedIn: boolean;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isSubscriptionExpired: boolean;
  isProfileLoaded: boolean;
  isProfileUpdated: boolean;
  isSettingsUpdated: boolean;
  isPasswordChanged: boolean;
  isSignedUp: false;
  currentTab: string;
  error: AxiosError | null;
  message: string;
  isSubmitting: boolean;
  lastUpdatedPictureTimestamp: number;
  disabledRoutes: string[];
  hideRoutesNavigation: string[];
  settings: SettingsData;
  profileImg: S3Response | null;
  attempt: number;
  isCookieAccepted: boolean;
}

export interface ISubscriptionDetail {
  _id: string;
  created_at: number;
  updated_at: number;
  member_id: string;
  product_name: string;
  price: number;
  currency: string;
  subscription_plan: string;
  store: string;
  renews_on: number;
  purchased_on: number;
  customer_id: string;
  order_id: string;
  purchase_token: string;
  subscription_id: string;
  transaction_id: string;
  status: string;
  product_id: string;
  autoRenewal?: boolean;
}
export interface UserProfile {
  _id: string;
  address_line1: string;
  address_line2: string;
  certificate: string[];
  city: string;
  country: string;
  designation: string;
  email: string;
  experience: string;
  full_name: string;
  login_device_type: string;
  phone: string;
  profile_picture_url: string;
  review_status: string;
  role: string;
  roster_group: string[];
  state: string;
  status: string;
  user_app_id: string;
  zipcode: string;
  can_add_team: boolean;
  can_manage_current_teams: boolean;
  stripe_customer_id: string;
  trail_period: string;
  team: string[];
  teams: TeamDocument;
  rights: Rights;
  settings: SettingsData;
  isGoswimFreeUser: boolean;
  freeUserValidTill: number;
  email_notification_enabled: boolean;
  promotion_enabled: boolean;
  subscription: ISubscriptionDetail | null | undefined;
}

export interface UpdateUserProfile {
  email: string;
  fullName: string;
  phone: string;
  editedProfilePicture?: any;
  certificatesStringConcated?: string;
  designation?: string;
  experience?: string;
  address1?: string;
  address2?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  email_notification_enabled: boolean;
  promotion_enabled: boolean;
  autoplay_video: boolean;
  use_hd_video: boolean;
  certificate?: string[];
}

/** Login  */
export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const IS_SUBSCRIPTION_EXPIRED = '@account/is-subscription-expired';
export const ACCESS_TOKEN_SUCCESS = '@account/login-access-token';

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
}

export interface TokenSuccess {
  type: typeof ACCESS_TOKEN_SUCCESS;
  payload: { token: string };
}
export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: { user: UserProfile; token: string };
}
export interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: AxiosError;
}

export type LoginActionTypes = LoginRequest | LoginSuccess | LoginFailure | TokenSuccess;

export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';

export interface SilentLogin {
  type: typeof SILENT_LOGIN;
  payload: { user: UserProfile };
}

export interface LogOut {
  type: typeof LogOut;
}

export type LogActionTypes = SilentLogin | LogOut;

/** SignUp */
export const SIGNUP_REQUEST = '@account/signup-request';
export const SIGNUP_SUCCESS = '@account/signup-success';
export const SIGNUP_FAILURE = '@account/signup-failure';

export interface SignUpRequest {
  type: typeof SIGNUP_REQUEST;
}
export interface SignUpSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: { user: UserProfile };
}
export interface SignUpFailure {
  type: typeof SIGNUP_FAILURE;
  payload: AxiosError;
}

export type SignUpActionTypes = SignUpRequest | SignUpSuccess | SignUpFailure;

/** update profile */
export const UPDATE_PROFILE_REQUEST = '@account/update-profile-request';
export const UPDATE_PROFILE_SUCCESS = '@account/update-profile-success';
export const UPDATE_PROFILE_FAILURE = '@account/update-profile-failure';

export interface UpdateProfileRequest {
  type: typeof UPDATE_PROFILE_REQUEST;
}
export interface UpdateProfileSuccess {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: { user: HTTPResponse<UserProfile> };
}
export interface UpdateProfileFailure {
  type: typeof UPDATE_PROFILE_FAILURE;
  payload: AxiosError;
}

export type UpdateProfileActionTypes =
  | UpdateProfileRequest
  | UpdateProfileSuccess
  | UpdateProfileFailure;

/** get profile */
export const GET_PROFILE_REQUEST = '@account/get-profile-request';
export const GET_PROFILE_SUCCESS = '@account/get-profile-success';
export const GET_PROFILE_FAILURE = '@account/get-profile-failure';

export interface GetProfileRequest {
  type: typeof GET_PROFILE_REQUEST;
}
export interface GetProfileSuccess {
  type: typeof GET_PROFILE_SUCCESS;
  payload: { user: HTTPResponse<UserProfile> };
}
export interface GetProfileFailure {
  type: typeof GET_PROFILE_FAILURE;
  payload: AxiosError;
}

export type GetProfileActionTypes = GetProfileRequest | GetProfileSuccess | GetProfileFailure;

/** update status */
export const UPDATE_PROFILE_STATUS = '@account/update-profile-status';

export interface UpdateProfileStats {
  type: typeof UPDATE_PROFILE_STATUS;
}
export type UpdateProfilePictureStatusActionTypes = UpdateProfileStats;

/** update current tab */
export const UPDATE_CURRENT_TAB = '@account/update-current-tab';
export const UPDATE_CURRENT_TAB_FAILURE = '@account/update-current-tab-failure';

export interface UpdateCurrentTab {
  type: typeof UPDATE_CURRENT_TAB;
  payload: { currentTab: string };
}

export interface UpdateCurrentTabFailure {
  type: typeof UPDATE_CURRENT_TAB_FAILURE;
}

export type UpdateCurrenTabsActionTypes = UpdateCurrentTab | UpdateCurrentTabFailure;

export const ACTIVATE_ROUTES = '@account/activate-routes';

export interface ActivateRoutes {
  type: typeof ACTIVATE_ROUTES;
}

export const DEACTIVATE_ROUTES = '@account/deactivate-routes';

export interface DeActivateRoutes {
  type: typeof DEACTIVATE_ROUTES;
}
export interface IsSubscriptionExpired {
  type: typeof IS_SUBSCRIPTION_EXPIRED;
}

export type ActivateRoutesActionTypes = ActivateRoutes | DeActivateRoutes;

/* save settings */
export const SAVE_SETTINGS = '@account/save-settings';
export const SAVE_SETTINGS_REQUEST = '@account/save-settings-request';
export const SAVE_SETTINGS_SUCCESS = '@account/save-settings-success';
export const SAVE_SETTINGS_FAILURE = '@account/save-settings-failure';
export interface SaveSettingsRequest {
  type: typeof SAVE_SETTINGS_REQUEST;
  payload?: SettingsData;
}
export interface SaveSettingsSuccess {
  type: typeof SAVE_SETTINGS_SUCCESS;
  payload: { user: HTTPResponse<UserProfile> };
}
export interface SaveSettingsFailure {
  type: typeof SAVE_SETTINGS_FAILURE;
  error: AxiosError;
}
export type SaveSettingsActionTypes =
  | SaveSettingsRequest
  | SaveSettingsSuccess
  | SaveSettingsFailure;

/* Upload Profile Image */
export const UPLOAD_PROFILE_IMG_TO_S3_REQUEST = '@account/upload-profile-img-request';
export const UPLOAD_PROFILE_IMG_TO_S3_SUCCESS = '@account/upload-profile-img-success';
export const UPLOAD_PROFILE_IMG_TO_S3_FAILURE = '@account/upload-profile-img-failure';

export interface UploadProfileImgToS3Request {
  type: typeof UPLOAD_PROFILE_IMG_TO_S3_REQUEST;
}
export interface UploadProfileImgToS3Success {
  type: typeof UPLOAD_PROFILE_IMG_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadProfileImgToS3Failure {
  type: typeof UPLOAD_PROFILE_IMG_TO_S3_FAILURE;
}

export type UploadProfileImgActionTypes =
  | UploadProfileImgToS3Request
  | UploadProfileImgToS3Success
  | UploadProfileImgToS3Failure;

export type AccountActionType =
  | GoSwimUserAccountTypes
  | LoginActionTypes
  | SignUpActionTypes
  | UpdateProfileActionTypes
  | GetProfileActionTypes
  | UpdateProfilePictureStatusActionTypes
  | UpdateCurrenTabsActionTypes
  | LogActionTypes
  | GetSubscriptionsSuccess
  | ActivateRoutesActionTypes
  | SaveSettingsActionTypes
  | UploadProfileImgActionTypes;
