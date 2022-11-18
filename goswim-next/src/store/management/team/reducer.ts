/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILURE,
  GET_TEAM_HEIRARCHY_REQUEST,
  GET_TEAM_HEIRARCHY_SUCCESS,
  GET_TEAM_HEIRARCHY_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAILURE,
  TeamState,
  SET_SELECTED_TEAMS,
  SET_DROP_DOWN_SELECTED_TEAMS,
  SET_TEAMS_DETAILS_VIEW_OPTION,
  TeamActionTypes,
  DELETE_TEAMS_REQUEST,
  DELETE_TEAMS_SUCCESS,
  DELETE_TEAMS_FAILURE,
  UPLOAD_TEAM_IMG_TO_S3_FAILURE,
  UPLOAD_TEAM_IMG_TO_S3_REQUEST,
  UPLOAD_TEAM_IMG_TO_S3_SUCCESS,
  GET_TEAMS_LIST_REQUEST,
  GET_TEAMS_LIST_SUCCESS,
  GET_TEAMS_LIST_FAILURE,
  GET_MEMBER_GROUPS_REQUEST,
  GET_MEMBER_GROUPS_SUCCESS,
  GET_MEMBER_GROUPS_FAILURE
} from 'src/store/management/team/types';

export const initialTDVO = {
  page: 0,
  limit: 20,
  query: ''
};
/**
 * @since 06/06/2020
 * @description updated data type from any to cloudkitRecords
 */
const initialState: TeamState = {
  isLoading: false,
  selectedTeams: [],
  teamsDetailsViewOption: {
    ...initialTDVO
  },
  data: [],
  heirarchyTeams: [],
  memberGroups: [],
  error: null,
  message: '',
  dropDownSelectedTeams: [],
  dropDownSelectedTeam: 'ALL',
  teamBrandLogo: null,
  totalCount: 0,
  next: {},
  teamsList: []
};
export const teamReducer = (state = initialState, action: TeamActionTypes) => {
  switch (action.type) {
    case CREATE_TEAM_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
        draft.message = '';
      });
    }
    case CREATE_TEAM_SUCCESS: {
      return produce(state, draft => {
        draft.error = null;
        draft.teamsDetailsViewOption = { ...initialTDVO };
        draft.isLoading = false;
        draft.message = action.payload.message;
      });
    }
    case CREATE_TEAM_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
        draft.message = '';
      });
    }
    case UPDATE_TEAM_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
        draft.message = '';
      });
    }
    case UPDATE_TEAM_SUCCESS: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = false;
        draft.message = action.payload.message;
      });
    }
    case UPDATE_TEAM_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.message = '';
        draft.isLoading = false;
      });
    }
    case SET_DROP_DOWN_SELECTED_TEAMS: {
      return produce(state, draft => {
        const { arrayOfSelectedTeams, selectedTeam } = action.payload;
        draft.dropDownSelectedTeams = arrayOfSelectedTeams;
        draft.dropDownSelectedTeam = selectedTeam;
      });
    }
    case GET_TEAM_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.message = '';
        draft.error = null;
        draft.data = [];
      });
    }
    case GET_TEAM_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.data = action.payload.data;
        draft.error = null;
      });
    }
    case GET_TEAM_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
        draft.message = '';
      });
    }
    case GET_TEAM_HEIRARCHY_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.message = '';
        draft.error = null;
      });
    }
    case GET_TEAM_HEIRARCHY_SUCCESS: {
      return produce(state, draft => {
        draft.heirarchyTeams = action.payload.data.results;
        draft.error = null;
        draft.isLoading = false;
        draft.totalCount = action.payload.data.totalCount;
        draft.next = action.payload.data.next;
      });
    }
    case GET_TEAM_HEIRARCHY_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.message = '';
        draft.isLoading = false;
      });
    }
    case GET_MEMBER_GROUPS_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.message = '';
        draft.error = null;
      });
    }
    case GET_MEMBER_GROUPS_SUCCESS: {
      return produce(state, draft => {
        draft.memberGroups = action.payload.data.results;
        draft.error = null;
        draft.isLoading = false;
        draft.totalCount = action.payload.data.totalCount;
        if (action.payload.data.next) draft.next = action.payload.data.next;
      });
    }
    case GET_MEMBER_GROUPS_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.message = '';
        draft.isLoading = false;
      });
    }
    case GET_TEAMS_LIST_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.message = '';
        draft.error = null;
      });
    }
    case GET_TEAMS_LIST_SUCCESS: {
      return produce(state, draft => {
        draft.teamsList = action.payload.data.results;
        draft.error = null;
        draft.isLoading = false;
      });
    }
    case GET_TEAMS_LIST_FAILURE: {
      return produce(state, draft => {
        draft.message = '';
        draft.isLoading = false;
      });
    }
    case DELETE_TEAMS_REQUEST: {
      return produce(state, draft => {
        draft.selectedTeams = [];
        draft.error = null;
        draft.isLoading = true;
        draft.message = '';
      });
    }
    case DELETE_TEAMS_SUCCESS: {
      return produce(state, draft => {
        draft.selectedTeams = [];
        draft.isLoading = false;
        draft.error = null;
        draft.message = action.payload.message;
        draft.data = draft.data?.filter(datum => !action.payload.data.ids.includes(datum._id));
      });
    }
    case DELETE_TEAMS_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
        draft.message = '';
      });
    }
    case SET_SELECTED_TEAMS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.selectedTeams = action.payload;
        draft.error = null;
        draft.message = '';
      });
    }
    case SET_TEAMS_DETAILS_VIEW_OPTION: {
      return produce(state, draft => {
        draft.teamsDetailsViewOption = action.payload;
        draft.error = null;
        draft.message = '';
      });
    }

    case UPLOAD_TEAM_IMG_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.teamBrandLogo = null;
      });
    }

    case UPLOAD_TEAM_IMG_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.teamBrandLogo = action.payload;
      });
    }

    case UPLOAD_TEAM_IMG_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    default: {
      return state;
    }
  }
};
