import { ContractResponse } from 'src/store/management/members';
import { VideoListResultData } from 'src/store/newdashboard/types';

export interface ICourse {
  name: string;
  _id: string;
}

export interface ILesson {
  publish_at?: number | null;
  description: string;
  published?: boolean;
  bonus?: boolean;
  name: string;
  subtitle?: string;
  video_id?: string;
  video_list?: VideoListResultData[];
  thumbnail_file_name?: string;
  course_id?: string[];
  course_list?: ICourse[];
  contract_ids?: string[];
  contract_id?: string[];
  contract_list?: ContractResponse[];
  position?: number | string;
  tags?: string[];
  stroke?: string[];
  anatomy?: string[];
  expertise?: string[];
  camera_position?: string[];
}

export interface IAllLesson {
  _id: string;
  name: string;
}
export interface FilterState {
  all: number;
  incomplete: number;
  published: number;
  untagged: number;
}
export interface AdminLessonState {
  isLoading: boolean;
  isCreated: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  isLessonRemovedFromCourse: boolean;
  error: Error | null;
  lessonById: ILessonByIdResponse | null;
  allLessonList: IAllLesson[];
  filteredData: FilterState[];
}

/* CREATE LESSON */
export const CREATE_LESSON_SERVICE_REQUEST = '@service/uploaded-lesson-service-request';
export const CREATE_LESSON_SERVICE_SUCCESS = '@service/uploaded-lesson-service-success';
export const CREATE_LESSON_SERVICE_FAILURE = '@service/uploaded-lesson-service-failure';

export interface CreateLessonServiceRequest {
  type: typeof CREATE_LESSON_SERVICE_REQUEST;
}

export interface CreateLessonServiceFailure {
  type: typeof CREATE_LESSON_SERVICE_FAILURE;
}
export interface CreateLessonServiceSuccess {
  type: typeof CREATE_LESSON_SERVICE_SUCCESS;
}

/* GET LESSON BY ID */

export const GET_LESSON_BY_ID_SERVICE_REQUEST = '@service/get-lesson-by-id-service-request';
export const GET_LESSON_BY_ID_SERVICE_SUCCESS = '@service/get-lesson-by-id-service-success';
export const GET_LESSON_BY_ID_SERVICE_FAILURE = '@service/get-lesson-by-id-service-failure';

export interface GetLessonByIdServiceRequest {
  type: typeof GET_LESSON_BY_ID_SERVICE_REQUEST;
}
export interface GetLessonByIdServiceSuccess {
  type: typeof GET_LESSON_BY_ID_SERVICE_SUCCESS;
  payload: ILessonByIdResponse;
}

export interface GetLessonByIdServiceFailure {
  type: typeof GET_LESSON_BY_ID_SERVICE_FAILURE;
}

/* Update Lesson */

export const UPDATE_LESSON_SERVICE_REQUEST = '@service/update-lesson-service-request';
export const UPDATE_LESSON_SERVICE_SUCCESS = '@service/update-lesson-service-success';
export const UPDATE_LESSON_SERVICE_FAILURE = '@service/update-lesson-service-failure';

export interface updateLessonServiceRequest {
  type: typeof UPDATE_LESSON_SERVICE_REQUEST;
}
export interface updateLessonServiceSuccess {
  type: typeof UPDATE_LESSON_SERVICE_SUCCESS;
}

export interface updateLessonServiceFailure {
  type: typeof UPDATE_LESSON_SERVICE_FAILURE;
}

/*GET ALL LESSONS*/

export const GET_ALL_LESSON_SERVICE_REQUEST = '@service/get-all-lesson-service-request';
export const GET_ALL_LESSON_SERVICE_SUCCESS = '@service/get-all-lesson-service-success';
export const GET_ALL_LESSON_SERVICE_FAILURE = '@service/get-all-lesson-service-failure';

export interface GetAllLessonServiceRequest {
  type: typeof GET_ALL_LESSON_SERVICE_REQUEST;
}
export interface GetAllLessonServiceSuccess {
  type: typeof GET_ALL_LESSON_SERVICE_SUCCESS;
  payload: IAllLesson[];
}

export interface GetAllLessonServiceFailure {
  type: typeof GET_ALL_LESSON_SERVICE_FAILURE;
}

export interface ILessonByIdResponse {
  contract_list: ContractResponse[] | undefined;
  _id?: string;
  name: string;
  description: string;
  subtitle?: string;
  position?: number;
  completed?: boolean;
  published?: boolean;
  bonus?: boolean;
  publish_at?: number;
  video_id?: string;
  thumbnail_file_name?: string;
  course_id?: string[];
  course_list?: ICourse[];
  contract_id?: string[];
  videoUrl?: string;
  thumbnailUrl?: string;
  tags?: string[];
  stroke?: string[];
  anatomy?: string[];
  expertise?: string[];
  camera_position?: string[];
  video_file_name: string;
}

/* Delete Lesson */

export const DELETE_LESSON_SERVICE_REQUEST = '@service/delete-lesson-service-request';
export const DELETE_LESSON_SERVICE_SUCCESS = '@service/delete-lesson-service-success';
export const DELETE_LESSON_SERVICE_FAILURE = '@service/delete-lesson-service-failure';

export const GET_FILTERED_LESSON_COUNT_SERVICE_REQUEST =
  '@newdashboard/get-filtered-lesson-count-service-request';
export const GET_FILTERED_LESSON_COUNT_SERVICE_SUCCESS =
  '@newdashboard/get-filtered-lesson-count-service-success';
export const GET_FILTERED_LESSON_COUNT_SERVICE_FAILURE =
  '@newdashboard/get-filtered-lesson-count-service-failure';

export interface deleteLessonServiceRequest {
  type: typeof DELETE_LESSON_SERVICE_REQUEST;
}
export interface deleteLessonServiceSuccess {
  type: typeof DELETE_LESSON_SERVICE_SUCCESS;
}

export interface deleteLessonServiceFailure {
  type: typeof DELETE_LESSON_SERVICE_FAILURE;
}

export const REMOVE_LESSON_STATE = '@service/remove-lesson-state';

export interface RemoveLessonThemeState {
  type: typeof REMOVE_LESSON_STATE;
}
export interface GetFilteredLessonCountServiceRequest {
  type: typeof GET_FILTERED_LESSON_COUNT_SERVICE_REQUEST;
}
export interface GetFilteredLessonCountServiceSuccess {
  type: typeof GET_FILTERED_LESSON_COUNT_SERVICE_SUCCESS;
  payload: [];
}
export interface GetFilteredLessonCountServiceFailure {
  type: typeof GET_FILTERED_LESSON_COUNT_SERVICE_FAILURE;
  error: Error;
}

// Remve lesson from course - types

export const REMOVE_LESSON_FROM_COURSE_REQUEST = '@service/remove-lesson-from-course-request';
export const REMOVE_LESSON_FROM_COURSE_SUCCESS = '@service/remove-lesson-from-course-success';
export const REMOVE_LESSON_FROM_COURSE_FAILURE = '@service/remove-lesson-from-course-failure';

export interface RemoveLessonFromCourseRequest {
  type: typeof REMOVE_LESSON_FROM_COURSE_REQUEST;
}
export interface RemoveLessonFromCourseSuccess {
  type: typeof REMOVE_LESSON_FROM_COURSE_SUCCESS;
}
export interface RemoveLessonFromCourseFailure {
  type: typeof REMOVE_LESSON_FROM_COURSE_FAILURE;
  error: Error;
}

export type LessonActionType =
  | CreateLessonServiceRequest
  | CreateLessonServiceSuccess
  | CreateLessonServiceFailure
  | GetLessonByIdServiceRequest
  | GetLessonByIdServiceSuccess
  | GetLessonByIdServiceFailure
  | updateLessonServiceRequest
  | updateLessonServiceSuccess
  | updateLessonServiceFailure
  | GetAllLessonServiceRequest
  | GetAllLessonServiceSuccess
  | GetAllLessonServiceFailure
  | deleteLessonServiceRequest
  | deleteLessonServiceSuccess
  | deleteLessonServiceFailure
  | RemoveLessonThemeState
  | GetFilteredLessonCountServiceRequest
  | GetFilteredLessonCountServiceSuccess
  | GetFilteredLessonCountServiceFailure
  | RemoveLessonFromCourseRequest
  | RemoveLessonFromCourseSuccess
  | RemoveLessonFromCourseFailure;

export type AdminLessonActionType = LessonActionType;
