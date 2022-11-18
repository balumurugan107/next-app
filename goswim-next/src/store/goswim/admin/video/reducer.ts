import produce from 'immer';
import {
  CREATE_VIDEO_SERVICE_FAILURE,
  CREATE_VIDEO_SERVICE_SUCCESS,
  GET_VIDEO_SERVICE_SUCCESS,
  REMOVE_S3_VIDEO_STATE_FROM_STORE,
  S3ActionType,
  AdminVideoState,
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
  UPLOAD_THUMB_CUSTOM_TO_S3_FAILURE,
  UPLOAD_THUMB_CUSTOM_TO_S3_REQUEST,
  UPLOAD_THUMB_CUSTOM_TO_S3_SUCCESS,
  UPDATE_VIDEO_SERVICE_FAILURE,
  UPDATE_VIDEO_SERVICE_REQUEST,
  UPDATE_VIDEO_SERVICE_SUCCESS
} from '.';
import {
  CREATE_VIDEO_SERVICE_REQUEST,
  DELETE_VIDEO_FAILURE,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE,
  GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST,
  GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS,
  GET_VIDEOS_LIST_SERVICE_FAILURE,
  GET_VIDEOS_LIST_SERVICE_REQUEST,
  GET_VIDEOS_LIST_SERVICE_SUCCESS,
  GET_VIDEO_SERVICE_FAILURE,
  GET_VIDEO_SERVICE_REQUEST
} from './types';

export const vals = '';

const initialState: AdminVideoState = {
  isLoading: false,
  isCustomThumbLoading: false,
  error: null,
  videoUploaded: null,
  thumbOriginalUploaded: [],
  thumbLargeUploaded: [],
  thumbSmallUploaded: [],
  createVideo: null,
  getVideo: null,
  thumbCustomUploaded: null,
  updateVideo: false,
  isVideoCreated: false,
  isVideoUpdated: false,
  isVideoDeleted: false,
  videoList: {
    results: [],
    totalCount: -1,
    next: {
      limit: 0,
      page: 0
    }
  },
  filteredData: []
};

export const S3UploadReducer = (state = initialState, action: S3ActionType) => {
  switch (action.type) {
    case UPLOAD_VIDEO_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case REMOVE_S3_VIDEO_STATE_FROM_STORE: {
      return produce(state, draft => {
        draft.videoUploaded = null;
        draft.thumbLargeUploaded = [];
        draft.thumbOriginalUploaded = [];
        draft.thumbSmallUploaded = [];
        draft.thumbCustomUploaded = null;
        draft.createVideo = null;
        draft.getVideo = null;
        draft.updateVideo = false;
      });
    }

    case UPLOAD_VIDEO_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.videoUploaded = action.payload;
      });
    }

    case UPLOAD_VIDEO_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPLOAD_THUMB_ORIGINAL_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPLOAD_THUMB_ORIGINAL_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.thumbOriginalUploaded = [...draft.thumbOriginalUploaded, action.payload];
      });
    }

    case UPLOAD_THUMB_ORIGINAL_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPLOAD_THUMB_LARGE_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPLOAD_THUMB_LARGE_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.thumbLargeUploaded = [...draft.thumbLargeUploaded, action.payload];
      });
    }

    case UPLOAD_THUMB_LARGE_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPLOAD_THUMB_CUSTOM_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isCustomThumbLoading = true;
        draft.isLoading = false;
      });
    }

    case UPLOAD_THUMB_CUSTOM_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isCustomThumbLoading = false;
        draft.thumbCustomUploaded = action.payload;
      });
    }

    case UPLOAD_THUMB_CUSTOM_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isCustomThumbLoading = false;
      });
    }

    case UPLOAD_THUMB_SMALL_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case UPLOAD_THUMB_SMALL_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.thumbSmallUploaded = [...draft.thumbSmallUploaded, action.payload];
      });
    }

    case UPLOAD_THUMB_SMALL_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case CREATE_VIDEO_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isVideoCreated = false;
      });
    }

    case CREATE_VIDEO_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.createVideo = action.payload;
        draft.isVideoCreated = true;
      });
    }

    case CREATE_VIDEO_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isVideoCreated = false;
      });
    }

    case UPDATE_VIDEO_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isVideoUpdated = false;
      });
    }
    case UPDATE_VIDEO_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case UPDATE_VIDEO_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.updateVideo = true;
        draft.isVideoUpdated = true;
      });
    }

    case DELETE_VIDEO_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isVideoDeleted = false;
      });
    }

    case DELETE_VIDEO_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isVideoDeleted = true;
      });
    }

    case DELETE_VIDEO_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_VIDEO_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_VIDEO_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        if (action.payload.length > 0) {
          draft.getVideo = action.payload[0];
        } else draft.getVideo = null;
      });
    }

    case GET_VIDEOS_LIST_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case GET_VIDEOS_LIST_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_VIDEOS_LIST_SERVICE_SUCCESS: {
      const results = action.payload.results;
      const totalCount = action.payload.totalCount;
      const next = action.payload.next;
      return produce(state, draft => {
        draft.videoList = {
          results: results,
          totalCount: totalCount,
          next: next
        };
        draft.isLoading = false;
      });
    }

    case GET_VIDEO_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    case GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.filteredData = action.payload;
      });
    }

    case GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }

    default:
      return state;
  }
};
