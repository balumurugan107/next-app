/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route as ReactRoute, RouteComponentProps } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import LandingLayout from 'src/layouts/LandingLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
// import GuestGuard from 'src/components/GuestGuard';
import RouteGuard from 'src/components/RouteGuard';
import CreateAccount from './views/goswim/auth/SignUp';
import SignIn from './views/goswim/auth/SignIn';
import ForgotPassword from './views/goswim/auth/ForgotPassword';
import ChangePassword from './views/goswim/auth/ResetPassword';
type RouteComponent = () => JSX.Element | null;

interface Route {
  component:
    | RouteComponent
    | React.LazyExoticComponent<RouteComponent>
    | React.LazyExoticComponent<React.FC<any>>
    | React.LazyExoticComponent<React.ComponentType<any>>;
  exact: boolean;
  path: string;
  guard: React.FC;
  layout: React.FC;
  routes: PartialRoute[];
  isDisableRoute: boolean;
}

export type Guard =
  | React.SFC<{ path?: string }>
  | React.ExoticComponent<{
      children?: React.ReactNode;
      path?: string;
    }>;

type PartialRoute = Partial<Route>;

type LazyComponent = { default: RouteComponent | React.ComponentType };

/** exception handling for React lazy load */
export const lazyLoadEH = (componentImport: () => Promise<LazyComponent>) =>
  new Promise<LazyComponent>(resolve =>
    componentImport()
      .then(resolve)
      .catch(() => {
        /* reload page when import fails */
        window.location.reload();
      })
  );

const routesConfig: PartialRoute[] = [
  {
    layout: LandingLayout,
    exact: true,
    path: '/',
    // guard: GuestGuard,
    // component: () => <Redirect to="/home" />
    component: lazy(() => lazyLoadEH(() => import('src/views/pages/HomeView')))
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => lazyLoadEH(() => import('src/views/pages/Error404View')))
  },
  {
    exact: true,
    path: '/maintenance',
    component: lazy(() => lazyLoadEH(() => import('src/views/pages/ErrorMaintenance')))
  },
  {
    exact: true,
    path: '/login',
    component: SignIn
  },

  {
    exact: true,
    path: '/logout',
    component: lazy(() => lazyLoadEH(() => import('src/views/auth/Logout')))
  },
  {
    exact: true,
    path: '/signup',
    component: CreateAccount
  },
  {
    exact: true,
    path: '/signin',
    component: SignIn
  },
  {
    exact: true,
    // guard: GuestGuard,
    path: '/forgotpassword',
    component: ForgotPassword
  },
  {
    exact: true,
    path: '/resetPassword',
    component: ChangePassword
  },
  {
    exact: true,
    path: '/features',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/Features')))
  },

  {
    exact: true,
    path: '/subscription_info',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/plan_info')))
  },
  {
    exact: true,
    path: '/faq',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/faq')))
  },
  {
    exact: true,
    path: '/cookie_policy',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/cookiePolicy')))
  },

  {
    exact: true,
    path: '/company',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/company')))
  },

  {
    exact: true,
    path: '/terms_of_service',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/tos')))
  },

  {
    exact: true,
    layout: MainLayout,
    path: '/terms_of_use',
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/tou')))
  },

  {
    exact: true,
    path: '/privacy',
    layout: MainLayout,
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/static/privacy')))
  },

  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => lazyLoadEH(() => import('src/views/auth/RegisterView')))
  },
  // {
  //   exact: true,
  //   path: '/app/dashboard/settings',
  //   component: lazy(() => lazyLoadEH(() => import('src/views/pages/AccountView/Settings')))
  // },
  {
    exact: true,
    // guard: AuthGuard,
    layout: MainLayout,
    path: '/plans',
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/Subscriptions')))
  },

  {
    exact: true,
    // guard: AuthGuard,
    layout: MainLayout,
    path: '/app/plans',
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/Subscriptions')))
  },

  {
    exact: true,
    guard: AuthGuard,
    layout: MainLayout,
    path: '/checkout',
    component: lazy(() => lazyLoadEH(() => import('src/views/goswim/checkout')))
  },

  {
    exact: true,
    path: '/paymentStatus',
    component: lazy(() =>
      lazyLoadEH(() => import('src/views/goswim/Subscriptions/PaymentStatusForm'))
    )
  },
  // {
  //   exact: true,
  //   path: '/dashboard',
  //   // guard: RouteGuard,
  //   component: lazy(() => lazyLoadEH(() => import('src/views/newdashboard/MainView')))
  // },

  {
    path: '/app',
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        guard: RouteGuard,
        path: '/app/account',
        component: lazy(() => lazyLoadEH(() => import('src/views/pages/AccountView')))
      },

      // {
      //   exact: true,
      //   path: '/app/settings',
      //   guard: RouteGuard,
      //   component: lazy(() => lazyLoadEH(() => import("src/views/newSettingsTab")))
      // },
      {
        exact: true,
        path: '/app/management/groups',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/management/Teams/MainView')))
      },
      //route for every individual group
      {
        exact: true,
        path: '/app/management/group/form/:type/:teamId?',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/management/Teams/CreateEditView')))
      },
      //Dashboard
      {
        exact: true,
        path: '/app/dashboardOld',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/dashboard/MainView')))
      },
      //new dashboard
      {
        exact: true,
        path: '/app/dashboard',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/newdashboard/MainView')))
      },
      {
        exact: true,
        path: '/app/admin/videos',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Videos')))
      },
      {
        exact: true,
        path: '/app/admin/weeklythemes',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/WeeklyThemes')))
      },
      {
        exact: true,
        path: '/app/admin/all-members',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/AllMembers')))
      },
      {
        exact: true,
        path: '/app/admin/lessons/',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Lessons')))
      },
      {
        exact: true,
        path: '/app/admin/lessons/create',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/Lessons/CreateEditViewLesson'))
        )
      },
      {
        exact: true,
        path: '/app/admin/lessons/:lesson_id/edit',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/Lessons/CreateEditViewLesson'))
        )
      },
      {
        exact: true,
        path: '/app/admin/lessons/:lesson_id/view',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/Lessons/CreateEditViewLesson'))
        )
      },
      {
        exact: true,
        path: '/app/admin/courses',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Courses')))
      },
      {
        exact: true,
        path: '/app/admin/courses/create',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/Courses/CreateEditViewCourse'))
        )
      },
      {
        exact: true,
        path: '/app/admin/courses/:course_id/edit',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/Courses/CreateEditViewCourse'))
        )
      },
      {
        exact: true,
        path: '/app/admin/courses/:course_id/view',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/Courses/CreateEditViewCourse'))
        )
      },
      {
        exact: true,
        path: '/app/admin/workouts',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Workouts')))
      },
      {
        exact: true,
        path: '/app/admin/contracts',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Contracts')))
      },
      {
        exact: true,
        path: '/app/admin/plans',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Plans')))
      },
      {
        exact: true,
        path: '/app/admin/statistics',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/Statistics')))
      },
      {
        exact: true,
        path: '/app/admin/specialgroups',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/admin/SpecialGroups')))
      },
      {
        exact: true,
        path: '/app/admin/specialgroups/create',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/SpecialGroups/CreateEditView'))
        )
      },
      {
        exact: true,
        path: '/app/admin/specialgroups/:group_id/edit',
        guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/SpecialGroups/CreateEditView'))
        )
      },
      {
        exact: true,
        path: '/app/admin/specialgroups/:group_id/view',
        // guard: RouteGuard,
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/goswim/admin/SpecialGroups/CreateEditView/viewGroup'))
        )
      },
      //Courses
      {
        exact: true,
        path: '/app/courses',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/courses/MainView')))
      },
      {
        exact: true,
        path: '/app/courses/tutorials',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/courses/MainView')))
      },

      //Courses details
      {
        exact: true,
        path: '/app/courses/:course_id',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/courses/MainView/details')))
      },

      {
        exact: true,
        path: '/app/tutorials/:course_id',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/courses/MainView/details')))
      },
      //lessons
      {
        exact: true,
        path: '/app/lessons',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/lessons/MainView')))
      },
      //courses

      //Lesson details
      {
        exact: true,
        path: '/app/lessons/:lesson_id',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/lessons/details')))
      },
      {
        exact: true,
        path: '/app/themeoftheweek',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/ThemeOfTheWeek')))
      },
      {
        exact: true,
        path: '/app/favorites',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/lessons/Favorites')))
      },
      {
        exact: true,
        path: '/app/plays',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/Plays')))
      },
      {
        exact: true,
        path: '/app/billing',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/pages/Billing')))
      },

      // calendar
      {
        exact: true,
        path: '/app/calendar',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/calendar/MainView')))
      },
      // management/members
      {
        exact: true,
        path: '/app/management/members',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/management/Members/MainViewV1')))
      },
      {
        exact: true,
        path: '/app/management/members/:type/:memberId?',
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/management/Members/CreateEditView'))
        )
      },
      {
        exact: true,
        path: '/app/management/members/view/member/:memberId?',
        component: lazy(() =>
          lazyLoadEH(() => import('src/views/management/Members/CreateEditView/ViewMember'))
        )
      },
      {
        exact: true,
        path: '/app/management/group/:groupId?',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/groups/TodaysLesson')))
      },
      {
        exact: true,
        path: '/app/management/group/view/:memberId?',
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/goswim/groups/Groupdetails')))
      },
      // management/services
      {
        exact: true,
        path: '/app/management/services',
        // isDisableRoute:true,
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/management/Services/MainView')))
      },
      // management/orders
      {
        exact: true,
        path: '/app/management/orders',
        // isDisableRoute:true,
        guard: RouteGuard,
        component: lazy(() => lazyLoadEH(() => import('src/views/management/MyOrders/MainView')))
      },
      // redirects
      {
        exact: true,
        path: '/app',
        guard: RouteGuard,
        component: () => <Redirect to="/app/account" />
      },
      {
        exact: true,
        path: '/app/services',
        guard: RouteGuard,
        component: () => <Redirect to="/app/services/video-reviews" />
      },
      {
        exact: true,
        path: '/app/management',
        guard: RouteGuard,
        component: () => <Redirect to="/app/management/members" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  // common route
  {
    path: '*',
    layout: LandingLayout,
    routes: [
      // home
      {
        exact: true,
        path: '/home',
        component: lazy(() => lazyLoadEH(() => import('src/views/pages/HomeView')))
      },
      // pricing
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => lazyLoadEH(() => import('src/views/pages/PricingView')))
      },
      // redirects
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = (routes: PartialRoute[]) =>
  routes && (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes?.map(({ isDisableRoute, guard, layout, component, path, exact, routes }, idx) => {
          if (isDisableRoute) {
            return null;
          }
          const Guard: Guard = guard || Fragment;
          const Layout = layout || Fragment;
          const Component = component as React.FC<RouteComponentProps>;

          return (
            <ReactRoute
              key={`${path}-${idx}`}
              {...{ path, exact }}
              render={({ staticContext, ...rest }) => (
                <Guard {...(guard && { path })}>
                  <Layout>
                    {routes ? (
                      renderRoutes(routes)
                    ) : (
                      <Component {...rest} {...(staticContext && { staticContext })} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );

const Routes = () => renderRoutes(routesConfig);

export default Routes;
