import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AccountType } from 'src/constants';
import { activateRoutes } from 'src/store/account';
import { setSettings, SettingsState } from 'src/store/settings';
import Router  from 'next/router';
import { gsTokenKey } from './_constant';
import jsHttpCookie from 'cookie';


const GuestGuard = ({ children,...rest }) => {
  const { isAuthenticated, user, isSubscribed } = useSelector(state => state.account);
  const themeSettings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const validFreeUser = user?.isGoswimFreeUser && user?.freeUserValidTill >= Date.now();
  const invalidFreeUser = user?.isGoswimFreeUser && user?.freeUserValidTill <= Date.now();
  const updatedThemeSettings: SettingsState = user?.teams
    ? {
        ...themeSettings,
        logoUrl: user.teams.brand_logo_url || '',
        teamName: user.teams.name,
        // theme: user.teams.brand_theme || 'sapphireBlue'
        theme: 'sapphireBlue'
      }
    : themeSettings;

  //navigate to subscribe page if not subscribed after signup and logging in
  // const cookiesJSON = jsHttpCookie.parse('GS_NEKOT');
  if (isAuthenticated) {  
    let dashboardPage = '/app/dashboard';
    let subscriptionPage = `/plans`;
    dispatch(setSettings(updatedThemeSettings));
    Router.push('app/dahboard');
    // if (
    //   (user?.role !== AccountType.COACH && user?.role !== AccountType.SWIMMER) ||
    //   isSubscribed ||
    //   validFreeUser /*&& user?.status === Status.ACTIVE.toLowerCase()*/
    // ) {
    //   dispatch(activateRoutes());
    //   return <Redirect to={dashboardPage} />;
    // } else if (!isSubscribed || invalidFreeUser) {
    //   return <Redirect to={subscriptionPage} />;
    // }
  }
  return <>{children}</>;
};

export async function getServerSideProps(context: { req: { headers: { cookie: any; }; }; }) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  return { cookies: {parsedCookies} }
}

export default GuestGuard;
