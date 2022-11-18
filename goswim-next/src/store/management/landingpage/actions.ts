import { Dispatch } from 'redux';
import { LandingPageServiceInstance } from 'src/services/landingpage';
import {} from 'src/store/management/lessons/types';
import {
  GetLandingPageServicesFailure,
  GetLandingPageServicesRequest,
  GetLandingPageServicesSuccess,
  GET_LANDINGPAGE_FAILURE,
  GET_LANDINGPAGE_REQUEST,
  GET_LANDINGPAGE_SUCCESS
} from './types';

export const getLandingPageVideos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetLandingPageServicesRequest>({ type: GET_LANDINGPAGE_REQUEST });
      const response = await LandingPageServiceInstance.getLandingPageVideos();

      dispatch<GetLandingPageServicesSuccess>({
        type: GET_LANDINGPAGE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetLandingPageServicesFailure>({ type: GET_LANDINGPAGE_FAILURE, error });
    }
  };
};
