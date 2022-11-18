import { Dispatch } from "redux";
import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from "../../../src/store/account/types";
import { profileServiceInstance } from "../../../src/services/account/profileService";


export const apiGetProfile = async (dispatch: Dispatch, user: any) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    const user = await profileServiceInstance.getProfile();
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: {
        user
      }
    });
  } catch (error: any) {
    dispatch({ type: GET_PROFILE_FAILURE });
    throw error;
  }
}