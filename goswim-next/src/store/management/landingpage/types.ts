export interface LandingPageState {
  isLoading: boolean;
  result: string[] | [];
  error: Error | null;
}
export const GET_LANDINGPAGE_REQUEST = '@service/get-landingpage-request';
export const GET_LANDINGPAGE_SUCCESS = '@service/get-landingpage-success';
export const GET_LANDINGPAGE_FAILURE = '@service/get-landingpage-failure';

export interface GetLandingPageServicesRequest {
  type: typeof GET_LANDINGPAGE_REQUEST;
}
export interface GetLandingPageServicesSuccess {
  type: typeof GET_LANDINGPAGE_SUCCESS;
  payload: string[];
}
export interface GetLandingPageServicesFailure {
  type: typeof GET_LANDINGPAGE_FAILURE;
  error: Error;
}

export type GetLandingPageServicesActionTypes =
  | GetLandingPageServicesRequest
  | GetLandingPageServicesSuccess
  | GetLandingPageServicesFailure;

export type GetLandingPageServiceActionType = GetLandingPageServicesActionTypes;
