export interface CourseDetailServiceState {
  isLoading: boolean;
  error: Error | null;
  courseDetails: CourseResult | null;
  searchText: string | null;
  lessons: LessonsResult;
  lessonWeeklyTheme: LessonServiceDocument[];
  lessonWeeklyThemeCount: number;
}

export interface LessonsServiceState {
  isLoading: boolean;
  error: Error | null;
  results: LessonsResult;
}
export interface CourseDetailDocument {
  _id: string;
  position: number;
  name: string;
  thumbnail_url: string;
  created: string;
  lessons_count: number;
  description: string;
  lessons: LessonsResult;
}

export interface LessonServiceDocument {
  _id: string;
  //position: number;
  key?: number;
  name: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  created?: string;
  watched?: boolean;
  tutorial?: boolean;
}

export interface LessonsResult {
  results: LessonServiceDocument[];
  adminResults: LessonServiceDocument[];
  totalCount: number;
  pageNumber?: number | string;
}
export interface CourseResult {
  id: number;
  name: string;
  description: string;
  lessons_count: string;
  created: string;
  thumbnailUrl: string;
  lessonsList: LessonServiceDocument[];
  // lessons: any;
}
export interface IAllLesson {
  _id: string;
  name: string;
}
export interface lessonName {
  lessonName: any;
}
/* Get Lesson Service */
export const GET_LESSON_LIST_SERVICE_REQUEST = '@service/get-Lesson-list-service-request';
export const GET_LESSON_LIST_SERVICE_SUCCESS = '@service/get-Lesson-list-service-success';
export const GET_LESSON_LIST_SERVICE_FAILURE = '@service/get-Lesson-list-service-failure';
export const REMOVE_ALL_LESSON_LIST = '@service/remove-all-lesson-list';

/* Get Lesson Service */
export const GET_COURSE_DETAIL_SERVICE_REQUEST = '@service/get-course-detail-service-request';
export const GET_COURSE_DETAIL_SERVICE_SUCCESS = '@service/get-course-detail-service-success';
export const GET_COURSE_DETAIL_SERVICE_FAILURE = '@service/get-course-detail-service-failure';

export const GET_LESSON_WEEKLYTHEME_SERVICE_REQUEST =
  '@service/get-lesson-weeklytheme-service-request';
export const GET_LESSON_WEEKLYTHEME_SERVICE_SUCCESS =
  '@service/get-lesson-weeklytheme-service-success';
export const GET_LESSON_WEEKLYTHEME_SERVICE_FAILURE =
  '@service/get-lesson-weeklytheme-service-failure';

export interface GetLessonWeeklyThemeServiceRequest {
  type: typeof GET_LESSON_WEEKLYTHEME_SERVICE_REQUEST;
}
export interface GetLessonWeeklyThemeServiceSuccess {
  type: typeof GET_LESSON_WEEKLYTHEME_SERVICE_SUCCESS;
  payload: LessonsResult;
}

export interface GetLessonWeeklyThemeServiceFailure {
  type: typeof GET_LESSON_WEEKLYTHEME_SERVICE_FAILURE;
}

export interface GetLessonListServiceRequest {
  type: typeof GET_LESSON_LIST_SERVICE_REQUEST;
}
export interface GetLessonListServiceSuccess {
  type: typeof GET_LESSON_LIST_SERVICE_SUCCESS;
  payload: LessonsResult;
}

export interface RemoveALlLessons {
  type: typeof REMOVE_ALL_LESSON_LIST;
}
export interface GetLessonListServiceFailure {
  type: typeof GET_LESSON_LIST_SERVICE_FAILURE;
  error: Error;
}

export interface GetCourseDetailServiceRequest {
  type: typeof GET_COURSE_DETAIL_SERVICE_REQUEST;
}
export interface GetCourseDetailServiceSuccess {
  type: typeof GET_COURSE_DETAIL_SERVICE_SUCCESS;
  payload: CourseResult;
}
export interface GetCourseDetailServiceFailure {
  type: typeof GET_COURSE_DETAIL_SERVICE_FAILURE;
  error: Error;
}

export interface setLessonSearchTextType {
  type: typeof SET_LESSON_SEARCH_TEXT;
  payload: LessonSearchText;
}
export interface LessonSearchText {
  text: string | null;
}

export const SET_LESSON_SEARCH_TEXT = '@service/set_lesson_search_text';

export type GetLessonListServiceActionTypes =
  | GetLessonListServiceRequest
  | GetLessonListServiceSuccess
  | GetLessonListServiceFailure
  | GetCourseDetailServiceRequest
  | GetCourseDetailServiceSuccess
  | GetCourseDetailServiceFailure
  | RemoveALlLessons
  | setLessonSearchTextType
  | GetLessonWeeklyThemeServiceRequest
  | GetLessonWeeklyThemeServiceSuccess
  | GetLessonWeeklyThemeServiceFailure;

export type ServiceActionType = GetLessonListServiceActionTypes;
