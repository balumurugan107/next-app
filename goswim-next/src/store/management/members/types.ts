import { KeyValue, HTTPResponse, HTTPErrorResponse } from 'src/types';
import { AccountType } from 'src/constants';
import { AxiosError } from 'axios';
import { InitialValues as CreateEditFormInitialValues } from 'src/views/management/Members/CreateEditView/Form';

export interface MembersState {
  isLoading: boolean;
  isImportLoading: boolean;
  isSendInvitationLoading: boolean;
  data: MemberData[];
  selectedMembers: string[];
  memberInfoViewOptions: MemberInfoViewOptions;
  currentSelectedTeamManagement: string;
  page: number;
  limit: number;
  query: string;
  length: number;
  response: any;
  error: any;
  currentSelectedTeam: string;
  currentSelectedTeams: string[];
  member?: MemberData;
  isSelected: boolean;
  onlyPrev: boolean;
  disabledMembers: string[];
  contracts: ContractResponse[];
  checkingMember: boolean;
  existingMember: IMemberExist | null;
}

interface ScheduleSchema {
  cost: number;
  date: number;
  slots: number;
}

export interface IMemberExist {
  status: string;
  role: string;
  _id: string | number;
  full_name: string;
  email: string;
  account_name: string;
  can_add_team: boolean;
  can_manage_current_teams: boolean;
  city: string;
  country: string;
  designation: string;
  dob: string | null;
  email_notification_enabled: boolean;
  experience: string;
  has_profile_picture: boolean;
  isAgeEligible: boolean;
  phone: string;
  s3_profile_picture?: string | null;
  secondary_email: string;
  zipcode: string;
  address_line1: string;
  address_line2: string;
  state: string;
  promotion_enabled: boolean;
  split: number;
}

/**
 * @date 3/07/2020
 * @description neeed to change any to Types.Objectid which is a type in mongoose need to check with soundhar.
 * @author Karthik Prakash
 */
interface ScheduleReviewSchema extends ScheduleSchema {
  scheduled_review_id: string;
}

interface ScheduleLessonSchema extends ScheduleSchema {
  scheduled_lesson_id: string;
}

export interface GetMemberData {
  results: MemberData[];
  totalCount: number;
  next?: any;
}

export interface MemberData {
  _id: string;
  user_app_id: string;
  team: string[];
  account_name: string;
  roster_group: string[];
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  email: string;
  phone: string;
  sponsor_status: string;
  status: Status;
  last_status_updated_timestamp: number;
  coupon_key: string;
  trail_period: string;
  coupon_purchased_timestamp: number;
  full_name: string;
  profile_picture: Buffer;
  stripe_customer_id: string;
  scheduled_reviews_data: ScheduleReviewSchema;
  scheduled_lessons_data: ScheduleLessonSchema;
  profile_picture_url?: string;
  full_address?: string;
  role?: MemberRole;
  can_add_team?: boolean;
  can_manage_current_teams?: boolean;
  subscription_product?: string;
  subscription_date_utc_timestamp?: number;
  subscription_status?: string;
  payment_status?: string;
  isAgeEligible: boolean;
  secondary_email?: string;
  promotion_enabled?: boolean;
  dob?: string;
  split?: number;
  signInCount: number;
  has_profile_picture: boolean;
}

export type Status = 'Invite sent' | 'Not invited' | 'Coupon sent' | 'Subscribed' | 'active';

export type MemberRole =
  | AccountType.COACH_OR_SWIMMING_EXPERT
  | AccountType.SWIMMER_OR_PARENT
  | AccountType.COACH
  | AccountType.SWIMMER
  | AccountType.EXPERT
  | AccountType.ATHLETE
  | AccountType.UNKNOWN
  | AccountType.EVALUATOR
  | AccountType.CONTRACT;

export interface MemberInfoViewOptions {
  page: number;
  limit: number;
  query: string;
}

export const SET_SELECTED_TEAM = '@management/members/set-selected-team';

export interface SetSelectedTeam {
  type: typeof SET_SELECTED_TEAM;
  payload: string;
}

/* clear response and error */
export const CLEAR_RESPONSE_AND_ERROR = '@management/members/clear-response-and-error';
export interface ClearResponseAndError {
  type: typeof CLEAR_RESPONSE_AND_ERROR;
}
/* set selected embers */
export const SET_SELECTED_MEMBERS = '@management/members/v1/set-selected-members';
export interface SetSelectedMembers {
  type: typeof SET_SELECTED_MEMBERS;
  payload: string[];
}

/* update Member */
export const UPDATE_MEMBER = '@management/members/update-member';
export const UPDATE_MEMBER_REQUEST = '@management/members/update-member-request';
export const UPDATE_MEMBER_SUCCESS = '@management/members/update-member-success';
export const UPDATE_MEMBER_FAILURE = '@management/members/update-member-failure';
export interface UpdateMembersRequest {
  type: typeof UPDATE_MEMBER_REQUEST;
  payload?: MemberData;
}
export interface UpdateMembersSuccess {
  type: typeof UPDATE_MEMBER_SUCCESS;
  payload: HTTPResponse<MemberData>;
}
export interface UpdateMembersFailure {
  type: typeof UPDATE_MEMBER_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type UpdateMemberActionTypes =
  | UpdateMembersRequest
  | UpdateMembersSuccess
  | UpdateMembersFailure;

/* get members Subscription */
export const GET_MEMBER_SUBSCRIPTION = '@management/members/get-member-subscription';
export const GET_MEMBER_SUBSCRIPTION_REQUEST =
  '@management/members/get-member-subscription-request';
export const GET_MEMBER_SUBSCRIPTION_SUCCESS =
  '@management/members/get-member-subscription-success';
export const GET_MEMBER_SUBSCRIPTION_FAILURE =
  '@management/members/get-member-subscription-failure';
export interface GetMemberSubscriptionRequest {
  type: typeof GET_MEMBER_SUBSCRIPTION_REQUEST;
  payload?: any;
}
export interface GetMemberSubscriptionSuccess {
  type: typeof GET_MEMBER_SUBSCRIPTION_SUCCESS;
  payload: HTTPResponse<MemberData>;
}
export interface GetMemberSubscriptionFailure {
  type: typeof GET_MEMBER_SUBSCRIPTION_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetMemberSubscriptionActionTypes =
  | GetMemberSubscriptionRequest
  | GetMemberSubscriptionSuccess
  | GetMemberSubscriptionFailure;

/* get members */
export const GET_MEMBER = '@management/members/get-member';
export const GET_MEMBERS_REQUEST = '@management/members/get-members-request';
export const GET_MEMBERS_SUCCESS = '@management/members/get-members-success';
export const GET_MEMBERS_FAILURE = '@management/members/get-members-failure';
export interface GetMembersRequest {
  type: typeof GET_MEMBERS_REQUEST;
  payload?: KeyValue<string | string[] | number | boolean>;
}
export interface GetMembersSuccess {
  type: typeof GET_MEMBERS_SUCCESS;
  payload: HTTPResponse<GetMemberData>;
}
export interface GetMembersFailure {
  type: typeof GET_MEMBERS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type GetMemberActionTypes = GetMembersRequest | GetMembersSuccess | GetMembersFailure;

/* invite Members */
export const INVITE_MEMBER = '@management/members/invite-member';
export const INVITE_MEMBER_REQUEST = '@management/members/invite-member-request';
export const INVITE_MEMBER_SUCCESS = '@management/members/invite-member-success';
export const INVITE_MEMBER_FAILURE = '@management/members/invite-member-failure';
export interface InviteMembersRequest {
  type: typeof INVITE_MEMBER_REQUEST;
  // payload?: any;
}
export interface InviteMembersSuccess {
  type: typeof INVITE_MEMBER_SUCCESS;
  payload: HTTPResponse<MemberData[]>;
}
export interface InviteMembersFailure {
  type: typeof INVITE_MEMBER_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type InviteMemberActionTypes =
  | InviteMembersRequest
  | InviteMembersSuccess
  | InviteMembersFailure;

/* Import csv */
export const IMPORT_MEMBERS = '@management/members/import-member';
export const IMPORT_MEMBER_REQUEST = '@management/members/import-member-request';
export const IMPORT_MEMBER_SUCCESS = '@management/members/import-member-success';
export const IMPORT_MEMBER_FAILURE = '@management/members/import-member-failure';
export interface ImportMembersRequest {
  type: typeof IMPORT_MEMBER_REQUEST;
  payload?: any;
}
export interface ImportMembersSuccess {
  type: typeof IMPORT_MEMBER_SUCCESS;
  payload: HTTPResponse<MemberData[]>;
}
export interface ImportMembersFailure {
  type: typeof IMPORT_MEMBER_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type ImportMemberActionTypes =
  | ImportMembersRequest
  | ImportMembersSuccess
  | ImportMembersFailure;

/* Pagination Action types*/
export const SET_PAGE = '@management/members/setPage';
export const SET_LIMIT = '@management/members/setLimit';

export interface SetPage {
  type: typeof SET_PAGE;
  payload: number;
}

export interface SetLimit {
  type: typeof SET_LIMIT;
  payload: number;
}

export type PaginationActionTypes = SetPage | SetLimit;

/* Query Action types*/
export const SET_QUERY = '@management/members/setQuery';
export interface SetQuery {
  type: typeof SET_QUERY;
  payload: string;
}

export type QueryActionTypes = SetQuery;

export const SET_MEMBERS_DROP_DOWN_SELECTED_TEAMS =
  '@management/member/set-drop-down-selected-teams';

export const SET_MEMBERS_DROP_DOWN_SELECTED_TEAM_CALENDAR =
  '@management/member/set-drop-down-selected-team-calendar';

export interface DropDownTeams {
  arrayOfSelectedTeams: string[];
  selectedTeam: string;
}
export interface SetMembersDropDownSelectedTeams {
  type: typeof SET_MEMBERS_DROP_DOWN_SELECTED_TEAMS;
  payload: DropDownTeams;
}

export interface SetMembersDropDownSelectedTeamCalendar {
  type: typeof SET_MEMBERS_DROP_DOWN_SELECTED_TEAM_CALENDAR;
  payload: DropDownTeams;
}

export const SET_CURRENT_SELECTED_TEAMS = '@management/member/set-current-selected-teams';

export interface SetCurrentSelectedTeams {
  type: typeof SET_CURRENT_SELECTED_TEAMS;
  payload: string[];
}

export const SET_DISABLED_MEMBERS = '@management/member/set-disabled-members';

export interface SetDisabledMember {
  type: typeof SET_DISABLED_MEMBERS;
  payload: string;
}

export interface ContractResponse {
  _id: string;
  full_name: string;
  email: string;
  role: string;
  team: string[];
}
export interface IContract {
  results: ContractResponse[];
}

export const GET_CONTRACTS_REQUEST = '@management/members/get-contracts-request';
export const GET_CONTRACTS_SUCCESS = '@management/members/get-contracts-success';
export const GET_CONTRACTS_FAILURE = '@management/members/get-contracts-failure';

export interface GetContractsRequest {
  type: typeof GET_CONTRACTS_REQUEST;
}
export interface GetContractsSuccess {
  type: typeof GET_CONTRACTS_SUCCESS;
  payload: IContract;
}
export interface GetContractsFailure {
  type: typeof GET_CONTRACTS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetContractsActionTypes =
  | GetContractsRequest
  | GetContractsSuccess
  | GetContractsFailure;

/* create Member */
export const CREATE_MEMBER = '@management/members/create-member';
export const CREATE_MEMBER_REQUEST = '@management/members/create-member-request';
export const CREATE_MEMBER_SUCCESS = '@management/members/create-member-success';
export const CREATE_MEMBER_FAILURE = '@management/members/create-member-failure';
export interface CreateMembersRequest {
  type: typeof CREATE_MEMBER_REQUEST;
  payload?: CreateEditFormInitialValues;
}
export interface CreateMembersSuccess {
  type: typeof CREATE_MEMBER_SUCCESS;
  payload: HTTPResponse<MemberData>;
}
export interface CreateMembersFailure {
  type: typeof CREATE_MEMBER_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type CreateMemberActionTypes =
  | CreateMembersRequest
  | CreateMembersSuccess
  | CreateMembersFailure;

/* delete members */

export interface DeleteMemberData {
  ids: string | string[];
}
export const DELETE_MEMBER = '@management/members/delete-member';
export const DELETE_MEMBERS_REQUEST = '@management/members/delete-members-request';
export const DELETE_MEMBERS_SUCCESS = '@management/members/delete-members-success';
export const DELETE_MEMBERS_FAILURE = '@management/members/delete-members-failure';

export const DELETE_ACCOUNT_REQUEST = '@management/members/delete-account-request';
export const DELETE_ACCOUNT_SUCCESS = '@management/members/delete-account-success';
export const DELETE_ACCOUNT_FAILURE = '@management/members/delete-account-failure';

export interface DeleteMembersRequest {
  type: typeof DELETE_MEMBERS_REQUEST;
  payload?: { ids: string[] };
}
export interface DeleteMembersSuccess {
  type: typeof DELETE_MEMBERS_SUCCESS;
  payload: HTTPResponse<DeleteMemberData>;
}
export interface DeleteMembersFailure {
  type: typeof DELETE_MEMBERS_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type DeleteMemberActionTypes =
  | DeleteMembersRequest
  | DeleteMembersSuccess
  | DeleteMembersFailure;

export interface DeleteAccountRequest {
  type: typeof DELETE_ACCOUNT_REQUEST;
  payload?: string;
}
export interface DeleteAccountSuccess {
  type: typeof DELETE_ACCOUNT_SUCCESS;
  payload?: any;
}
export interface DeleteAccountFailure {
  type: typeof DELETE_ACCOUNT_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type DeleteAccountActionTypes =
  | DeleteAccountRequest
  | DeleteAccountSuccess
  | DeleteAccountFailure;

// CHECK EXISTING MEMBER

export const CHECK_EXISTING_MEMBER_REQUEST = '@management/members/check-existing-member-request';
export const CHECK_EXISTING_MEMBER_SUCCESS = '@management/members/check-existing-member-success';
export const CHECK_EXISTING_MEMBER_FAILURE = '@management/members/check-existing-member-failure';
export interface CheckExistingMemberRequest {
  type: typeof CHECK_EXISTING_MEMBER_REQUEST;
}
export interface CheckExistingMemberSuccess {
  type: typeof CHECK_EXISTING_MEMBER_SUCCESS;
  payload: IMemberExist | null;
}
export interface CheckExistingMemberFailure {
  type: typeof CHECK_EXISTING_MEMBER_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}
export type CheckExistingMemberActionTypes =
  | CheckExistingMemberRequest
  | CheckExistingMemberSuccess
  | CheckExistingMemberFailure;

export type MembersActionTypes =
  | SetSelectedMembers
  | ClearResponseAndError
  | GetMemberActionTypes
  | GetMemberSubscriptionActionTypes
  | InviteMemberActionTypes
  | ImportMemberActionTypes
  | SetSelectedTeam
  | SetMembersDropDownSelectedTeams
  | SetMembersDropDownSelectedTeamCalendar
  | PaginationActionTypes
  | QueryActionTypes
  | SetCurrentSelectedTeams
  | GetContractsActionTypes
  | DeleteMemberActionTypes
  | CreateMemberActionTypes
  | UpdateMemberActionTypes
  | SetDisabledMember
  | CheckExistingMemberActionTypes;
