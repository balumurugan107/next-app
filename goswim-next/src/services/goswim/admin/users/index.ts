import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';
import { adminUsersListRequestData, userList, usersFilterList } from 'src/store/goswim/admin/users';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

export default class AdminUsersService {
  private static instance: AdminUsersService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AdminUsersService();
    return this.instance;
  }
  // get all users
  getAdminUsers = async (args: adminUsersListRequestData) => {
    let page = '';
    let limit = '';
    let role = '';
    let subscription_status = '';
    let sort = '';
    let search = '';
    if (args?.filter && args.filter?.length > 0) {
      args.filter?.map(filter => {
        if (filter.key === 'role') {
          role += `&role[]=${filter.title}`;
        } else if (filter.key === 'subscription_status') {
          subscription_status += `&subscription_status[]=${filter.title}`;
        } else if (filter.key === 'sort') {
          sort = `&sort=${filter.title}`;
        }
      });
    }
    if (args?.page) page = `?page=${args?.page}`;
    if (args?.limit) limit = `&limit=${args?.limit}`;
    if (args?.search) search = `&search=${args?.search}`;
    try {
      const response = await httpClientInstance.get<HTTPResponse<userList>>(
        `api/v1/member/admin/${page}${limit}${role}${subscription_status}${sort}${search}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getusersFilterList = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<usersFilterList>>(
        `api/v1/members/filter/list`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  adminResetUserPassword = async (userId: string, password: string) => {
    let updatedPassword = { password: password };
    try {
      const response = await httpClientInstance.put<HTTPResponse<any>>(
        `api/v1/register/auth/resetpassword?member_id=${userId}`,
        updatedPassword
      );
      SnackbarUtils.success(
        response?.data?.message || 'Password Updated Successfully!!',
        defaultOptions
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const adminUsersServiceInstance = AdminUsersService.getInstance();
