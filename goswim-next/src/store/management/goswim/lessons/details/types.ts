export interface LessonDetailsState {
  isLoading: boolean;
  error: Error | null;
  lessonScheduled: boolean;
  lessonScheduledUpdated: boolean;
  lessonDetails: LessonDetailsDocument | null;
  todaysLesson: LessonDetailsDocument[] | null;
  isDeleted: boolean;
  isUpdateFailed: boolean;
  isFavorite: boolean;
  relatedLessons: IRelatedLessonsRes;
}

export interface IRelatedLessonsRes {
  results: relatedLessonsDocument[] | null;
  totalCount: number;
  pageNumber?: number;
}

export interface LessonDetailsDocument {
  _id: string;
  position?: number;
  name: string;
  description?: string;
  updated?: string;
  completed?: string;
  favorites_count?: number;
  favourite: boolean;
  subtitle?: string;
  publish_at?: string;
  thumbnailUrl?: string;
  created?: string;
  tags?: string[];
  videoUrl?: string;
  teamName?: string;
  message?: string;
}

export interface ScheduleRequestObj {
  lesson_id: string | undefined;
  schedule_on_timestamp: number | undefined;
  message: string | undefined;
  team_id: string;
  tz: string;
}
export interface relatedLessonsDocument {
  _id: string;
  name: string;
  description?: string;
  thumbnailUrl: string;
  //lessons: string;
  created: string;
}
export interface UpdateScheduleRequestObj {
  message?: string | undefined;
  lesson_id: string | undefined;
  schedule_id?: string | undefined;
  _id?: string | undefined;
  schedule_on_timestamp: number | undefined;
  team_id: string;
  tz: string;
  isDragged?: boolean;
}

export interface lessonID {
  lesson_id: string;
}
/* Get Lesson Details */
export const GET_LESSON_DETAILS_REQUEST = '@service/get-Lesson-details-request';
export const GET_LESSON_DETAILS_SUCCESS = '@service/get-Lesson-details-success';
export const GET_LESSON_DETAILS_FAILURE = '@service/get-Lesson-details-failure';

/* Get Lesson Details */
export const POST_LESSON_DETAILS_REQUEST = '@service/post-Lesson-details-request';
export const POST_LESSON_DETAILS_SUCCESS = '@service/post-Lesson-details-success';
export const POST_LESSON_DETAILS_FAILURE = '@service/post-Lesson-details-failure';

/* Schedule lessons */
export const SCHEDULE_LESSON_REQUEST = '@service/schedule-Lesson-request';
export const SCHEDULE_LESSON_SUCCESS = '@service/schedule-Lesson-success';
export const SCHEDULE_LESSON_FAILURE = '@service/schedule-Lesson-failure';

/* Update Schedule lessons */
export const UPDATE_SCHEDULE_LESSON_REQUEST = '@service/update-schedule-Lesson-request';
export const UPDATE_SCHEDULE_LESSON_SUCCESS = '@service/update-schedule-Lesson-success';
export const UPDATE_SCHEDULE_LESSON_DRAG_SUCCESS = '@service/update-schedule-Lesson-drag-success';
export const UPDATE_SCHEDULE_LESSON_FAILURE = '@service/update-schedule-Lesson-failure';

export const DELETE_SCHEDULE_LESSON_REQUEST = '@service/delete-schedule-Lesson-request';
export const DELETE_SCHEDULE_LESSON_SUCCESS = '@service/delete-schedule-Lesson-success';
export const DELETE_SCHEDULE_LESSON_FAILURE = '@service/delete-schedule-Lesson-failure';

export const GET_TODAYS_LESSON_REQUEST = '@service/get-Todays-lesson-request';
export const GET_TODAYS_LESSON_SUCCESS = '@service/get-Todays-lesson-success';
export const GET_TODAYS_LESSON_FAILURE = '@service/get-Todays-lesson-failure';

export const SAVE_FAVORITE_SERVICES_REQUEST = '@service/save-favorite-services-request';
export const SAVE_FAVORITE_SERVICES_SUCCESS = '@service/save-favorite-services-success';
export const SAVE_FAVORITE_SERVICES_FAILURE = '@service/save-favorite-services-failure';

export const DELETE_FAVORITE_SERVICES_REQUEST = '@service/delete-favorite-services-request';
export const DELETE_FAVORITE_SERVICES_SUCCESS = '@service/delete-favorite-services-success';
export const DELETE_FAVORITE_SERVICES_FAILURE = '@service/delete-favorite-services-failure';

/* Get Related Lesson Details */
export const GET_RELATED_LESSONS_REQUEST = '@service/get-related-lessons-request';
export const GET_RELATED_LESSONS_SUCCESS = '@service/get-related-lessons-success';
export const GET_RELATED_LESSONS_FAILURE = '@service/get-related-lessons-failure';

// lessonScheduledUpdated
export const UPDATE_SCHEDULED_UPDATED_SUCCESS = '@service/update-scheduled-updated-success';

export interface GetLessonDetailssRequest {
  type: typeof GET_LESSON_DETAILS_REQUEST;
}
export interface GetTodaysLessonRequest {
  type: typeof GET_TODAYS_LESSON_REQUEST;
}

export interface GetTodaysLessonSuccess {
  type: typeof GET_TODAYS_LESSON_SUCCESS;
  payload: LessonDetailsDocument[] | null;
}

export interface GetTodaysLessonFailure {
  type: typeof GET_TODAYS_LESSON_FAILURE;
  error: Error;
}
export interface GetLessonDetailssSuccess {
  type: typeof GET_LESSON_DETAILS_SUCCESS;
  payload: LessonDetailsDocument;
}
export interface GetLessonDetailssFailure {
  type: typeof GET_LESSON_DETAILS_FAILURE;
  error: Error;
}

export interface ScheduleLessonRequest {
  type: typeof SCHEDULE_LESSON_REQUEST;
}

export interface ScheduleLessonSuccess {
  type: typeof SCHEDULE_LESSON_SUCCESS;
  payload: LessonDetailsDocument;
}
export interface ScheduleLessonFailure {
  type: typeof SCHEDULE_LESSON_FAILURE;
  error: Error;
}

export interface UpdateScheduleLessonRequest {
  type: typeof UPDATE_SCHEDULE_LESSON_REQUEST;
}

export interface UpdateScheduleLessonSuccess {
  type: typeof UPDATE_SCHEDULE_LESSON_SUCCESS;
  // payload: null;
}
export interface UpdateScheduleLessonDragSuccess {
  type: typeof UPDATE_SCHEDULE_LESSON_DRAG_SUCCESS;
  // payload: null;
}
export interface UpdateScheduleLessonFailure {
  type: typeof UPDATE_SCHEDULE_LESSON_FAILURE;
  error: Error;
}

export interface DeleteScheduleLessonRequest {
  type: typeof DELETE_SCHEDULE_LESSON_REQUEST;
}

export interface DeleteScheduleLessonSuccess {
  type: typeof DELETE_SCHEDULE_LESSON_SUCCESS;
}
export interface DeleteScheduleLessonFailure {
  type: typeof DELETE_SCHEDULE_LESSON_FAILURE;
  error: Error;
}

export interface PostLessonDetailsRequest {
  type: typeof POST_LESSON_DETAILS_REQUEST;
}
export interface PostLessonDetailsSuccess {
  type: typeof POST_LESSON_DETAILS_SUCCESS;
  payload: LessonDetailsDocument;
}
export interface PostLessonDetailsFailure {
  type: typeof POST_LESSON_DETAILS_FAILURE;
  error: Error;
}

export interface SaveFavoriteServicesRequest {
  type: typeof SAVE_FAVORITE_SERVICES_REQUEST;
}
export interface SaveFavoriteServicesSuccess {
  type: typeof SAVE_FAVORITE_SERVICES_SUCCESS;
}

export interface SaveFavoriteServicesFailure {
  type: typeof SAVE_FAVORITE_SERVICES_FAILURE;
  error: Error;
}

export interface DeleteFavoriteRequest {
  type: typeof DELETE_FAVORITE_SERVICES_REQUEST;
}
export interface DeleteFavoriteSuccess {
  type: typeof DELETE_FAVORITE_SERVICES_SUCCESS;
}

export interface DeleteFavoriteFailure {
  type: typeof DELETE_FAVORITE_SERVICES_FAILURE;
  error: Error;
}

export const REMOVE_LESSON_DETAIL = '@service/remove-lesson-detail';

export interface RemoveLessonDetail {
  type: typeof REMOVE_LESSON_DETAIL;
}

export interface GetRelatedLessonsRequest {
  type: typeof GET_RELATED_LESSONS_REQUEST;
}
export interface UpdateScheduledUpdatedSuccess {
  type: typeof UPDATE_SCHEDULED_UPDATED_SUCCESS;
}

export interface GetRelatedLessonsSuccess {
  type: typeof GET_RELATED_LESSONS_SUCCESS;
  payload: IRelatedLessonsRes;
}

export interface GetRelatedLessonsFailure {
  type: typeof GET_RELATED_LESSONS_FAILURE;
  error: Error;
}

export type GetLessonDetailsActionTypes =
  | GetLessonDetailssRequest
  | GetLessonDetailssSuccess
  | GetLessonDetailssFailure
  | PostLessonDetailsRequest
  | PostLessonDetailsSuccess
  | PostLessonDetailsFailure
  | ScheduleLessonRequest
  | ScheduleLessonSuccess
  | ScheduleLessonFailure
  | GetTodaysLessonRequest
  | GetTodaysLessonSuccess
  | GetTodaysLessonFailure
  | DeleteScheduleLessonRequest
  | DeleteScheduleLessonSuccess
  | DeleteScheduleLessonFailure
  | UpdateScheduleLessonRequest
  | UpdateScheduleLessonSuccess
  | UpdateScheduleLessonFailure
  | UpdateScheduleLessonDragSuccess
  | SaveFavoriteServicesRequest
  | SaveFavoriteServicesSuccess
  | SaveFavoriteServicesFailure
  | DeleteFavoriteRequest
  | DeleteFavoriteSuccess
  | DeleteFavoriteFailure
  | RemoveLessonDetail
  | GetRelatedLessonsRequest
  | GetRelatedLessonsSuccess
  | GetRelatedLessonsFailure
  | UpdateScheduledUpdatedSuccess;

export type DetailsActionType = GetLessonDetailsActionTypes;
