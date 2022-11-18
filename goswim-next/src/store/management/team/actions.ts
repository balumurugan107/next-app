import { Dispatch } from 'redux';
import { teamServiceInstance } from 'src/services/team';
import {
  GET_TEAM_FAILURE,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAILURE,
  SET_SELECTED_TEAMS,
  SET_TEAMS_DETAILS_VIEW_OPTION,
  TeamsDetailsViewOption,
  UpdateTeamData,
  DELETE_TEAMS_REQUEST,
  DELETE_TEAMS_SUCCESS,
  DELETE_TEAMS_FAILURE,
  DeleteTeamsRequest,
  GetTeamFailure,
  GetTeamSuccess,
  GetTeamRequest,
  CreateTeamsRequest,
  CreateTeamsSuccess,
  CreateTeamsFailure,
  UpdateTeamsRequest,
  UpdateTeamsSuccess,
  UpdateTeamsFailure,
  DeleteTeamsSuccess,
  DeleteTeamsFailure,
  SetSelectedTeams,
  SetTeamsDetailsViewOption,
  DeleteTeamData,
  SET_DROP_DOWN_SELECTED_TEAMS,
  SetDropDownSelectedTeams,
  DropDownTeams,
  RemoveTeamData,
  getMemberArgs,
  UploadTeamImgToS3Failure,
  UploadTeamImgToS3Request,
  UploadTeamImgToS3Success,
  UPLOAD_TEAM_IMG_TO_S3_FAILURE,
  UPLOAD_TEAM_IMG_TO_S3_REQUEST,
  UPLOAD_TEAM_IMG_TO_S3_SUCCESS,
  GetMemberGroupsRequest,
  GetMemberGroupsSuccess,
  GET_MEMBER_GROUPS_REQUEST,
  GET_MEMBER_GROUPS_SUCCESS,
  GetMemberGroupsFailure,
  GET_MEMBER_GROUPS_FAILURE
} from 'src/store/management/team/types';
import { initialTDVO } from 'src/store/management/team/reducer';
import { UploadVideoToS3ServiceInstance } from 'src/services/goswim/admin/videos/S3UploadJs';
import { apiGetAllTeamsList, apiGetTeamHeirarchy } from 'pages/api/groups';

export const getTeam = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetTeamRequest>({ type: GET_TEAM_REQUEST });

      const payload = await teamServiceInstance.getTeam();

      dispatch<GetTeamSuccess>({
        type: GET_TEAM_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch<GetTeamFailure>({
        type: GET_TEAM_FAILURE,
        error
      });
    }
  };
};
export const setDropDownSelectedTeams = (team: DropDownTeams) => (dispatch: Dispatch) => {
  dispatch<SetDropDownSelectedTeams>({ type: SET_DROP_DOWN_SELECTED_TEAMS, payload: team });
};

export const getTeamHeirarchy = (args: getMemberArgs = {}) => {
  return async (dispatch: Dispatch) => {
    apiGetTeamHeirarchy(dispatch, args);
  };
};

export const getMemberGroups = (args: getMemberArgs = {}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetMemberGroupsRequest>({ type: GET_MEMBER_GROUPS_REQUEST });

      const payload = await teamServiceInstance.getMemberGroups(args || {});

      dispatch<GetMemberGroupsSuccess>({
        type: GET_MEMBER_GROUPS_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch<GetMemberGroupsFailure>({
        type: GET_MEMBER_GROUPS_FAILURE,
        error
      });
    }
  };
};

export const getTeamsList = () => {
  return async (dispatch: Dispatch) => {
    apiGetAllTeamsList(dispatch);
  };
};

interface CreateTeamRequest {
  values: UpdateTeamData;
}

export const createTeam = ({ values }: CreateTeamRequest) => async (dispatch: Dispatch) => {
  try {
    dispatch<CreateTeamsRequest>({ type: CREATE_TEAM_REQUEST });
    const payload = await teamServiceInstance.createTeam(values);

    dispatch<CreateTeamsSuccess>({
      type: CREATE_TEAM_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<CreateTeamsFailure>({ type: CREATE_TEAM_FAILURE, error });
  }
};

export const updateTeam = ({ values }: CreateTeamRequest, memberId: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<UpdateTeamsRequest>({ type: UPDATE_TEAM_REQUEST });

    const payload = await teamServiceInstance.updateTeam(values, memberId);

    dispatch<UpdateTeamsSuccess>({
      type: UPDATE_TEAM_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<UpdateTeamsFailure>({ type: UPDATE_TEAM_FAILURE, error });
  }
};

export const deleteTeam = (teamData: DeleteTeamData) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteTeamsRequest>({ type: DELETE_TEAMS_REQUEST });

    const payload = await teamServiceInstance.deleteTeams(teamData);

    dispatch<DeleteTeamsSuccess>({
      type: DELETE_TEAMS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<DeleteTeamsFailure>({ type: DELETE_TEAMS_FAILURE, error });
  }
};

export const exitFromTeam = (teamData: RemoveTeamData) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeleteTeamsRequest>({ type: DELETE_TEAMS_REQUEST });

    const payload = await teamServiceInstance.exitFromTeam(teamData);

    dispatch<DeleteTeamsSuccess>({
      type: DELETE_TEAMS_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<DeleteTeamsFailure>({ type: DELETE_TEAMS_FAILURE, error });
  }
};

export const setSelectedTeams = (teams: string[]) => async (dispatch: Dispatch) => {
  try {
    dispatch<SetSelectedTeams>({ type: SET_SELECTED_TEAMS, payload: teams });
  } catch (error) {
    console.error(`setSelectedTeams-->${error}`);
  }
};

export const setTeamsDetailsViewOptions = (options?: TeamsDetailsViewOption) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<SetTeamsDetailsViewOption>({
      type: SET_TEAMS_DETAILS_VIEW_OPTION,
      payload: (options && { ...options }) || { ...initialTDVO }
    });
  } catch (error) {
    console.error(`setSelectedTeams-->${error}`);
  }
};

export const uploadTeamImgToS3Bucket = (file: File | null, uploadedTimestamp: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadTeamImgToS3Request>({ type: UPLOAD_TEAM_IMG_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadTeamFile(file, uploadedTimestamp);

      dispatch<UploadTeamImgToS3Success>({
        type: UPLOAD_TEAM_IMG_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadTeamImgToS3Failure>({ type: UPLOAD_TEAM_IMG_TO_S3_FAILURE });
    }
  };
};
