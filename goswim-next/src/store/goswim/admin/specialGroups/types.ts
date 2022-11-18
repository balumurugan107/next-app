import { Moment } from 'moment';

export type FormType = 'create' | 'edit';

export interface pageCount {
  page: number;
  limit: number;
}
export interface specialGroupsArgs {
  page?: number;
  limit?: number;
}

export interface Groups {
  group_name: string;
  email: string;
  total_members: number;
  total_coaches: number;
  total_amount: number;
  payment_status: string;
  group_status: string;
  plan_duration: number | Moment;
}
export interface specialGroupsState {
  isLoading: boolean;
  error: Error | null;
  groups: Groups[];
  totalCount: number;
}
export interface FormProps {
  type?: FormType;
  group?: Groups;
  pageTitle?: string;
}
export interface InitialValues {
  group_name: string;
  email: string;
  total_members: number;
  total_coaches: number;
  total_amount: number;
  payment_status: string;
  group_status: string;
  plan_duration: Moment;
}
export interface specialGroupsList {
  next: pageCount;
  results: Groups[];
  totalCount: number;
}

export const GET_SPECIAL_GROUPS_REQUEST = '@service/get-special-groups-service-request';
export const GET_SPECIAL_GROUPS_SUCCESS = '@service/get-special-groups-service-success';
export const GET_SPECIAL_GROUPS_FAILURE = '@service/get-special-groups-service-failure';

export const GET_SPECIAL_GROUP_REQUEST = '@service/get-special-group-service-request';
export const GET_SPECIAL_GROUP_SUCCESS = '@service/get-special-group-service-success';
export const GET_SPECIAL_GROUP_FAILURE = '@service/get-special-group-service-failure';

export interface GetSpecialGroupsServiceRequest {
  type: typeof GET_SPECIAL_GROUPS_REQUEST;
}
export interface GetSpecialGroupsServiceSuccess {
  type: typeof GET_SPECIAL_GROUPS_SUCCESS;
  payload: specialGroupsList;
}
export interface GetSpecialGroupsServiceFailure {
  type: typeof GET_SPECIAL_GROUPS_FAILURE;
}

export interface GetSpecialGroupServiceRequest {
  type: typeof GET_SPECIAL_GROUP_REQUEST;
}
export interface GetSpecialGroupServiceSuccess {
  type: typeof GET_SPECIAL_GROUP_SUCCESS;
}
export interface GetSpecialGroupServiceFailure {
  type: typeof GET_SPECIAL_GROUP_FAILURE;
}

export type SpecialGroupsActionTypes =
  | GetSpecialGroupsServiceRequest
  | GetSpecialGroupsServiceSuccess
  | GetSpecialGroupsServiceSuccess
  | GetSpecialGroupServiceRequest
  | GetSpecialGroupServiceSuccess
  | GetSpecialGroupServiceSuccess;

export type SpecialGroupsActionType = SpecialGroupsActionTypes;
