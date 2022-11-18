import { Dispatch } from 'redux';
import { ScheduleOverviewInstance } from 'src/services/calendar';
import {
  GET_SCHEDULE_LIST_REQUEST,
  GET_SCHEDULE_LIST_SUCCESS,
  GET_SCHEDULE_LIST_FAILURE,
  GetScheduleListRequest,
  GetScheduleListSuccess,
  GetScheduleListFailure
} from 'src/store/calendar/scheduleList/types';
/**
 * @function
 * @since 31-03-2022
 * @name getScheduleList
 * @description To get all Schedule list from the server
 * @author Balasubramoniam
 */

export const getScheduleList = (team_id: string | undefined, from: number, to: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetScheduleListRequest>({ type: GET_SCHEDULE_LIST_REQUEST });

      const payload = await ScheduleOverviewInstance.getScheduleList(team_id, from, to);

      dispatch<GetScheduleListSuccess>({
        type: GET_SCHEDULE_LIST_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch<GetScheduleListFailure>({ type: GET_SCHEDULE_LIST_FAILURE, error });
    }
  };
};
