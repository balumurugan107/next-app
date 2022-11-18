import jwtDecode from 'jwt-decode';

import HttpClient from 'src/core/HttpClient';
import { UserLogin } from 'src/types';
import { UserSignUp } from 'src/types/signup';
import SnackbarUtils from 'src/helpers/snackbar';
// import { User } from 'src/store/account';

export interface DecodedJwt {
  exp: number;
}

export default class AuthService {
  private static instance: AuthService;

  private httpClient: HttpClient = HttpClient.getInstance();

  private constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AuthService();
    return this.instance;
  }

  handleLogout = (onLogout: () => void) => {
    this.httpClient.setResponseInterceptor(
      (response: any) => response,
      (error: any) => {
        if (error.response && error.response.status === 401) {
          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  loginWithToken = (user: UserLogin) =>
    new Promise<any>((resolve, reject) => {
      this.httpClient
        .post('/v1/create-or-get-user', { ...user })
        .then(response => {
          if (response.status === 200) {
            SnackbarUtils.close();
            resolve(response.data.data);
          } else {
            reject(response.data.data);
          }
        })
        .catch(reject);
    });

  signUp = (user: UserSignUp) =>
    new Promise<any>((resolve, reject) => {
      this.httpClient
        .post('/v1/mobile/android/register/user', { ...user })
        .then(response => {
          if (response.status === 200) {
            SnackbarUtils.close();
            resolve(response.data.data);
          } else {
            reject(response.data.data);
          }
        })
        .catch(reject);
    });

  isValidToken = (accessToken: string) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode<DecodedJwt>(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  };
}

export const authServiceInstance = AuthService.getInstance();
