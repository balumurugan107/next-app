export interface S3Response {
  bucket: string;
  key: string;
  location: string;
}

export interface S3Config {
  bucketName: string;
  region: string;
  dirName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface AdminVideoState {
  isLoading: boolean;
  isCustomThumbLoading: boolean;
  error: Error | null;
  videoUploaded: S3Response | null;
  thumbOriginalUploaded: S3Response[] | [];
  thumbLargeUploaded: S3Response[] | [];
  thumbSmallUploaded: S3Response[] | [];
  thumbCustomUploaded: S3Response | null;
  createVideo: CreateVideoType | null;
  updateVideo: boolean | false;
  getVideo: GetVideoResponseType | null;
  isVideoCreated: boolean;
  isVideoUpdated: boolean;
  isVideoDeleted: boolean;
  videoList: GetVideoListResponseData;
  filteredData: [];
}

export interface CreateVideoType {
  id: number;
  video_file_name: string;
}

export interface GetVideoType {
  _id: string;
}

export interface DeleteVideoType {
  _id: number;
  video_file_name: string;
}

export interface GetVideoResponseType {
  _id: string;
  state: string;
  videoUrl: string;
  thumbnailUrl: string;
  id: string;
  thumbnail_file_name: string;
  video_file_name: string;
  custom_thumbnail_uid?: string;
}
export interface GetVideoListRequestData {
  limit?: number | undefined;
  page?: number | undefined;
  filterData?: ApiData[];
}
export interface ApiData {
  title: string;
  key: string;
}
/* UPLOAD VIDEO */
export const UPLOAD_VIDEO_TO_S3_REQUEST = '@service/upload-video-to-s3-request';
export const UPLOAD_VIDEO_TO_S3_SUCCESS = '@service/upload-video-to-s3-success';
export const UPLOAD_VIDEO_TO_S3_FAILURE = '@service/upload-video-to-s3-failure';

/* UPLOAD VIDEO THUMBNAIL ORIGINAL */
export const UPLOAD_THUMB_ORIGINAL_TO_S3_REQUEST = '@service/upload-thumb-original-to-s3-request';
export const UPLOAD_THUMB_ORIGINAL_TO_S3_SUCCESS = '@service/upload-thumb-original-to-s3-success';
export const UPLOAD_THUMB_ORIGINAL_TO_S3_FAILURE = '@service/upload-thumb-original-to-s3-failure';

/* UPLOAD VIDEO THUMBNAIL LARGE */
export const UPLOAD_THUMB_LARGE_TO_S3_REQUEST = '@service/upload-thumb-large-to-s3-request';
export const UPLOAD_THUMB_LARGE_TO_S3_SUCCESS = '@service/upload-thumb-large-to-s3-success';
export const UPLOAD_THUMB_LARGE_TO_S3_FAILURE = '@service/upload-thumb-large-to-s3-failure';

/* UPLOAD VIDEO THUMBNAIL SMALL */
export const UPLOAD_THUMB_SMALL_TO_S3_REQUEST = '@service/upload-thumb-small-to-s3-request';
export const UPLOAD_THUMB_SMALL_TO_S3_SUCCESS = '@service/upload-thumb-small-to-s3-success';
export const UPLOAD_THUMB_SMALL_TO_S3_FAILURE = '@service/upload-thumb-small-to-s3-failure';

/* UPLOAD VIDEO THUMBNAIL SMALL */
export const UPLOAD_THUMB_CUSTOM_TO_S3_REQUEST = '@service/upload-thumb-custom-to-s3-request';
export const UPLOAD_THUMB_CUSTOM_TO_S3_SUCCESS = '@service/upload-thumb-custom-to-s3-success';
export const UPLOAD_THUMB_CUSTOM_TO_S3_FAILURE = '@service/upload-thumb-custom-to-s3-failure';

export const REMOVE_S3_VIDEO_STATE_FROM_STORE = '@service/remove-s3-video-from-store';

/* CREATE VIDEO */
export const CREATE_VIDEO_SERVICE_REQUEST = '@service/uploaded-video-service-request';
export const CREATE_VIDEO_SERVICE_SUCCESS = '@service/uploaded-video-service-success';
export const CREATE_VIDEO_SERVICE_FAILURE = '@service/uploaded-video-service-failure';

/* UPLOAD VIDEO */
export const UPDATE_VIDEO_SERVICE_REQUEST = '@service/uploaded-video-update-service-request';
export const UPDATE_VIDEO_SERVICE_SUCCESS = '@service/uploaded-video-update-service-success';
export const UPDATE_VIDEO_SERVICE_FAILURE = '@service/uploaded-video-update-service-failure';

/* GET VIDEO */
export const GET_VIDEO_SERVICE_REQUEST = '@service/get-video-service-request';
export const GET_VIDEO_SERVICE_SUCCESS = '@service/get-video-service-success';
export const GET_VIDEO_SERVICE_FAILURE = '@service/get-video-service-failure';

/* GET VIDEOS LIST */
export const GET_VIDEOS_LIST_SERVICE_REQUEST = '@service/get-videos-list-service-request';
export const GET_VIDEOS_LIST_SERVICE_SUCCESS = '@service/get-videos-list-service-success';
export const GET_VIDEOS_LIST_SERVICE_FAILURE = '@service/get-videos-list-service-failure';

/* DELETE VIDEO */
export const DELETE_VIDEO_REQUEST = '@service/delete-video-request';
export const DELETE_VIDEO_SUCCESS = '@service/delete-video-success';
export const DELETE_VIDEO_FAILURE = '@service/delete-video-failure';

export const GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST =
  '@newdashboard/get-filtered-videos-count-service-request';
export const GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS =
  '@newdashboard/get-filtered-videos-count-service-success';
export const GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE =
  '@newdashboard/get-filtered-videos-count-service-failure';
export interface UploadVideoToS3Request {
  type: typeof UPLOAD_VIDEO_TO_S3_REQUEST;
}

export interface RemoveS3VideoFromState {
  type: typeof REMOVE_S3_VIDEO_STATE_FROM_STORE;
}
export interface UploadVideoToS3Success {
  type: typeof UPLOAD_VIDEO_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadVideoToS3Failure {
  type: typeof UPLOAD_VIDEO_TO_S3_FAILURE;
}

export interface UploadThumbOriginalToS3Request {
  type: typeof UPLOAD_THUMB_ORIGINAL_TO_S3_REQUEST;
}
export interface UploadThumbOriginalToS3Success {
  type: typeof UPLOAD_THUMB_ORIGINAL_TO_S3_SUCCESS;
  payload: S3Response;
}
export interface UploadThumbOriginalToS3Failure {
  type: typeof UPLOAD_THUMB_ORIGINAL_TO_S3_FAILURE;
}

export interface UploadThumbLargeToS3Request {
  type: typeof UPLOAD_THUMB_LARGE_TO_S3_REQUEST;
}
export interface UploadThumbLargeToS3Success {
  type: typeof UPLOAD_THUMB_LARGE_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadThumbLargeToS3Failure {
  type: typeof UPLOAD_THUMB_LARGE_TO_S3_FAILURE;
}

export interface UploadThumbSmallToS3Request {
  type: typeof UPLOAD_THUMB_SMALL_TO_S3_REQUEST;
}
export interface UploadThumbSmallToS3Success {
  type: typeof UPLOAD_THUMB_SMALL_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadThumbSmallToS3Failure {
  type: typeof UPLOAD_THUMB_SMALL_TO_S3_FAILURE;
}

export interface UploadThumbCustomToS3Request {
  type: typeof UPLOAD_THUMB_CUSTOM_TO_S3_REQUEST;
}
export interface UploadThumbCustomToS3Success {
  type: typeof UPLOAD_THUMB_CUSTOM_TO_S3_SUCCESS;
  payload: S3Response;
}

export interface UploadThumbCustomToS3Failure {
  type: typeof UPLOAD_THUMB_CUSTOM_TO_S3_FAILURE;
}

/* uploaded video to api*/
export interface CreateVideoServiceRequest {
  type: typeof CREATE_VIDEO_SERVICE_REQUEST;
}

export interface CreateVideoServiceFailure {
  type: typeof CREATE_VIDEO_SERVICE_FAILURE;
}
export interface CreateVideoServiceSuccess {
  type: typeof CREATE_VIDEO_SERVICE_SUCCESS;
  payload: CreateVideoType;
}

/* update video to api*/
export interface UpdateVideoServiceRequest {
  type: typeof UPDATE_VIDEO_SERVICE_REQUEST;
}

export interface UpdateVideoServiceFailure {
  type: typeof UPDATE_VIDEO_SERVICE_FAILURE;
}
export interface UpdateVideoServiceSuccess {
  type: typeof UPDATE_VIDEO_SERVICE_SUCCESS;
}

/* get video to api*/
export interface GetVideoServiceRequest {
  type: typeof GET_VIDEO_SERVICE_REQUEST;
}

export interface DeleteVideoRequest {
  type: typeof DELETE_VIDEO_REQUEST;
}

export interface DeleteVideoSuccess {
  type: typeof DELETE_VIDEO_SUCCESS;
}

export interface DeleteVideoFailure {
  type: typeof DELETE_VIDEO_FAILURE;
}
export interface GetVideoServiceSuccess {
  type: typeof GET_VIDEO_SERVICE_SUCCESS;
  payload: GetVideoResponseType[];
}
export interface GetVideoServiceFailure {
  type: typeof GET_VIDEO_SERVICE_FAILURE;
}

export interface GetVideosListServiceRequest {
  type: typeof GET_VIDEOS_LIST_SERVICE_REQUEST;
}
export interface GetVideosListServiceSuccess {
  type: typeof GET_VIDEOS_LIST_SERVICE_SUCCESS;
  payload: GetVideoListResponseData;
}
export interface GetVideosListServiceFailure {
  type: typeof GET_VIDEOS_LIST_SERVICE_FAILURE;
  error: Error;
}
export interface GetFilteredVideosCountServiceRequest {
  type: typeof GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST;
}
export interface GetFilteredVideosCountServiceSuccess {
  type: typeof GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS;
  payload: [];
}
export interface GetFilteredVideosCountServiceFailure {
  type: typeof GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE;
  error: any;
}

export interface GetVideoListResponseData {
  results: VideoListResultData[];
  totalCount: number;
  next: NextVideoList;
}
export interface VideoListResultData {
  _id: string;
  video_file_name: string;
}
export interface NextVideoList {
  page: number;
  limit: number;
}
export type UploadVideosToS3ActionTypes =
  | UploadVideoToS3Request
  | UploadVideoToS3Success
  | UploadVideoToS3Failure
  | UploadThumbOriginalToS3Request
  | UploadThumbOriginalToS3Success
  | UploadThumbOriginalToS3Failure
  | UploadThumbSmallToS3Request
  | UploadThumbSmallToS3Success
  | UploadThumbSmallToS3Failure
  | RemoveS3VideoFromState
  | UploadThumbLargeToS3Request
  | UploadThumbLargeToS3Success
  | UploadThumbLargeToS3Failure
  | UploadThumbCustomToS3Request
  | UploadThumbCustomToS3Success
  | UploadThumbCustomToS3Failure
  | CreateVideoServiceRequest
  | CreateVideoServiceSuccess
  | CreateVideoServiceFailure
  | UpdateVideoServiceRequest
  | UpdateVideoServiceSuccess
  | UpdateVideoServiceFailure
  | GetVideoServiceRequest
  | GetVideoServiceSuccess
  | GetVideoServiceFailure
  | DeleteVideoRequest
  | DeleteVideoSuccess
  | DeleteVideoFailure
  | GetVideosListServiceRequest
  | GetVideosListServiceSuccess
  | GetVideosListServiceFailure
  | GetFilteredVideosCountServiceRequest
  | GetFilteredVideosCountServiceSuccess
  | GetFilteredVideosCountServiceFailure;

export type S3ActionType = UploadVideosToS3ActionTypes;
