import { Store } from "@reduxjs/toolkit";
import { Dispatch } from 'redux';
import { dashboardServiceInstance } from "src/services/dashboard/dashboardService";
import { GetLessonNameServiceRequest, GET_LESSON_NAME_SERVICE_REQUEST, GetLessonNameServiceSuccess, GET_LESSON_NAME_SERVICE_SUCCESS, GetLessonNameServiceFailure, GET_LESSON_NAME_SERVICE_FAILURE, GetRecentDataServiceFailure, GetRecentDataServiceRequest, GetRecentDataServiceSuccess, GET_RECENT_DATA_SERVICE_FAILURE, GET_RECENT_DATA_SERVICE_REQUEST, GET_RECENT_DATA_SERVICE_SUCCESS } from "src/store/newdashboard";



export const apiGetJustAdded = async (dispatch: Dispatch) => {
  try {
    dispatch<GetLessonNameServiceRequest>({ type: GET_LESSON_NAME_SERVICE_REQUEST });
    const response = await dashboardServiceInstance.getJustAddedLesson();
    dispatch<GetLessonNameServiceSuccess>({
      type: GET_LESSON_NAME_SERVICE_SUCCESS,
      payload: response
    });
  } catch (error: any) {
    dispatch<GetLessonNameServiceFailure>({ type: GET_LESSON_NAME_SERVICE_FAILURE, error });
  }
}



export const apiGetRecentlyAdded = async (dispatch: Dispatch) => {
  try {
    dispatch<GetRecentDataServiceRequest>({ type: GET_RECENT_DATA_SERVICE_REQUEST });
    const response = await dashboardServiceInstance.getRecentlyWatchedLessons();
    dispatch<GetRecentDataServiceSuccess>({
      type: GET_RECENT_DATA_SERVICE_SUCCESS,
      payload: response
    });
  } catch (error: any) {
    dispatch<GetRecentDataServiceFailure>({ type: GET_RECENT_DATA_SERVICE_FAILURE, error });
  }
}