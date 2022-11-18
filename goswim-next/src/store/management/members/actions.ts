import { Dispatch } from 'redux';
import { membersServiceInstance } from 'src/services/management';
import {
  SET_SELECTED_MEMBERS,
  CLEAR_RESPONSE_AND_ERROR,
  INVITE_MEMBER_REQUEST,
  INVITE_MEMBER_SUCCESS,
  INVITE_MEMBER_FAILURE,
  IMPORT_MEMBER_REQUEST,
  IMPORT_MEMBER_SUCCESS,
  IMPORT_MEMBER_FAILURE,
  // MemberData,
  SET_SELECTED_TEAM,
  ImportMembersRequest,
  ImportMembersSuccess,
  ImportMembersFailure,
  InviteMembersRequest,
  InviteMembersSuccess,
  InviteMembersFailure,
  SetSelectedMembers,
  SetSelectedTeam,
  ClearResponseAndError,
  SET_PAGE,
  SET_LIMIT,
  SET_QUERY,
  SetPage,
  SetLimit,
  SetQuery,
  DropDownTeams,
  SetMembersDropDownSelectedTeams,
  SET_MEMBERS_DROP_DOWN_SELECTED_TEAMS,
  SetCurrentSelectedTeams,
  SET_CURRENT_SELECTED_TEAMS,
  SET_DISABLED_MEMBERS,
  SetDisabledMember,
  GET_MEMBER_SUBSCRIPTION_REQUEST,
  GetMemberSubscriptionFailure,
  GetMemberSubscriptionRequest,
  GetMemberSubscriptionSuccess,
  GET_MEMBER_SUBSCRIPTION_FAILURE,
  GET_MEMBER_SUBSCRIPTION_SUCCESS,
  GetContractsRequest,
  GetContractsSuccess,
  GET_CONTRACTS_REQUEST,
  GET_CONTRACTS_SUCCESS,
  DeleteMembersFailure,
  DeleteMembersRequest,
  DeleteMembersSuccess,
  DELETE_MEMBERS_FAILURE,
  DELETE_MEMBERS_REQUEST,
  DELETE_MEMBERS_SUCCESS,
  CreateMembersFailure,
  CreateMembersRequest,
  CreateMembersSuccess,
  CREATE_MEMBER_FAILURE,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
  UpdateMembersRequest,
  UpdateMembersFailure,
  UpdateMembersSuccess,
  UPDATE_MEMBER_FAILURE,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  SET_MEMBERS_DROP_DOWN_SELECTED_TEAM_CALENDAR,
  SetMembersDropDownSelectedTeamCalendar,
  CheckExistingMemberFailure,
  CheckExistingMemberRequest,
  CheckExistingMemberSuccess,
  CHECK_EXISTING_MEMBER_FAILURE,
  CHECK_EXISTING_MEMBER_REQUEST,
  CHECK_EXISTING_MEMBER_SUCCESS,
  DELETE_ACCOUNT_REQUEST,
  DeleteAccountRequest,
  DeleteAccountSuccess,
  DELETE_ACCOUNT_SUCCESS,
  DeleteAccountFailure,
  DELETE_ACCOUNT_FAILURE,
  GetMembersFailure,
  GetMembersRequest,
  GetMembersSuccess,
  GET_MEMBERS_FAILURE,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS
} from 'src/store/management/members/types';
import { DeleteTeamData, RemoveMemberData } from '../team';
import { UpdatedValues } from 'src/views/management/Members/CreateEditView/Form';
import { History } from 'history';
import { NextRouter } from 'next/router';
import { MemberMessages } from 'src/constants/member';

interface CreateMemberRequest {
  values: UpdatedValues;
  router: NextRouter;
}

export const clearResponseAndError = () => async (dispatch: Dispatch) => {
  try {
    dispatch<ClearResponseAndError>({ type: CLEAR_RESPONSE_AND_ERROR });
  } catch (error) {
    console.error(`clearResponseAndError-->${error}`);
  }
};

export const setSelectedMembers = (members: string[]) => async (dispatch: Dispatch) => {
  try {
    dispatch<SetSelectedMembers>({ type: SET_SELECTED_MEMBERS, payload: members });
  } catch (error) {
    console.error(`setSelectedMembers-->${error}`);
  }
};

export const setPage = (page: number) => (dispatch: Dispatch) => {
  dispatch<SetPage>({
    type: SET_PAGE,
    payload: page
  });
};

export const setLimit = (limit: number) => (dispatch: Dispatch) => {
  dispatch<SetLimit>({
    type: SET_LIMIT,
    payload: limit
  });
};

export const setQuery = (query: string) => (dispatch: Dispatch) => {
  dispatch<SetQuery>({
    type: SET_QUERY,
    payload: query
  });
};

export const setMembersDropDownSelectedTeams = (team: DropDownTeams) => (dispatch: Dispatch) => {
  dispatch<SetMembersDropDownSelectedTeams>({
    type: SET_MEMBERS_DROP_DOWN_SELECTED_TEAMS,
    payload: team
  });
};

export const setMembersDropDownSelectedTeamCalendar = (team: DropDownTeams) => (
  dispatch: Dispatch
) => {
  dispatch<SetMembersDropDownSelectedTeamCalendar>({
    type: SET_MEMBERS_DROP_DOWN_SELECTED_TEAM_CALENDAR,
    payload: team
  });
};

export const setCurrentSelectedTeams = (teams: string[]) => (dispatch: Dispatch) => {
  dispatch<SetCurrentSelectedTeams>({ type: SET_CURRENT_SELECTED_TEAMS, payload: teams });
};

export const setDisabledMember = (member: string) => (dispatch: Dispatch) => {
  dispatch<SetDisabledMember>({ type: SET_DISABLED_MEMBERS, payload: member });
};

export const createMember = (
  { values, history }: CreateMemberRequest,
  teamId: string[],
  userName: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch<CreateMembersRequest>({ type: CREATE_MEMBER_REQUEST });

    const payload = await membersServiceInstance.createMember(values, teamId, userName);

    dispatch<CreateMembersSuccess>({
      type: CREATE_MEMBER_SUCCESS,
      payload
    });
    history.goBack();
  } catch (error) {
    dispatch<CreateMembersFailure>({
      type: CREATE_MEMBER_FAILURE,
      error
    });
  }
};

export const getMembers = <T>(filters?: T) => async (dispatch: Dispatch) => {
  try {
    dispatch<GetMembersRequest>({ type: GET_MEMBERS_REQUEST });
    const payload = await membersServiceInstance.getMembers<T>(filters);
    dispatch<GetMembersSuccess>({
      type: GET_MEMBERS_SUCCESS,
      payload
    });
  } catch (error) {
    if (error.message !== MemberMessages.OPERATION_CANCELLED) {
      dispatch<GetMembersFailure>({ type: GET_MEMBERS_FAILURE, error });
    }
  }
};

export const getMemberNoAuth = (memberId: any, router: NextRouter) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<GetMemberSubscriptionRequest>({ type: GET_MEMBER_SUBSCRIPTION_REQUEST });

    const payload = await membersServiceInstance.getMemberNoAuth(memberId);
    if (payload.data === undefined || payload.data === null) {
      router.push('/');
    }
    dispatch<GetMemberSubscriptionSuccess>({
      type: GET_MEMBER_SUBSCRIPTION_SUCCESS,
      payload
    });
  } catch (error) {
    router.push('/');
    dispatch<GetMemberSubscriptionFailure>({ type: GET_MEMBER_SUBSCRIPTION_FAILURE, error });
  }
};

export const inviteMember = (members: string[], teamId: string, userName: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<InviteMembersRequest>({ type: INVITE_MEMBER_REQUEST });

    const payload = await membersServiceInstance.inviteMember(members, teamId, userName);

    dispatch<InviteMembersSuccess>({
      type: INVITE_MEMBER_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<InviteMembersFailure>({ type: INVITE_MEMBER_FAILURE, error });
  }
};

export const updateMember = ({ values, router }: CreateMemberRequest, memberId: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<UpdateMembersRequest>({ type: UPDATE_MEMBER_REQUEST });

    const payload = await membersServiceInstance.updateMember(values, memberId);

    dispatch<UpdateMembersSuccess>({
      type: UPDATE_MEMBER_SUCCESS,
      payload
    });
    router.back();
  } catch (error) {
    dispatch<UpdateMembersFailure>({
      type: UPDATE_MEMBER_FAILURE,
      error
    });
  }
};

export const getMember = (memberId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<GetMemberSubscriptionRequest>({ type: GET_MEMBER_SUBSCRIPTION_REQUEST });

    const payload = await membersServiceInstance.getMember(memberId);

    dispatch<GetMemberSubscriptionSuccess>({
      type: GET_MEMBER_SUBSCRIPTION_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<GetMemberSubscriptionFailure>({ type: GET_MEMBER_SUBSCRIPTION_FAILURE, error });
  }
};

export const deleteMember = (memberId: DeleteTeamData) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteMembersRequest>({ type: DELETE_MEMBERS_REQUEST });

    const payload = await membersServiceInstance.deleteMembers(memberId);

    dispatch<DeleteMembersSuccess>({
      type: DELETE_MEMBERS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<DeleteMembersFailure>({ type: DELETE_MEMBERS_FAILURE, error });
  }
};

export const deleteAccount = (accountId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteAccountRequest>({ type: DELETE_ACCOUNT_REQUEST });

    const payload = await membersServiceInstance.deleteAccount(accountId);

    dispatch<DeleteAccountSuccess>({
      type: DELETE_ACCOUNT_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<DeleteAccountFailure>({ type: DELETE_ACCOUNT_FAILURE, error });
  }
};

export const removeMember = (teamID: string, memberId: RemoveMemberData) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<DeleteMembersRequest>({ type: DELETE_MEMBERS_REQUEST });

    const payload = await membersServiceInstance.removeMembers(teamID, memberId);

    dispatch<DeleteMembersSuccess>({
      type: DELETE_MEMBERS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<DeleteMembersFailure>({ type: DELETE_MEMBERS_FAILURE, error });
  }
};

export const importMember = (file: File, team: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<ImportMembersRequest>({ type: IMPORT_MEMBER_REQUEST });

    const payload = await membersServiceInstance.importMember(file, team);

    dispatch<ImportMembersSuccess>({
      type: IMPORT_MEMBER_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<ImportMembersFailure>({ type: IMPORT_MEMBER_FAILURE, error });
  }
};

export const setSelectedTeam = (team: string) => (dispatch: Dispatch) => {
  dispatch<SetSelectedTeam>({ type: SET_SELECTED_TEAM, payload: team });
};

export const getContracts = (page: number | string, limit: number | string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<GetContractsRequest>({ type: GET_CONTRACTS_REQUEST });

    const payload = await membersServiceInstance.getContracts(page, limit);

    dispatch<GetContractsSuccess>({
      type: GET_CONTRACTS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<GetMemberSubscriptionFailure>({ type: GET_MEMBER_SUBSCRIPTION_FAILURE, error });
  }
};

export const checkExistingMember = (email: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<CheckExistingMemberRequest>({ type: CHECK_EXISTING_MEMBER_REQUEST });

    const payload = await membersServiceInstance.checkExistingMember(email);

    dispatch<CheckExistingMemberSuccess>({
      type: CHECK_EXISTING_MEMBER_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<CheckExistingMemberFailure>({ type: CHECK_EXISTING_MEMBER_FAILURE, error });
  }
};
