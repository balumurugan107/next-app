import produce from 'immer';
import { RememberActionTypes, rememberMeState, REMEMBER_ME, SET_USER_CREDENTIALS } from './types';

const initialState: rememberMeState = {
  rememberMe: false,
  userCredentials: null
};

export const rememberMeReducer = (state = initialState, action: RememberActionTypes) => {
  switch (action.type) {
    case REMEMBER_ME: {
      return produce(state, draft => {
        draft.rememberMe = action.payload;
      });
    }
    case SET_USER_CREDENTIALS: {
      return produce(state, draft => {
        draft.userCredentials = action.payload;
      });
    }
    default: {
      return state;
    }
  }
};
