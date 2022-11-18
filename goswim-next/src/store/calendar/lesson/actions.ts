import { Dispatch } from 'redux';
import { LessonOvervieServiceInstance } from 'src/services/overview/lesson';

import {
  GetLessonBookingFailure,
  GetLessonBookingRequest,
  GetLessonBookingSuccess,
  GET_LESSON_BOOKING_DATA_FAILURE,
  GET_LESSON_BOOKING_DATA_REQUEST,
  GET_LESSON_BOOKING_DATA_SUCCESS
} from './types';

export const getLessonBookingList = <T>(params: T) => async (dispatch: Dispatch) => {
  try {
    dispatch<GetLessonBookingRequest>({ type: GET_LESSON_BOOKING_DATA_REQUEST });

    const payload = await LessonOvervieServiceInstance.getBookedByList(params);

    dispatch<GetLessonBookingSuccess>({
      type: GET_LESSON_BOOKING_DATA_SUCCESS,
      payload
    });
  } catch (error) {
    dispatch<GetLessonBookingFailure>({
      type: GET_LESSON_BOOKING_DATA_FAILURE,
      error
    });
  }
};
