/* eslint-disable no-useless-constructor */
import { httpClientInstance } from 'src/core/HttpClient';
import { UpdateUserProfile, UserProfile } from 'src/store/account';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { InitialValues as SettingsData } from 'src/views/pages/AccountView/Settings/FormModel';
import { MemberMessages } from 'src/constants/member';

export interface DecodedJwt {
  exp: number;
}

export default class ProfileService {
  private static instance: ProfileService;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProfileService();
    return this.instance;
  }

  getProfile = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<UserProfile>>('/api/v1/profile');
      return response.data;
    } catch (error) {
      if (error)
        // SnackbarUtils.error(error.response.data.message || defaultErrorMessage, defaultOptions);
        throw error;
    }
  };

  updateProfile = async (updateProfileInfo: UpdateUserProfile) => {
    try {
      const fd = new FormData();
      fd.append('full_name', updateProfileInfo.fullName || '');
      fd.append('city', updateProfileInfo.city || '');
      fd.append('email', updateProfileInfo.email || '');
      fd.append('zipcode', updateProfileInfo.zipcode || '');
      fd.append('country', updateProfileInfo.country || '');
      fd.append('state', updateProfileInfo.state || '');
      if (
        updateProfileInfo?.editedProfilePicture ||
        typeof updateProfileInfo?.editedProfilePicture === 'string'
      ) {
        fd.append('s3_profile_picture', updateProfileInfo.editedProfilePicture);
      } else if (updateProfileInfo?.editedProfilePicture?.length === 0) {
        fd.append('s3_profile_picture', '');
      }
      fd.append('designation', updateProfileInfo.designation || '');
      fd.append('experience', updateProfileInfo.experience || '');
      fd.append('phone', updateProfileInfo.phone);
      fd.append('address_line1', updateProfileInfo.address1 || '');
      fd.append('address_line2', updateProfileInfo.address2 || '');
      fd.append('certificate', JSON.stringify(updateProfileInfo.certificate));
      fd.append('autoplay_video', JSON.stringify(updateProfileInfo.autoplay_video));
      fd.append('use_hd_video', JSON.stringify(updateProfileInfo.use_hd_video));
      fd.append(
        'email_notification_enabled',
        JSON.stringify(updateProfileInfo.email_notification_enabled)
      );
      fd.append('promotion_enabled', JSON.stringify(updateProfileInfo.promotion_enabled));

      const response = await httpClientInstance.put<HTTPResponse<UserProfile>>(
        '/api/v1/profile',
        fd
      );

      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response.data.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  saveSettings = async (settings: SettingsData) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<UserProfile>>(
        `/api/v1/profile/updateSettings/`,
        settings
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(
        MemberMessages.SETTINGS_UPDATE_FAILED || defaultErrorMessage,
        defaultOptions
      );
      throw error;
    }
  };
}

export const profileServiceInstance = ProfileService.getInstance();
