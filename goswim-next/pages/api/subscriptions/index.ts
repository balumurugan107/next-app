import { Dispatch } from "redux";
import { revenueCatService } from "src/services/revenueCat";
import {
  GetSubscriptionProductsRequest, GET_SUBSCRIPTION_PRODUCT_REQUEST,
  GetSubscriptionProductsSuccess, GET_SUBSCRIPTION_PRODUCT_SUCCESS,
  GetSubscriptionProductsFailure, GET_SUBSCRIPTION_PRODUCT_FAILURE
} from "src/store/subscriptions";


export const apiGetSubscriptionProducts = async (dispatch: Dispatch) => {
  try {
    dispatch<GetSubscriptionProductsRequest>({
      type: GET_SUBSCRIPTION_PRODUCT_REQUEST
    });
    const response = await revenueCatService.getSubscriptionProducts();
    dispatch<GetSubscriptionProductsSuccess>({
      type: GET_SUBSCRIPTION_PRODUCT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch<GetSubscriptionProductsFailure>({
      type: GET_SUBSCRIPTION_PRODUCT_FAILURE,
      error
    });
  }
}