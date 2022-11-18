import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'src/components/SplashScreen';
import { logout } from 'src/store/account';
import { authServiceInstance } from 'src/services/account/authService';

const Auth: React.FC = ({ children }:any) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => ({
    isLoading: state.account.isLoading
  }));

  useEffect(() => {
    const initAuth = async () => {
      authServiceInstance.handleLogout(() => dispatch(logout()));

      // authService.handleAuthentication();

      /* if (authService.isAuthenticated()) {
        // const user = await authService.loginInWithToken();

        await dispatch(setUserData(user));
      } */
    };

    initAuth();
  }, [dispatch]);
  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default Auth;
