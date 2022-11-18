import { Dispatch } from 'redux';
import { profileServiceInstance } from 'src/services/account/profileService';
import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from 'src/store/account';

export const apiGetUserProfile = async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    const user = await profileServiceInstance.getProfile();

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: {
        user
      }
    });
  } catch (error:any) {
    dispatch({ type: GET_PROFILE_FAILURE });
    throw error;
  }
};
