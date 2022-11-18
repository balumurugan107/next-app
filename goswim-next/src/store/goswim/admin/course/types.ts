export interface AdminCourseState {
  isLoading: boolean;
  isCourseDeleted: boolean;
  error: Error | null;
  courseCreated: boolean;
  courseUpdated: boolean;
  courseById: GetCourseByIdType | null;
  allCourseList: IAllCourse[];
}

export interface IUpdateLessonPosReq {
  position: number;
  lesson_id: string;
  course_id: string;
}

export interface CreateCourseType {
  _id?: string;
  id?: number;
  name: string;
  split: number;
  published: boolean;
  stroke?: string[];
  expertise?: string[];
  position?: number;
  description: string;
}

export interface GetCourseByIdType {
  _id?: string;
  name: string;
  description?: string;
  lesson_count?: number;
  thumbnailUrl?: string;
  split?: number;
  published?: boolean;
  stroke?: string[];
  expertise?: string[];
  position?: number;
}
export interface GetCourseType {
  _id: string;
}

export interface IAllCourse {
  _id: string;
  name: string;
}

export const REMOVE_ADMIN_COURSE_STATE = '@service/remove-admin-course-state';

/* CREATE COURSE */
export const CREATE_COURSE_SERVICE_REQUEST = '@service/create-course-service-request';
export const CREATE_COURSE_SERVICE_SUCCESS = '@service/create-course-service-success';
export const CREATE_COURSE_SERVICE_FAILURE = '@service/create-course-service-failure';

/* UPLOAD COURSE */
export const UPDATE_COURSE_SERVICE_REQUEST = '@service/update-course-service-request';
export const UPDATE_COURSE_SERVICE_SUCCESS = '@service/update-course-service-success';
export const UPDATE_COURSE_SERVICE_FAILURE = '@service/update-course-service-failure';

/* GET COURSE */
export const GET_COURSE_SERVICE_REQUEST = '@service/get-course-service-request';
export const GET_COURSE_SERVICE_SUCCESS = '@service/get-course-service-success';
export const GET_COURSE_SERVICE_FAILURE = '@service/get-course-service-failure';

/* GET ALL COURSE */
export const GET_ALL_COURSE_SERVICE_REQUEST = '@service/get-all-course-service-request';
export const GET_ALL_COURSE_SERVICE_SUCCESS = '@service/get-all-course-service-success';
export const GET_ALL_COURSE_SERVICE_FAILURE = '@service/get-all-course-service-failure';

// EDIT COURSE
export const GET_COURSE_BY_ID_SERVICE_REQUEST = '@service/get-course-by-id-service-request';
export const GET_COURSE_BY_ID_SERVICE_SUCCESS = '@service/get-course-by-id-service-success';
export const GET_COURSE_BY_ID_SERVICE_FAILURE = '@service/get-course-by-id-service-failure';

// DELETE COURSE
export const DELETE_COURSE_REQUEST = '@service/delete-course-request';
export const DELETE_COURSE_SUCCESS = '@service/delete-course-success';
export const DELETE_COURSE_FAILURE = '@service/delete-course-failure';

// UPDATE LESSON POSITION IN COURSE
export const UPDATE_LESSON_POS_REQUEST = '@service/update-lesson-pos-request';
export const UPDATE_LESSON_POS_SUCCESS = '@service/update-lesson-pos-success';
export const UPDATE_LESSON_POS_FAILURE = '@service/update-lesson-pos-failure';

export interface RemoveAdminCourseState {
  type: typeof REMOVE_ADMIN_COURSE_STATE;
}

/* uploaded video to api*/
export interface CreateCourseServiceRequest {
  type: typeof CREATE_COURSE_SERVICE_REQUEST;
}

export interface CreateCourseServiceFailure {
  type: typeof CREATE_COURSE_SERVICE_FAILURE;
}
export interface CreateCourseServiceSuccess {
  type: typeof CREATE_COURSE_SERVICE_SUCCESS;
  payload: CreateCourseType;
}

/* update video to api*/
export interface UpdateCourseServiceRequest {
  type: typeof UPDATE_COURSE_SERVICE_REQUEST;
}

export interface UpdateCourseServiceFailure {
  type: typeof UPDATE_COURSE_SERVICE_FAILURE;
}
export interface UpdateCourseServiceSuccess {
  type: typeof UPDATE_COURSE_SERVICE_SUCCESS;
}

/* get video to api*/
export interface GetCourseServiceRequest {
  type: typeof GET_COURSE_SERVICE_REQUEST;
}

export interface GetCourseServiceSuccess {
  type: typeof GET_COURSE_SERVICE_SUCCESS;
  payload: CreateCourseType[];
}
export interface GetCourseServiceFailure {
  type: typeof GET_COURSE_SERVICE_FAILURE;
}

/* GET ALL COURSE */

export interface GetAllCourseServiceRequest {
  type: typeof GET_ALL_COURSE_SERVICE_REQUEST;
}

export interface GetAllCourseServiceSuccess {
  type: typeof GET_ALL_COURSE_SERVICE_SUCCESS;
  payload: IAllCourse[];
}
export interface GetAllCourseServiceFailure {
  type: typeof GET_ALL_COURSE_SERVICE_FAILURE;
}

/* GET ALL COURSE */
export interface GetCourseByIdServiceRequest {
  type: typeof GET_COURSE_BY_ID_SERVICE_REQUEST;
}

export interface GetCourseByIdServiceSuccess {
  type: typeof GET_COURSE_BY_ID_SERVICE_SUCCESS;
  payload: GetCourseByIdType;
}
export interface GetCourseByIdServiceFailure {
  type: typeof GET_COURSE_BY_ID_SERVICE_FAILURE;
}
export interface DeleteCourseRequest {
  type: typeof DELETE_COURSE_REQUEST;
}

export interface DeleteCourseSuccess {
  type: typeof DELETE_COURSE_SUCCESS;
}
export interface DeleteCourseFailure {
  type: typeof DELETE_COURSE_FAILURE;
}

export interface UpdateLessonPosRequest {
  type: typeof UPDATE_LESSON_POS_REQUEST;
}

export interface UpdateLessonPosSuccess {
  type: typeof UPDATE_LESSON_POS_SUCCESS;
}
export interface UpdateLessonPosFailure {
  type: typeof UPDATE_LESSON_POS_FAILURE;
}

export type AdminCourseActionTypes =
  | RemoveAdminCourseState
  | CreateCourseServiceRequest
  | CreateCourseServiceSuccess
  | CreateCourseServiceFailure
  | UpdateCourseServiceRequest
  | UpdateCourseServiceSuccess
  | UpdateCourseServiceFailure
  | GetCourseServiceRequest
  | GetCourseServiceSuccess
  | GetCourseServiceFailure
  | GetCourseByIdServiceRequest
  | GetCourseByIdServiceSuccess
  | GetCourseByIdServiceFailure
  | GetAllCourseServiceRequest
  | GetAllCourseServiceSuccess
  | GetAllCourseServiceFailure
  | DeleteCourseRequest
  | DeleteCourseSuccess
  | DeleteCourseFailure
  | UpdateLessonPosRequest
  | UpdateLessonPosSuccess
  | UpdateLessonPosFailure;

export type AdminCourseActionType = AdminCourseActionTypes;
