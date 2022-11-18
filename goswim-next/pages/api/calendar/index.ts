import { Dispatch } from "redux";
import {
  GetOverviewReviewsDragRequest, GetOverviewReviewsFailure, GetOverviewReviewsRequest,
  GetOverviewReviewsSuccess, GET_OVERVIEW_DATA_DRAG_REQUEST, GET_OVERVIEW_DATA_FAILURE,
  GET_OVERVIEW_DATA_REQUEST, GET_OVERVIEW_DATA_SUCCESS, UpdateOverviewData, UPDATE_OVERVIEW_DATA
} from '../../../src/store/calendar/scheduleOverview/types';
import { ScheduleOverviewInstance } from '../../../src/services/calendar';
import { UpdateScheduleRequestObj } from "src/store/management/goswim/lessons/details";

export const apiGetScheduleOverview = async (dispatch: Dispatch, date: any) => {
  try {
    if (date.isDragged) {
      dispatch<GetOverviewReviewsDragRequest>({ type: GET_OVERVIEW_DATA_DRAG_REQUEST });
    } else {
      dispatch<GetOverviewReviewsRequest>({ type: GET_OVERVIEW_DATA_REQUEST });
    }
    const payload = await ScheduleOverviewInstance.getScheduleOverview(date);
    dispatch<GetOverviewReviewsSuccess>({
      type: GET_OVERVIEW_DATA_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<GetOverviewReviewsFailure>({ type: GET_OVERVIEW_DATA_FAILURE, error });
  }
}

export const apiUpdateOverViewItem = async (dispatch: Dispatch, data: UpdateScheduleRequestObj) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateOverviewData>({ type: UPDATE_OVERVIEW_DATA, payload: data });
    } catch (error) { }
  };
};