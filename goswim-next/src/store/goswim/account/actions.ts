import { Dispatch } from 'redux';
import { userAuthServiceInstance } from 'src/services/goswim/account';
import { persistor } from 'src/store';
import {
  GoSwimCreateAccount,
  GoSwimSignInAccount,
  GOSWIM_CHANGE_PASSWORD_FAILURE,
  GOSWIM_CHANGE_PASSWORD_REQUEST,
  GOSWIM_CHANGE_PASSWORD_SUCCESS,
  GOSWIM_FORGET_PASSWORD_FAILURE,
  GOSWIM_FORGET_PASSWORD_REQUEST,
  GOSWIM_FORGET_PASSWORD_SUCCESS,
  GOSWIM_SIGN_IN_FAILURE,
  GOSWIM_SIGN_IN_REQUEST,
  GOSWIM_SIGN_IN_SUCCESS,
  GOSWIM_SIGN_UP_FAILURE,
  GOSWIM_SIGN_UP_REQUEST,
  GOSWIM_SIGN_UP_SUCCESS,
  GOSWIM_COOKIE_ACCEPT,
  GOSWIM_ADMIN_SIGN_IN_REQUEST,
  GOSWIM_ADMIN_SIGN_IN_SUCCESS,
  GOSWIM_ADMIN_SIGN_IN_FAILURE
} from '.';

import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';
import { SET_USER_CREDENTIALS } from 'src/store/rememberMe';
import { GetSubscriptionsSuccess, GET_SUBSCRIPTIONS_SUCCESS } from 'src/store/subscriptions';
import jsCookie from 'js-cookie';
import { NextRouter } from 'next/router';
import { gsTokenKey } from 'src/_constant';

export const signUp = (user: GoSwimCreateAccount, router?: NextRouter, subscribe?: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: GOSWIM_SIGN_UP_REQUEST });

      const payload = await userAuthServiceInstance.signUp(user);
      dispatch({
        type: ACCESS_TOKEN_SUCCESS,
        payload: payload.data
      });
      jsCookie.set(gsTokenKey, payload.data.token);
      dispatch({
        type: GOSWIM_SIGN_UP_SUCCESS,
        payload: payload.data
      });
      if (subscribe && router) router.push(`/checkout`);
      else if (router) router.push(`/users/sign_in`);
    } catch (error) {
      dispatch({ type: GOSWIM_SIGN_UP_FAILURE, payload: error });
      throw error;
    }
  };
};

export const resetPassword = (
  password: string,
  reset_password_token: string,
  router?: NextRouter
) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: GOSWIM_SIGN_UP_REQUEST });

      const payload = await userAuthServiceInstance.resetPassword(password, reset_password_token);
      router?.push('/users/sign_in');
      dispatch({
        type: GOSWIM_SIGN_UP_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({ type: GOSWIM_SIGN_UP_FAILURE, payload: error });
      throw error;
    }
  };
};

export const signIn = (user: GoSwimSignInAccount, router: NextRouter) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: GOSWIM_SIGN_IN_REQUEST });
      const response = await userAuthServiceInstance.signIn(user);
      dispatch({
        type: ACCESS_TOKEN_SUCCESS,
        payload: response.data
      });

      if (response.data.user.subscription) {
        dispatch<GetSubscriptionsSuccess>({
          type: GET_SUBSCRIPTIONS_SUCCESS,
          payload: response.data.user.subscription
        });
      }
      dispatch({
        type: GOSWIM_SIGN_IN_SUCCESS,
        payload: response.data
      });
      if (user.remember_me) {
        dispatch({
          type: SET_USER_CREDENTIALS,
          payload: user
        });
      }
      router.push('/home');
    } catch (error) {
      dispatch({ type: GOSWIM_SIGN_IN_FAILURE, payload: error });
      throw error;
    }
  };
};
export const adminSignInUser = (id: string, router: NextRouter | string[] | NextRouter) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: GOSWIM_ADMIN_SIGN_IN_REQUEST });

      const response = await userAuthServiceInstance.adminSignInUser(id);
      dispatch({
        type: ACCESS_TOKEN_SUCCESS,
        payload: response.data.token
      });
      jsCookie.set(gsTokenKey, response.data.token);
      if (response.data.user.subscription) {
        dispatch<GetSubscriptionsSuccess>({
          type: GET_SUBSCRIPTIONS_SUCCESS,
          payload: response.data.user.subscription
        });
      }
      dispatch({
        type: GOSWIM_ADMIN_SIGN_IN_SUCCESS,
        payload: response.data
      });

      router.push('/');
    } catch (error) {
      dispatch({ type: GOSWIM_ADMIN_SIGN_IN_FAILURE, payload: error });
      throw error;
    }
  };
};

export const forgetPassword = (email: string, router: NextRouter, triggeredBy?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: GOSWIM_FORGET_PASSWORD_REQUEST });

      await userAuthServiceInstance.forgetPassword(email);
      if (!triggeredBy) {
        router.push('/users/sign_in');
      }
      dispatch({
        type: GOSWIM_FORGET_PASSWORD_SUCCESS
      });
    } catch (error) {
      dispatch({ type: GOSWIM_FORGET_PASSWORD_FAILURE, payload: error });
      throw error;
    }
  };
};

export const changePassword = (oldPassword: string, newPassword: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await persistor.flush();
      await persistor.purge();
      dispatch({ type: GOSWIM_CHANGE_PASSWORD_REQUEST });

      await userAuthServiceInstance.changePassword(oldPassword, newPassword);
      dispatch({
        type: GOSWIM_CHANGE_PASSWORD_SUCCESS
      });
    } catch (error) {
      dispatch({ type: GOSWIM_CHANGE_PASSWORD_FAILURE, payload: error });
      throw error;
    }
  };
};

export const acceptCookies = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GOSWIM_COOKIE_ACCEPT });
    } catch (error) {
      throw error;
    }
  };
};
