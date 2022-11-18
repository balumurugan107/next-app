import { Dispatch } from "redux";
import { LessonServiceInstance } from "src/services/lesson";
import { GetFavouritesRequest, GET_FAVOURITES_REQUEST, GetFavouritesSuccess, GET_FAVOURITES_SUCCESS, GetFavouritesFailure, GET_FAVOURITES_FAILURE } from "src/store/management/lessons";




export const apiGetFavourites = async (dispatch: Dispatch) => {
  try {
    dispatch<GetFavouritesRequest>({ type: GET_FAVOURITES_REQUEST });
    const response = await LessonServiceInstance.getFavourites();

    dispatch<GetFavouritesSuccess>({
      type: GET_FAVOURITES_SUCCESS,
      payload: response.data
    });
  } catch (error: any) {
    dispatch<GetFavouritesFailure>({ type: GET_FAVOURITES_FAILURE, error });
  }
}