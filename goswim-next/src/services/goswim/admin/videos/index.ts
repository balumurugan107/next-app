import { defaultErrorMessage, defaultOptions } from 'src/constants';
import { httpClientInstance } from 'src/core/HttpClient';
import {
  CreateVideoType,
  GetVideoListRequestData,
  GetVideoListResponseData,
  GetVideoResponseType,
  GetVideoType
} from 'src/store/goswim/admin/video';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

export default class AdminVideoService {
  private static instance: AdminVideoService;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AdminVideoService();
    return this.instance;
  }

  createNewVideo = async (video: CreateVideoType) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<CreateVideoType>>(
        '/api/v1/goswim/videos/',
        video
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateExistingVideo = async (video: GetVideoResponseType) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse>(
        `/api/v1/goswim/videos?_id=${video._id}`,
        video
      );
      SnackbarUtils.success(response?.data?.message || 'Video Updated Successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getVideoData = async (video: GetVideoType) => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<GetVideoResponseType[]>>(
        `/api/v1/goswim/videos`,
        video
      );

      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteVideo = async (video: string | undefined) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse>(
        `api/v1/goswim/videos/?_id=${video}`
      );
      SnackbarUtils.success(response?.data?.message || 'Video Deleted Successfully!!');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  getVideosList = async (params?: GetVideoListRequestData) => {
    let orderList = '';
    let stateList = '';
    let assignmentList = '';
    let page = '';
    let limit = '';
    if (params?.filterData?.length) {
      params?.filterData?.map(filter => {
        if (filter.title === 'Assignment')
          assignmentList +=
            params?.page && params?.limit
              ? `&assignment=${filter.key === '1' ? true : false}`
              : `?assignment=${filter.key === '1' ? true : false}`;
        else if (filter.title === 'Order') orderList = `&order=${filter.key}`;
        else if (filter.title === 'State') stateList += `&state[]=${filter.key}`;
      });
    }
    if (params?.page) page = `?page=${params?.page}`;
    if (params?.limit) limit = `&limit=${params?.limit}`;
    try {
      const response = await httpClientInstance.get<HTTPResponse<GetVideoListResponseData>>(
        `/api/v1/goswim/videos/list${page}${limit}${assignmentList}${orderList}${stateList}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getFilteredVideosCount = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse>(
        '/api/v1/goswim/videos/filter/list'
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
  /* End of uploadFile.ts */
}

export const adminVideoServiceInstance = AdminVideoService.getInstance();
