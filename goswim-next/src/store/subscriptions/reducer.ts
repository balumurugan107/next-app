import produce from 'immer';
import {
  SET_SUBSCRIPTIONS,
  SubscriptionState,
  SubscriptionActionTypes,
  GET_SUBSCRIPTIONS_REQUEST,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_FAILURE,
  GET_SUBSCRIPTION_PRODUCT_FAILURE,
  GET_SUBSCRIPTION_PRODUCT_REQUEST,
  CREATE_SUBSCRIPTION_REQUEST,
  UPGRADE_SUBSCRIPTION_FAILURE,
  UPGRADE_SUBSCRIPTION_REQUEST,
  UPGRADE_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_SUCCESS,
  GET_LATEST_INVOICE_FAILURE,
  GET_LATEST_INVOICE_REQUEST,
  GET_LATEST_INVOICE_SUCCESS,
  GET_SAVED_CARD_REQUEST,
  GET_SAVED_CARD_SUCCESS,
  GET_SAVED_CARD_FAILURE,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE
} from 'src/store/subscriptions/types';
import {
  CANCEL_SUBSCRIPTION_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_PRODUCT_SUCCESS
} from '.';

const intialState: SubscriptionState = {
  data: null,
  productData: [],
  subscriptionData: null,
  error: null,
  isSubscribed: false,
  isSubscriptionUpgraded: false,
  isSubscriptionMaxUpgraded: false,
  isSubscriptionCancelled: false,
  isLoading: false,
  savedCards: []
};

export const subscriptionReducer = (state = intialState, action: SubscriptionActionTypes) => {
  switch (action.type) {
    case SET_SUBSCRIPTIONS:
      return produce(state, draft => {
        draft.data = action.payload;
      });

    case GET_SUBSCRIPTIONS_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
      });
    }

    case GET_SUBSCRIPTIONS_SUCCESS: {
      return produce(state, draft => {
        draft.data = action.payload;
        draft.error = null;
        draft.isLoading = false;
        draft.isSubscriptionUpgraded = false;
        draft.subscriptionData = null;
      });
    }

    case GET_SUBSCRIPTIONS_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
        draft.isSubscriptionUpgraded = false;
      });
    }

    case GET_SUBSCRIPTION_PRODUCT_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
      });
    }

    case GET_SUBSCRIPTION_PRODUCT_SUCCESS: {
      return produce(state, draft => {
        draft.productData = action.payload;
        draft.error = null;
        draft.isLoading = false;
      });
    }

    case GET_SUBSCRIPTION_PRODUCT_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
      });
    }

    case CREATE_SUBSCRIPTION_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
        draft.subscriptionData = null;
      });
    }

    case CREATE_SUBSCRIPTION_SUCCESS: {
      return produce(state, draft => {
        if (action.payload.clientSecret || action.payload.setupIntentClientSecret)
          draft.subscriptionData = action.payload;
        draft.error = null;
        draft.isLoading = false;
      });
    }

    case CREATE_SUBSCRIPTION_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
      });
    }

    case UPGRADE_SUBSCRIPTION_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
        draft.subscriptionData = null;
        draft.isSubscriptionUpgraded = false;
      });
    }

    case UPGRADE_SUBSCRIPTION_SUCCESS: {
      return produce(state, draft => {
        if (action.payload?.clientSecret) draft.subscriptionData = action.payload;
        draft.error = null;
        draft.isLoading = false;
        if (action.payload?.clientSecret === undefined || action.payload?.clientSecret === null)
          draft.isSubscriptionUpgraded = true;
      });
    }

    case UPGRADE_SUBSCRIPTION_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isSubscriptionUpgraded = false;
        draft.isLoading = false;
      });
    }

    case CANCEL_SUBSCRIPTION_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.isSubscriptionCancelled = false;
      });
    }

    case CANCEL_SUBSCRIPTION_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isSubscriptionCancelled = true;
      });
    }

    case CANCEL_SUBSCRIPTION_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isSubscriptionCancelled = true;
      });
    }

    case GET_LATEST_INVOICE_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
        draft.subscriptionData = null;
      });
    }

    case GET_LATEST_INVOICE_SUCCESS: {
      return produce(state, draft => {
        if (action.payload.clientSecret || action.payload.setupIntentClientSecret)
          draft.subscriptionData = action.payload;
        draft.error = null;
        draft.isLoading = false;
      });
    }

    case GET_LATEST_INVOICE_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isLoading = false;
      });
    }
    case GET_SAVED_CARD_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case GET_SAVED_CARD_SUCCESS: {
      return produce(state, draft => {
        draft.savedCards = action.payload;
      });
    }
    case GET_SAVED_CARD_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
      });
    }
    case UPDATE_CARD_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case UPDATE_CARD_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case UPDATE_CARD_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.error = action.error;
      });
    }
    case UPDATE_CARD_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }

    default:
      return state;
  }
};
