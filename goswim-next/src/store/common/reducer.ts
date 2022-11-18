import produce from 'immer';
import {
  CommonState,
  CommonActionTypes,
  SET_TEAM_VALUES,
  SET_ROSTER_VALUES
} from 'src/store/common/types';

const initialState: CommonState = {
  persist: {
    teamValues: {},
    rosterValues: {}
  }
};

export const commonReducer = (state = initialState, action: CommonActionTypes) => {
  switch (action.type) {
    case SET_TEAM_VALUES: {
      return produce(state, draft => ({
        ...draft,
        persist: {
          ...draft.persist,
          teamValues: {
            ...draft.persist.teamValues,
            ...action.payload
          }
        }
      }));
    }

    case SET_ROSTER_VALUES: {
      return produce(state, draft => ({
        ...draft,
        persist: {
          ...draft.persist,
          rosterValues: {
            ...draft.persist.rosterValues,
            ...action.payload
          }
        }
      }));
    }

    default: {
      return state;
    }
  }
};
