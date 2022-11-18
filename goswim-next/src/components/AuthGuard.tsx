import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const AuthGuard: React.FC = ({ children }: any) => {
  const account = useSelector(state => state.account);
  if (!account.isAuthenticated) {
    return <Redirect to="/users/sign_in" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
