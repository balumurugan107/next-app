import { httpClientInstance } from 'src/core/HttpClient';
import JTQP from 'src/utils/jsonToQueryParams';

import { TrailDuration, defaultOptions, defaultErrorMessage } from 'src/constants';
import SnackbarUtils from 'src/helpers/snackbar';
import { MemberMessages } from 'src/constants/member';
import { HTTPResponse } from 'src/types';
import { DeleteTeamData, RemoveMemberData } from 'src/store/management/team';
import axios, { CancelTokenSource } from 'axios';
import {
  DeleteMemberData,
  GetMemberData,
  IContract,
  IMemberExist,
  MemberData
} from 'src/store/management/members';

export interface DecodedJwt {
  exp: number;
}

interface SendCouponRequest<T = any> {
  userName: string;
  trial: TrailDuration;
  members: T[];
}

interface SubscribeMemberRequest {
  customerID: string;
  paymentMethodID: string;
  deviceType: string;
  duration: string;
  trial: TrailDuration;
}

export default class MembersService {
  private static instance: MembersService;

  private constructor(private cancelToken: CancelTokenSource) {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new MembersService(axios.CancelToken.source());
    return this.instance;
  }

  createMember = async <T>(values: T, teamId: string[], userName: string) => {
    try {
      let teams = '';
      if (teamId.length) {
        for (let index = 0; index < teamId.length; index++) {
          teams = teams + `teamId[]=${teamId[index]}&`;
        }
      }
      const response = await httpClientInstance.post<HTTPResponse<MemberData>>(
        `/api/v1/member/new?${teams}userName=${userName}`,
        values
      );
      SnackbarUtils.success(MemberMessages.MEMBER_CREATED, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message ||
          MemberMessages.MEMBER_CREATION_FAILED ||
          defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  updateMember = async <T>(values: T, memberId: string) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<MemberData>>(
        `/api/v1/member/${memberId}`,
        values
      );
      SnackbarUtils.success(MemberMessages.MEMBER_UPDATED, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message ||
          MemberMessages.MEMBER_UPDATION_FAILED ||
          defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  getMembers = async <T>(filters?: T) => {
    try {
      if (this.cancelToken) {
        this.cancelToken.cancel(MemberMessages.OPERATION_CANCELLED);
      }
      this.cancelToken = axios.CancelToken.source();
      const queryParams = (filters && JTQP(filters)) || '';
      const response = await httpClientInstance.get<HTTPResponse<GetMemberData>>(
        `api/v1/members/?${queryParams}`,
        {},
        { cancelToken: this.cancelToken.token }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        SnackbarUtils.error(
          error?.response?.data?.message || MemberMessages.GET_FAILED || defaultErrorMessage,
          defaultOptions
        );
      }
      throw error;
    }
  };

  deleteMembers = async (memberId: DeleteTeamData) => {
    try {
      const resposne = await httpClientInstance.delete<HTTPResponse<DeleteMemberData>>(
        `api/v1/member/delete`,
        memberId
      );
      SnackbarUtils.success(MemberMessages.DELETE_SUCCESS, defaultOptions);
      return resposne.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message || MemberMessages.DELETE_FAILED || defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  deleteAccount = async (accountID: string) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<string>>(
        `/api/v1/member/suspend/admin?member_id=${accountID}`
      );
      SnackbarUtils.success(response.data.message, defaultOptions);
    } catch (error) {
      SnackbarUtils.error(error.response.data.message || defaultErrorMessage, defaultOptions);
    }
  };

  removeMembers = async (teamID: string, memberId: RemoveMemberData) => {
    try {
      const resposne = await httpClientInstance.put<HTTPResponse<DeleteMemberData>>(
        `api/v1/member/remove/${teamID}`,
        memberId
      );
      SnackbarUtils.success(
        resposne.data.message || MemberMessages.REMOVE_MEMBER_SUCCESS,
        defaultOptions
      );
      return resposne.data;
    } catch (error) {
      SnackbarUtils.error(
        error.response.data.message || MemberMessages.REMOVE_MEMBER_FAILED || defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  /** @description verify memebr is not used anywhere left here for future reference */

  verifyMember = (coupon: string) => {
    return new Promise<any>((resolve, reject) => {
      httpClientInstance
        .post('/api/member/verify', {
          coupon
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response.data.data);
          } else {
            reject(response.data.data);
          }
        })
        .catch(reject);
    });
  };

  subscribeMember = (subscribeRequest: SubscribeMemberRequest) => {
    return new Promise<any>((resolve, reject) => {
      httpClientInstance
        .post('/api/v1/payment/subscribe', subscribeRequest)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data.data);
          } else {
            reject(response.data.data);
          }
        })
        .catch(reject);
    });
  };

  getCoupons = async <T>(couponRequest: SendCouponRequest<T>) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse>(
        '/api/v1/member/sendcoupons',
        couponRequest
      );
      SnackbarUtils.success(MemberMessages.COUPON_SUCCESS, defaultOptions);
      return response.data.data;
    } catch (ex) {
      SnackbarUtils.error(
        error?.response?.data?.message || MemberMessages.COUPON_FAILED,
        defaultOptions
      );
      throw ex;
    }
  };
  //
  inviteMember = async (values: string[], teamId: string, userName: string) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<MemberData[]>>(
        // `/api/v1/member/email/${userName}`,
        `/api/v1/member/email?teamId[]=${teamId}&userName=${userName}`,
        { _id: values }
      );
      SnackbarUtils.success(MemberMessages.SEND_INVITATION_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message ||
          MemberMessages.SEND_INVITATION_FAILED ||
          defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  importMember = async (values: File, team: string) => {
    try {
      const fd = new FormData();
      fd.append('upload', values);
      const response = await httpClientInstance.post<HTTPResponse<MemberData[]>>(
        `/api/v1/member/importCsv/${team}`,
        fd
      );
      SnackbarUtils.success(MemberMessages.IMPORT_SUCCESS, defaultOptions);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message =
          (error.response.status === 400 && MemberMessages.INVALID_CSV_FORMAT) ||
          MemberMessages.IMPORT_FAILED;
        SnackbarUtils.error(error?.response?.data?.message || message, {
          ...defaultOptions,
          autoHideDuration: 20000
        });
        throw error;
      }
      SnackbarUtils.error(defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getMember = async (memberId: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<MemberData>>(
        `/api/v1/member/view/${memberId}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message || MemberMessages.GET_FAILED || defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  //without auth
  getMemberNoAuth = async (memberId: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<MemberData>>(
        `/v1/member/view/${memberId}`
      );
      return response.data;
    } catch (error) {
      // SnackbarUtils.error(MemberMessages.GET_FAILED || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getContracts = async (page: number | string, limit: number | string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IContract>>(
        `/api/v1/contractDetails?page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message || MemberMessages.GET_FAILED || defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };

  checkExistingMember = async (email: string) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<IMemberExist | null>>(
        `/api/v1/member/check/${email}`
      );
      return response.data.data;
    } catch (error) {
      SnackbarUtils.error(
        error?.response?.data?.message || MemberMessages.GET_FAILED || defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };
}

export const membersServiceInstance = MembersService.getInstance();
