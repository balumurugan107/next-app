// import { Dispatch } from "react";
import { Dispatch } from "redux";
import { dashboardServiceInstance } from "src/services/dashboard/dashboardService";
import { adminVideoServiceInstance } from "src/services/goswim/admin/videos";
import { GetFilteredVideosCountServiceFailure, GetFilteredVideosCountServiceRequest, GetFilteredVideosCountServiceSuccess, GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE, GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST, GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS } from "src/store/goswim/admin/video";
import { GetVideoListRequestData, GetVideosListServiceFailure, GetVideosListServiceRequest, GetVideosListServiceSuccess, GET_VIDEOS_LIST_SERVICE_FAILURE, GET_VIDEOS_LIST_SERVICE_REQUEST, GET_VIDEOS_LIST_SERVICE_SUCCESS } from "src/store/newdashboard";

export const apiGetFilteredVideoCount = async (dispatch: Dispatch) => {
  try {

    dispatch<GetFilteredVideosCountServiceRequest>({
      type: GET_FILTERED_VIDEOS_COUNT_SERVICE_REQUEST
    });
    const response = await adminVideoServiceInstance.getFilteredVideosCount();
    dispatch<GetFilteredVideosCountServiceSuccess>({
      type: GET_FILTERED_VIDEOS_COUNT_SERVICE_SUCCESS,
      payload: response.data
    });
  } catch (error: any) {
    dispatch<GetFilteredVideosCountServiceFailure>({
      type: GET_FILTERED_VIDEOS_COUNT_SERVICE_FAILURE,
      error
    });
  }
}

export const apiGetFilteredVideoList = async (dispatch: Dispatch, params?: GetVideoListRequestData) => {
  try {
    //const payload = await authServiceInstance.loginWithToken({ ...user });

    dispatch<GetVideosListServiceRequest>({ type: GET_VIDEOS_LIST_SERVICE_REQUEST });
    const response = await dashboardServiceInstance.getVideosList(params);
    dispatch<GetVideosListServiceSuccess>({
      type: GET_VIDEOS_LIST_SERVICE_SUCCESS,
      payload: response.data
    });
  } catch (error: any) {
    dispatch<GetVideosListServiceFailure>({ type: GET_VIDEOS_LIST_SERVICE_FAILURE, error });
  }
};