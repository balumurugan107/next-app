import { Dispatch } from 'redux';
import {
  GET_SUBSCRIBERS_DATA_REQUEST,
  GetSubscribersRequest,
  GetSubscribersSuccess,
  GET_SUBSCRIBERS_DATA_SUCCESS,
  GET_SUBSCRIBERS_DATA_FAILURE,
  GetSubscribersFailure
} from 'src/store/calendar/subscribers/types';
import { ScheduleOverviewSubscribersInstance } from 'src/services/subscribers';
/**
 * @function
 * @since 20/07/2020
 * @name getSchedulereviewSubscribers
 * @description To get all subscribers related to a review
 * @author Karthik Prakash
 */

export const getSubscribers = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetSubscribersRequest>({ type: GET_SUBSCRIBERS_DATA_REQUEST });

      const payload = await ScheduleOverviewSubscribersInstance.getSubscribers(id);

      dispatch<GetSubscribersSuccess>({
        type: GET_SUBSCRIBERS_DATA_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch<GetSubscribersFailure>({ type: GET_SUBSCRIBERS_DATA_FAILURE, error });
    }
  };
};
