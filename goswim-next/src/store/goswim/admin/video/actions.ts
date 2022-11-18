import { Dispatch } from 'redux';
import { adminVideoServiceInstance } from 'src/services/goswim/admin/videos';
import { UploadVideoToS3ServiceInstance } from 'src/services/goswim/admin/videos/S3UploadJs';
import {
  CreateVideoServiceFailure,
  CreateVideoServiceRequest,
  CreateVideoServiceSuccess,
  CreateVideoType,
  CREATE_VIDEO_SERVICE_FAILURE,
  CREATE_VIDEO_SERVICE_REQUEST,
  CREATE_VIDEO_SERVICE_SUCCESS,
  GetVideoResponseType,
  GetVideoServiceFailure,
  GetVideoServiceRequest,
  GetVideoServiceSuccess,
  GetVideoType,
  GET_VIDEO_SERVICE_FAILURE,
  GET_VIDEO_SERVICE_REQUEST,
  GET_VIDEO_SERVICE_SUCCESS,
  RemoveS3VideoFromState,
  REMOVE_S3_VIDEO_STATE_FROM_STORE,
  UpdateVideoServiceFailure,
  UpdateVideoServiceRequest,
  UpdateVideoServiceSuccess,
  UPDATE_VIDEO_SERVICE_FAILURE,
  UPDATE_VIDEO_SERVICE_REQUEST,
  UPDATE_VIDEO_SERVICE_SUCCESS,
  UploadThumbCustomToS3Failure,
  UploadThumbCustomToS3Request,
  UploadThumbCustomToS3Success,
  UploadThumbLargeToS3Failure,
  UploadThumbLargeToS3Request,
  UploadThumbLargeToS3Success,
  UploadThumbOriginalToS3Failure,
  UploadThumbOriginalToS3Request,
  UploadThumbOriginalToS3Success,
  UploadThumbSmallToS3Failure,
  UploadThumbSmallToS3Request,
  UploadThumbSmallToS3Success,
  UploadVideoToS3Failure,
  UploadVideoToS3Request,
  UploadVideoToS3Success,
  UPLOAD_THUMB_CUSTOM_TO_S3_FAILURE,
  UPLOAD_THUMB_CUSTOM_TO_S3_REQUEST,
  UPLOAD_THUMB_CUSTOM_TO_S3_SUCCESS,
  UPLOAD_THUMB_LARGE_TO_S3_FAILURE,
  UPLOAD_THUMB_LARGE_TO_S3_REQUEST,
  UPLOAD_THUMB_LARGE_TO_S3_SUCCESS,
  UPLOAD_THUMB_ORIGINAL_TO_S3_FAILURE,
  UPLOAD_THUMB_ORIGINAL_TO_S3_REQUEST,
  UPLOAD_THUMB_ORIGINAL_TO_S3_SUCCESS,
  UPLOAD_THUMB_SMALL_TO_S3_FAILURE,
  UPLOAD_THUMB_SMALL_TO_S3_REQUEST,
  UPLOAD_THUMB_SMALL_TO_S3_SUCCESS,
  UPLOAD_VIDEO_TO_S3_FAILURE,
  UPLOAD_VIDEO_TO_S3_REQUEST,
  UPLOAD_VIDEO_TO_S3_SUCCESS,
  DeleteVideoRequest,
  DeleteVideoSuccess,
  DeleteVideoFailure,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_FAILURE,
  DELETE_VIDEO_SUCCESS
} from '.';
import {
  GetFilteredVideosCountServiceFailure,
  GetFilteredVideosCountServiceRequest,
  GetFilteredVideosCountServiceSuccess,
  GetVideoListRequestData,
  GetVideosListServiceFailure,
  GetVideosListServiceRequest,
  GetVideosListServiceSuccess,
  GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE,
  GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST,
  GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS,
  GET_VIDEOS_LIST_SERVICE_FAILURE,
  GET_VIDEOS_LIST_SERVICE_REQUEST,
  GET_VIDEOS_LIST_SERVICE_SUCCESS
} from './types';

export const removeS3VideoFromState = () => {
  return async (dispatch: Dispatch) => {
    dispatch<RemoveS3VideoFromState>({ type: REMOVE_S3_VIDEO_STATE_FROM_STORE });
  };
};

export const uploadVideoToS3Bucket = (file: File, millis: number, innerFolder: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadVideoToS3Request>({ type: UPLOAD_VIDEO_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadFile(file, millis, innerFolder);

      dispatch<UploadVideoToS3Success>({
        type: UPLOAD_VIDEO_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadVideoToS3Failure>({ type: UPLOAD_VIDEO_TO_S3_FAILURE });
    }
  };
};

export const uploadThumbLargeToS3Bucket = (
  file: File,
  millis: number,
  innerFolder: string | null
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadThumbLargeToS3Request>({ type: UPLOAD_THUMB_LARGE_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadFile(file, millis, innerFolder);

      dispatch<UploadThumbLargeToS3Success>({
        type: UPLOAD_THUMB_LARGE_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadThumbLargeToS3Failure>({ type: UPLOAD_THUMB_LARGE_TO_S3_FAILURE });
    }
  };
};

export const uploadThumbOriginalToS3Bucket = (
  file: File,
  millis: number,
  innerFolder: string | null
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadThumbOriginalToS3Request>({ type: UPLOAD_THUMB_ORIGINAL_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadFile(file, millis, innerFolder);

      dispatch<UploadThumbOriginalToS3Success>({
        type: UPLOAD_THUMB_ORIGINAL_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadThumbOriginalToS3Failure>({ type: UPLOAD_THUMB_ORIGINAL_TO_S3_FAILURE });
    }
  };
};

export const uploadThumbSmallToS3Bucket = (
  file: File,
  millis: number,
  innerFolder: string | null
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadThumbSmallToS3Request>({ type: UPLOAD_THUMB_SMALL_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadFile(file, millis, innerFolder);

      dispatch<UploadThumbSmallToS3Success>({
        type: UPLOAD_THUMB_SMALL_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadThumbSmallToS3Failure>({ type: UPLOAD_THUMB_SMALL_TO_S3_FAILURE });
    }
  };
};

export const uploadThumbCustomToS3Bucket = (
  file: File,
  millis: string,
  innerFolder: string | null
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UploadThumbCustomToS3Request>({ type: UPLOAD_THUMB_CUSTOM_TO_S3_REQUEST });
      const response = await UploadVideoToS3ServiceInstance.uploadFile(
        file,
        millis,
        innerFolder,
        true
      );

      dispatch<UploadThumbCustomToS3Success>({
        type: UPLOAD_THUMB_CUSTOM_TO_S3_SUCCESS,
        payload: response
      });
    } catch (error) {
      dispatch<UploadThumbCustomToS3Failure>({ type: UPLOAD_THUMB_CUSTOM_TO_S3_FAILURE });
    }
  };
};

export const createNewVideo = (video: CreateVideoType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CreateVideoServiceRequest>({ type: CREATE_VIDEO_SERVICE_REQUEST });
      const response = await adminVideoServiceInstance.createNewVideo(video);

      dispatch<CreateVideoServiceSuccess>({
        type: CREATE_VIDEO_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<CreateVideoServiceFailure>({ type: CREATE_VIDEO_SERVICE_FAILURE });
    }
  };
};

export const updateExistingVideo = (video: GetVideoResponseType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateVideoServiceRequest>({ type: UPDATE_VIDEO_SERVICE_REQUEST });
      await adminVideoServiceInstance.updateExistingVideo(video);

      dispatch<UpdateVideoServiceSuccess>({
        type: UPDATE_VIDEO_SERVICE_SUCCESS
      });
    } catch (error) {
      dispatch<UpdateVideoServiceFailure>({ type: UPDATE_VIDEO_SERVICE_FAILURE });
    }
  };
};

export const getVideo = (video: GetVideoType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetVideoServiceRequest>({ type: GET_VIDEO_SERVICE_REQUEST });
      const response = await adminVideoServiceInstance.getVideoData(video);

      dispatch<GetVideoServiceSuccess>({
        type: GET_VIDEO_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetVideoServiceFailure>({ type: GET_VIDEO_SERVICE_FAILURE });
    }
  };
};

export const deleteVideo = (video: string | undefined) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<DeleteVideoRequest>({ type: DELETE_VIDEO_REQUEST });

      await adminVideoServiceInstance.deleteVideo(video);

      dispatch<DeleteVideoSuccess>({
        type: DELETE_VIDEO_SUCCESS
      });
    } catch (error) {
      dispatch<DeleteVideoFailure>({ type: DELETE_VIDEO_FAILURE });
    }
  };
};

export const getVideosList = (params?: GetVideoListRequestData) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetVideosListServiceRequest>({ type: GET_VIDEOS_LIST_SERVICE_REQUEST });
      const response = await adminVideoServiceInstance.getVideosList(params);
      dispatch<GetVideosListServiceSuccess>({
        type: GET_VIDEOS_LIST_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetVideosListServiceFailure>({ type: GET_VIDEOS_LIST_SERVICE_FAILURE, error });
    }
  };
};
export const getFilteredVideosCount = () => {
  return async (dispatch: Dispatch) => {
    try {
      //const payload = await authServiceInstance.loginWithToken({ ...user });

      dispatch<GetFilteredVideosCountServiceRequest>({
        type: GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST
      });
      const response = await adminVideoServiceInstance.getFilteredVideosCount();
      dispatch<GetFilteredVideosCountServiceSuccess>({
        type: GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetFilteredVideosCountServiceFailure>({
        type: GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE,
        error
      });
    }
  };
};
