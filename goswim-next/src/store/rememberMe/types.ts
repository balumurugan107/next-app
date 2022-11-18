export interface rememberMeState {
  userCredentials: any;
}

export const REMEMBER_ME = '@remember/remember-me';
export const SET_USER_CREDENTIALS = '@remember/set-user-credentials';

export interface RememberMe {
  type: typeof REMEMBER_ME;
  payload: boolean;
}

export interface UserCredentials {
  type: typeof SET_USER_CREDENTIALS;
  payload: any;
}

export type RememberActionTypes = RememberMe | UserCredentials;
