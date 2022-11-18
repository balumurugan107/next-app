import { InitialValues as CreateEditFormInitialValues } from 'src/views/management/Teams/CreateEditView/Form';
import { ApplicationThemes } from '@mui/material/styles';
import { HTTPResponse, HTTPErrorResponse } from 'src/types';
import { AxiosError } from 'axios';
import { S3Response } from 'src/store/goswim/admin/weeklyThemes/types';

/**
 * Interface for classes that represent a color.
 *
 * @interface TeamState
 * @description initial state for team reducer
 */

export interface TeamState {
  isLoading: boolean;
  selectedTeams: string[];
  teamsDetailsViewOption: TeamsDetailsViewOption;
  data: TeamDocument[];
  heirarchyTeams: TeamHeirarchyDocument[];
  memberGroups: TeamHeirarchyDocument[];
  error: AxiosError<HTTPErrorResponse> | null;
  message: string;
  dropDownSelectedTeams: string[];
  dropDownSelectedTeam: string;
  totalCount: number;
  teamBrandLogo: S3Response | null;
  next?: getMemberArgs;
  teamsList: TeamHeirarchyDocument[];
}
export interface memberList {
  results: TeamHeirarchyDocument[];
  totalCount: number;
  next?: getMemberArgs;
}
export interface getMemberArgs {
  page?: number;
  limit?: number;
  search?: string;
}

export interface TeamDocument {
  _id: string;
  name: string;
  brand_logo?: File;
  brand_logo_url?: string;
  brand_theme?: keyof ApplicationThemes;
  description?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  member_id?: string;
}
export interface TeamHeirarchyDocument extends TeamDocument {
  _id: string;
  rosterGroup: string[];
  membersCount: number;
  createdBy: string;
}
export interface UpdateTeamData {
  name: string;
  brand_logo?: any;
  brand_theme?: keyof ApplicationThemes;
  description?: string;
  country?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  member_id?: string;
  img_uploaded_timestamp?: number;
}

export interface DeleteTeamData {
  ids: string[];
}

export interface RemoveTeamData {
  teamIds: string[];
}

export interface RemoveMemberData {
  memberIds: string[];
}

export const GET_TEAM = '@management/teams/get-team';
export const GET_TEAM_REQUEST = '@management/teams/get-team-request';
export const GET_TEAM_SUCCESS = '@management/teams/get-team-success';
export const GET_TEAM_FAILURE = '@management/teams/get-team-failure';

export interface GetTeamRequest {
  type: typeof GET_TEAM_REQUEST;
}
export interface GetTeamSuccess {
  type: typeof GET_TEAM_SUCCESS;
  payload: HTTPResponse<TeamDocument[]>;
}
export interface GetTeamFailure {
  type: typeof GET_TEAM_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export const GET_TEAM_HEIRARCHY = '@management/teams/get-team-heirarchy';
export const GET_TEAM_HEIRARCHY_REQUEST = '@management/teams/get-team-heirarchy-request';
export const GET_TEAM_HEIRARCHY_SUCCESS = '@management/teams/get-team-heirarchy-success';
export const GET_TEAM_HEIRARCHY_FAILURE = '@management/teams/get-team-heirarchy-failure';

export const GET_MEMBER_GROUPS = '@management/teams/get-member-groups';
export const GET_MEMBER_GROUPS_REQUEST = '@management/teams/get-member-groups-request';
export const GET_MEMBER_GROUPS_SUCCESS = '@management/teams/get-member-groups-success';
export const GET_MEMBER_GROUPS_FAILURE = '@management/teams/get-member-groups-failure';

export const GET_TEAMS_LIST_REQUEST = '@management/teams/get-teams-list-request';
export const GET_TEAMS_LIST_SUCCESS = '@management/teams/get-teams-list-success';
export const GET_TEAMS_LIST_FAILURE = '@management/teams/get-teams-list-failure';

export interface GetTeamHeirarchyRequest {
  type: typeof GET_TEAM_HEIRARCHY_REQUEST;
}
export interface GetTeamHeirarchySuccess {
  type: typeof GET_TEAM_HEIRARCHY_SUCCESS;
  payload: HTTPResponse<memberList>;
}
export interface GetTeamHeirarchyFailure {
  type: typeof GET_TEAM_HEIRARCHY_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export interface GetMemberGroupsRequest {
  type: typeof GET_MEMBER_GROUPS_REQUEST;
}
export interface GetMemberGroupsSuccess {
  type: typeof GET_MEMBER_GROUPS_SUCCESS;
  payload: HTTPResponse<memberList>;
}
export interface GetMemberGroupsFailure {
  type: typeof GET_MEMBER_GROUPS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export interface GetTeamsListRequest {
  type: typeof GET_TEAMS_LIST_REQUEST;
}
export interface GetTeamsListSuccess {
  type: typeof GET_TEAMS_LIST_SUCCESS;
  payload: HTTPResponse<memberList>;
}
export interface GetTeamsListFailure {
  type: typeof GET_TEAMS_LIST_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type GetTeamHeirarchyActionTypes =
  | GetTeamHeirarchyRequest
  | GetTeamHeirarchySuccess
  | GetTeamHeirarchyFailure;

export type GetMemberGroupsActionTypes =
  | GetMemberGroupsRequest
  | GetMemberGroupsSuccess
  | GetMemberGroupsFailure;

export type GetTeamsListActionTypes =
  | GetTeamsListRequest
  | GetTeamsListSuccess
  | GetTeamsListFailure;

export const SET_DROP_DOWN_SELECTED_TEAMS = '@management/teams/set-drop-down-selected-teams';

export interface DropDownTeams {
  arrayOfSelectedTeams: string[];
  selectedTeam: string;
}
export interface SetDropDownSelectedTeams {
  type: typeof SET_DROP_DOWN_SELECTED_TEAMS;
  payload: DropDownTeams;
}
/**
 * @name SetSelectedTeams
 * @description To store selected teams in reducer
 */
export const SET_SELECTED_TEAMS = '@management/teams/set-selected-team';

export interface SetSelectedTeams {
  type: typeof SET_SELECTED_TEAMS;
  payload: string[];
}
/**
 * @name TeamsDetailsViewOption
 * @description To store pagination variables{page, limit, query} teams in reducer
 */
export interface TeamsDetailsViewOption {
  page: number;
  limit: number;
  query: string;
}

export const SET_TEAMS_DETAILS_VIEW_OPTION = '@management/teams/set-teams-details-view-option';

export interface SetTeamsDetailsViewOption {
  type: typeof SET_TEAMS_DETAILS_VIEW_OPTION;
  payload: TeamsDetailsViewOption;
}

/**
 * @name CreateTeam
 * @description To create a team using these dispatch types
 */
export const CREATE_TEAM = '@management/teams/create-team';
export const CREATE_TEAM_REQUEST = '@management/teams/create-team-request';
export const CREATE_TEAM_SUCCESS = '@management/teams/create-team-success';
export const CREATE_TEAM_FAILURE = '@management/teams/create-team-failure';

export interface CreateTeamsRequest {
  type: typeof CREATE_TEAM_REQUEST;
  payload?: CreateEditFormInitialValues;
}
export interface CreateTeamsSuccess {
  type: typeof CREATE_TEAM_SUCCESS;
  payload: HTTPResponse<TeamDocument>;
}
export interface CreateTeamsFailure {
  type: typeof CREATE_TEAM_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type CreateTeamActionTypes = CreateTeamsRequest | CreateTeamsSuccess | CreateTeamsFailure;

/**
 * @name UpdateTeam
 * @description To Update a team using these dispatch types
 */
export const UPDATE_TEAM = '@management/teams/update-team';
export const UPDATE_TEAM_REQUEST = '@management/teams/update-team-request';
export const UPDATE_TEAM_SUCCESS = '@management/teams/update-team-success';
export const UPDATE_TEAM_FAILURE = '@management/teams/update-team-failure';

export interface UpdateTeamsRequest {
  type: typeof UPDATE_TEAM_REQUEST;
  payload?: CreateEditFormInitialValues;
}
export interface UpdateTeamsSuccess {
  type: typeof UPDATE_TEAM_SUCCESS;
  payload: HTTPResponse<TeamDocument>;
}
export interface UpdateTeamsFailure {
  type: typeof UPDATE_TEAM_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type UpdateTeamActionTypes = UpdateTeamsRequest | UpdateTeamsSuccess | UpdateTeamsFailure;

/**
 * @name DeleteTeam
 * @description To Delete a team using these dispatch types
 */

export const DELETE_TEAM = '@management/teams/delete-team';
export const DELETE_TEAMS_REQUEST = '@management/teams/delete-teams-request';
export const DELETE_TEAMS_SUCCESS = '@management/teams/delete-teams-success';
export const DELETE_TEAMS_FAILURE = '@management/teams/delete-teams-failure';
export interface DeleteTeamsRequest {
  type: typeof DELETE_TEAMS_REQUEST;
}
export interface DeleteTeamsSuccess {
  type: typeof DELETE_TEAMS_SUCCESS;
  payload: HTTPResponse<DeleteTeamData>;
}
export interface DeleteTeamsFailure {
  type: typeof DELETE_TEAMS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type DeleteTeamActionTypes = DeleteTeamsRequest | DeleteTeamsSuccess | DeleteTeamsFailure;

/* Upload Team Image */
export const UPLOAD_TEAM_IMG_TO_S3_REQUEST = '@account/upload-team-img-request';
export const UPLOAD_TEAM_IMG_TO_S3_SUCCESS = '@account/upload-team-img-success';
export const UPLOAD_TEAM_IMG_TO_S3_FAILURE = '@account/upload-team-img-failure';

export interface UploadTeamImgToS3Request {
  type: typeof UPLOAD_TEAM_IMG_TO_S3_REQUEST;
}
export interface UploadTeamImgToS3Success {
  type: typeof UPLOAD_TEAM_IMG_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadTeamImgToS3Failure {
  type: typeof UPLOAD_TEAM_IMG_TO_S3_FAILURE;
}

export type UploadProfileImgActionTypes =
  | UploadTeamImgToS3Request
  | UploadTeamImgToS3Success
  | UploadTeamImgToS3Failure;

export type TeamActionTypes =
  | GetTeamRequest
  | GetTeamSuccess
  | GetTeamFailure
  | SetSelectedTeams
  | SetTeamsDetailsViewOption
  | CreateTeamActionTypes
  | UpdateTeamActionTypes
  | DeleteTeamActionTypes
  | GetTeamHeirarchyActionTypes
  | GetMemberGroupsActionTypes
  | SetDropDownSelectedTeams
  | UploadProfileImgActionTypes
  | GetTeamsListActionTypes;
