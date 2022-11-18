export interface AdminUsersState {
  isLoading: boolean;
  error: Error | null;
  allUsersList: users[] | null;
  filterList: usersFilterList | [];
  totalCount: number;
  isPasswordReseted: boolean;
}

export interface users {
  _id: string;
  status: string;
  role: string;
  email: string;
  full_name: string;
}

export interface adminUsersListRequestData {
  limit?: number | undefined;
  page?: number | undefined;
  filter?: filters[];
  search?: string;
}
export interface filters {
  title: string;
  key: string;
}

// get all admin users
export const GET_ALL_USERS_SERVICE_REQUEST = '@service/get-all-users-service-request';
export const GET_ALL_USERS_SERVICE_SUCCESS = '@service/get-all-users-service-success';
export const GET_ALL_USERS_SERVICE_FAILURE = '@service/get-all-users-service-failure';
// users filter list
export const GET_USERS_FILTER_LIST_SERVICE_REQUEST =
  '@service/get-users-filter-list-service-request';
export const GET_USERS_FILTER_LIST_SERVICE_SUCCESS =
  '@service/get-users-filter-list-service-success';
export const GET_USERS_FILTER_LIST_SERVICE_FAILURE =
  '@service/get-users-filter-list-service-failure';

// get all admin users

export interface GetAllUsersServiceRequest {
  type: typeof GET_ALL_USERS_SERVICE_REQUEST;
}
export interface GetAllUsersServiceSuccess {
  type: typeof GET_ALL_USERS_SERVICE_SUCCESS;
  payload: userList;
}

export interface GetAllUsersServiceFailure {
  type: typeof GET_ALL_USERS_SERVICE_FAILURE;
}

// users filter  list
export interface GetUsersFilterListServiceRequest {
  type: typeof GET_USERS_FILTER_LIST_SERVICE_REQUEST;
}
export interface GetUsersFilterListServiceSuccess {
  type: typeof GET_USERS_FILTER_LIST_SERVICE_SUCCESS;
  payload: usersFilterList;
}

export interface GetUsersFilterListServiceFailure {
  type: typeof GET_USERS_FILTER_LIST_SERVICE_FAILURE;
}

export interface userList {
  next: pageCount;
  results: users[];
  totalCount: number;
}

export interface pageCount {
  page: number;
  limit: number;
}
export interface usersFilterList {
  role: role;
  subscription_status: subscriptionStatus;
  sort: [];
}
export interface role {
  Admin: number;
  Coach: number;
  Contract: number;
  Evaluator: number;
  Expert: number;
  Swimmer: number;
  Unknown: number;
}
export interface subscriptionStatus {
  active: number;
  canceled: number;
  incomplete: number;
  incomplete_expired: number;
  past_due: number;
  trialing: number;
  unpaid: number;
}

export const REMOVE_ALL_USERS = '@service/remove-all-users';
export interface RemoveAllUsers {
  type: typeof REMOVE_ALL_USERS;
}

// sdmin reset user password
export const ADMIN_RESET_USER_PASSWORD_REQUEST = '@service/admin-reset-user-password-request';
export const ADMIN_RESET_USER_PASSWORD_SUCCESS = '@service/admin-reset-user-password-success';
export const ADMIN_RESET_USER_PASSWORD_FAILURE = '@service/admin-reset-user-password-failure';

export interface adminResetUserPasswordRequest {
  type: typeof ADMIN_RESET_USER_PASSWORD_REQUEST;
}
export interface adminResetUserPasswordSuccess {
  type: typeof ADMIN_RESET_USER_PASSWORD_SUCCESS;
}

export interface adminResetUserPasswordFailure {
  type: typeof ADMIN_RESET_USER_PASSWORD_FAILURE;
}

export type AdminUsersActionTypes =
  | GetAllUsersServiceRequest
  | GetAllUsersServiceSuccess
  | GetAllUsersServiceFailure
  | GetUsersFilterListServiceRequest
  | GetUsersFilterListServiceSuccess
  | GetUsersFilterListServiceFailure
  | RemoveAllUsers
  | adminResetUserPasswordRequest
  | adminResetUserPasswordSuccess
  | adminResetUserPasswordFailure;

export type AdminUsersActionType = AdminUsersActionTypes;
