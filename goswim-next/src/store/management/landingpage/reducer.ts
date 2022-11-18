import produce from 'immer';

import {} from 'src/store/management/lessons/types';
import {
  GetLandingPageServiceActionType,
  GET_LANDINGPAGE_FAILURE,
  GET_LANDINGPAGE_REQUEST,
  GET_LANDINGPAGE_SUCCESS,
  LandingPageState
} from './types';

const initialState: LandingPageState = {
  isLoading: false,
  result: [],
  error: null
};

export const landingPageReducer = (
  state = initialState,
  action: GetLandingPageServiceActionType
) => {
  switch (action.type) {
    case GET_LANDINGPAGE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_LANDINGPAGE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.result = action.payload;
      });
    }

    case GET_LANDINGPAGE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    default:
      return state;
  }
};
