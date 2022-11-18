import { Dispatch } from 'redux';
import {
  SetSubscriptions,
  SET_SUBSCRIPTIONS,
  GetSubscriptionsRequest,
  GET_SUBSCRIPTIONS_REQUEST,
  GetSubscriptionsFailure,
  GET_SUBSCRIPTIONS_FAILURE,
  GetSubscriptionsSuccess,
  GET_SUBSCRIPTIONS_SUCCESS,
  CreateSubscriptionFailure,
  CreateSubscriptionRequest,
  CreateSubscriptionSuccess,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_SUCCESS,
  UpgradeSubscriptionFailure,
  UpgradeSubscriptionRequest,
  UpgradeSubscriptionSuccess,
  UPGRADE_SUBSCRIPTION_FAILURE,
  UPGRADE_SUBSCRIPTION_REQUEST,
  UPGRADE_SUBSCRIPTION_SUCCESS,
  CancelSubscriptionFailure,
  CancelSubscriptionRequest,
  CancelSubscriptionSuccess,
  CANCEL_SUBSCRIPTION_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_SUCCESS,
  GetLatestInvoiceFailure,
  GetLatestInvoiceRequest,
  GetLatestInvoiceSuccess,
  GET_LATEST_INVOICE_FAILURE,
  GET_LATEST_INVOICE_REQUEST,
  GET_LATEST_INVOICE_SUCCESS,
  UPDATE_CARD_REQUEST,
  UpdateCardRequest,
  UPDATE_CARD_FAILURE,
  UpdateCardFailure,
  GET_SAVED_CARD_SUCCESS,
  GetSavedCardSuccess
} from 'src/store/subscriptions/types';
import { revenueCatService } from 'src/services/revenueCat';
import { ISubscriptionDetail } from '../account';
import { apiGetSubscriptionProducts } from 'pages/api/subscriptions';

export const setSubscriptions = (subscriptions: ISubscriptionDetail) => (dispatch: Dispatch) => {
  dispatch<SetSubscriptions>({ type: SET_SUBSCRIPTIONS, payload: subscriptions });
};

export const getSubscriptions = (price?: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetSubscriptionsRequest>({
        type: GET_SUBSCRIPTIONS_REQUEST
      });

      const response = await revenueCatService.getSubscriptions();
      if (price && price > 0) {
        response.data.status = 'active';
        response.data.price = price / 100;
      }
      dispatch<GetSubscriptionsSuccess>({
        type: GET_SUBSCRIPTIONS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetSubscriptionsFailure>({
        type: GET_SUBSCRIPTIONS_FAILURE,
        error
      });
    }
  };
};

export const getSubscriptionProducts = () => {
  return async (dispatch: Dispatch) => {
    apiGetSubscriptionProducts(dispatch);
  };
};

export const createSubscription = (priceId: string | undefined) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CreateSubscriptionRequest>({
        type: CREATE_SUBSCRIPTION_REQUEST
      });

      const response = await revenueCatService.createSubscription(priceId);

      dispatch<CreateSubscriptionSuccess>({
        type: CREATE_SUBSCRIPTION_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<CreateSubscriptionFailure>({
        type: CREATE_SUBSCRIPTION_FAILURE,
        error
      });
    }
  };
};

export const upgradeSubscription = (priceId: string | undefined) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpgradeSubscriptionRequest>({
        type: UPGRADE_SUBSCRIPTION_REQUEST
      });

      const response = await revenueCatService.upgradeSubscription(priceId);

      dispatch<UpgradeSubscriptionSuccess>({
        type: UPGRADE_SUBSCRIPTION_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<UpgradeSubscriptionFailure>({
        type: UPGRADE_SUBSCRIPTION_FAILURE,
        error
      });
    }
  };
};

export const cancelSubscription = (cancel_at_period_end: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<CancelSubscriptionRequest>({
        type: CANCEL_SUBSCRIPTION_REQUEST
      });

      await revenueCatService.cancelSubscription(cancel_at_period_end);

      dispatch<CancelSubscriptionSuccess>({
        type: CANCEL_SUBSCRIPTION_SUCCESS
      });
    } catch (error) {
      dispatch<CancelSubscriptionFailure>({
        type: CANCEL_SUBSCRIPTION_FAILURE,
        error
      });
    }
  };
};

export const getLatestInvoice = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<GetLatestInvoiceRequest>({
        type: GET_LATEST_INVOICE_REQUEST
      });

      const response = await revenueCatService.getLatestInvoice();

      dispatch<GetLatestInvoiceSuccess>({
        type: GET_LATEST_INVOICE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<GetLatestInvoiceFailure>({
        type: GET_LATEST_INVOICE_FAILURE,
        error
      });
    }
  };
};

export const updateCard = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateCardRequest>({
        type: UPDATE_CARD_REQUEST
      });

      await revenueCatService.updateCard();

      // dispatch<UpdateCardSuccess>({
      //   type: UPDATE_CARD_SUCCESS
      // });
    } catch (error) {
      dispatch<UpdateCardFailure>({
        type: UPDATE_CARD_FAILURE,
        error
      });
    }
  };
};
export const getSavedCards = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<UpdateCardRequest>({
        type: UPDATE_CARD_REQUEST
      });
      const response = await revenueCatService.savedCards();
      dispatch<GetSavedCardSuccess>({
        type: GET_SAVED_CARD_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch<UpdateCardFailure>({
        type: UPDATE_CARD_FAILURE,
        error
      });
    }
  };
};
