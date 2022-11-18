/* eslint-disable import/prefer-default-export */
import {
  combineReducers,
  applyMiddleware,
  createStore,
  Middleware,
  CombinedState,
  Action
} from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import localforage from 'localforage';
import { createBlacklistFilter, createWhitelistFilter } from 'redux-persist-transform-filter';

import config from 'src/config';
import { accountReducer, AccountState, LOGOUT } from 'src/store/account';
import { rememberMeReducer, rememberMeState } from 'src/store/rememberMe';
import { membersReducer, MembersState } from 'src/store/management/members';
import { teamReducer, TeamState } from 'src/store/management/team';
import { settingsReducer, SettingsState } from 'src/store/settings';
import {
  ScheduleOverviewState,
  scheduleOverviewReducer
} from 'src/store/calendar/scheduleOverview';
import { ScheduleListState, scheduleListReducer } from 'src/store/calendar/scheduleList';
import { serviceReducer, ServiceState } from 'src/store/management/service';
import { BookingState, ordersReducer } from 'src/store/management/orders';
import { SubscriptionState, subscriptionReducer } from 'src/store/subscriptions';
import { SubscribersState, subscribersReducer } from 'src/store/calendar/subscribers';

import { WorkoutState, workoutReducer } from 'src/store/workout';
import { EnumState, enumReducer } from 'src/store/enum';
import { DashboardState, dashboardReducer } from 'src/store/dashboard';

import { DashboardNewServiceState, dashboardNewReducer } from 'src/store/newdashboard';
import { LessonServiceState, lessonReducer } from 'src/store/management/lessons';
import { CourseServiceState, courseReducer } from 'src/store/management/courses';
import { CourseDetailServiceState, lessonsReducer } from 'src/store/management/goswim/lessons';
import {
  LessonDetailsState,
  lessonDetailsReducer
} from 'src/store/management/goswim/lessons/details';
import { lessonBookingReducer, LessonBookingState } from 'src/store/calendar/lesson';
import { commonReducer, CommonState } from 'src/store/common';
import { S3UploadReducer, AdminVideoState } from './goswim/admin/video';
import { AdminCourseReducer, AdminCourseState } from './goswim/admin/course';
import { adminLessonReducer, AdminLessonState } from './goswim/admin/lesson';
import { adminWeeklyThemesReducer, AdminWeeklyThemesState } from './goswim/admin/weeklyThemes';
import { adminUsersReducer, AdminUsersState } from './goswim/admin/users';
import { statisticsReducer, StatisticsState } from './goswim/admin/statistics';
import { landingPageReducer, LandingPageState } from './management/landingpage';
import { specialGroupsReducer, specialGroupsState } from './goswim/admin/specialGroups';

export interface ApplicationState {
  userID: string;
  account: AccountState;
  members: MembersState;
  team: TeamState;
  settings: SettingsState;
  scheduleOverview: ScheduleOverviewState;
  scheduleOverviewSubscribers: SubscribersState;
  scheduleList: ScheduleListState;
  service: ServiceState;
  orders: BookingState;
  subscription: SubscriptionState;
  workout: WorkoutState;
  enum: EnumState;
  dashboard: DashboardState;
  dashboardNew: DashboardNewServiceState;
  lesson: LessonServiceState;
  courses: CourseServiceState;
  courseDetails: CourseDetailServiceState;
  lessonDetails: LessonDetailsState;
  lessonBooking: LessonBookingState;
  common: CommonState;
  adminUsers: AdminUsersState;
  adminVideo: AdminVideoState;
  adminCourse: AdminCourseState;
  adminLesson: AdminLessonState;
  adminWeeklyTheme: AdminWeeklyThemesState;
  statistics: StatisticsState;
  landingPage: LandingPageState;
  specialGroups: specialGroupsState;
  remember: rememberMeState;
}

export const SET_USER_ID = 'SET_USER_ID';

const { enableReduxLogger } = config;

const persistConfig: PersistConfig<CombinedState<ApplicationState>> = {
  key: 'a5abe301-fc4c-4094-aa2c-8dfbb528cc11',
  timeout: 0,
  storage: localforage,
  whitelist: [
    'settings',
    'account',
    'subscription',
    'members',
    'userID',
    'team',
    'orders',
    'membersV1',
    'dashboard',
    'common',
    'recentlyPlayed',
    'remember'
  ],
  transforms: [
    createWhitelistFilter('remember', ['rememberMe', 'userCredentials']),
    createWhitelistFilter('account', [
      'user',
      'token',
      'isProfileLoaded',
      'isAuthenticated',
      'isSubscribed',
      'currentTab',
      'lastUpdatedPictureTimestamp',
      'disabledRoutes',
      'settings',
      'isSubscriptionExpired',
      'attempt',
      'isCookieAccepted'
    ]),
    createWhitelistFilter('subscription', ['productData', 'subscriptionData', 'data']),
    createWhitelistFilter('members', [
      'data',
      'selectedMembers',
      'currentSelectedTeam',
      'currentSelectedTeams',
      'page',
      'query',
      'limit',
      'length',
      'disabledMembers',
      'currentSelectedTeamManagement'
    ]),
    createWhitelistFilter('userID'),
    createWhitelistFilter('team', [
      'data',
      'teamsDetailsViewOption',
      'response',
      'heirarchyTeams',
      'dropDownSelectedTeams',
      'dropDownSelectedTeam',
      'teamsList'
    ]),
    createWhitelistFilter('common', ['persist']),
    createBlacklistFilter('dashboardNew')
  ]
};

const appReducer = combineReducers<ApplicationState>({
  userID: (_1 = '', action: any) => {
    switch (action.type) {
      case SET_USER_ID:
        return action.payload;
      default:
        return '';
    }
  },
  account: accountReducer,
  members: membersReducer,
  team: teamReducer,
  settings: settingsReducer,
  scheduleOverview: scheduleOverviewReducer,
  scheduleOverviewSubscribers: subscribersReducer,
  scheduleList: scheduleListReducer,
  service: serviceReducer,
  orders: ordersReducer,
  subscription: subscriptionReducer,
  workout: workoutReducer,
  enum: enumReducer,
  dashboard: dashboardReducer,
  dashboardNew: dashboardNewReducer,
  lesson: lessonReducer,
  courses: courseReducer,
  courseDetails: lessonsReducer,
  lessonDetails: lessonDetailsReducer,
  lessonBooking: lessonBookingReducer,
  common: commonReducer,
  adminUsers: adminUsersReducer,
  adminVideo: S3UploadReducer,
  adminCourse: AdminCourseReducer,
  adminLesson: adminLessonReducer,
  adminWeeklyTheme: adminWeeklyThemesReducer,
  statistics: statisticsReducer,
  landingPage: landingPageReducer,
  specialGroups: specialGroupsReducer,
  remember: rememberMeReducer
});

const rootReducer = (state: ApplicationState | any, action: Action) => {
  let rememberOnly = state.remember;
  if (action.type === LOGOUT) {
    state = undefined;
    state = {
      remember: rememberOnly
    };
  }
  return appReducer(state, action);
};

const masterReducer = (state: ApplicationState | undefined, action: any) => {
  if (action.type === HYDRATE) {
    // const actionPayloadOnlyNeeded = {
    //   ...action.payload
    // };
    // delete actionPayloadOnlyNeeded['account'];
    // delete actionPayloadOnlyNeeded['settings'];
    // delete actionPayloadOnlyNeeded['subscription'];
    // delete actionPayloadOnlyNeeded['remember'];

    const nextState = {
      ...state,
      ...action.payload
    };
    return nextState;
  }
  return rootReducer(state, action);
};

const loggerMiddleware = createLogger();

const configureStore = (preloadedState = {}) => {
  const middlewares: Middleware[] = [thunkMiddleware];

  if (enableReduxLogger) {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer =
    process.env.NODE_ENV !== 'development'
      ? applyMiddleware(...middlewares)
      : composeWithDevTools(applyMiddleware(...middlewares));

  const persistedReducer = persistReducer(persistConfig, masterReducer as any);

  let store = createStore(persistedReducer, preloadedState as any, middlewareEnhancer);

  if (typeof window === 'undefined') {
    store = createStore(masterReducer as any, preloadedState as any, middlewareEnhancer);
  }

  // let store = createStore(masterReducer as any, preloadedState as any, middlewareEnhancer);

  return store;
};

export const clearLocalforage = () =>
  localforage
    .clear()
    .then(() => {
      console.info('Localforage database cleared.');
    })
    .catch(err => {
      console.error('clearLocalforage-->', err);
    });

export const store = configureStore();

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export const persistor = persistStore(store);
