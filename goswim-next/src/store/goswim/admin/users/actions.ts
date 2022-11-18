import { Dispatch } from 'redux';
import { adminUsersServiceInstance } from 'src/services/goswim/admin/users';
import {
  adminResetUserPasswordFailure,
  adminResetUserPasswordRequest,
  adminResetUserPasswordSuccess,
  adminUsersListRequestData,
  ADMIN_RESET_USER_PASSWORD_FAILURE,
  ADMIN_RESET_USER_PASSWORD_REQUEST,
  ADMIN_RESET_USER_PASSWORD_SUCCESS,
  GetAllUsersServiceFailure,
  GetAllUsersServiceRequest,
  GetAllUsersServiceSuccess,
  GetUsersFilterListServiceFailure,
  GetUsersFilterListServiceRequest,
  GetUsersFilterListServiceSuccess,
  GET_ALL_USERS_SERVICE_FAILURE,
  GET_ALL_USERS_SERVICE_REQUEST,
  GET_ALL_USERS_SERVICE_SUCCESS,
  GET_USERS_FILTER_LIST_SERVICE_FAILURE,
  GET_USERS_FILTER_LIST_SERVICE_REQUEST,
  GET_USERS_FILTER_LIST_SERVICE_SUCCESS,
  RemoveAllUsers,
  REMOVE_ALL_USERS
} from './types';

export const getAdminUsers = (args: adminUsersListRequestData) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetAllUsersServiceRequest>({ type: GET_ALL_USERS_SERVICE_REQUEST });
      const response = await adminUsersServiceInstance.getAdminUsers(args);
      dispatch<GetAllUsersServiceSuccess>({
        type: GET_ALL_USERS_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetAllUsersServiceFailure>({ type: GET_ALL_USERS_SERVICE_FAILURE });
    }
  };
};
export const getusersFilterList = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetUsersFilterListServiceRequest>({ type: GET_USERS_FILTER_LIST_SERVICE_REQUEST });
      const response = await adminUsersServiceInstance.getusersFilterList();
      dispatch<GetUsersFilterListServiceSuccess>({
        type: GET_USERS_FILTER_LIST_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetUsersFilterListServiceFailure>({ type: GET_USERS_FILTER_LIST_SERVICE_FAILURE });
    }
  };
};

export const removeAllUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch<RemoveAllUsers>({ type: REMOVE_ALL_USERS });
  };
};

export const adminResetUserPassword = (userId: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<adminResetUserPasswordRequest>({ type: ADMIN_RESET_USER_PASSWORD_REQUEST });
      await adminUsersServiceInstance.adminResetUserPassword(userId, password);
      dispatch<adminResetUserPasswordSuccess>({
        type: ADMIN_RESET_USER_PASSWORD_SUCCESS
      });
    } catch (error) {
      dispatch<adminResetUserPasswordFailure>({ type: ADMIN_RESET_USER_PASSWORD_FAILURE });
    }
  };
};
