import { Dispatch } from "redux";
import { teamServiceInstance } from "src/services/team";
import {
  GetMemberGroupsRequest, GET_MEMBER_GROUPS_REQUEST,
  GetMemberGroupsSuccess, GET_MEMBER_GROUPS_SUCCESS, GetMemberGroupsFailure,
  GET_MEMBER_GROUPS_FAILURE, GetTeamsListRequest, GetTeamsListFailure,
  GetTeamsListSuccess, GET_TEAMS_LIST_FAILURE, GET_TEAMS_LIST_REQUEST,
  GET_TEAMS_LIST_SUCCESS, getMemberArgs, GetTeamHeirarchyFailure, GetTeamHeirarchyRequest,
  GetTeamHeirarchySuccess, GET_TEAM_HEIRARCHY_FAILURE, GET_TEAM_HEIRARCHY_REQUEST,
  GET_TEAM_HEIRARCHY_SUCCESS
} from "src/store/management/team";

interface IArgs { page: number; limit: number; search: string; }

export const apiGetGroups = async (dispatch: Dispatch, args: IArgs) => {
  try {
    dispatch<GetMemberGroupsRequest>({ type: GET_MEMBER_GROUPS_REQUEST });

    const payload = await teamServiceInstance.getMemberGroups(args || {});


    dispatch<GetMemberGroupsSuccess>({
      type: GET_MEMBER_GROUPS_SUCCESS,
      payload
    });
  } catch (error: any) {
    dispatch<GetMemberGroupsFailure>({
      type: GET_MEMBER_GROUPS_FAILURE,
      error
    });
  }
};

export const apiGetAllTeamsList = async (dispatch: Dispatch) => {
  try {
    dispatch<GetTeamsListRequest>({ type: GET_TEAMS_LIST_REQUEST });
    const payload = await teamServiceInstance.getTeamsList();
    dispatch<GetTeamsListSuccess>({
      type: GET_TEAMS_LIST_SUCCESS,
      payload
    });
  }
  catch (error) {
    if (error) {
      dispatch<GetTeamsListFailure>({
        type: GET_TEAMS_LIST_FAILURE,
        error
      });
    }

  }
};

export const apiGetTeamHeirarchy = async (dispatch: Dispatch, args: getMemberArgs = {}) => {
    try {
      dispatch<GetTeamHeirarchyRequest>({ type: GET_TEAM_HEIRARCHY_REQUEST });
      const payload = await teamServiceInstance.getTeamHeirarchy(args || {});
      dispatch<GetTeamHeirarchySuccess>({
        type: GET_TEAM_HEIRARCHY_SUCCESS,
        payload
      });
    }
    catch (error) {
      dispatch<GetTeamHeirarchyFailure>({
        type: GET_TEAM_HEIRARCHY_FAILURE,
        error
      });
    }
};


