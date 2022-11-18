import React, { useEffect } from 'react';
import Router from 'next/router';

import type { AppProps } from 'next/app';
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { wrapper } from "src/store";
import { createTheme } from 'src/theme';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { X as ClearIcon } from 'react-feather';
import { SnackbarUtilsConfigurator } from 'src/helpers/snackbar';
import MainLayout from 'layouts/mainLayout';
import AuthLayout from 'layouts/authLayout';
import { getTokenFromCookie } from '../src/_constant';
import { ACCESS_TOKEN_SUCCESS } from 'src/store/account';
import { apiGetAllTeamsList } from './api/groups';
import { apiGetUserProfile } from './api/account';

export interface ApplicationProps extends AppProps {
  gsTokenKey: string;
}
function MyApp({ Component, ...rest }: ApplicationProps) {
  const settings = useSelector(state => state.settings);
  const { store, props } = wrapper.useWrappedStore(rest);
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const notistackRef = React.useRef<SnackbarProvider | null>(null);

  const onClickDismiss = (key: string | number) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  useEffect(() => {
    console.log("Called here ::::");
    
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={createTheme(settings)}>
          <StylesProvider jss={jss}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <SnackbarProvider
                maxSnack={1}
                preventDuplicate
                ref={notistackRef}
                transitionDuration={{ appear: 500 }}
                action={key => (
                  <IconButton onClick={onClickDismiss(key)} size="large">
                    <ClearIcon size="20" color="white" />
                  </IconButton>
                )}>
                <SnackbarUtilsConfigurator />
                {
                  (rest.gsTokenKey) ?
                    <MainLayout {...props}>
                      <Component {...props} />
                    </MainLayout>
                    :
                    <AuthLayout {...props}>
                      <Component {...props} />
                    </AuthLayout>
                }
              </SnackbarProvider>
            </MuiPickersUtilsProvider>
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </>
  );

}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx }) => {
  
  const defRoutes = ['/users/sign_in', '/users/sign_up', '/users/password/new', '/resetPassword', '/plans', '/features','/lessons','/lessons/:id','/courses','/courses/:id','/home']
  const req = ctx.req
  const path = ctx.pathname
  const res = ctx.res
  let token: string | undefined = getTokenFromCookie(req)
 
  if (!token && !defRoutes.find(it => it === path)) {
    if (res) {
      res.writeHead(302, { location: '/users/sign_in' });
      res.end();
    }
    else {
      Router.push(`/users/sign_in`);
    }
  }
  else if (token && !store.getState().account?.user) {
    console.log("Called here :::: getInitialProps");
    await store.dispatch({
      type: ACCESS_TOKEN_SUCCESS,
      payload: { token: token }
    });
    await apiGetUserProfile(store.dispatch);
    await apiGetAllTeamsList(store.dispatch);
  }
  else if(!store.getState().account?.user) {
    token = undefined;
  }
  return {
    pageProps: {
      pathname: ctx.pathname,
      gsTokenKey: token
    },
    gsTokenKey: token
  };
});

export default wrapper.withRedux(MyApp);

