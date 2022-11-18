/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ACCESS_TOKEN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SILENT_LOGIN,
  AccountState,
  UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_STATUS,
  UPDATE_CURRENT_TAB,
  AccountActionType,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST
} from 'src/store/account';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAILURE,
  ACTIVATE_ROUTES,
  DEACTIVATE_ROUTES,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_REQUEST,
  SAVE_SETTINGS_FAILURE,
  IS_SUBSCRIPTION_EXPIRED,
  UPLOAD_PROFILE_IMG_TO_S3_FAILURE,
  UPLOAD_PROFILE_IMG_TO_S3_REQUEST,
  UPLOAD_PROFILE_IMG_TO_S3_SUCCESS
} from 'src/store/account/types';
import {
  AccountType,
  adminRoutes,
  DateFormat,
  hideRoutesEvaluators,
  hideRoutesSwimmer,
  subscriptionRoutes
} from 'src/constants';
import { GET_SUBSCRIPTIONS_SUCCESS } from 'src/store/subscriptions';
import { defaultInitialValues } from 'src/views/pages/AccountView/Settings/FormModel';
import {
  GOSWIM_CHANGE_PASSWORD_FAILURE,
  GOSWIM_CHANGE_PASSWORD_REQUEST,
  GOSWIM_CHANGE_PASSWORD_SUCCESS,
  GOSWIM_COOKIE_ACCEPT,
  GOSWIM_FORGET_PASSWORD_FAILURE,
  GOSWIM_FORGET_PASSWORD_REQUEST,
  GOSWIM_FORGET_PASSWORD_SUCCESS,
  GOSWIM_SIGN_IN_FAILURE,
  GOSWIM_SIGN_IN_REQUEST,
  GOSWIM_SIGN_IN_SUCCESS,
  GOSWIM_ADMIN_SIGN_IN_FAILURE,
  GOSWIM_ADMIN_SIGN_IN_REQUEST,
  GOSWIM_ADMIN_SIGN_IN_SUCCESS,
  GOSWIM_SIGN_UP_FAILURE,
  GOSWIM_SIGN_UP_REQUEST,
  GOSWIM_SIGN_UP_SUCCESS
} from '../goswim/account';
import moment from 'moment';
import jsCookie from 'js-cookie';
import {
  gsSubscriptionKey,
  gsSubscriptionValue,
  gsTimezoneValue,
  gsTokenKey,
  gsUserRole,
  gsUserTypeEnum,
  gsUserTypeKeyEnum
} from 'src/_constant';
/**
 * @since 09/06/2020
 * @description added timestamp to restrict download the profile image from three to one
 */
const initialState: AccountState = {
  user: null,
  token: null,
  isLoading: false,
  isProfileUpdating: false,
  isLoadingSignIn: false,
  isSignedIn: false,
  isAuthenticated: false,
  isSubscribed: false,
  isSubscriptionExpired: false,
  isProfileLoaded: true,
  currentTab: 'general',
  message: '',
  error: null,
  isSubmitting: false,
  isProfileUpdated: false,
  isSettingsUpdated: false,
  isPasswordChanged: false,
  lastUpdatedPictureTimestamp: 0,
  disabledRoutes: [...subscriptionRoutes],
  hideRoutesNavigation: [],
  settings: defaultInitialValues,
  isSignedUp: false,
  profileImg: null,
  attempt: 0,
  isCookieAccepted: false
};

export const accountReducer = (state = initialState, action: AccountActionType) => {
  switch (action.type) {
    case GOSWIM_SIGN_UP_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isLoadingSignIn = true;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = null;
      });
    }

    case GOSWIM_SIGN_UP_SUCCESS: {
      const { user, token } = action.payload;
      return produce(state, draft => {
        draft.user = user;
        draft.token = token;
        draft.isSignedUp = false;
        draft.isLoading = false;
        draft.isLoadingSignIn = false;
        draft.isAuthenticated = true;
        draft.isProfileLoaded = false;
        draft.lastUpdatedPictureTimestamp = Date.now();
        draft.error = null;
      });
    }

    case GOSWIM_SIGN_UP_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isLoadingSignIn = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = action.payload;
      });
    }

    case LOGIN_REQUEST: {
      return produce(state, draft => {
        draft.user = null;
        draft.isLoading = true;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = null;
      });
    }

    case LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      return produce(state, draft => {
        draft.user = user;
        if (!draft.user.user_app_id) draft.user.user_app_id = user._id; //this line is needed for now
        draft.token = token;
        draft.isLoading = false;
        draft.isAuthenticated = true;
        draft.isProfileLoaded = false;
        draft.lastUpdatedPictureTimestamp = Date.now();
        draft.error = null;
        draft.settings = defaultInitialValues;
        if (user.settings) draft.settings = user.settings || defaultInitialValues;
        if (!draft.settings.dateFormat) {
          draft.settings.dateFormat = DateFormat.MONTHDATE;
        }
        if (!draft.settings.timeZone) {
          draft.settings.timeZone = moment.tz.guess();
        }
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = action.payload;
      });
    }

    case GOSWIM_SIGN_IN_REQUEST: {
      return produce(state, draft => {
        draft.user = null;
        draft.isLoading = false;
        draft.isLoadingSignIn = true;
        draft.isSignedIn = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = null;
      });
    }

    case GOSWIM_SIGN_IN_SUCCESS: {
      const { user, token } = action.payload;
      return produce(state, draft => {
        draft.user = user;
        if (!draft.user.user_app_id) draft.user.user_app_id = user._id; //this line is needed for now
        draft.token = token;
        draft.isLoading = false;
        draft.isSignedIn = true;
        draft.isLoadingSignIn = false;
        draft.isAuthenticated = true;
        draft.isProfileLoaded = false;
        draft.lastUpdatedPictureTimestamp = Date.now();
        draft.error = null;
        draft.settings = defaultInitialValues;
        if (user.settings) draft.settings = user.settings || defaultInitialValues;
        if (user?.isGoswimFreeUser && user?.freeUserValidTill >= Date.now()) {
          draft.isSubscribed = true;
        }
        if (!draft.settings.dateFormat) {
          draft.settings.dateFormat = DateFormat.MONTHDATE;
        }
        if (!draft.settings.timeZone) {
          draft.settings.timeZone = moment.tz.guess();
        }
        jsCookie.set(gsTimezoneValue, draft.settings.timeZone);
        if (draft.user.role === AccountType.SWIMMER)
          jsCookie.set(gsUserRole, gsUserTypeKeyEnum.SWIMMER);
        else if (draft.user.role === AccountType.COACH)
          jsCookie.set(gsUserRole, gsUserTypeKeyEnum.COACH);
        else if (draft.user.role === AccountType.ADMIN)
          jsCookie.set(gsUserRole, gsUserTypeKeyEnum.ADMIN);
      });
    }

    case GOSWIM_SIGN_IN_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isLoadingSignIn = false;
        draft.isSignedIn = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = action.payload;
      });
    }
    case GOSWIM_ADMIN_SIGN_IN_REQUEST: {
      return produce(state, draft => {
        draft.user = null;
        draft.isLoading = false;
        draft.isLoadingSignIn = true;
        draft.isSignedIn = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = null;
      });
    }

    case GOSWIM_ADMIN_SIGN_IN_SUCCESS: {
      const { user, token } = action.payload;
      return produce(state, draft => {
        draft.user = user;
        if (!draft.user.user_app_id) draft.user.user_app_id = user._id; //this line is needed for now
        draft.token = token;
        draft.isLoading = false;
        draft.isSignedIn = true;
        draft.isLoadingSignIn = false;
        draft.isAuthenticated = true;
        draft.isProfileLoaded = false;
        draft.lastUpdatedPictureTimestamp = Date.now();
        draft.error = null;
        draft.settings = defaultInitialValues;
        if (user.settings) draft.settings = user.settings || defaultInitialValues;
        if (user?.isGoswimFreeUser && user?.freeUserValidTill >= Date.now()) {
          draft.isSubscribed = true;
        }
        if (!draft.settings.dateFormat) {
          draft.settings.dateFormat = DateFormat.MONTHDATE;
        }
        if (!draft.settings.timeZone) {
          draft.settings.timeZone = moment.tz.guess();
        }
      });
    }

    case GOSWIM_ADMIN_SIGN_IN_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isLoadingSignIn = false;
        draft.isSignedIn = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = action.payload;
      });
    }

    case GOSWIM_FORGET_PASSWORD_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
      });
    }

    case GOSWIM_FORGET_PASSWORD_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GOSWIM_FORGET_PASSWORD_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }

    case GOSWIM_CHANGE_PASSWORD_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isLoading = true;
        draft.isPasswordChanged = false;
      });
    }

    case GOSWIM_CHANGE_PASSWORD_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isPasswordChanged = true;
      });
    }

    case GOSWIM_CHANGE_PASSWORD_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.isPasswordChanged = false;
      });
    }

    case ACCESS_TOKEN_SUCCESS: {
      const { token } = action.payload;
      jsCookie.set(gsTokenKey, token);

      return produce(state, draft => {
        draft.token = token;
        draft.user = null;
        draft.isSubscribed = false;
      });
    }

    case SIGNUP_REQUEST: {
      return produce(state, draft => {
        draft.user = null;
        draft.isLoading = true;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = null;
      });
    }

    case SIGNUP_SUCCESS: {
      const { user } = action.payload;
      return produce(state, draft => {
        draft.user = user;
        if (!draft.user.user_app_id) draft.user.user_app_id = user._id; //this line is needed for now
        draft.isLoading = false;
        draft.isAuthenticated = false;
        draft.isProfileLoaded = false;
        draft.lastUpdatedPictureTimestamp = Date.now();
        draft.error = null;
        draft.settings = defaultInitialValues;
        if (user.settings) draft.settings = user.settings || defaultInitialValues;
        if (!draft.settings.dateFormat) {
          draft.settings.dateFormat = DateFormat.MONTHDATE;
        }
        if (!draft.settings.timeZone) {
          draft.settings.timeZone = moment.tz.guess();
        }
      });
    }

    case SIGNUP_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.lastUpdatedPictureTimestamp = 0;
        draft.error = action.payload;
      });
    }

    case LOGOUT: {
      return produce(state, draft => {
        draft.user = null;
        draft.isAuthenticated = false;
        draft.isProfileLoaded = true;
        draft.isSubscribed = false;
        draft.token = null;
        draft.lastUpdatedPictureTimestamp = 0;
      });
    }

    case SILENT_LOGIN: {
      const { user } = action.payload;
      return produce(state, draft => {
        draft.user = user;
        if (!draft.user.user_app_id) draft.user.user_app_id = user._id; //this line is needed for now
        draft.isProfileLoaded = false;
      });
    }

    case UPDATE_PROFILE_REQUEST: {
      return produce(state, draft => {
        draft.isProfileUpdating = true;
        draft.error = null;
        draft.isSubmitting = true;
        draft.isProfileUpdated = false;
        draft.message = '';
      });
    }

    case UPDATE_PROFILE_SUCCESS: {
      return produce(state, draft => {
        draft.isProfileUpdating = false;
        draft.user = action.payload.user.data;
        if (!draft.user.user_app_id) draft.user.user_app_id = action.payload.user.data._id; //this line is needed for now
        draft.error = null;
        draft.message = action.payload.user.message;
        draft.isSubmitting = false;
        draft.isProfileUpdated = true;
        draft.lastUpdatedPictureTimestamp = Date.now();
      });
    }

    case UPDATE_PROFILE_FAILURE: {
      return produce(state, draft => {
        draft.isProfileUpdating = false;
        draft.error = action.payload;
        draft.isSubmitting = false;
        draft.isProfileUpdated = false;
      });
    }

    case UPDATE_PROFILE_STATUS: {
      return produce(state, draft => {
        draft.isProfileLoaded = true;
      });
    }

    case GET_PROFILE_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
      });
    }

    case GET_PROFILE_SUCCESS: {
      return produce(state, draft => {
        draft.user = action.payload.user.data;
        draft.settings = defaultInitialValues;
        if (action.payload.user.data.settings)
          draft.settings = action.payload.user.data.settings || defaultInitialValues;
        if (!draft.settings.dateFormat) {
          draft.settings.dateFormat = DateFormat.MONTHDATE;
        }
        if (!draft.settings.timeZone) {
          draft.settings.timeZone = moment.tz.guess();
        }
        if (!draft.user.user_app_id) draft.user.user_app_id = action.payload.user.data._id; //this line is needed for now
        draft.isProfileLoaded = true;
        if (draft.user.role === AccountType.SWIMMER)
          jsCookie.set(gsUserTypeKeyEnum.SWIMMER, gsUserTypeKeyEnum.SWIMMER);
        else if (draft.user.role === AccountType.COACH)
          jsCookie.set(gsUserTypeKeyEnum.COACH, gsUserTypeKeyEnum.COACH);
        else if (draft.user.role === AccountType.ADMIN)
          jsCookie.set(gsUserTypeKeyEnum.ADMIN, gsUserTypeKeyEnum.ADMIN);
      });
    }

    case GET_PROFILE_FAILURE: {
      return produce(state, draft => {
        draft.error = action.payload;
      });
    }

    case UPDATE_CURRENT_TAB: {
      const { currentTab } = action.payload;
      return produce(state, draft => {
        draft.currentTab = currentTab;
      });
    }

    case GET_SUBSCRIPTIONS_SUCCESS: {
      return produce(state, draft => {
        const isSwimmer = [
          AccountType.ATHLETE,
          AccountType.SWIMMER,
          AccountType.SWIMMER_OR_PARENT,
          AccountType.PARENT
        ].some(x => x === (state.user?.role as AccountType));

        const isCoach = [AccountType.COACH].some(x => x === (state.user?.role as AccountType));

        const isAdmin = [AccountType.ADMIN].some(x => x === (state.user?.role as AccountType));

        const isEvaluator = [AccountType.EVALUATOR].some(
          x => x === (state.user?.role as AccountType)
        );

        const isContractor = [AccountType.CONTRACT].some(
          x => x === (state.user?.role as AccountType)
        );
        if (action.payload === null) {
          draft.attempt = state.attempt + 1;
        } else {
          draft.attempt = 0;
        }
        if (
          action.payload?.status === 'active' ||
          action.payload?.status === 'trialing' ||
          (state.user?.isGoswimFreeUser && state.user?.freeUserValidTill >= Date.now())
        ) {
          if (!draft.isSubscribed) {
            draft.isSubscribed = true;
            draft.isSubscriptionExpired = false;
            jsCookie.set(gsSubscriptionKey, gsSubscriptionValue);
          }
          draft.hideRoutesNavigation = [];
          if (isSwimmer) {
            draft.disabledRoutes = hideRoutesSwimmer;
            draft.hideRoutesNavigation = hideRoutesSwimmer;
          } else if (isCoach) draft.disabledRoutes = adminRoutes;
          else if (isAdmin) draft.disabledRoutes = [];
          else if (isEvaluator) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          } else if (isContractor) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          }
        } else {
          jsCookie.set(gsSubscriptionKey, 'skdjfoidsjfoisdjfojs');
          if (draft.isSubscribed) {
            draft.isSubscribed = false;
            draft.isSubscriptionExpired = true;
          }
          if (isAdmin) draft.disabledRoutes = [];
          else if (isEvaluator) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          } else if (isContractor) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          } else if (isSwimmer) {
            draft.disabledRoutes = hideRoutesSwimmer;
            draft.hideRoutesNavigation = hideRoutesSwimmer;
          } else draft.disabledRoutes = [...subscriptionRoutes, ...adminRoutes];
        }
      });
    }

    case ACTIVATE_ROUTES: {
      return produce(state, draft => {
        const isSwimmer = [
          AccountType.ATHLETE,
          AccountType.SWIMMER,
          AccountType.SWIMMER_OR_PARENT,
          AccountType.PARENT
        ].some(x => x === (state.user?.role as AccountType));

        const isCoach = [
          AccountType.COACH,
          AccountType.COACH_OR_SWIMMING_EXPERT,
          AccountType.EXPERT
        ].some(x => x === (state.user?.role as AccountType));

        const isAdmin = [AccountType.ADMIN].some(x => x === (state.user?.role as AccountType));

        const isEvaluator = [AccountType.EVALUATOR].some(
          x => x === (state.user?.role as AccountType)
        );

        const isContractor = [AccountType.CONTRACT].some(
          x => x === (state.user?.role as AccountType)
        );

        draft.hideRoutesNavigation = [];
        if (draft.isSubscribed) {
          draft.hideRoutesNavigation = [];
          if (isSwimmer) {
            draft.disabledRoutes = hideRoutesSwimmer;
            draft.hideRoutesNavigation = hideRoutesSwimmer;
          } else if (isCoach) draft.disabledRoutes = adminRoutes;
          else if (isAdmin) draft.disabledRoutes = [];
          else if (isEvaluator) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          } else if (isContractor) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          }
        } else {
          if (isAdmin) draft.disabledRoutes = [];
          else if (isEvaluator) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          } else if (isContractor) {
            draft.disabledRoutes = hideRoutesEvaluators;
            draft.hideRoutesNavigation = hideRoutesEvaluators;
          } else if (isSwimmer) {
            draft.disabledRoutes = hideRoutesSwimmer;
            draft.hideRoutesNavigation = hideRoutesSwimmer;
          } else draft.disabledRoutes = [...subscriptionRoutes, ...adminRoutes];
        }
      });
    }

    case DEACTIVATE_ROUTES: {
      return produce(state, draft => {
        const isSwimmer = [
          AccountType.ATHLETE,
          AccountType.SWIMMER,
          AccountType.SWIMMER_OR_PARENT,
          AccountType.PARENT
        ].some(x => x === (state.user?.role as AccountType));

        const isAdmin = [AccountType.ADMIN].some(x => x === (state.user?.role as AccountType));

        const isEvaluator = [AccountType.EVALUATOR].some(
          x => x === (state.user?.role as AccountType)
        );

        const isContractor = [AccountType.CONTRACT].some(
          x => x === (state.user?.role as AccountType)
        );
        draft.hideRoutesNavigation = [];
        if (isAdmin) draft.disabledRoutes = [];
        else if (isEvaluator) {
          draft.disabledRoutes = hideRoutesEvaluators;
          draft.hideRoutesNavigation = hideRoutesEvaluators;
        } else if (isContractor) {
          draft.disabledRoutes = hideRoutesEvaluators;
          draft.hideRoutesNavigation = hideRoutesEvaluators;
        } else if (isSwimmer) {
          draft.disabledRoutes = hideRoutesSwimmer;
          draft.hideRoutesNavigation = hideRoutesSwimmer;
        } else draft.disabledRoutes = [...subscriptionRoutes, ...adminRoutes];
      });
    }

    case SAVE_SETTINGS_REQUEST: {
      return produce(state, draft => {
        draft.error = null;
        draft.isSettingsUpdated = false;
      });
    }

    case SAVE_SETTINGS_SUCCESS: {
      const { user } = action.payload;
      return produce(state, draft => {
        draft.isSettingsUpdated = true;
        draft.settings = defaultInitialValues;
        if (user.data.settings) draft.settings = user.data.settings || defaultInitialValues;
        if (!draft.settings.dateFormat) {
          draft.settings.dateFormat = DateFormat.MONTHDATE;
        }
        if (!draft.settings.timeZone) {
          draft.settings.timeZone = moment.tz.guess();
        }
      });
    }

    case SAVE_SETTINGS_FAILURE: {
      return produce(state, draft => {
        draft.error = action.error;
        draft.isSettingsUpdated = false;
      });
    }
    case IS_SUBSCRIPTION_EXPIRED: {
      return produce(state, draft => {
        draft.isSubscriptionExpired = true;
      });
    }

    case UPLOAD_PROFILE_IMG_TO_S3_REQUEST: {
      return produce(state, draft => {
        draft.isLoading = true;
        draft.profileImg = null;
      });
    }

    case UPLOAD_PROFILE_IMG_TO_S3_SUCCESS: {
      return produce(state, draft => {
        draft.isLoading = false;
        draft.profileImg = action.payload;
      });
    }

    case UPLOAD_PROFILE_IMG_TO_S3_FAILURE: {
      return produce(state, draft => {
        draft.isLoading = false;
      });
    }
    case GOSWIM_COOKIE_ACCEPT: {
      return produce(state, draft => {
        draft.isCookieAccepted = true;
      });
    }

    default: {
      return state;
    }
  }
};
