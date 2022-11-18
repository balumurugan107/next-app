/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  CLEAR_RESPONSE_AND_ERROR,
  SET_SELECTED_MEMBERS,
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILURE,
  INVITE_MEMBER_REQUEST,
  INVITE_MEMBER_SUCCESS,
  INVITE_MEMBER_FAILURE,
  IMPORT_MEMBER_REQUEST,
  IMPORT_MEMBER_SUCCESS,
  IMPORT_MEMBER_FAILURE,
  MembersState,
  MembersActionTypes,
  SET_SELECTED_TEAM,
  SET_PAGE,
  SET_LIMIT,
  SET_QUERY,
  SET_MEMBERS_DROP_DOWN_SELECTED_TEAMS,
  SET_CURRENT_SELECTED_TEAMS,
  SET_DISABLED_MEMBERS,
  GET_MEMBER_SUBSCRIPTION_REQUEST,
  GET_MEMBER_SUBSCRIPTION_SUCCESS,
  GET_MEMBER_SUBSCRIPTION_FAILURE,
  DELETE_MEMBERS_FAILURE,
  DELETE_MEMBERS_REQUEST,
  DELETE_MEMBERS_SUCCESS,
  GET_CONTRACTS_FAILURE,
  GET_CONTRACTS_REQUEST,
  GET_CONTRACTS_SUCCESS,
  CREATE_MEMBER_FAILURE,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILURE,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  SET_MEMBERS_DROP_DOWN_SELECTED_TEAM_CALENDAR,
  CHECK_EXISTING_MEMBER_REQUEST,
  CHECK_EXISTING_MEMBER_SUCCESS
} from 'src/store/management/members/types';
import { DEFAULT_PAGE, DEFAULT_LIMIT, DEFAULT_QUERY, DEFAULT_LENGTH } from 'src/constants/common';
import { CHECK_EXISTING_MEMBER_FAILURE } from '.';

/** Initial Member Info View Options */
export const initialMIVO = {
  page: 0,
  limit: 20,
  query: ''
};

const initialState: MembersState = {
  isLoading: false,
  isImportLoading: false,
  isSendInvitationLoading: false,
  data: [],
  selectedMembers: [],
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  query: DEFAULT_QUERY,
  length: DEFAULT_LENGTH,
  response: null,
  error: null,
  isSelected: false,
  currentSelectedTeam: 'ALL',
  currentSelectedTeamManagement: 'ALL',
  currentSelectedTeams: [],
  onlyPrev: false,
  disabledMembers: [],
  contracts: [],
  checkingMember: false,
  existingMember: null,
  memberInfoViewOptions: {
    ...initialMIVO
  }
};

export const membersReducer = (state = initialState, action: MembersActionTypes) => {
  switch (action.type) {
    case CLEAR_RESPONSE_AND_ERROR: {
      return produce(state, draft => {
        draft.error = null;
        draft.response = null;
      });
    }

    case SET_SELECTED_MEMBERS: {
      return produce(state, draft => {
        draft.selectedMembers = action.payload?.filter(
          member => !draft.disabledMembers?.includes(member)
        );
      });
    }

    case CREATE_MEMBER_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.response = null;
        draft.existingMember = null;
        draft.isLoading = true;
      });
    }

    case CREATE_MEMBER_SUCCESS: {
      return produce(state, draft => {
        draft.response = action.payload;
        draft.memberInfoViewOptions = { ...initialMIVO };
        draft.isLoading = false;
      });
    }

    case CREATE_MEMBER_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
      });
    }

    case UPDATE_MEMBER_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.response = null;
        draft.existingMember = null;
        draft.isLoading = true;
      });
    }

    case UPDATE_MEMBER_SUCCESS: {
      return produce(state, draft => {
        draft.response = action.payload;
        draft.isLoading = false;
      });
    }

    case UPDATE_MEMBER_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
      });
    }

    case GET_MEMBER_SUBSCRIPTION_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
      });
    }

    case GET_MEMBER_SUBSCRIPTION_SUCCESS: {
      return produce(state, draft => {
        draft.member = action.payload.data;
        draft.isLoading = false;
      });
    }

    case GET_MEMBER_SUBSCRIPTION_FAILURE: {
      return produce(state, draft => {
        draft.error = action;
        draft.isLoading = false;
      });
    }

    case DELETE_MEMBERS_REQUEST: {
      return produce(state, draft => {
        draft.selectedMembers = [];
        draft.error = null;
        draft.response = null;
        draft.isLoading = true;
      });
    }

    case DELETE_MEMBERS_SUCCESS: {
      return produce(state, draft => {
        draft.selectedMembers = [];
        draft.response = action.payload;
        draft.isLoading = false;
        draft.data = draft.data?.filter(datum => !action.payload.data.ids?.includes(datum._id));
      });
    }

    case DELETE_MEMBERS_FAILURE: {
      return produce(state, draft => {
        draft.error = action;
        draft.isLoading = false;
      });
    }

    case GET_MEMBERS_REQUEST: {
      return produce(state, draft => {
        draft.selectedMembers = [];
        draft.disabledMembers = [];
        draft.error = null;
        draft.response = null;
        draft.isLoading = true;
        draft.existingMember = null;
        draft.isSelected = false;
        draft.data = [];
      });
    }

    case GET_MEMBERS_SUCCESS: {
      return produce(state, draft => {
        draft.response = action.payload;
        draft.data = action.payload.data.results;
        draft.isLoading = false;
        draft.length = action.payload.data.totalCount;
        draft.onlyPrev = !(action.payload.data.next || draft.page === 0);
      });
    }

    case GET_MEMBERS_FAILURE: {
      return produce(state, draft => {
        draft.error = action;
        draft.isLoading = false;
      });
    }

    case INVITE_MEMBER_REQUEST: {
      return produce(state, draft => {
        draft.isSendInvitationLoading = true;
        draft.isLoading = true;
        draft.error = null;
        draft.response = null;
      });
    }

    case INVITE_MEMBER_SUCCESS: {
      const receivedIds = action.payload.data?.map(data => data._id);
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isSendInvitationLoading = false;
        draft.response = action;
        draft.data = draft.data?.map(data => {
          if (receivedIds.includes(data._id)) {
            data.status = 'Invite sent';
          }
          return data;
        });
      });
    }

    case INVITE_MEMBER_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isSendInvitationLoading = false;
        draft.error = action.error;
      });
    }

    case IMPORT_MEMBER_REQUEST: {
      return produce(state, draft => {
        draft.isImportLoading = true;
        draft.error = null;
        draft.response = null;
        draft.isLoading = true;
      });
    }

    case IMPORT_MEMBER_SUCCESS: {
      return produce(state, draft => {
        draft.isImportLoading = false;
        draft.response = action;
        draft.isLoading = false;
      });
    }

    case IMPORT_MEMBER_FAILURE: {
      return produce(state, draft => {
        draft.isImportLoading = false;
        draft.error = action.error;
        draft.isLoading = false;
      });
    }

    case SET_SELECTED_TEAM: {
      return produce(state, draft => {
        draft.currentSelectedTeam = action.payload;
      });
    }

    case SET_MEMBERS_DROP_DOWN_SELECTED_TEAMS: {
      return produce(state, draft => {
        const { arrayOfSelectedTeams, selectedTeam } = action.payload;
        draft.currentSelectedTeams = arrayOfSelectedTeams;
        draft.currentSelectedTeam = selectedTeam;
        if (selectedTeam !== 'ALL') draft.currentSelectedTeamManagement = selectedTeam;
        draft.page = DEFAULT_PAGE;
        draft.limit = DEFAULT_LIMIT;
        draft.query = DEFAULT_QUERY;
        draft.length = DEFAULT_LENGTH;
      });
    }

    case SET_MEMBERS_DROP_DOWN_SELECTED_TEAM_CALENDAR: {
      return produce(state, draft => {
        const { selectedTeam } = action.payload;
        draft.currentSelectedTeamManagement = selectedTeam;
        draft.page = DEFAULT_PAGE;
        draft.limit = DEFAULT_LIMIT;
        draft.query = DEFAULT_QUERY;
        draft.length = DEFAULT_LENGTH;
      });
    }

    case SET_PAGE: {
      return produce(state, draft => {
        draft.page = action.payload;
      });
    }

    case SET_LIMIT: {
      return produce(state, draft => {
        draft.limit = action.payload;
      });
    }

    case SET_QUERY: {
      return produce(state, draft => {
        draft.page = !state.query || !action.payload ? 0 : state.page;
        draft.query = action.payload;
      });
    }

    case SET_CURRENT_SELECTED_TEAMS: {
      return produce(state, draft => {
        draft.currentSelectedTeams = action.payload;
      });
    }

    case SET_DISABLED_MEMBERS: {
      return produce(state, draft => {
        if (!draft.isLoading) {
          draft.disabledMembers = draft.disabledMembers.includes(action.payload)
            ? draft.disabledMembers
            : [...draft.disabledMembers, action.payload];
          draft.isSelected = draft.disabledMembers?.length === draft.data?.length ? true : false;
        }
      });
    }

    case GET_CONTRACTS_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
      });
    }

    case GET_CONTRACTS_SUCCESS: {
      return produce(state, draft => {
        draft.contracts = action.payload.results;
        draft.isLoading = false;
      });
    }

    case GET_CONTRACTS_FAILURE: {
      return produce(state, draft => {
        draft.error = action;
        draft.isLoading = false;
      });
    }

    case CHECK_EXISTING_MEMBER_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.existingMember = null;
        draft.checkingMember = true;
      });
    }

    case CHECK_EXISTING_MEMBER_SUCCESS: {
      return produce(state, draft => {
        draft.existingMember = action.payload;
        draft.checkingMember = false;
      });
    }

    case CHECK_EXISTING_MEMBER_FAILURE: {
      return produce(state, draft => {
        draft.error = action;
        draft.checkingMember = false;
      });
    }

    default: {
      return state;
    }
  }
};
