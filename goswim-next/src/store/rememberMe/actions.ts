import { Dispatch } from 'redux';
import { REMEMBER_ME, SET_USER_CREDENTIALS } from './types';

export const rememberMeAction = (rememberMe: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMEMBER_ME,
      payload: rememberMe
    });
  };
};

export const setUserCredentials = (user: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_USER_CREDENTIALS,
      payload: user
    });
  };
};
