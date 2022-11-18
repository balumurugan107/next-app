import { AxiosError } from 'axios';
import { UserProfile } from 'src/store/account';

export interface GoSwimCreateAccount {
  id?: string;
  full_name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmpassword: string;
  terms_agreed: boolean;
  promotion_enabled: boolean;
  isAgeEligible: boolean;
  secondary_email?: string | null;
  showEmail?: boolean | null;
}

export interface GoSwimSignInAccount {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface GoSwimAccountState {
  token: string | null;
  isLoading: boolean;
  isSignedUp: boolean;
  isAuthenticated: boolean;
  isProfileLoaded: boolean;
  currentTab: string;
  error: AxiosError | null;
  message: string;
  isSubmitting: boolean;
  lastUpdatedPictureTimestamp: number;
  disabledRoutes: string[];
  hideRoutesNavigation: string[];
}

export const GOSWIM_SIGN_UP_REQUEST = '@account/goswim-signup-request';
export const GOSWIM_SIGN_UP_SUCCESS = '@account/goswim-signup-success';
export const GOSWIM_SIGN_UP_FAILURE = '@account/goswim-signup-failure';

export const GOSWIM_SIGN_IN_REQUEST = '@account/goswim-signin-request';
export const GOSWIM_SIGN_IN_SUCCESS = '@account/goswim-signin-success';
export const GOSWIM_SIGN_IN_FAILURE = '@account/goswim-signin-failure';

export const GOSWIM_ADMIN_SIGN_IN_REQUEST = '@account/goswim-admin-signin-request';
export const GOSWIM_ADMIN_SIGN_IN_SUCCESS = '@account/goswim-admin-signin-success';
export const GOSWIM_ADMIN_SIGN_IN_FAILURE = '@account/goswim-admin-signin-failure';

export const GOSWIM_FORGET_PASSWORD_REQUEST = '@account/goswim-forget-password-request';
export const GOSWIM_FORGET_PASSWORD_SUCCESS = '@account/goswim-forget-password-success';
export const GOSWIM_FORGET_PASSWORD_FAILURE = '@account/goswim-forget-password-failure';

export const GOSWIM_CHANGE_PASSWORD_REQUEST = '@account/goswim-change-password-request';
export const GOSWIM_CHANGE_PASSWORD_SUCCESS = '@account/goswim-change-password-success';
export const GOSWIM_CHANGE_PASSWORD_FAILURE = '@account/goswim-change-password-failure';

export const GOSWIM_COOKIE_ACCEPT = '@account/goswim-cookie-accept';

export interface GoSwimSignUpRequest {
  type: typeof GOSWIM_SIGN_UP_REQUEST;
}

export interface GoSwimSignUpSuccess {
  type: typeof GOSWIM_SIGN_UP_SUCCESS;
  payload: { user: UserProfile; token: string };
}
export interface GoSwimSignUpFailure {
  type: typeof GOSWIM_SIGN_UP_FAILURE;
  payload: AxiosError;
}

export interface GoSwimForgetPasswordRequest {
  type: typeof GOSWIM_FORGET_PASSWORD_REQUEST;
}

export interface GoSwimForgetPasswordSuccess {
  type: typeof GOSWIM_FORGET_PASSWORD_SUCCESS;
}
export interface GoSwimForgetPasswordFailure {
  type: typeof GOSWIM_FORGET_PASSWORD_FAILURE;
  payload: AxiosError;
}

export interface GoSwimChangePasswordRequest {
  type: typeof GOSWIM_FORGET_PASSWORD_REQUEST;
}

export interface GoSwimChangePasswordSuccess {
  type: typeof GOSWIM_FORGET_PASSWORD_SUCCESS;
}
export interface GoSwimChangePasswordFailure {
  type: typeof GOSWIM_FORGET_PASSWORD_FAILURE;
  payload: AxiosError;
}

export interface GoSwimSignInRequest {
  type: typeof GOSWIM_SIGN_IN_REQUEST;
}

export interface GoSwimSignInSuccess {
  type: typeof GOSWIM_SIGN_IN_SUCCESS;
  payload: { user: UserProfile; token: string };
}
export interface GoSwimSignInFailure {
  type: typeof GOSWIM_SIGN_IN_FAILURE;
  payload: AxiosError;
}
export interface GoSwimAdminSignInRequest {
  type: typeof GOSWIM_ADMIN_SIGN_IN_REQUEST;
}

export interface GoSwimAdminSignInSuccess {
  type: typeof GOSWIM_ADMIN_SIGN_IN_SUCCESS;
  payload: { user: UserProfile; token: string };
}
export interface GoSwimAdminSignInFailure {
  type: typeof GOSWIM_ADMIN_SIGN_IN_FAILURE;
  payload: AxiosError;
}
export interface GoSwimCookieAccept {
  type: typeof GOSWIM_COOKIE_ACCEPT;
}

export type GoSwimUserAccountTypes =
  | GoSwimSignUpRequest
  | GoSwimSignUpSuccess
  | GoSwimSignUpFailure
  | GoSwimSignInRequest
  | GoSwimSignInSuccess
  | GoSwimSignInFailure
  | GoSwimAdminSignInRequest
  | GoSwimAdminSignInSuccess
  | GoSwimAdminSignInFailure
  | GoSwimForgetPasswordRequest
  | GoSwimForgetPasswordSuccess
  | GoSwimForgetPasswordFailure
  | GoSwimCookieAccept;

//export type GoSwimAccountActionType = GoSwimUserAccountTypes
