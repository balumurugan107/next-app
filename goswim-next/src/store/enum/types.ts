import { AxiosError } from 'axios';
import { HTTPResponse, HTTPErrorResponse } from 'src/types';

export interface EnumState {
  isFetching: boolean;
  error: AxiosError<HTTPErrorResponse> | null;
  data: EnumResponseDocument | null;
}

export interface Enum {
  _id?: string;
  enum_type: string;
  full_name: string;
  short_name: string;
  status: string;
}

export interface EnumResponse extends Enum {
  member_id?: string;
  team_id?: string;
}

export interface EnumResponseDocument {
  course_enum?: EnumResponse[];
  action_enum?: EnumResponse[];
  intensity_enum?: EnumResponse[];
  equipment_enum?: EnumResponse[];
  stroke_enum?: EnumResponse[];
}

export interface StrokesAndTypesProps {
  full_name: string;
  short_name: string;
}
export interface SuggestionEditorProps {
  handleSuggestionEditorVisible(visible: boolean): any;
  type: string;
}

export const GET_ENUMS = '@workout/get-enums';
export const GET_ENUMS_REQUEST = '@workout/get-enums-request';
export const GET_ENUMS_SUCCESS = '@workout/get-enums-success';
export const GET_ENUMS_FAILURE = '@workout/get-enums-failure';

export interface GetEnumsRequest {
  type: typeof GET_ENUMS_REQUEST;
}

export interface GetEnumsSuccess {
  type: typeof GET_ENUMS_SUCCESS;
  payload: HTTPResponse<EnumResponseDocument>;
}

export interface GetEnumsFailure {
  type: typeof GET_ENUMS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export const CREATE_OR_UPDATE_ENUMS = '@workout/create-or-update-enums';
export const CREATE_OR_UPDATE_REQUEST = '@workout/create-or-update-enums-request';
export const CREATE_OR_UPDATE_SUCCESS = '@workout/create-or-update-enums-success';
export const CREATE_OR_UPDATE_FAILURE = '@workout/create-or-update-enums-failure';

export interface CreateOrUpdateEnumsRequest {
  type: typeof CREATE_OR_UPDATE_REQUEST;
}

export interface CreateOrUpdateEnumsSuccess {
  type: typeof CREATE_OR_UPDATE_SUCCESS;
  payload: HTTPResponse<EnumResponseDocument>;
}

export interface CreateOrUpdateEnumsFailure {
  type: typeof CREATE_OR_UPDATE_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export const DELETE_ENUMS = '@workout/delete-enums';
export const DELETE_ENUMS_REQUEST = '@workout/delete-enums-request';
export const DELETE_ENUMS_SUCCESS = '@workout/delete-enums-success';
export const DELETE_ENUMS_FAILURE = '@workout/delete-enums-failure';

export interface DeleteEnumsRequest {
  type: typeof DELETE_ENUMS_REQUEST;
}

export interface DeleteEnumsSuccess {
  type: typeof DELETE_ENUMS_SUCCESS;
  payload: HTTPResponse<EnumResponseDocument>;
}

export interface DeleteEnumsFailure {
  type: typeof DELETE_ENUMS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetEnumsActionTypes = GetEnumsRequest | GetEnumsSuccess | GetEnumsFailure;
export type CreateOrUpdateEnumsActionTypes =
  | CreateOrUpdateEnumsRequest
  | CreateOrUpdateEnumsSuccess
  | CreateOrUpdateEnumsFailure;
export type DeleteEnumsActionTypes = DeleteEnumsRequest | DeleteEnumsSuccess | DeleteEnumsFailure;
export type EnumActionTypes =
  | GetEnumsActionTypes
  | CreateOrUpdateEnumsActionTypes
  | DeleteEnumsActionTypes;
