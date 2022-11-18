import { HTTPResponse, HTTPErrorResponse } from 'src/types';
import { AxiosError } from 'axios';

export interface BookingData {
  rostterGroup: string[];
  teamId: string;
  teamName: string;
  fullName: string;
  email: string;
  hasProfilePicture: string;
  memberId: string;
  slots: number[];
  profilePictureUrl: string;
  lessonServiceId: string;
  swimmerNotes: string;
  lessonDate: number;
}
export interface LessonBookingState {
  isLoading: boolean;
  error: Error | null;
  data: BookingData[];
}

export const GET_LESSON_BOOKING = '@calendar/get-lesson-booking';
export const GET_LESSON_BOOKING_DATA_REQUEST = '@calendar/get-lesson-booking-request';
export const GET_LESSON_BOOKING_DATA_SUCCESS = '@calendar/get-lesson-booking-success';
export const GET_LESSON_BOOKING_DATA_FAILURE = '@calendar/get-lesson-booking-failure';

export interface GetLessonBookingRequest {
  type: typeof GET_LESSON_BOOKING_DATA_REQUEST;
}
export interface GetLessonBookingSuccess {
  type: typeof GET_LESSON_BOOKING_DATA_SUCCESS;
  payload: HTTPResponse<BookingData[]>;
}
export interface GetLessonBookingFailure {
  type: typeof GET_LESSON_BOOKING_DATA_FAILURE;
  error: AxiosError<HTTPErrorResponse>;
}

export type GetLessonBookingActionTypes =
  | GetLessonBookingRequest
  | GetLessonBookingSuccess
  | GetLessonBookingFailure;

export type LessonBookingActionTypes = GetLessonBookingActionTypes;
