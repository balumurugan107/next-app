import { HTTPResponse } from 'src/types';
import {
  InitialValues,
  ScheduleObject,
  Slot
} from 'src/views/management/Services/MainView/LiveLessons/FormModel';

export interface LessonServiceState {
  isLoading: boolean;
  error: Error | null;
  lessonData: LessonServiceDocument[];
  filterData: CourseLessonFilterData[];
  favouriteDetails: IFavData;
}

export interface LessonServiceIds {
  serviceId: string;
  scheduleLessonIds: string[];
}

export interface LessonServiceDocument {
  teamName: string;
  lessonDate: number;
  description: string;
  rosterGroup: string[];
  serviceId: string;
  name: string;
  cost: number;
  team: string;
  slots: Slot[];
  schedule: string;
  liveSchedule: ScheduleObject[];
}

export interface LessonServicePayload
  extends Omit<Slot, 'startTime' | 'endTime'>,
    Omit<InitialValues, 'slots' | 'lessonDate'> {
  startTime: number;
  endTime: number;
  lessonDate: number;
}

export interface FavouriteServiceDocument {
  _id: string;
  //position: number;
  name: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  created?: string;
  watched?: boolean;
  tutorial?: boolean;
}

export interface IFavData {
  results: FavouriteServiceDocument[];
  totalCount: number;
}

export const GET_FAVOURITES_REQUEST = '@service/get-favorite-request';
export const GET_FAVOURITES_SUCCESS = '@service/get-favorite-success';
export const GET_FAVOURITES_FAILURE = '@service/get-favorite-failure';
/* Save Lesson Service */
export const SAVE_LESSON_SERVICES_REQUEST = '@service/save-lesson-services-request';
export const SAVE_LESSON_SERVICES_SUCCESS = '@service/save-lesson-services-success';
export const SAVE_LESSON_SERVICES_FAILURE = '@service/save-lesson-services-failure';

export interface SaveLessonServicesRequest {
  type: typeof SAVE_LESSON_SERVICES_REQUEST;
  payload: LessonServicePayload[];
}
export interface SaveLessonServicesSuccess {
  type: typeof SAVE_LESSON_SERVICES_SUCCESS;
  payload: HTTPResponse;
}
export interface SaveLessonServicesFailure {
  type: typeof SAVE_LESSON_SERVICES_FAILURE;
  error: Error;
}

export type SaveLessonServicesActionTypes =
  | SaveLessonServicesRequest
  | SaveLessonServicesSuccess
  | SaveLessonServicesFailure;

/* Get Lesson Service */
export const GET_LESSON_SERVICES_REQUEST = '@service/get-lesson-services-request';
export const GET_LESSON_SERVICES_SUCCESS = '@service/get-lesson-services-success';
export const GET_LESSON_SERVICES_FAILURE = '@service/get-lesson-services-failure';

export interface GetLessonServicesRequest {
  type: typeof GET_LESSON_SERVICES_REQUEST;
}
export interface GetLessonServicesSuccess {
  type: typeof GET_LESSON_SERVICES_SUCCESS;
  payload: HTTPResponse<LessonServiceDocument[]>;
}
export interface GetLessonServicesFailure {
  type: typeof GET_LESSON_SERVICES_FAILURE;
  error: Error;
}

export type GetLessonServiceActionTypes =
  | GetLessonServicesRequest
  | GetLessonServicesSuccess
  | GetLessonServicesFailure;

/* Update Lesson Service */
export const UPDATE_LESSON_SERVICES_REQUEST = '@service/update-lesson-services-request';
export const UPDATE_LESSON_SERVICES_SUCCESS = '@service/update-lesson-services-success';
export const UPDATE_LESSON_SERVICES_FAILURE = '@service/update-lesson-services-failure';

export interface UpdateLessonServicesRequest {
  type: typeof UPDATE_LESSON_SERVICES_REQUEST;
}
export interface UpdateLessonServicesSuccess {
  type: typeof UPDATE_LESSON_SERVICES_SUCCESS;
  payload: HTTPResponse<LessonServiceDocument[]>;
}
export interface UpdateLessonServicesFailure {
  type: typeof UPDATE_LESSON_SERVICES_FAILURE;
  error: Error;
}

export type UpdateLessonServicesActionTypes =
  | UpdateLessonServicesRequest
  | UpdateLessonServicesSuccess
  | UpdateLessonServicesFailure;

/* Delete Lesson Service */
export const DELETE_LESSON_SERVICES_REQUEST = '@service/delete-lesson-services-request';
export const DELETE_LESSON_SERVICES_SUCCESS = '@service/delete-lesson-services-success';
export const DELETE_LESSON_SERVICES_FAILURE = '@service/delete-lesson-services-failure';

export interface DeleteLessonServicesRequest {
  type: typeof DELETE_LESSON_SERVICES_REQUEST;
}
export interface DeleteLessonServicesSuccess {
  type: typeof DELETE_LESSON_SERVICES_SUCCESS;
}
export interface DeleteLessonServicesFailure {
  type: typeof DELETE_LESSON_SERVICES_FAILURE;
  error: Error;
}

export interface GetFavouritesRequest {
  type: typeof GET_FAVOURITES_REQUEST;
}

export interface GetFavouritesSuccess {
  type: typeof GET_FAVOURITES_SUCCESS;
  payload: IFavData;
}

export interface GetFavouritesFailure {
  type: typeof GET_FAVOURITES_FAILURE;
  error: Error;
}
export type DeleteServicesActionTypes =
  | DeleteLessonServicesRequest
  | DeleteLessonServicesSuccess
  | DeleteLessonServicesFailure;

export type ServiceActionType =
  | SaveLessonServicesActionTypes
  | GetLessonServiceActionTypes
  | UpdateLessonServicesActionTypes
  | DeleteServicesActionTypes
  | FilterServiceActionTypes
  | GetFavouritesRequest
  | GetFavouritesSuccess
  | GetFavouritesFailure;

export interface GetLessonFilterDataServicesRequest {
  type: typeof GET_LESSON_FILTER_DATA_REQUEST;
}
export interface GetLessonFilterDataServicesSuccess {
  type: typeof GET_LESSON_FILTER_DATA_SUCCESS;
  payload: CourseLessonFilterData[];
}
export interface GetLessonFilterDataServicesFailure {
  type: typeof GET_LESSON_FILTER_DATA_FAILURE;
  error: Error;
}

export type FilterServiceActionTypes =
  | GetLessonFilterDataServicesRequest
  | GetLessonFilterDataServicesSuccess
  | GetLessonFilterDataServicesFailure;

export interface CourseLessonFilterData {
  stroke: tags;
  expertise: tags;
  tags: tags;
  camera_position: tags;
  anatomy: tags;
}

export interface tags {
  tags: string[];
}

export const GET_LESSON_FILTER_DATA_REQUEST = '@service/get-lesson-filter_data-request';
export const GET_LESSON_FILTER_DATA_SUCCESS = '@service/get-lesson-filter_data-success';
export const GET_LESSON_FILTER_DATA_FAILURE = '@service/get-lesson-filter_data-failure';
