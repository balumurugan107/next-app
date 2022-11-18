import jwtDecode from 'jwt-decode';
import { defaultErrorMessage, defaultOptions } from 'src/constants';

import HttpClient from 'src/core/HttpClient';
import SnackbarUtils from 'src/helpers/snackbar';
import { UserProfile } from 'src/store/account';
import { GoSwimCreateAccount, GoSwimSignInAccount } from 'src/store/goswim/account';
import { HTTPResponse } from 'src/types';
// import { User } from 'src/store/account';

export interface DecodedJwt {
  exp: number;
}

export default class UserAuthService {
  private static instance: UserAuthService;

  private httpClient: HttpClient = HttpClient.getInstance();

  private constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UserAuthService();
    return this.instance;
  }

  signUp = async (user: GoSwimCreateAccount) => {
    try {
      const response = await this.httpClient.post<HTTPResponse>('/v1/register/signup', user);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error?.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  signIn = async (user: GoSwimSignInAccount) => {
    try {
      const response = await this.httpClient.post<
        HTTPResponse<{ user: UserProfile; token: string }>
      >('/v1/register/signin', user);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error?.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  adminSignInUser = async (id: string) => {
    let userId = '';
    if (id) {
      userId = `?_id=${id}`;
    }
    try {
      const response = await this.httpClient.get<
        HTTPResponse<{ user: UserProfile; token: string }>
      >(`api/v1/register/admin/signin${userId}`);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error?.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  forgetPassword = async (email: string) => {
    try {
      const response = await this.httpClient.post<HTTPResponse>(`/v1/register/auth/forgot`, email);
      if (response.data) {
        SnackbarUtils.success(response.data.message, defaultOptions);
      }
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error?.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const response = await this.httpClient.put<HTTPResponse>(`/api/v1/register/auth/new`, {
        oldPassword: oldPassword,
        password: newPassword
      });
      if (response.data) {
        SnackbarUtils.success(response.data.message, defaultOptions);
      }
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error?.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  resetPassword = async (password: string, resetToken: string) => {
    try {
      const response = await this.httpClient.post<HTTPResponse>(`/v1/register/auth/change`, {
        password,
        resetToken
      });
      if (response.data) {
        SnackbarUtils.success(response.data.message, defaultOptions);
      }
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error?.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  isValidToken = (accessToken: string) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode<DecodedJwt>(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  };
}

export const userAuthServiceInstance = UserAuthService.getInstance();
