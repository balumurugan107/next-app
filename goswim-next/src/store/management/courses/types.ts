import { CourseLessonFilterData } from '../lessons';

export interface CourseServiceState {
  isLoading: boolean;
  error: Error | null;
  searchText: string;
  courseData: CoursesResult;
  courseScheduled: boolean;
  courseFilterData: CourseLessonFilterData[];
}

export interface CourseListReq {
  isAdmin: boolean;
  pageID?: number | string;
  limit?: number;
  stroke?: any;
  expertise?: any;
  search?: any;
  adminFilter?: number | null;
}
export interface ScheduleCourseRequestObj {
  tz: string;
  course_id: string;
  schedule_on_timestamp: number;
  team_id: string;
  overwrite: boolean;
  days_of_week: number[];
}

export interface CourseServiceDocument {
  _id: string;
  name: string;
  lessons_count: number;
  thumbnailUrl: string;
  description: string;
  //des
}

export interface CoursesResult {
  results: CourseServiceDocument[];
  totalCount: number;
  next?: Next;
  pageNumber?: number | string;
}

export interface CourseSearchText {
  text: string;
}

export interface Next {
  page: number;
  limit: number;
}

/* Get Lesson Service */
export const GET_COURSE_SERVICES_REQUEST = '@service/get-course-services-request';
export const GET_COURSE_SERVICES_SUCCESS = '@service/get-course-services-success';
export const GET_COURSE_SERVICES_FAILURE = '@service/get-course-services-failure';

export const SET_COURSE_SEARCH_TEXT = '@service/set_course_search_text';

export const GET_FILTER_DATA_REQUEST = '@service/get-filter_data-request';
export const GET_FILTER_DATA_SUCCESS = '@service/get-filter_data-success';
export const GET_FILTER_DATA_FAILURE = '@service/get-filter_data-failure';

/* Schedule lessons */
export const SCHEDULE_COURSE_REQUEST = '@service/schedule-Course-request';
export const SCHEDULE_COURSE_SUCCESS = '@service/schedule-Course-success';
export const SCHEDULE_COURSE_FAILURE = '@service/schedule-Course-failure';

export interface GetCourseServicesRequest {
  type: typeof GET_COURSE_SERVICES_REQUEST;
}

export interface setCourseSearchTextType {
  type: typeof SET_COURSE_SEARCH_TEXT;
  payload: CourseSearchText;
}

export interface GetCourseServicesSuccess {
  type: typeof GET_COURSE_SERVICES_SUCCESS;
  payload: CoursesResult;
}
export interface GetCourseServicesFailure {
  type: typeof GET_COURSE_SERVICES_FAILURE;
  error: Error;
}

export interface GetFilterDataServicesRequest {
  type: typeof GET_FILTER_DATA_REQUEST;
}
export interface GetFilterDataServicesSuccess {
  type: typeof GET_FILTER_DATA_SUCCESS;
  payload: CourseLessonFilterData[];
}
export interface GetFilterDataServicesFailure {
  type: typeof GET_FILTER_DATA_FAILURE;
  error: Error;
}

export interface ScheduleCourseRequest {
  type: typeof SCHEDULE_COURSE_REQUEST;
}

export interface ScheduleCourseSuccess {
  type: typeof SCHEDULE_COURSE_SUCCESS;
}
export interface ScheduleCourseFailure {
  type: typeof SCHEDULE_COURSE_FAILURE;
  error: Error;
}

export const REMOVE_ALL_COURSES_LIST = '@service/remove-all-courses-list';

export interface RemoveAllCourses {
  type: typeof REMOVE_ALL_COURSES_LIST;
}

export type GetCourseServiceActionTypes =
  | GetCourseServicesRequest
  | GetCourseServicesSuccess
  | GetCourseServicesFailure
  | ScheduleCourseFailure
  | ScheduleCourseRequest
  | ScheduleCourseSuccess
  | RemoveAllCourses
  | setCourseSearchTextType;

export type GetFilterDataServiceActionTypes =
  | GetFilterDataServicesRequest
  | GetFilterDataServicesSuccess
  | GetFilterDataServicesFailure;

export type ServiceActionType = GetCourseServiceActionTypes | GetFilterDataServiceActionTypes;
